import React from 'react';

/**
 * Skeleton loading component for chat messages
 * Shows a pulsing animation while messages are loading
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.isUser - Whether this is a user message
 * @returns {JSX.Element} - Skeleton message component
 */
const SkeletonMessage = ({ 
  className = '', 
  isUser = false 
}) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 ${className}`}>
      <div 
        className={`animate-pulse rounded-3xl shadow-sm px-4 py-3 max-w-[75%] ${
          isUser 
            ? 'bg-gray-200 text-gray-800' 
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6"></div>
          {!isUser && <div className="h-3 bg-gray-300 rounded w-4/6"></div>}
        </div>
      </div>
    </div>
  );
};

/**
 * Component to display a series of skeleton messages
 * 
 * @param {Object} props - Component props
 * @param {number} props.count - Number of skeleton messages to display
 * @returns {JSX.Element} - Multiple skeleton message components
 */
export const SkeletonMessageGroup = ({ count = 5 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <SkeletonMessage 
          key={i} 
          isUser={i % 2 === 0} 
        />
      ))}
    </>
  );
};

export default SkeletonMessage;
