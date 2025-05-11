import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Import all free solid icons
import { library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the Font Awesome CSS

// Add all free solid icons to the library, so they can be used by name
library.add(fas);

// Default icon to use if the specified one is not found or not provided
const DEFAULT_ICON = 'tag';

// Helper function to convert PascalCase/camelCase to kebab-case
const toKebabCase = (str) => {
  if (!str) return '';
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // Add hyphen before capital letters preceded by a lowercase/number
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // Add hyphen between consecutive capitals followed by lowercase (e.g. SVGIcon -> SVG-Icon)
    .toLowerCase();
};

/**
 * A component that renders a Font Awesome icon based on an icon name string.
 * Falls back to a default Font Awesome icon if the specified icon name is not found or invalid.
 */
const DynamicIcon = ({ 
  iconName,
  size, // FontAwesome takes string sizes like 'lg', '2x', or direct style for pixel size
  className = '',
  defaultIcon = DEFAULT_ICON,
  style = {}
}) => {
  console.log('[DynamicIcon] Received iconName:', iconName);
  // Determine the icon to render
  // The backend should provide a valid Font Awesome icon name (e.g., 'shopping-cart')
  // The fas import and library.add(fas) make all free solid icons available by their string name.
  const iconToRender = iconName || defaultIcon;
  console.log('[DynamicIcon] iconToRender (original):', iconToRender);

  const kebabIconName = toKebabCase(iconToRender);
  console.log('[DynamicIcon] iconToRender (kebab-case):', kebabIconName);

  // Prepare style for FontAwesomeIcon. If size is a number, convert to px for fontSize.
  const iconStyle = { ...style };
  if (typeof size === 'number') {
    iconStyle.fontSize = `${size}px`;
  } else if (typeof size === 'string') {
    // If size is a FontAwesome size string (e.g., 'lg', '2x'), it will be passed directly.
    // Otherwise, it might be a CSS unit string (e.g., '1.5em') which can also be put in style.
    // For simplicity, we assume if it's a string not matching FA keywords, it's for CSS.
    const faSizes = ['xs', 'sm', 'lg', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'];
    if (!faSizes.includes(size.toLowerCase())) {
      iconStyle.fontSize = size;
    }
  }

  try {
    return (
      <FontAwesomeIcon 
        icon={kebabIconName} 
        size={typeof size === 'string' && ['xs', 'sm', 'lg', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].includes(size.toLowerCase()) ? size : undefined}
        className={className}
        style={iconStyle}
        aria-label={iconName || defaultIcon}
      />
    );
  } catch (error) {
    console.error(`[DynamicIcon] Error rendering icon "${kebabIconName}" (original: "${iconToRender}"):`, error);
    console.warn(`[DynamicIcon] FontAwesome icon "${kebabIconName}" not found or error during render. Falling back to "${toKebabCase(DEFAULT_ICON)}".`);
    // Fallback if the iconName is invalid for FontAwesome after all checks
    // This might happen if the backend sends an icon name not in fas
    // console.warn(`FontAwesome icon "${iconToRender}" not found. Falling back to "${DEFAULT_ICON}". Error: ${error.message}`);
    try {
      return (
        <FontAwesomeIcon 
          icon={toKebabCase(DEFAULT_ICON)} 
          size={typeof size === 'string' && ['xs', 'sm', 'lg', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].includes(size.toLowerCase()) ? size : undefined}
          className={className}
          style={iconStyle}
          aria-label={defaultIcon}
        />
      );
    } catch (fallbackError) {
      console.error(`[DynamicIcon] Error rendering DEFAULT_ICON "${toKebabCase(DEFAULT_ICON)}":`, fallbackError);
      return <span aria-label={defaultIcon}>⚠️</span>; // Ultimate fallback
    }
  }
};

export default DynamicIcon;
