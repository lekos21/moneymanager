import React, { useMemo } from 'react';

// In-memory cache for icon name lookups to avoid redundant processing
const iconLookupCache = new Map();

// Mapping of common category names to emoji icons
const iconMap = {
  // Shopping & Money
  'shopping': '🛍️',
  'groceries': '🛒',
  'money': '💰',
  'wallet': '👛',
  'creditcard': '💳',
  'receipt': '🧾',
  'creditcard': '💳',
  'shoppingbag': '🛍️',
  'shoppingcart': '🛒',
  
  // Food & Drink
  'food': '🍽️',
  'restaurant': '🍴',
  'dinner': '🍽️',
  'lunch': '🥪',
  'breakfast': '🥞',
  'coffee': '☕',
  'drink': '🥤',
  'pizza': '🍕',
  'beer': '🍺',
  'wine': '🍷',
  'utensils': '🍴',
  
  // Transportation
  'car': '🚗',
  'bus': '🚌',
  'train': '🚆',
  'plane': '✈️',
  'taxi': '🚕',
  'transport': '🚇',
  'travel': '🧳',
  
  // Home & Utilities
  'home': '🏠',
  'house': '🏡',
  'utilities': '💡',
  'electricity': '⚡',
  'water': '💧',
  'internet': '🌐',
  'phone': '📱',
  
  // Health & Personal
  'health': '💊',
  'medical': '🏥',
  'fitness': '🏋️',
  'personal': '👤',
  'beauty': '💄',
  'clothes': '👕',
  'shoes': '👟',
  
  // Entertainment & Leisure
  'entertainment': '🎬',
  'movie': '🎥',
  'music': '🎵',
  'game': '🎮',
  'book': '📚',
  'education': '🎓',
  'gift': '🎁',
  
  // Default
  'tag': '🏷️',
  'default': '💼'
};

/**
 * Helper function to normalize and map icon names to standard categories
 * This runs once per unique icon name and caches the result
 */
const getIconLookupName = (rawIconName) => {
  if (!rawIconName) return '';
  
  // Check if we already processed this icon name
  if (iconLookupCache.has(rawIconName)) {
    return iconLookupCache.get(rawIconName);
  }
  
  // Normalize the icon name (lowercase, remove spaces)
  const normalizedName = rawIconName.toLowerCase().replace(/\s+/g, '');
  
  // Default to the normalized name
  let lookupName = normalizedName;
  
  // If the icon name looks like a Lucide icon (PascalCase or camelCase)
  if (normalizedName.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
    // Map common Lucide icon names to our emoji categories
    if (normalizedName.includes('food') || normalizedName.includes('utensils') || 
        normalizedName === 'chef' || normalizedName === 'soup') {
      lookupName = 'food';
    } else if (normalizedName.includes('shop') || normalizedName.includes('cart') || 
               normalizedName.includes('bag')) {
      lookupName = 'shopping';
    } else if (normalizedName.includes('car') || normalizedName.includes('bus') || 
               normalizedName.includes('transport')) {
      lookupName = 'transport';
    } else if (normalizedName.includes('home') || normalizedName.includes('house')) {
      lookupName = 'home';
    } else if (normalizedName.includes('health') || normalizedName.includes('medical')) {
      lookupName = 'health';
    }
  }
  
  // Cache the result for future lookups
  iconLookupCache.set(rawIconName, lookupName);
  
  return lookupName;
};

/**
 * A component that renders an emoji icon based on a category name
 * Falls back to a default emoji if the specified category doesn't have a mapping
 */
const DynamicIcon = ({ 
  iconName, 
  size = 24, 
  className = '',
  defaultIcon = 'tag'
}) => {
  // Use memoization to prevent redundant processing on re-renders
  const { lookupName, emoji, fontSize } = useMemo(() => {
    const lookupName = getIconLookupName(iconName);
    const emoji = iconMap[lookupName] || iconMap[defaultIcon] || iconMap.default;
    const fontSize = Math.max(Math.round(size * 0.8), 16);
    
    return { lookupName, emoji, fontSize };
  }, [iconName, defaultIcon, size]);
  
  return (
    <span 
      className={className}
      style={{ fontSize: `${fontSize}px`, lineHeight: 1 }}
      role="img"
      aria-label={iconName || defaultIcon}
    >
      {emoji}
    </span>
  );
};

export default DynamicIcon;
