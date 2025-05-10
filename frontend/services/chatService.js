import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Use the API_URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
console.log('Using API URL:', API_URL);

// Helper function to get the current user's token
const getAuthToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  return await user.getIdToken();
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
  async sendMessage(content, messageType = 'user') {
    try {
      const request = await createAuthenticatedRequest();
      const response = await request.post('/api/chat/messages', { 
        content,
        message_type: messageType 
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
  }
};

export default chatService;
