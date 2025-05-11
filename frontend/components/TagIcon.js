import React from 'react';
import DynamicIcon from './DynamicIcon';

/**
 * A presentational component that displays an icon with a given color.
 * It expects the icon name and color to be passed as props.
 */
const TagIcon = ({ iconName, iconColor, size = 24, className = '', fallbackIcon = 'tag', style: customStyle = {} }) => {
  // If iconName is not provided, use fallbackIcon
  const finalIconName = iconName || fallbackIcon;
  
  // Prepare style for DynamicIcon, primarily for color
  // Merge with any custom styles passed in.
  const iconStyle = {
    color: iconColor, // Apply the color from props
    ...customStyle,   // Allow overriding or adding other styles
  };

  return (
    <DynamicIcon 
      iconName={finalIconName}
      size={size}
      className={className}
      defaultIcon={fallbackIcon} // DynamicIcon also has a fallback logic
      style={iconStyle}
    />
  );
};

// Memoize the component to prevent unnecessary re-renders based on new props
export default React.memo(TagIcon, (prev, next) => (
  prev.iconName === next.iconName &&
  prev.iconColor === next.iconColor &&
  prev.size === next.size &&
  prev.className === next.className &&
  prev.fallbackIcon === next.fallbackIcon &&
  JSON.stringify(prev.style) === JSON.stringify(next.style) // Basic style comparison
));
