import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Use the API_URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
console.log('User service using API URL:', API_URL);

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

const userService = {
  /**
   * Get the current user's data
   * @returns {Promise<Object>} User data including budget if set
   */
  async getUserData() {
    try {
      const request = await createAuthenticatedRequest();
      const response = await request.get('/api/users/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },
  
  /**
   * Update the current user's data
   * @param {Object} userData - User data to update
   * @param {number} [userData.budget] - Monthly budget amount
   * @returns {Promise<Object>} Updated user data
   */
  async updateUserData(userData) {
    try {
      const request = await createAuthenticatedRequest();
      const response = await request.patch('/api/users/me', userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }
};

export default userService;
