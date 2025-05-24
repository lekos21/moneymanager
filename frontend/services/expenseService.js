import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Use the API_URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
console.log('Expense service using API URL:', API_URL);

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

// Expense service functions
export const expenseService = {
  // Get the auth token (exposed for direct API calls)
  getAuthToken,
  
  // Get all expenses for the current user
  async getExpenses() {
    try {
      const request = await createAuthenticatedRequest();
      console.log('Sending GET request to /api/expenses/');
      const response = await request.get('/api/expenses/');
      console.log('Received response from /api/expenses/:', response.status);
      
      // Ensure we have a valid data array
      const expenses = Array.isArray(response.data) ? response.data : [];
      
      // Fix any potential data issues
      const validExpenses = expenses.map(expense => ({
        ...expense,
        // Ensure amount is a number
        amount: typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount || 0),
        // Ensure we have arrays for tags
        area_tags: Array.isArray(expense.area_tags) ? expense.area_tags : [],
        context_tags: Array.isArray(expense.context_tags) ? expense.context_tags : [],
        // Ensure timestamp exists
        timestamp: expense.timestamp || new Date().toISOString()
      }));
      
      return validExpenses;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      // Return empty array instead of throwing to prevent UI from crashing
      return [];
    }
  },
  
  // Get a specific expense by ID
  async getExpense(expenseId) {
    try {
      const request = await createAuthenticatedRequest();
      const response = await request.get(`/api/expenses/${expenseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching expense:', error);
      throw error;
    }
  },
  
  // Create a new expense
  async createExpense(expenseData) {
    try {
      const request = await createAuthenticatedRequest();
      const response = await request.post('/api/expenses/', expenseData);
      return response.data;
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  },
  
  // Update an existing expense
  async updateExpense(expenseId, expenseData) {
    try {
      const request = await createAuthenticatedRequest();
      const response = await request.patch(`/api/expenses/${expenseId}`, expenseData);
      return response.data;
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  },
  
  // Delete an expense
  async deleteExpense(expenseId) {
    try {
      console.log(`Attempting to delete expense with ID: ${expenseId}`);
      if (!expenseId) {
        throw new Error('No expense ID provided for deletion');
      }
      
      const request = await createAuthenticatedRequest();
      const deleteUrl = `${API_URL}/api/expenses/${expenseId}`;
      console.log(`Sending DELETE request to: ${deleteUrl}`);
      
      const response = await request.delete(deleteUrl);
      console.log('Delete response:', response.status, response.statusText);
      return true;
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  }
};

export default expenseService;
