import React, { useState, useRef, useEffect, useMemo, memo, createContext, useContext } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import expenseService from '../services/expenseService';
import chatService from '../services/chatService';
import LoadingAnimation from '../components/LoadingAnimation';
import DynamicIcon from '../components/DynamicIcon';
import ExpenseCard, { getCurrencySymbol } from '../components/ExpenseCard';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMessages } from '../hooks/useMessages';
import { useTagResolver } from '../hooks/useTags';
import SkeletonMessage, { SkeletonMessageGroup } from '../components/skeletons/SkeletonMessage';

// Create a context to share the parseExpenseData function
const MessageContext = createContext(null);

// Memoized message component for better performance
const ExpenseMessage = memo(({ message, onDelete }) => {
  // Get parseExpenseData from context and expenseDataCache
  const { parseExpenseData, expenseDataCache } = useContext(MessageContext);
  
  // Memoize the parsed expense data to prevent re-parsing on every render
  const expense = useMemo(() => {
    // First check if we have this message's expense data in our persistent cache
    if (expenseDataCache && expenseDataCache[message.id]) {
      return expenseDataCache[message.id];
    }
    
    // Then check if expense data is directly available in the message
    if (message.expenseData) {
      return message.expenseData;
    }
    
    // Otherwise try to parse it from the content
    return parseExpenseData(message.id, message.content);
  }, [message.id, message.content, parseExpenseData, message.expenseData, expenseDataCache]);
  
  if (!expense) return null;
  
  return (
    <ExpenseCard 
      expense={expense} 
      messageId={message.id} 
      onDelete={onDelete} 
      fullWidth={true} 
    />
  );
});

export default function Chat() {
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  
  // Store expense data in a persistent state
  const [expenseDataCache, setExpenseDataCache] = useState({});
  
  // Use our custom hook for messages
  const { 
    messages, 
    isLoading, 
    isProcessing, 
    isError: error,
    sendMessage,
    deleteMessage,
    parseExpenseData,
    mutate
  } = useMessages();

  // Scroll to bottom when messages change or when initially loaded
  useEffect(() => {
    if (!isLoading && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);
  
  // Additional effect to ensure immediate scroll to bottom on initial load
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Send message and process expense
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim() || isProcessing) return;
    
    try {
      // Use our custom hook to send the message
      await sendMessage(inputText);
      setInputText('');
      
      // After sending user message, try to parse it as an expense
      try {
        const expenseData = await chatService.parseExpense(inputText);
        
        if (expenseData && expenseData.id) {
          console.log('Expense parsed successfully:', expenseData);
          
          // Create a clean confirmation message
          const responseText = `✅ Expense saved: ${expenseData.short_text || 'Item'} - ${getCurrencySymbol(expenseData.currency)}${expenseData.amount}`;
          
          // Create a custom message object with the expense data directly attached
          const expenseMessage = {
            content: responseText,
            message_type: 'system',
            expenseData: expenseData, // Attach expense data directly
            id: `expense-${Date.now()}`,
            createdAt: new Date().toISOString(),
            direction: 'incoming'
          };
          
          // Send the message to the server first
          const serverResponse = await chatService.sendMessage(responseText, 'system', expenseData);
          
          // Then update our local cache with both the server response and our custom message
          // We'll use the server message ID if available
          const messageId = serverResponse?.id || expenseMessage.id;
          const finalExpenseMessage = {
            ...expenseMessage,
            id: messageId
          };
          
          // Store the expense data in our persistent cache using the message ID as the key
          setExpenseDataCache(prev => ({
            ...prev,
            [messageId]: expenseData
          }));
          
          // Add our custom message to the cache and prevent revalidation
          mutate(prevMessages => {
            // Filter out any temporary messages with the same content
            const filteredMessages = prevMessages?.filter(msg => 
              !(msg.content === responseText && !msg.id.startsWith('expense-'))
            ) || [];
            
            return [...filteredMessages, finalExpenseMessage];
          }, false); // false means don't revalidate with the server
        } else {
          console.log('Message was not an expense, continuing conversation');
          
          // Send a system response for non-expense messages
          await sendMessage("I understand. Let me know if you have any expenses to track!", 'system');
        }
      } catch (expenseError) {
        console.error('Error parsing expense:', expenseError);
        
        // Send an error response
        await sendMessage("Sorry, I couldn't process that as an expense. Please check the format and try again.", 'system');
      }
      
    } catch (err) {
      console.error('Failed to send message:', err);
      setNotification({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    }
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!showConfirmDelete) return;
    
    const { type, id: msgId, expenseId } = showConfirmDelete;
    
    try {
      // If there's an expense ID, delete the expense first
      if (expenseId) {
        try {
          await expenseService.deleteExpense(expenseId);
        } catch (err) {
          // If the expense doesn't exist or we can't delete it, just continue
          console.warn('Could not delete expense, may already be deleted:', err);
        }
      }
      
      // Use our custom hook to delete the message
      await deleteMessage(msgId);
      
      // Clear the confirmation dialog
      setShowConfirmDelete(null);
      
      // Show success notification
      setNotification({
        type: 'success',
        message: 'Message deleted successfully.'
      });
    } catch (err) {
      console.error('Failed to delete:', err);
      setNotification({
        type: 'error',
        message: 'Failed to delete. Please try again.'
      });
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>Chat | Piggy</title>
          <meta name="description" content="Chat with your expense assistant" />
        </Head>
        
        <div className="flex flex-col h-full bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm p-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Chat</h1>
            <div className="text-sm text-gray-500">
              {messages.length} {messages.length === 1 ? 'message' : 'messages'}
            </div>
          </header>
          
          {/* Messages Area or Loading State */}
          {isLoading ? (
            <div className="flex flex-col space-y-4 p-4">
              <SkeletonMessageGroup count={5} />
            </div>
          ) : error ? (
            <div className="text-center p-4">
              <p className="text-red-500 mb-4">Failed to load messages. Please try again.</p>
              <button 
                onClick={mutate}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : (
            <MessageContext.Provider value={{ parseExpenseData, expenseDataCache }}>
              <div className="flex flex-col flex-1 overflow-y-auto px-4 pt-4 pb-2 space-y-4" ref={messagesContainerRef}>
                <AnimatePresence initial={false} mode="popLayout">
                  {messages.map(message => {
                    const isTemp = message.id?.startsWith('temp-') || false;
                    const isUser = message.message_type === 'user';
                    const isExpenseMessage = !isUser && (
                      (message.expenseData) || // Check for direct expense data
                      (message.content && (
                        message.content.includes('Expense saved:') || 
                        message.content.includes('✅ Expense saved:')
                      ))
                    );
                    
                    return (
                      <motion.div
                        key={message.id || message.localId || `msg-${Math.random()}`}
                        initial={isTemp ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={isTemp ? { opacity: 0, y: 0, transition: { duration: 0 } } : { opacity: 0, y: -20, transition: { duration: 0.3 } }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {isUser ? (
                          <div 
                            className="max-w-[75%] px-4 py-3 bg-gradient-primary text-white rounded-3xl shadow-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowConfirmDelete({ id: message.id, type: 'message' });
                            }}
                          >
                            <p className="whitespace-pre-line">{message.content}</p>
                          </div>
                        ) : isExpenseMessage ? (
                          <div className="flex justify-center mb-4">
                            <ExpenseMessage 
                              message={message}
                              onDelete={(expenseId, msgId) => {
                                // If the expense was deleted, show a success notification
                                if (expenseId) {
                                  setNotification({
                                    type: 'success',
                                    message: 'Expense deleted successfully.'
                                  });
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-3/4 px-4 py-3 bg-white text-gray-800 rounded-3xl shadow-sm border border-gray-100 whitespace-pre-line">
                            <p>{message.content}</p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                
                {/* Show loading animation when processing a message */}
                {isProcessing && (
                  <div className="flex justify-start mb-4">
                    <LoadingAnimation size="small" />
                  </div>
                )}
                
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
              </div>
            </MessageContext.Provider>
          )}
          
          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isProcessing}
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-gradient-primary text-white disabled:opacity-50"
                disabled={!inputText.trim() || isProcessing}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
          
          {/* Confirmation Dialog */}
          {showConfirmDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-xl p-6 max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this {showConfirmDelete.type}? This action cannot be undone.</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowConfirmDelete(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Notification */}
          {notification && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out"
              style={{
                backgroundColor: notification.type === 'success' ? '#10B981' : '#EF4444',
                color: 'white'
              }}
            >
              {notification.message}
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
