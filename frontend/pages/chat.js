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
import MultiExpenseCard from '../components/MultiExpenseCard';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMessages } from '../hooks/useMessages';
import { useExpenses } from '../hooks/useExpenses';
import { useTagResolver } from '../hooks/useTags';
import SkeletonMessage, { SkeletonMessageGroup } from '../components/skeletons/SkeletonMessage';

// Create a context to share the parseExpenseData function
const MessageContext = createContext(null);

// Memoized message component for better performance
const ExpenseMessage = memo(({ message, onDelete }) => {
  // Get parseExpenseData from context and expenseDataCache
  const { parseExpenseData, expenseDataCache, expenses } = useContext(MessageContext);
  
  // Get expenses using reliable expense_ids lookup
  const messageExpenses = useMemo(() => {
    // First check if we have expense data in persistent cache
    if (expenseDataCache && expenseDataCache[message.id] && expenseDataCache[message.id].expenses) {
      return expenseDataCache[message.id].expenses;
    }
    
    // Then check if expense data is directly available in the message (for new messages)
    if (message.expenseData) {
      return [message.expenseData];
    }
    
    if (message.multiExpenseData && message.multiExpenseData.expenses) {
      return message.multiExpenseData.expenses;
    }
    
    // Use expense_ids to look up expenses from API data (most reliable method)
    if (message.expense_ids && message.expense_ids.length > 0 && expenses && expenses.length > 0) {
      const foundExpenses = message.expense_ids.map(expenseId => 
        expenses.find(expense => expense.id === expenseId)
      ).filter(Boolean); // Remove any undefined expenses
      
      if (foundExpenses.length > 0) {
        return foundExpenses;
      }
    }
    
    // BACKWARD COMPATIBILITY: Fall back to pattern matching for old messages without expense_ids
    if (expenses && expenses.length > 0) {
      // Check for single expense messages
      if (message.content.includes('Expense saved:')) {
        const match = message.content.match(/Expense saved:\s*(.+?)\s*-\s*[€$£¥]?(\d+(?:\.\d{2})?)/);
        if (match) {
          const [, description, amount] = match;
          const messageTime = new Date(message.timestamp);
          
          const matchingExpense = expenses.find(expense => {
            const expenseTime = new Date(expense.timestamp);
            const timeDiff = Math.abs(expenseTime - messageTime);
            const amountMatch = Math.abs(parseFloat(expense.amount) - parseFloat(amount)) < 0.01;
            const descriptionMatch = expense.short_text?.toLowerCase().includes(description.toLowerCase()) ||
                                   expense.raw_text?.toLowerCase().includes(description.toLowerCase());
            
            return timeDiff <= 10000 && amountMatch && descriptionMatch;
          });
          
          if (matchingExpense) {
            return [matchingExpense];
          }
        }
      }
      
      // Check for multi-expense messages
      const multiMatch = message.content.match(/(\d+)\s+expenses\s+saved\s+successfully/i);
      if (multiMatch) {
        const expectedCount = parseInt(multiMatch[1]);
        const messageTime = new Date(message.timestamp);
        
        const matchingExpenses = expenses.filter(expense => {
          const expenseTime = new Date(expense.timestamp);
          const timeDiff = Math.abs(expenseTime - messageTime);
          return timeDiff <= 10000;
        });
        
        if (matchingExpenses.length === expectedCount && expectedCount > 1) {
          return matchingExpenses;
        }
      }
    }
    
    return null;
  }, [message.id, message.expense_ids, message.expenseData, message.multiExpenseData, expenseDataCache, expenses]);
  
  // If no expenses found, don't render anything
  if (!messageExpenses || messageExpenses.length === 0) {
    return null;
  }
  
  // Render MultiExpenseCard for multiple expenses
  if (messageExpenses.length > 1) {
    return (
      <MultiExpenseCard 
        expenses={messageExpenses}
        totalCount={messageExpenses.length}
        processingTime={0}
        originalText={message.content.includes('expenses saved successfully') ? null : message.content}
        error=""
      />
    );
  }
  
  // Render single ExpenseCard for single expense
  const expense = messageExpenses[0];
  
  return (
    <ExpenseCard 
      expense={expense} 
      messageId={message.id} 
      onDelete={onDelete} 
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
  
  // Separate state for expense processing (different from message processing)
  const [isProcessingExpense, setIsProcessingExpense] = useState(false);
  
  // Use our custom hook for messages
  const { 
    messages, 
    isLoading, 
    isError: error,
    mutate
  } = useMessages();

  // Use our custom hook for expenses
  const { expenses, mutate: mutateExpenses } = useExpenses();

  // Scroll to bottom when messages change or when initially loaded
  useEffect(() => {
    if (!isLoading && messages && messages.length > 0 && messagesContainerRef.current) {
      // Use smooth scrolling only when messages are added after initial load
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);
  
  // Immediate scroll to bottom on initial load (no animation)
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        const container = messagesContainerRef.current;
        container.scrollTop = container.scrollHeight;
      }
    };
    
    // Scroll immediately and also after brief delays to ensure DOM is ready
    scrollToBottom();
    const timer1 = setTimeout(scrollToBottom, 50);
    const timer2 = setTimeout(scrollToBottom, 200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Also scroll to bottom immediately when data finishes loading
  useEffect(() => {
    if (!isLoading && messages && messages.length > 0 && messagesContainerRef.current) {
      const scrollToBottom = () => {
        const container = messagesContainerRef.current;
        container.scrollTop = container.scrollHeight;
      };
      
      // Multiple attempts to ensure scroll happens
      scrollToBottom();
      const timer1 = setTimeout(scrollToBottom, 10);
      const timer2 = setTimeout(scrollToBottom, 100);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isLoading, messages]);

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
    
    if (!inputText.trim() || isProcessingExpense) return;
    
    const messageText = inputText;
    setInputText(''); // Clear input immediately
    
    try {
      // Step 1: Add user message immediately (optimistic update)
      const userMessage = {
        id: `user-${Date.now()}`,
        content: messageText,
        message_type: 'user',
        timestamp: new Date().toISOString()
      };
      
      // Add user message to UI immediately
      mutate(prevMessages => [
        ...(prevMessages || []),
        userMessage
      ], false);
      
      // Step 2: Start expense processing and show loading animation
      setIsProcessingExpense(true);
      
      try {
        // Send user message to server and parse expense in parallel
        const [userResponse, expenseResult] = await Promise.all([
          chatService.sendMessage(messageText, 'user'),
          chatService.parseExpensesSmart(messageText)
        ]);
        
        if (expenseResult && expenseResult.expenses && expenseResult.expenses.length > 0) {
          // Create appropriate response message based on expense count
          let responseText;
          if (expenseResult.total_count === 1) {
            const expense = expenseResult.expenses[0];
            responseText = `✅ Expense saved: ${expense.short_text || 'Item'} - ${getCurrencySymbol(expense.currency)}${expense.amount}`;
          } else {
            responseText = `✅ ${expenseResult.total_count} expenses saved successfully`;
          }
          
          const expenseMessage = {
            id: `expense-${Date.now()}`,
            content: responseText,
            message_type: 'system',
            timestamp: new Date().toISOString(),
            expense_ids: expenseResult.expenses.map(expense => expense.id), // Store expense IDs for reliable lookup
            expenseData: expenseResult.total_count === 1 ? expenseResult.expenses[0] : null,
            multiExpenseData: expenseResult.total_count > 1 ? expenseResult : null
          };
          
          // Step 3: Add expense card to UI (replaces loading animation)
          mutate(prevMessages => [
            ...(prevMessages || []),
            expenseMessage
          ], false);
          
          // Store expense data in cache - always store the full result for consistency
          setExpenseDataCache(prev => ({
            ...prev,
            [expenseMessage.id]: expenseResult
          }));
          
          // Send expense message to server (in background, don't wait)
          chatService.sendMessage(
            responseText, 
            'system', 
            null, // Don't send complex expense data, just use IDs for lookup
            expenseResult.expenses.map(expense => expense.id)
          ).catch(err => {
            console.warn('Failed to sync expense message to server:', err);
          });
          
          // Revalidate expenses
          mutateExpenses();
        } else {
          // Update user message with server response if no expense
          if (userResponse?.id) {
            mutate(prevMessages => 
              prevMessages?.map(msg => 
                msg.id === userMessage.id 
                  ? { ...msg, id: userResponse.id }
                  : msg
              ) || [],
              false
            );
          }
        }
      } catch (err) {
        console.error('Failed to parse expense:', err);
        // If expense parsing fails, still update user message with server response
        const userResponse = await chatService.sendMessage(messageText, 'user').catch(() => null);
        if (userResponse?.id) {
          mutate(prevMessages => 
            prevMessages?.map(msg => 
              msg.id === userMessage.id 
                ? { ...msg, id: userResponse.id }
                : msg
            ) || [],
            false
          );
        }
      } finally {
        setIsProcessingExpense(false);
      }
      
    } catch (err) {
      console.error('Failed to process message:', err);
      setNotification({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
      setIsProcessingExpense(false);
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
      await mutate(prevMessages => 
        prevMessages?.filter(msg => msg.id !== msgId) || [], 
        false
      );
      
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
        
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm p-4 flex items-center justify-between flex-shrink-0">
            <h1 className="text-xl font-semibold text-gray-800">Chat</h1>
            <div className="text-sm text-gray-500">
              {messages.length} {messages.length === 1 ? 'message' : 'messages'}
            </div>
          </header>
          
          {/* Messages Area or Loading State */}
          {isLoading ? (
            <div className="flex flex-col space-y-4 p-4 flex-1 overflow-y-auto">
              <SkeletonMessageGroup count={5} />
            </div>
          ) : error ? (
            <div className="text-center p-4 flex-1 flex items-center justify-center">
              <div>
                <p className="text-red-500 mb-4">Failed to load messages. Please try again.</p>
                <button 
                  onClick={mutate}
                  className="btn-primary"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <MessageContext.Provider value={{ parseExpenseData: () => {}, expenseDataCache, expenses }}>
              <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4 space-y-4" ref={messagesContainerRef}>
                <AnimatePresence initial={false} mode="popLayout">
                  {messages.map(message => {
                    const isExpenseMessage = (
                      (message.content.includes('Expense saved:') || 
                       message.content.includes('expenses saved successfully') ||
                       (message.expense_ids && message.expense_ids.length > 0)) &&
                      message.message_type === 'system'
                    );
                    
                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.message_type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                      >
                        {message.message_type === 'user' ? (
                          <div className="max-w-xs sm:max-w-sm md:max-w-md px-4 py-3 bg-white text-gray-800 rounded-3xl shadow-sm border border-gray-200">
                            <p>{message.content}</p>
                          </div>
                        ) : isExpenseMessage ? (
                          <div className="w-full max-w-sm">
                            <ExpenseMessage 
                              message={message}
                              onDelete={(expenseId, msgId) => {
                                // Optimistically remove from UI immediately
                                mutate(prevMessages => 
                                  prevMessages?.filter(msg => msg.id !== msgId) || [], 
                                  false
                                );
                                
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
                {isProcessingExpense && (
                  <div className="flex justify-start mb-4">
                    <LoadingAnimation size="small" />
                  </div>
                )}
                
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
              </div>
            </MessageContext.Provider>
          )}
          
          {/* Message Input - Fixed at bottom */}
          <div className="bg-white border-t border-gray-200 p-2 flex-shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
                disabled={isProcessingExpense}
              />
              <button
                type="submit"
                className="p-3 rounded-full bg-gradient-to-r from-[#7B3FE4] to-[#9C6EFF] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                disabled={!inputText.trim() || isProcessingExpense}
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
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out"
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
