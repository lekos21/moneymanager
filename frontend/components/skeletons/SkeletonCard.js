import React from 'react';

/**
 * Skeleton loading component for cards
 * Shows a pulsing animation while content is loading
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.height - Height of the skeleton card
 * @param {boolean} props.hasHeader - Whether to show a header section
 * @param {boolean} props.hasFooter - Whether to show a footer section
 * @returns {JSX.Element} - Skeleton card component
 */
const SkeletonCard = ({ 
  className = '', 
  height = 'h-24',
  hasHeader = true,
  hasFooter = false
}) => {
  return (
    <div className={`animate-pulse bg-white rounded-xl shadow-md overflow-hidden ${height} ${className}`}>
      {hasHeader && (
        <div className="h-10 bg-gray-100 px-3 py-2 flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-3/5 mb-2"></div>
            <div className="h-2 bg-gray-200 rounded w-2/5"></div>
          </div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
      )}
      
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        </div>
        
        {hasFooter && (
          <div className="flex mt-3 pt-2 border-t border-gray-100">
            <div className="h-5 bg-gray-200 rounded w-16 mr-2"></div>
            <div className="h-5 bg-gray-200 rounded w-16"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkeletonCard;
