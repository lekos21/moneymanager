import React, { useState, useEffect } from 'react';
import tagService from '../services/tagService';
import DynamicIcon from './DynamicIcon';

/**
 * A component that fetches a tag's details and displays its icon
 * Uses a cache to avoid redundant API calls
 */
const TagIcon = ({ 
  tagId, 
  facet = 'area',
  size = 24,
  className = '',
  fallbackIcon = 'tag',
  iconCache = {},
  setIconCache = () => {}
}) => {
  const [tagData, setTagData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchTagData = async () => {
      if (!tagId) {
        setIsLoading(false);
        return;
      }
      
      // Check cache first
      const cacheKey = `${facet}-${tagId}`;
      if (iconCache[cacheKey]) {
        setTagData(iconCache[cacheKey]);
        setIsLoading(false);
        return;
      }
      
      try {
        // Fetch tag details
        const data = await tagService.getTag(tagId, facet);
        setTagData(data);
        
        // Update cache
        setIconCache(prev => ({
          ...prev,
          [cacheKey]: data
        }));
      } catch (error) {
        // Create a fallback tag object for missing tags
        // This prevents repeated API calls for tags that don't exist
        const fallbackTag = {
          tag_id: tagId,
          name: tagId.charAt(0).toUpperCase() + tagId.slice(1), // Capitalize first letter
          facet: facet,
          icon: fallbackIcon
        };
        
        setTagData(fallbackTag);
        
        // Cache the fallback to prevent repeated API calls
        setIconCache(prev => ({
          ...prev,
          [cacheKey]: fallbackTag
        }));
        
        console.error(`Error fetching tag ${tagId}:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTagData();
  // Only re-run if tagId or facet changes, or if the cache doesn't have this tag yet
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagId, facet]);
  
  if (isLoading) {
    return <div className={`animate-pulse ${className}`} style={{ width: size, height: size }}></div>;
  }
  
  // Use the tag name as a fallback if icon is not available
  const iconName = tagData?.icon || tagData?.name || fallbackIcon;
  
  // No need for debug logs in production
  
  // If we have tag data but the icon doesn't match our mapping, use the tag name
  return (
    <DynamicIcon 
      iconName={iconName}
      size={size}
      className={className}
      defaultIcon={fallbackIcon}
    />
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(TagIcon, (prevProps, nextProps) => {
  // Only re-render if these props change
  return (
    prevProps.tagId === nextProps.tagId &&
    prevProps.facet === nextProps.facet &&
    prevProps.size === nextProps.size &&
    prevProps.className === nextProps.className &&
    prevProps.fallbackIcon === nextProps.fallbackIcon
  );
});
