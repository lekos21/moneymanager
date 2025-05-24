import useSWR from 'swr';
import userService from '../services/userService';

/**
 * Custom hook for fetching and managing user data
 * Uses SWR for caching, revalidation, and deduplication
 * 
 * @param {Object} options - SWR configuration options
 * @returns {Object} - User data, loading state, error state, and mutate function
 */
export function useUserData(options = {}) {
  const {
    shouldFetch = true,
    revalidateOnFocus = false,
    dedupingInterval = 60000, // 1 minute
    ...swrOptions
  } = options;

  const { data, error, mutate, isValidating } = useSWR(
    shouldFetch ? '/api/users/me' : null,
    async () => {
      try {
        return await userService.getUserData();
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    },
    {
      revalidateOnFocus,
      dedupingInterval,
      ...swrOptions
    }
  );

  return {
    userData: data || {},
    isLoading: !error && !data,
    isValidating,
    isError: error,
    mutate
  };
}

/**
 * Custom hook for accessing user budget
 * Depends on useUserData hook
 * 
 * @returns {Object} - Budget value and loading state
 */
export function useBudget() {
  const { userData, isLoading, isError } = useUserData();
  
  return {
    budget: userData?.budget || null,
    isLoading,
    isError
  };
}
