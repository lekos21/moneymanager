import { useMemo } from 'react';
import { useTags as useTagsContext } from '../contexts/TagsContext';

/**
 * Enhanced hook for tag resolution that builds on the TagsContext
 * Provides optimized tag lookup and resolution functions
 * 
 * @returns {Object} - Tag utility functions and state
 */
export function useTags() {
  // Get base tag functions from context
  const tagsContext = useTagsContext();
  
  // Return enhanced tag utilities
  return {
    ...tagsContext,
    
    /**
     * Resolve the best tag for an expense based on multiple fallback strategies
     * 
     * @param {Object} expense - The expense object to resolve tag for
     * @returns {Object|null} - The resolved tag object or null
     */
    resolveTag: (expense) => {
      if (!expense) return null;
      
      const { getTag } = tagsContext;
      
      // First priority: Use tag_id if available
      if (expense.tag_id) {
        return getTag(expense.tag_id);
      }
      
      // Second priority: Check the first area_tag
      if (expense.area_tags && expense.area_tags.length > 0) {
        // Try to get the tag by the first area tag name
        return getTag(expense.area_tags[0].toLowerCase());
      }
      
      // Third priority: Fall back to any provided tag object
      if (expense.tag) {
        return expense.tag;
      }
      
      return null;
    },
    
    /**
     * Get tag styling properties for consistent UI rendering
     * 
     * @param {Object|string} tagOrId - Tag object or tag ID
     * @returns {Object} - Styling properties for the tag
     */
    getTagStyling: (tagOrId) => {
      const { getTag } = tagsContext;
      
      // Resolve the tag if it's an ID
      const tag = typeof tagOrId === 'string' ? getTag(tagOrId) : tagOrId;
      
      if (!tag) {
        // Default styling if no tag is found
        return {
          iconName: 'tag',
          iconColor: '#6b7280',
          bgColor: '#f3f4f6',
          textColor: '#4b5563',
          borderColor: '#d1d5db'
        };
      }
      
      return {
        iconName: tag.icon || 'tag',
        iconColor: tag.colors?.hex || '#6b7280',
        bgColor: tag.colors?.bgHex || '#f3f4f6',
        textColor: tag.colors?.textHex || '#4b5563',
        borderColor: tag.colors?.hex || '#d1d5db'
      };
    }
  };
}

/**
 * Hook specifically for resolving tag data for an expense
 * Memoized to prevent unnecessary recalculations
 * 
 * @param {Object} expense - The expense to resolve tag for
 * @returns {Object} - Resolved tag data with styling properties
 */
export function useTagResolver(expense) {
  const { resolveTag, getTagStyling } = useTags();
  
  return useMemo(() => {
    const tag = resolveTag(expense);
    const styling = getTagStyling(tag);
    
    return {
      tag,
      ...styling
    };
  }, [
    expense?.tag_id,
    expense?.area_tags?.join(','),
    expense?.tag,
    resolveTag,
    getTagStyling
  ]);
}
