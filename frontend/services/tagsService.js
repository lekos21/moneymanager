/**
 * Tags Service
 * Handles fetching, caching, and managing tag data
 */

// Base API URL - adjust as needed for your environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Cache the tags to avoid unnecessary API calls
let tagsCache = null;
let lastFetchTime = null;
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Fetch all tags from the API
 * @returns {Promise<Array>} Array of tag objects
 */
export const fetchAllTags = async () => {
  // Check if we have a recent cache
  const now = Date.now();
  if (tagsCache && lastFetchTime && (now - lastFetchTime < CACHE_EXPIRY_TIME)) {
    console.log('Using cached tags data');
    return tagsCache;
  }
  
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    console.log('[tagsService] Token from localStorage for /api/tags/ fetch:', token); // Added for debugging
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Updated endpoint to include trailing slash as per screenshot
    const response = await fetch(`${API_URL}/api/tags/`, { headers });
    
    if (response.status === 401) {
      // Unauthorized: Potentially clear token and redirect or let context handle error
      console.error('Unauthorized fetching tags. Token might be invalid or expired.');
      if (typeof window !== 'undefined') {
        // Optional: localStorage.removeItem('token');
        // Optional: window.location.href = '/login'; // Or your login page
      }
      throw new Error('Authentication failed'); // Let TagsContext handle this error message
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.status} ${response.statusText}`);
    }
    
    const tags = await response.json();
    
    // Update the cache
    tagsCache = tags;
    lastFetchTime = now;
    console.log('Fetched and cached new tags data:', tags);
    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error.message);
    // If we have a cache, return it even if expired rather than failing completely on a network/auth error
    if (tagsCache) {
      console.warn('Returning (potentially stale) cached tags due to fetch error.');
      return tagsCache;
    }
    throw error; // Re-throw for TagsContext to catch and set its error state
  }
};

/**
 * Get a tag by its ID
 * @param {string} tagId - The tag ID to find
 * @returns {Promise<Object|null>} The tag object or null if not found
 */
export const getTagById = async (tagId) => {
  if (!tagId) return null;
  
  try {
    const tags = await fetchAllTags();
    return tags.find(tag => tag.tag_id === tagId) || null;
  } catch (error) {
    console.error(`Error fetching tag with ID ${tagId}:`, error);
    return null;
  }
};

/**
 * Get multiple tags by their IDs
 * @param {Array<string>} tagIds - Array of tag IDs to find
 * @returns {Promise<Array>} Array of found tag objects
 */
export const getTagsByIds = async (tagIds) => {
  if (!tagIds || !Array.isArray(tagIds) || tagIds.length === 0) {
    return [];
  }
  
  try {
    const tags = await fetchAllTags(); // This will now use the authenticated fetch
    return tags.filter(tag => tagIds.includes(tag.tag_id));
  } catch (error) {
    console.error('Error fetching tags by IDs (likely due to initial fetchAllTags failure):', error.message);
    return []; // Return empty on error to prevent breaking components expecting an array
  }
};

/**
 * Get tags grouped by facet
 * @returns {Promise<Object>} Object with facets as keys and arrays of tags as values
 */
export const getTagsByFacet = async () => {
  try {
    const tags = await fetchAllTags();
    return tags.reduce((grouped, tag) => {
      if (!tag.facet) return grouped;
      
      if (!grouped[tag.facet]) {
        grouped[tag.facet] = [];
      }
      
      grouped[tag.facet].push(tag);
      return grouped;
    }, {});
  } catch (error) {
    console.error('Error grouping tags by facet:', error);
    return {};
  }
};

/**
 * Force refresh the tags cache
 * @returns {Promise<Array>} Fresh array of tag objects
 */
export const refreshTags = async () => {
  console.log('Force refreshing tags cache...');
  tagsCache = null;
  lastFetchTime = null;
  return fetchAllTags(); // This will now use the authenticated fetch
};

/**
 * Clear the tags cache
 */
export const clearTagsCache = () => {
  console.log('Clearing tags cache.');
  tagsCache = null;
  lastFetchTime = null;
};
