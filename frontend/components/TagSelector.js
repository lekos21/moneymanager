import React, { useState, useEffect, useRef } from 'react';
import { useTags } from '../contexts/TagsContext';
import TagIcon from './TagIcon';

/**
 * Tag Selector Component
 * Allows selection of a tag from the available tags
 */
export default function TagSelector({ 
  selectedTagId = null, 
  onTagSelect, 
  className = '',
  showIconOnly = false,
  disabled = false 
}) {
  const { tags, loading, error, getTag, tagsByFacet } = useTags();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const wrapperRef = useRef(null); // Ref for the wrapper element
  
  // Update selected tag when props change or tags load
  useEffect(() => {
    if (selectedTagId && tags.length > 0) {
      const tag = getTag(selectedTagId);
      setSelectedTag(tag);
    } else {
      setSelectedTag(null);
    }
  }, [selectedTagId, tags, getTag]);
  
  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setIsOpen(false);
    if (onTagSelect) {
      onTagSelect(tag); // Pass the full tag object
    }
  };
  
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array, runs once
  
  if (loading) {
    return (
      <div className={`tag-selector inline-flex items-center ${className}`}>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-8 w-24"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`tag-selector inline-flex items-center text-red-500 ${className}`}>
        Error: {error}
      </div>
    );
  }
  
  const facetOrder = Object.keys(tagsByFacet);

  return (
    <div className={`tag-selector relative ${className}`} ref={wrapperRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`flex items-center gap-2 rounded px-3 py-1.5 text-sm transition border
          ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600' 
                     : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500'}
          ${selectedTag ? 
            `border-transparent` : // Let background color define the look mostly
            'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}
        `}
        style={selectedTag ? {
          backgroundColor: selectedTag.colors?.bgHex || '#f9fafb',
          color: selectedTag.colors?.textHex || '#4b5563',
          // borderColor: selectedTag.colors?.hex || '#d1d5db' // Optional: border color same as icon
        } : {}}
      >
        {selectedTag ? (
          <>
            <TagIcon
              iconName={selectedTag.icon || 'tag'}
              iconColor={selectedTag.colors?.hex || '#d1d5db'}
              className="h-4 w-4"
            />
            {!showIconOnly && <span className="font-medium">{selectedTag.name}</span>}
          </>
        ) : (
          <>
            <TagIcon
              iconName="tag"
              iconColor="#9ca3af"
              className="h-4 w-4"
            />
            {!showIconOnly && <span className="text-gray-500 dark:text-gray-400">Select Tag</span>}
          </>
        )}
        <svg className={`ml-1 h-4 w-4 text-current transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-20 mt-1 max-h-72 w-full min-w-[200px] overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            Select a tag
          </div>
          
          {/* No tag option */}
          <button
            type="button"
            className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300"
            onClick={() => handleTagSelect(null)}
          >
            <TagIcon
              iconName="ban"
              iconColor="#9ca3af"
              className="h-4 w-4"
            />
            <span>No Tag</span>
          </button>
          
          {/* Tags grouped by facet */}
          {facetOrder.length > 0 ? facetOrder.map(facet => (
            <div key={facet}>
              <div className="px-3 pt-2 pb-1 text-xs font-bold uppercase text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700 mt-1">
                {facet}
              </div>
              {(tagsByFacet[facet] || [])
                .sort((a, b) => a.name.localeCompare(b.name)) // Sort tags alphabetically within each facet
                .map(tag => (
                  <button
                    key={tag.tag_id}
                    type="button"
                    className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2.5 text-sm 
                                ${selectedTagId === tag.tag_id ? 'font-semibold' : ''}`}
                    onClick={() => handleTagSelect(tag)}
                    style={selectedTagId === tag.tag_id ? {
                      backgroundColor: tag.colors?.bgHex || '#e0e0e0',
                      color: tag.colors?.textHex || '#000000'
                    } : {color: tag.colors?.textHex || '#000000'}}
                  >
                    <TagIcon
                      iconName={tag.icon || 'tag'}
                      iconColor={tag.colors?.hex || '#d1d5db'}
                      className="h-4 w-4"
                    />
                    <span>{tag.name}</span>
                     {selectedTagId === tag.tag_id && (
                        <svg className="ml-auto h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                  </button>
                ))}
            </div>
          )) : (
            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
              No tags available.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
