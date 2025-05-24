/**
 * Format a number as currency with the specified currency symbol
 * @param {number} amount - The amount to format
 * @param {string} currencySymbol - The currency symbol to use
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currencySymbol = '$') => {
  if (amount === undefined || amount === null) return `${currencySymbol}0.00`;
  
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) return `${currencySymbol}0.00`;
  
  return `${currencySymbol}${numAmount.toFixed(2)}`;
};

/**
 * Format a date to a readable string
 * @param {Date|string} date - The date to format
 * @param {Object} options - Formatting options
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };
  
  return dateObj.toLocaleDateString(undefined, defaultOptions);
};

/**
 * Format a time to a readable string
 * @param {Date|string} date - The date to format
 * @param {Object} options - Formatting options
 * @returns {string} - Formatted time string
 */
export const formatTime = (date, options = {}) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };
  
  return dateObj.toLocaleTimeString(undefined, defaultOptions);
};

// Mapping currency codes to symbols
const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'CA$',
  AUD: 'A$',
  CHF: 'CHF',
  CNY: '¥',
  INR: '₹'
};

// Get symbol for currency code
export const getCurrencySymbol = (currencyCode) => {
  return CURRENCY_SYMBOLS[currencyCode] || currencyCode || '';
};

export default {
  formatCurrency,
  formatDate,
  formatTime,
  getCurrencySymbol
};
