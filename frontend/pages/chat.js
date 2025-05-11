import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import chatService from '../services/chatService';
import expenseService from '../services/expenseService';
import tagService from '../services/tagService';
import LoadingAnimation from '../components/LoadingAnimation';
import DynamicIcon from '../components/DynamicIcon';
import ExpenseCard, { getCurrencySymbol } from '../components/ExpenseCard';
import { Send } from 'lucide-react';

// Chat component constants and helper functions

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const [tagCache, setTagCache] = useState({});
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Simple function to fetch the latest messages
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const data = await chatService.getMessages(30);
      setMessages(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      setError('Failed to load messages. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch messages when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  // Scroll to bottom when messages change or when initially loaded
  useEffect(() => {
    if (!isLoading && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages, isLoading]);
  
  // Additional effect to ensure immediate scroll to bottom on initial load
  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
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

  // Function to fetch tag details and cache them
  const getTagDetails = async (tagId, facet = 'area') => {
    // Check if we already have this tag in cache
    const cacheKey = `${facet}-${tagId}`;
    if (tagCache[cacheKey]) {
      return tagCache[cacheKey];
    }
    
    try {
      // Fetch tag details from API
      const tagData = await tagService.getTag(tagId, facet);
      
      // Update cache
      setTagCache(prev => ({
        ...prev,
        [cacheKey]: tagData
      }));
      
      return tagData;
    } catch (error) {
      console.error(`Error fetching tag ${tagId}:`, error);
      return null;
    }
  };

  // Cache for parsed expense data to avoid re-parsing on every render
  const [parsedExpenseCache, setParsedExpenseCache] = useState({});
  
  // Parse expense data directly from message content
  const parseExpenseData = (messageId, content) => {
    // Check if we've already parsed this message
    if (parsedExpenseCache[messageId]) {
      return parsedExpenseCache[messageId];
    }
    
    try {
      if (!content.includes('Expense saved:')) return null;
      
      // Try to extract the JSON part of the message if available
      const jsonStartIndex = content.indexOf('{');
      const jsonEndIndex = content.lastIndexOf('}');
      
      let expenseData = null;
      
      if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
        // Extract and parse JSON
        const jsonStr = content.substring(jsonStartIndex, jsonEndIndex + 1);
        expenseData = JSON.parse(jsonStr);
      } else {
        // Fallback to regex-based parsing if JSON not found
        const amountMatch = content.match(/Amount: ([\d.]+) ([A-Z]{3})/);
        const dateMatch = content.match(/Date: (.+?)(?=\n|$)/);
        const tagsMatch = content.match(/Tags: (.+?)(?=\n|$)/);
        
        if (amountMatch) {
          expenseData = {
            amount: parseFloat(amountMatch[1]),
            currency: amountMatch[2],
            timestamp: dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString(),
            tags: tagsMatch ? tagsMatch[1].split(', ') : []
          };
        }
      }
      
      if (expenseData) {
        // Cache the parsed data
        setParsedExpenseCache(prev => ({
          ...prev,
          [messageId]: expenseData
        }));
        
        return expenseData;
      }
      
      return null;
    } catch (error) {
      console.error('Error parsing expense data:', error);
      return null;
    }
  };

  // Format expense for display
  const formatExpenseMessage = (expense) => {
    const currencySymbol = getCurrencySymbol(expense.currency);
    return `💰 Expense saved: ${expense.short_text || 'Item'} - ${currencySymbol}${expense.amount}`;
  };

  // Send message and process expense
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = inputText.trim();
    if (!message) return;
    
    setInputText('');
    setIsProcessing(true);
    
    try {
      // First add the user message to the UI
      const userMessage = {
        id: `temp-${Date.now()}`,
        content: message,
        timestamp: new Date().toISOString(),
        message_type: 'user'
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Save the user message to the database
      const savedUserMessage = await chatService.sendMessage(message, 'user');
      
      // Replace the temporary message with the saved one
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? savedUserMessage : msg
      ));
      
      // Try to parse the message as an expense
      try {
        const parseResult = await chatService.parseExpense(message, true);
        
        if (parseResult && parseResult.id) {
          console.log('Expense parsed successfully:', parseResult);
          
          // Create a system message to confirm the expense
          const formattedMessage = formatExpenseMessage(parseResult);
          
          const systemMessage = await chatService.sendMessage(
            `${formattedMessage}\n\n${JSON.stringify(parseResult)}`, 
            'system'
          );
          
          // Add the system message to the UI
          setMessages(prev => [...prev, systemMessage]);
          
          // Clear any previous errors
          setError(null);
        } else {
          // If we got a response but no expense was parsed, just continue the conversation
          console.log('Message was not an expense, continuing conversation');
        }
      } catch (parseError) {
        console.error('Error parsing expense:', parseError);
        
        // Add an error message to the UI
        const errorMessage = await chatService.sendMessage(
          'Sorry, I couldn\'t process that as an expense. Please check the format and try again.', 
          'system'
        );
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!showConfirmDelete) return;
    
    const { id, type } = showConfirmDelete;
    console.log('Handling delete action:', { id, type });
    
    try {
      if (type === 'expense') {
        // Delete the expense from the database
        await expenseService.deleteExpense(id);
        
        // Update messages to reflect deletion
        setMessages(prev => prev.filter(msg => {
          // Check if this message contains the deleted expense
          if (msg.message_type === 'system' && msg.content) {
            const expenseData = parseExpenseData(msg.content);
            return !(expenseData && expenseData.id === id);
          }
          return true;
        }));
        
        // Show success notification
        setNotification({
          type: 'success',
          message: 'Expense deleted successfully.'
        });
      } else {
        // Delete the message from the chat history
        await chatService.deleteMessage(id);
        
        // Update messages state
        setMessages(prev => prev.filter(msg => msg.id !== id));
        
        // Show success notification
        setNotification({
          type: 'success',
          message: 'Message deleted successfully.'
        });
      }
    } catch (error) {
      console.error('Error deleting:', error);
      setNotification({
        type: 'error',
        message: `Failed to delete ${type}. Please try again.`
      });
    } finally {
      setShowConfirmDelete(null);
    }
  };


  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>Chat - MoneyManager</title>
        </Head>
        
        {/* Notification toast */}
        {notification && (
          <div 
            className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 max-w-xs transition-opacity duration-300 ${notification.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
          >
            {notification.message}
          </div>
        )}
        
        <div className="h-full flex flex-col"> 
          {error && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
              {error}
            </div>
          )}
          
          {/* Messages Area or Loading State */}
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <LoadingAnimation fullPage={true} text="Loading messages..." type="dots" />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesContainerRef}>
              {messages.map(message => {
                // Determine message type
                const isUser = message.message_type === 'user';
                const isExpenseMessage = !isUser && message.content && (
                  message.content.includes('Expense saved:') || 
                  message.content.includes('✅ Expense saved:')
                );
                
                // Parse expense data for system messages
                const expenseData = isExpenseMessage ? parseExpenseData(message.id, message.content) : null;
                
                return (
                  <div 
                    key={message.id} 
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {isUser ? (
                      <div 
                        className="w-auto max-w-[75%] px-4 py-3 bg-white text-gray-800 rounded-3xl shadow-sm border border-gray-100 relative"
                        onContextMenu={(e) => {
                          e.preventDefault();
                          setShowConfirmDelete({ id: message.id, type: 'message' });
                        }}
                      >
                        <p className="whitespace-pre-line">{message.content}</p>
                      </div>
                    ) : isExpenseMessage && expenseData ? (
                      <div className="w-3/4">
                        <ExpenseCard 
                          expense={expenseData} 
                          messageId={message.id}
                          onDelete={(expenseId, msgId) => {
                            // Update messages state directly to remove the deleted expense message
                            setMessages(prev => prev.filter(msg => msg.id !== msgId));
                            
                            // Show success notification
                            setNotification({
                              type: 'success',
                              message: 'Expense deleted successfully.'
                            });
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-3/4 px-4 py-3 bg-white text-gray-800 rounded-3xl shadow-sm border border-gray-100 whitespace-pre-line">
                        <p>{message.content}</p>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* Show loading animation when processing a message */}
              {isProcessing && (
                <div className="flex justify-start mb-4">
                  <LoadingAnimation size="small" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
          
          {/* Input - MODIFIED: No longer fixed, part of the flex column */}
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="What did you buy?"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isProcessing}
              />
              <button
                type="submit"
                className="w-10 h-10 flex items-center justify-center text-white rounded-full shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(45deg, #42A5F5, #cf8ef9, #fe9169)' }}
                disabled={isProcessing || !inputText.trim()}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center w-5 h-5">
                    <span className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></span>
                  </span>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          </div>
        </div>
        
        {/* Confirmation Dialog */}
        {showConfirmDelete && showConfirmDelete.type === 'message' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-5 max-w-sm w-full shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Delete Message?
              </h3>
              <p className="text-gray-600 mb-5">
                This will permanently delete this message from the chat.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmDelete(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ background: 'linear-gradient(45deg, #E74C3C, #cf8ef9, #fe9169)' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  );
}
