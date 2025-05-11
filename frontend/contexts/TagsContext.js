import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchAllTags, getTagById, getTagsByIds, refreshTags } from '../services/tagsService';
import { useAuth } from './AuthContext';

// Create the context
const TagsContext = createContext();

/**
 * Tags Provider Component
 * Provides tag data and operations to all child components
 */
export function TagsProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tagsByFacet, setTagsByFacet] = useState({});
  const [tagsMap, setTagsMap] = useState({});

  // Load tags from API
  const loadTags = useCallback(async () => {
    console.log('[TagsContext] Attempting to load tags...');
    setLoading(true);
    setError(null);
    
    try {
      const tagsData = await fetchAllTags();
      setTags(tagsData || []);
      setLoading(false);
      console.log('[TagsContext] Tags loaded successfully.');
    } catch (err) {
      console.error('[TagsContext] Error loading tags:', err);
      setError(err.message || 'Failed to load tags. Please try again later.');
      setTags([]);
      setLoading(false);
    }
  }, []);

  // Load tags when user is authenticated and available
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        console.log('[TagsContext] User authenticated, proceeding to load tags.');
        loadTags();
      } else {
        console.log('[TagsContext] User not authenticated or logged out, clearing tags.');
        setTags([]);
        setTagsMap({});
        setTagsByFacet({});
        setLoading(false);
        setError(null);
      }
    }
  }, [user, authLoading, loadTags]);

  // Process tags data after loading
  useEffect(() => {
    if (tags.length > 0) {
      console.log('[TagsContext] Processing loaded tags into map and facets.');
      // Create a map for quick lookup by ID
      const tagsById = tags.reduce((acc, tag) => {
        acc[tag.tag_id] = tag;
        return acc;
      }, {});
      
      // Group tags by facet
      const byFacet = tags.reduce((grouped, tag) => {
        if (!tag.facet) return grouped;
        
        if (!grouped[tag.facet]) {
          grouped[tag.facet] = [];
        }
        
        grouped[tag.facet].push(tag);
        return grouped;
      }, {});
      
      setTagsMap(tagsById);
      setTagsByFacet(byFacet);
    } else {
      setTagsMap({});
      setTagsByFacet({});
    }
  }, [tags]);

  // Force refresh tags
  const refreshAllTags = useCallback(async () => {
    if (!user) {
      console.warn('[TagsContext] refreshAllTags called but user is not authenticated. Aborting.');
      setError('User not authenticated. Cannot refresh tags.');
      return tags;
    }
    console.log('[TagsContext] Force refreshing tags...');
    setLoading(true);
    setError(null);
    
    try {
      const freshTags = await refreshTags();
      setTags(freshTags || []);
      setLoading(false);
      console.log('[TagsContext] Tags refreshed successfully.');
      return freshTags || [];
    } catch (err) {
      console.error('[TagsContext] Error refreshing tags:', err);
      setError(err.message || 'Failed to refresh tags. Please try again later.');
      setLoading(false);
      return tags;
    }
  }, [user, tags]);

  // Get a tag by ID using the cached map
  const getTag = useCallback((tagId) => {
    if (!tagId) return null;
    return tagsMap[tagId] || null;
  }, [tagsMap]);

  // Get multiple tags by IDs using the cached map
  const getMultipleTags = useCallback((tagIds) => {
    if (!tagIds || !Array.isArray(tagIds) || tagIds.length === 0) {
      return [];
    }
    
    return tagIds
      .map(id => tagsMap[id])
      .filter(tag => tag !== undefined && tag !== null);
  }, [tagsMap]);

  // Get all tags in a specific facet
  const getTagsInFacet = useCallback((facet) => {
    if (!facet) return [];
    return tagsByFacet[facet] || [];
  }, [tagsByFacet]);

  // Value to be provided to consumers
  const value = {
    tags,
    loading,
    error,
    tagsByFacet,
    getTag,
    getMultipleTags,
    getTagsInFacet,
    refreshTags: refreshAllTags
  };

  return (
    <TagsContext.Provider value={value}>
      {children}
    </TagsContext.Provider>
  );
}

// Custom hook for consuming the tags context
export function useTags() {
  const context = useContext(TagsContext);
  
  if (context === undefined) {
    throw new Error('useTags must be used within a TagsProvider');
  }
  
  return context;
}

export default TagsContext;
