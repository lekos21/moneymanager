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
        // Parse the simple format: "✅ Expense saved: shoes\n💰 Amount: 5 USD\n🏷️ Area: clothes\nID: 25i4oMs2EeUUmdJOVLZt"
        expenseData = {};
        
        // Get short text (item name)
        const shortTextMatch = content.match(/Expense saved: ([^\n]+)/);
        expenseData.short_text = shortTextMatch ? shortTextMatch[1].trim() : "Expense";
        
        // Get amount and currency
        const amountMatch = content.match(/Amount: ([\d.]+) ([A-Z]+)/);
        if (amountMatch) {
          expenseData.amount = parseFloat(amountMatch[1]);
          expenseData.currency = amountMatch[2];
        } else {
          expenseData.amount = 0;
          expenseData.currency = "USD";
        }
        
        // Get area tags
        const areaTagMatch = content.match(/Area: ([^\n]+)/);
        expenseData.area_tags = areaTagMatch ? [areaTagMatch[1].trim()] : [];
        
        // Get context tags if available
        const contextTagMatch = content.match(/Context: ([^\n]+)/);
        expenseData.context_tags = contextTagMatch ? [contextTagMatch[1].trim()] : [];
        
        // Get ID if available
        const idMatch = content.match(/ID: ([^\n]+)/);
        expenseData.id = idMatch ? idMatch[1].trim() : null;
      }
      
      // Cache the result to avoid re-parsing
      if (expenseData) {
        setParsedExpenseCache(prev => ({
          ...prev,
          [messageId]: expenseData
        }));
      }
      
      return expenseData;
    } catch (error) {
      // Silently fail instead of spamming console
      return null;
    }
  };

  // Format expense for display
  const formatExpenseMessage = (expense) => {
    if (!expense) return '';
    const amount = parseFloat(expense.amount).toFixed(2);
    const currency = expense.currency;
    const shortText = expense.short_text || "Expense";
    
    return `${shortText}: ${currency}${amount}`;
  };

  // Send message and process expense
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const content = inputText.trim();
    if (!content || isProcessing) return;
    
    setInputText('');
    setIsProcessing(true);
    
    try {
      // Add user message to the chat
      const userMessage = await chatService.sendMessage(content);
      setMessages(prev => [...prev, userMessage]);
      
      // Parse as expense if it looks like one - improved detection
      const hasNumber = /\d+/.test(content);

      if (hasNumber) {
        try {
          console.log('Attempting to parse expense:', content);
          // Process message through expense parser
          const expenseResult = await chatService.parseExpense(content);
          console.log('Parsed expense result:', expenseResult);
          
          // Check if we got a valid expense (amount greater than 0)
          if (expenseResult && parseFloat(expenseResult.amount) > 0) {
            // Create a system message with expense details
            const formattedExpense = formatExpenseMessage(expenseResult);
            const expenseMessage = `Expense saved: ${formattedExpense}\n\n${JSON.stringify(expenseResult, null, 2)}`;
            
            // Add the system message
            const systemMessage = await chatService.sendMessage(expenseMessage, 'system');
            setMessages(prev => [...prev, systemMessage]);
            
            // Show notification
            setNotification({
              type: 'success',
              message: `Expense of ${expenseResult.currency}${parseFloat(expenseResult.amount).toFixed(2)} saved!`
            });
          } else {
            console.warn('Received invalid expense with zero amount:', expenseResult);
            
            // Try again with a simplified format if the original message was complex
            if (content.length > 15 && !content.includes('for')) {
              // Try to extract just the amount and basic category
              const amountMatch = content.match(/(\d+[.,]?\d*)\s*[$€£]|[$€£]\s*(\d+[.,]?\d*)/i);
              const categoryMatch = content.match(/(?:for|on)\s+([\w-]+)/i);
              
              if (amountMatch || categoryMatch) {
                const amount = amountMatch ? (amountMatch[1] || amountMatch[2]) : '';
                const category = categoryMatch ? categoryMatch[1] : '';
                const simplifiedQuery = amount && category ? `${amount}$ for ${category}` : null;
                
                if (simplifiedQuery) {
                  console.log('Trying simplified format:', simplifiedQuery);
                  try {
                    // Try again with simplified format
                    const retryResult = await chatService.parseExpense(simplifiedQuery);
                    
                    if (retryResult && parseFloat(retryResult.amount) > 0) {
                      // Success with simplified format
                      const formattedExpense = formatExpenseMessage(retryResult);
                      const expenseMessage = `Expense saved: ${formattedExpense}\n\n${JSON.stringify(retryResult, null, 2)}`;
                      
                      // Add the system message
                      const systemMessage = await chatService.sendMessage(expenseMessage, 'system');
                      setMessages(prev => [...prev, systemMessage]);
                      
                      // Show notification
                      setNotification({
                        type: 'success',
                        message: `Expense of ${retryResult.currency}${parseFloat(retryResult.amount).toFixed(2)} saved!`
                      });
                      return; // Exit early since we succeeded
                    }
                  } catch (retryError) {
                    console.error('Error with simplified format:', retryError);
                  }
                }
              }
            }
            
            // Show error for invalid expense
            const errorMessage = await chatService.sendMessage(
              'Sorry, I couldn\'t properly parse that expense. Please try a simpler format like "12$ for food".', 
              'system'
            );
            setMessages(prev => [...prev, errorMessage]);
          }
        } catch (error) {
          console.error('Error processing expense:', error);
          // Only show error if it's likely an expense but failed to parse
          const errorMessage = await chatService.sendMessage(
            'Sorry, I couldn\'t process that as an expense. Please check the format and try again.', 
            'system'
          );
          setMessages(prev => [...prev, errorMessage]);
        }
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
        
        <div className="h-screen flex flex-col bg-gray-50 relative">
          {/* Messages container with flex-grow and padding for input box */}
          {/* Adding pb-20 to ensure space for the input box at the bottom */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 p-4 pb-20 overflow-y-auto flex flex-col justify-end"
            style={{ height: 'calc(100vh - 80px)', minHeight: 'calc(100vh - 80px)' }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <LoadingAnimation />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-4">{error}</div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full text-gray-500">
                <DynamicIcon name="MessageSquare" className="w-12 h-12 mb-2 opacity-30" />
                <p>No messages yet. Start a conversation!</p>
              </div>
            ) : (
              <div className="space-y-4 max-w-lg mx-auto w-full mt-auto">
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
                          className="w-3/4 px-4 py-3 bg-white text-gray-800 rounded-3xl shadow-sm border border-gray-100 relative"
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
                    <LoadingAnimation />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
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
          
          {/* Input - Fixed position above the navbar */}
          <div className="fixed bottom-[70px] left-0 right-0 p-4 bg-gray-50 border-t border-gray-100 z-10">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="What did you buy? Give me some details."
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
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing
                  </span>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
