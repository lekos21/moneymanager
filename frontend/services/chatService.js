import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Use the API_URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
console.log('Using API URL:', API_URL);

// Helper function to get the current user's token
const getAuthToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  // If user is available, get fresh token from Firebase
  if (user) {
    return await user.getIdToken();
  }
  
  // If auth.currentUser is null (during page refresh), try localStorage first
  const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (storedToken) {
    return storedToken;
  }
  
  // If no stored token, wait for auth state restoration (with timeout)
  return new Promise((resolve, reject) => {
    let timeoutId;
    
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (timeoutId) clearTimeout(timeoutId);
      unsubscribe();
      
      if (firebaseUser) {
        firebaseUser.getIdToken().then(resolve).catch(reject);
      } else {
        reject(new Error('User not authenticated'));
      }
    });
    
    // Timeout after 5 seconds
    timeoutId = setTimeout(() => {
      unsubscribe();
      reject(new Error('User not authenticated'));
    }, 5000);
  });
};

// Create an axios instance with authentication headers
const createAuthenticatedRequest = async () => {
  const token = await getAuthToken();
  
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

// Chat service functions
export const chatService = {
  // Get the auth token (exposed for direct API calls)
  getAuthToken,
  
  // Get messages with pagination support
  async getMessages(limit = 30, offsetId = null) {
    try {
      // First try without offset to see if that's causing the issue
      const request = await createAuthenticatedRequest();
      let url = `/api/chat/messages?limit=${limit}`;
      
      // Temporarily disable offset for troubleshooting
      // if (offsetId) {
      //   url += `&offset_id=${offsetId}`;
      // }
      
      console.log('Fetching messages from:', url);
      const response = await request.get(url);
      console.log('Messages fetched successfully');
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      console.error('Response details:', error.response?.data);
      
      // Return fallback data so the UI doesn't break
      console.log('Returning fallback messages');
      return [
        {
          id: 'fallback-1',
          content: 'Welcome to Money Manager! The message service is currently experiencing issues. Your previous messages will appear when service is restored.',
          user_id: 'system',
          timestamp: new Date().toISOString(),
          message_type: 'system'
        }
      ];
    }
  },
  
  // Send a new message
  async sendMessage(content, messageType = 'user', expenseData = null, expenseIds = null) {
    try {
      const request = await createAuthenticatedRequest();
      const response = await request.post('/api/chat/messages', { 
        content,
        message_type: messageType,
        expense_data: expenseData, // Include expense data if provided
        expense_ids: expenseIds // Include expense IDs if provided
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
  
  // Delete a specific message
  async deleteMessage(messageId) {
    try {
      const request = await createAuthenticatedRequest();
      await request.delete(`/api/chat/messages/${messageId}`);
      return true;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  },
  
  // Parse and save expense from a message
  async parseExpense(content) {
    try {
      const request = await createAuthenticatedRequest();
      console.log('Sending expense parser request:', { text: content, save_to_db: true });
      const response = await request.post('/api/agents/expense_parser/', {
        text: content,
        save_to_db: true // Automatically save to Firestore
      });
      console.log('Expense parser response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error parsing expense:', error);
      console.error('Error details:', error.response?.data);
      throw error;
    }
  },

  // Detect if text contains single or multiple expenses
  detectExpenseCount(text) {
    // Match monetary patterns: "10 euros", "$5", "€3.50", etc.
    const moneyRegex = /(?:€|£|\$|¥)?\d+(?:\.\d{2})?(?:\s*(?:euros?|dollars?|pounds?|yen|gbp|usd|eur|jpy))?/gi;
    const matches = text.match(moneyRegex);
    
    if (!matches || matches.length <= 1) {
      return 'single'; // 0 or 1 monetary amount = single expense parser
    } else {
      return 'multiple'; // 2+ monetary amounts = multi-expense parser
    }
  },

  // Parse multiple expenses from text
  async parseMultipleExpenses(content) {
    try {
      const request = await createAuthenticatedRequest();
      console.log('Sending multi-expense parser request:', { text: content, save_to_db: true });
      const response = await request.post('/api/agents/multi_expense_parser/', {
        text: content,
        save_to_db: true // Automatically save to Firestore
      });
      console.log('Multi-expense parser response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error parsing multiple expenses:', error);
      console.error('Error details:', error.response?.data);
      throw error;
    }
  },

  // Smart expense parsing that chooses single or multi-expense parser
  async parseExpensesSmart(content) {
    try {
      const expenseType = this.detectExpenseCount(content);
      console.log(`Detected expense type: ${expenseType} for text: "${content}"`);
      
      if (expenseType === 'multiple') {
        return await this.parseMultipleExpenses(content);
      } else {
        // For single expenses, return in the same format as multi-expense
        const singleResult = await this.parseExpense(content);
        return {
          expenses: singleResult ? [singleResult] : [],
          total_count: singleResult ? 1 : 0,
          processing_time: 0,
          original_text: content,
          error: ""
        };
      }
    } catch (error) {
      console.error('Error in smart expense parsing:', error);
      return {
        expenses: [],
        total_count: 0,
        processing_time: 0,
        original_text: content,
        error: error.message || 'Unknown error'
      };
    }
  }
};

export default chatService;
