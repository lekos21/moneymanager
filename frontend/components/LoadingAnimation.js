import React from 'react';

/**
 * Unified loading animation component for the application
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the animation: 'small', 'medium', or 'large'
 * @param {string} props.containerClass - Additional classes for the container
 * @param {string} props.text - Optional text to display below the animation
 * @param {boolean} props.fullPage - Whether to center the animation in the full page/container
 * @param {string} props.type - Animation type: 'dots' or 'spinner'
 */
export default function LoadingAnimation({ 
  size = 'medium', 
  containerClass = '', 
  text = '',
  fullPage = false,
  type = 'dots'
}) {
  // Size configurations
  const sizeConfig = {
    small: {
      container: 'h-6 py-1.5 px-2.5 rounded-2xl',
      dot: 'w-1.5 h-1.5',
      icon: 'h-8 w-8',
      text: 'text-sm'
    },
    medium: {
      container: 'h-8 py-2 px-3 rounded-3xl',
      dot: 'w-2 h-2',
      icon: 'h-12 w-12',
      text: 'text-base'
    },
    large: {
      container: 'h-10 py-2.5 px-4 rounded-3xl',
      dot: 'w-2.5 h-2.5',
      icon: 'h-16 w-16',
      text: 'text-lg'
    }
  };

  // Get the correct size configuration
  const config = sizeConfig[size] || sizeConfig.medium;
  
  // Container classes
  const containerClasses = fullPage 
    ? `flex flex-col justify-center items-center ${fullPage === true ? 'h-full w-full absolute inset-0' : fullPage}`
    : '';

  // Render the appropriate animation type
  const renderAnimation = () => {
    if (type === 'spinner') {
      return (
        <div className={`inline-block p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600`}>
          <img
            src="/PiggyLogo.png"
            alt="Loading"
            className={`${config.icon} animate-spin object-contain`}
          />
        </div>
      );
    }
    
    // Default: dots animation
    return (
      <div 
        className={`flex justify-center items-center space-x-2 ${config.container} shadow-md relative ${containerClass}`}
        style={{
          background: 'linear-gradient(45deg, #42A5F5, #cf8ef9, #fe9169)'
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`${config.dot} rounded-full bg-white`}
            style={{ 
              opacity: 0.8,
              transform: 'translateZ(0)', // Hardware acceleration
              animation: `wave 0.8s ease-in-out ${i * 0.1}s infinite alternate`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={containerClasses}>
      {renderAnimation()}
      
      {text && (
        <p className={`mt-4 ${config.text} font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}>
          {text}
        </p>
      )}
      
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateY(0px);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-5px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
