import React from 'react';

/**
 * Skeleton loading component for charts
 * Shows a pulsing animation while chart data is loading
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.height - Height of the skeleton chart
 * @returns {JSX.Element} - Skeleton chart component
 */
const SkeletonChart = ({ 
  className = '', 
  height = 'h-64'
}) => {
  return (
    <div className={`animate-pulse bg-white rounded-xl shadow-md overflow-hidden ${height} ${className}`}>
      <div className="h-10 bg-gray-100 px-4 py-2 flex items-center">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="ml-auto flex space-x-2">
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Chart area */}
        <div className="flex items-end h-40 space-x-2 mt-4">
          {[...Array(12)].map((_, i) => {
            // Generate random heights for bars
            const height = 15 + Math.floor(Math.random() * 70);
            return (
              <div 
                key={i} 
                className="bg-gray-200 rounded-t w-full"
                style={{ height: `${height}%` }}
              ></div>
            );
          })}
        </div>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 pt-2 border-t border-gray-100">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-2 bg-gray-200 rounded w-8"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonChart;
