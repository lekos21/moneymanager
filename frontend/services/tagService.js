import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Use the API_URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
console.log('Tag service using API URL:', API_URL);

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

// Tag service functions
export const tagService = {
  // Get the auth token (exposed for direct API calls)
  getAuthToken,
  
  // Get a specific tag by ID
  async getTag(tagId, facet = 'area') {
    try {
      const request = await createAuthenticatedRequest();
      const response = await request.get(`/api/tags/${facet}/${tagId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${facet} tag:`, error);
      throw error;
    }
  },
  
  // Get multiple tags by ID
  async getTags(tagIds, facet = 'area') {
    try {
      const request = await createAuthenticatedRequest();
      // Use query parameter to send multiple IDs
      const queryString = tagIds.map(id => `ids=${id}`).join('&');
      const response = await request.get(`/api/tags/${facet}?${queryString}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${facet} tags:`, error);
      throw error;
    }
  },
  
  // Get all tags for a specific facet
  async getAllTags(facet = 'area') {
    try {
      const request = await createAuthenticatedRequest();
      const response = await request.get(`/api/tags/${facet}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching all ${facet} tags:`, error);
      throw error;
    }
  }
};

export default tagService;
