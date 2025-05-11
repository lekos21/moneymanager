import * as echarts from 'echarts/core';

/* Tailwind CSS safelist to prevent purging of dynamically used classes
 * border-orange-400 border-green-500 border-purple-500 border-red-500 border-blue-500 border-blue-400 
 * border-green-400 border-yellow-500 border-teal-500 border-indigo-500 border-blue-600 border-pink-500 
 * border-pink-300 border-gray-300
 * 
 * bg-orange-50 bg-green-50 bg-purple-50 bg-red-50 bg-blue-50 bg-yellow-50 bg-teal-50 bg-indigo-50 
 * bg-pink-50 bg-gray-50
 * 
 * text-orange-600 text-green-600 text-purple-600 text-red-600 text-blue-600 text-yellow-600 
 * text-teal-600 text-indigo-600 text-blue-700 text-pink-600 text-gray-600
 */

// Default tag colors for fallback when tag data is not available
// These will be used if a tag hasn't been fetched from the backend yet
export const tagColors = {
  // Area tags (expense categories)
  food: {
    border: 'border-orange-400',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    hex: '#f97316', // orange-500
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#fb923c' }, // orange-400
      { offset: 1, color: '#f97316' }  // orange-500
    ])
  },
  groceries: {
    border: 'border-green-500',
    bg: 'bg-green-50',
    text: 'text-green-600',
    hex: '#22c55e', // green-500
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#4ade80' }, // green-400
      { offset: 1, color: '#22c55e' }  // green-500
    ])
  },
  restaurant: {
    border: 'border-orange-400',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    hex: '#fb923c', // orange-400
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#fdba74' }, // orange-300
      { offset: 1, color: '#fb923c' }  // orange-400
    ])
  },
  shopping: {
    border: 'border-purple-500',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    hex: '#a855f7', // purple-500
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#c084fc' }, // purple-400
      { offset: 1, color: '#a855f7' }  // purple-500
    ])
  },
  entertainment: {
    border: 'border-red-500',
    bg: 'bg-red-50',
    text: 'text-red-600',
    hex: '#ef4444', // red-500
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#f87171' }, // red-400
      { offset: 1, color: '#ef4444' }  // red-500
    ])
  },
  travel: {
    border: 'border-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    hex: '#3b82f6', // blue-500
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#60a5fa' }, // blue-400
      { offset: 1, color: '#3b82f6' }  // blue-500
    ])
  },
  transport: {
    border: 'border-blue-400',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    hex: '#60a5fa', // blue-400
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#93c5fd' }, // blue-300
      { offset: 1, color: '#60a5fa' }  // blue-400
    ])
  },
  health: {
    border: 'border-green-400',
    bg: 'bg-green-50',
    text: 'text-green-600',
    hex: '#22c55e', // green-500
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#4ade80' }, // green-400
      { offset: 1, color: '#22c55e' }  // green-500
    ])
  },
  utilities: {
    border: 'border-yellow-500',
    bg: 'bg-yellow-50',
    text: 'text-yellow-600',
    hex: '#eab308', // yellow-500
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#facc15' }, // yellow-400
      { offset: 1, color: '#eab308' }  // yellow-500
    ])
  },
  home: {
    border: 'border-teal-500',
    bg: 'bg-teal-50',
    text: 'text-teal-600',
    hex: '#14b8a6', // teal-500
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#2dd4bf' }, // teal-400
      { offset: 1, color: '#14b8a6' }  // teal-500
    ])
  },
  personal: {
    border: 'border-indigo-500',
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    hex: '#6366f1', // indigo-500
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#818cf8' }, // indigo-400
      { offset: 1, color: '#6366f1' }  // indigo-500
    ])
  },
  education: {
    border: 'border-blue-600',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    hex: '#2563eb', // blue-600
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#3b82f6' }, // blue-500
      { offset: 1, color: '#2563eb' }  // blue-600
    ])
  },
  gift: {
    border: 'border-pink-500',
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    hex: '#ec4899', // pink-500
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#f472b6' }, // pink-400
      { offset: 1, color: '#ec4899' }  // pink-500
    ])
  },
  clothes: {
    border: 'border-pink-300',
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    hex: '#f9a8d4', // pink-300
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#fbcfe8' }, // pink-200
      { offset: 1, color: '#f9a8d4' }  // pink-300
    ])
  },
  // Default fallback
  default: {
    border: 'border-gray-300',
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    hex: '#d1d5db', // gray-300
    gradient: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#e5e7eb' }, // gray-200
      { offset: 1, color: '#d1d5db' }  // gray-300
    ])
  }
};

/**
 * Get color information for a tag
 * @param {string} tag - The tag name
 * @param {string} type - The color type to return ('border', 'bg', 'text', 'hex', 'gradient')
 * @param {Object} tagCache - Optional cache of tag data from the backend
 * @returns {string|Object} - The color value
 */
export const getTagColor = (tag, type = 'hex', tagCache = {}) => {
  if (!tag) {
    return tagColors.default[type];
  }
  
  const normalizedTag = tag.toLowerCase();
  
  // Check if we have this tag in the cache with color information
  const cacheKey = `area-${normalizedTag}`; // Default to area facet
  const contextKey = `context-${normalizedTag}`;
  const cachedTag = tagCache[cacheKey] || tagCache[contextKey];
    
  // If we have the tag with hex color in cache, use it directly for all color types
  if (cachedTag?.colors?.hex) {
    if (type === 'hex') {
      return cachedTag.colors.hex;
    } else if (type === 'bgHex') {
      return cachedTag.colors.bgHex || `${cachedTag.colors.hex}20`; // 20 is hex for 12% opacity
    } else if (type === 'textHex') {
      return cachedTag.colors.textHex || cachedTag.colors.hex;
    }
    
    // For Tailwind classes, look for them or fall back to the regular ones
    if (type === 'border' || type === 'bg' || type === 'text') {
      if (cachedTag.colors[type]) {
        return cachedTag.colors[type]; 
      }
    }
  }
  
  // If we don't have backend data, fall back to hardcoded colors
  const colorData = tagColors[normalizedTag] || tagColors.default;
  console.log(`[tagUtils] Using fallback color: ${colorData[type]}`);
  
  // For gradient, we need to create it on the fly if it's not in the hardcoded data
  if (type === 'gradient' && !colorData.gradient && colorData.hex) {
    // Create a gradient based on the hex color
    const hex = colorData.hex;
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: hex }, // Use the same color with different opacity
      { offset: 1, color: hex }
    ]);
  }
  
  return colorData[type];
};

// These functions are defined below

/**
 * Get an array of colors for chart series based on tags
 * @param {Array} tags - Array of tag names
 * @param {string} type - The color type to return ('hex' or 'gradient')
 * @param {Object} tagCache - Optional cache of tag data from the backend
 * @returns {Array} - Array of colors
 */
export const getTagColors = (tags, type = 'hex', tagCache = {}) => {
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return [tagColors.default[type]];
  }
  
  return tags.map(tag => getTagColor(tag, type, tagCache));
};

/**
 * Get border color class for a tag
 * @param {string} tag - The tag name
 * @param {Object} tagCache - Optional cache of tag data from the backend
 * @returns {string} - Tailwind border color class
 */
export const getTagBorderColor = (tag, tagCache = {}) => {
  return getTagColor(tag, 'border', tagCache);
};

/**
 * Get background color class for a tag
 * @param {string} tag - The tag name
 * @param {Object} tagCache - Optional cache of tag data from the backend
 * @returns {string} - Tailwind background color class
 */
export const getTagBgColor = (tag, tagCache = {}) => {
  return getTagColor(tag, 'bg', tagCache);
};

/**
 * Get text color class for a tag
 * @param {string} tag - The tag name
 * @param {Object} tagCache - Optional cache of tag data from the backend
 * @returns {string} - Tailwind text color class
 */
export const getTagTextColor = (tag, tagCache = {}) => {
  return getTagColor(tag, 'text', tagCache);
};

/**
 * Get all color classes for a tag (border, bg, text)
 * @param {string} tag - The tag name
 * @param {Object} tagCache - Optional cache of tag data from the backend
 * @returns {Object} - Object with border, bg, and text color classes
 */
export const getTagColorClasses = (tag, tagCache = {}) => {
  if (!tag) return {
    border: tagColors.default.border,
    bg: tagColors.default.bg,
    text: tagColors.default.text
  };
  
  // Check if we have this tag in the cache with color information
  const normalizedTag = tag.toLowerCase();
  const cacheKey = `area-${normalizedTag}`; // Default to area facet
  const cachedTag = tagCache[cacheKey] || tagCache[`context-${normalizedTag}`];
  
  if (cachedTag && cachedTag.colors) {
    // If we have color data from the backend, use it
    return {
      border: cachedTag.colors.border || tagColors.default.border,
      bg: cachedTag.colors.bg || tagColors.default.bg,
      text: cachedTag.colors.text || tagColors.default.text
    };
  }
  
  // Fall back to hardcoded colors if no backend data is available
  const colorData = tagColors[normalizedTag] || tagColors.default;
  
  return {
    border: colorData.border,
    bg: colorData.bg,
    text: colorData.text
  };
};

/**
 * Get chart colors for a set of tags
 * @param {Array} categories - Array of category objects with name property
 * @param {Object} tagCache - Optional cache of tag data from the backend
 * @returns {Array} - Array of color objects for ECharts
 */
export const getCategoryChartColors = (categories, tagCache = {}) => {
  if (!categories || !Array.isArray(categories)) return [];
  
  return categories.map(category => {
    const tagName = category.name.toLowerCase();
    return getTagColor(tagName, 'gradient', tagCache);
  });
};

export default {
  tagColors,
  getTagColor,
  getTagColors,
  getTagBorderColor,
  getTagBgColor,
  getTagTextColor,
  getTagColorClasses,
  getCategoryChartColors
};
