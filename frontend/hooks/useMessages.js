import { useState, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import chatService from '../services/chatService';

/**
 * Custom hook for fetching and managing chat messages
 * Uses SWR for caching, revalidation, and deduplication
 * 
 * @param {Object} options - SWR configuration options
 * @returns {Object} - Messages data, loading state, error state, and utility functions
 */
export function useMessages(options = {}) {
  const {
    limit = 30,
    shouldFetch = true,
    revalidateOnFocus = false,
    dedupingInterval = 30000, // 30 seconds
    ...swrOptions
  } = options;

  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedExpenseCache, setParsedExpenseCache] = useState({});

  // Use SWR to fetch messages data
  const { data, error, mutate, isValidating } = useSWR(
    shouldFetch ? '/api/messages/' : null,
    async () => {
      try {
        return await chatService.getMessages(limit);
      } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
      }
    },
    {
      revalidateOnFocus,
      dedupingInterval,
      ...swrOptions
    }
  );

  /**
   * Send a new message and process the response
   * 
   * @param {string} text - The message text to send
   * @returns {Promise<Object>} - The processed message
   */
  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return null;
    
    try {
      setIsProcessing(true);
      
      // Add optimistic update for better UX
      const optimisticMessage = {
        id: `temp-${Date.now()}`,
        content: text,
        direction: 'outgoing',
        createdAt: new Date().toISOString(),
        isOptimistic: true
      };
      
      // Update the local messages cache with the optimistic message
      mutate(prevMessages => [
        ...(prevMessages || []),
        optimisticMessage
      ], false);
      
      // Send the actual message to the API
      const response = await chatService.sendMessage(text);
      
      // Update the cache with the real response
      mutate();
      
      return response;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [mutate]);

  /**
   * Delete a message by ID
   * 
   * @param {string} messageId - The ID of the message to delete
   * @returns {Promise<void>}
   */
  const deleteMessage = useCallback(async (messageId) => {
    try {
      await chatService.deleteMessage(messageId);
      
      // Update the local cache by filtering out the deleted message
      mutate(prevMessages => 
        prevMessages?.filter(msg => msg.id !== messageId) || [], 
        false
      );
    } catch (error) {
      console.error('Failed to delete message:', error);
      throw error;
    }
  }, [mutate]);

  /**
   * Parse expense data from a message
   * 
   * @param {string} messageId - The message ID
   * @param {string} content - The message content
   * @returns {Object|null} - The parsed expense data or null
   */
  const parseExpenseData = useCallback((messageId, content) => {
    // Check if we've already parsed this message
    if (parsedExpenseCache[messageId]) {
      return parsedExpenseCache[messageId];
    }
    
    try {
      if (!content.includes('Expense saved:')) return null;
      
      // Try to extract the JSON part of the message if available
      const jsonStartIndex = content.indexOf('{');
      const jsonEndIndex = content.lastIndexOf('}');
      
      let expenseData = null;
      
      if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
        // Extract and parse JSON
        const jsonStr = content.substring(jsonStartIndex, jsonEndIndex + 1);
        try {
          expenseData = JSON.parse(jsonStr);
        } catch (e) {
          console.error('Failed to parse expense JSON:', e);
        }
      }
      
      // If we couldn't parse JSON, try to extract data from the message text
      if (!expenseData) {
        // Enhanced regex-based extraction for multiple currency formats
        // Match patterns like:
        // "✅ Expense saved: lol skin - €10"
        // "✅ Expense saved: chatgpt - €24"
        // "✅ Expense saved: league of legends skin - €10"
        
        const expensePattern = /✅ Expense saved: (.+?) - ([€$£])([0-9]+(?:\.[0-9]{1,2})?)/;
        const expenseMatch = content.match(expensePattern);
        
        if (expenseMatch) {
          const [, description, currencySymbol, amount] = expenseMatch;
          console.log(`[parseExpenseData] Parsed expense: ${description} - ${currencySymbol}${amount}`);
          
          // Map currency symbols to currency codes
          const currencyMap = {
            '€': 'EUR',
            '$': 'USD',
            '£': 'GBP'
          };

          // Intelligent tag assignment based on description keywords
          const assignTags = (description) => {
            const desc = description.toLowerCase();
            
            // Simplified category detection with common tag IDs
            let primaryCategory = 'other';
            let categoryColor = '#6b7280';
            let categoryIcon = 'tag';
            
            // Define category mappings with colors and icons
            const categoryMappings = {
              'food': {
                keywords: ['food', 'eat', 'meal', 'lunch', 'dinner', 'breakfast', 'snack', 'restaurant', 'cafe'],
                color: '#ef4444',
                icon: 'utensils'
              },
              'shopping': {
                keywords: ['shopping', 'buy', 'purchase', 'store', 'clothes', 'clothing'],
                color: '#8b5cf6',
                icon: 'shopping-bag'
              },
              'entertainment': {
                keywords: ['game', 'gaming', 'skin', 'movie', 'cinema', 'entertainment', 'fun', 'league', 'legends'],
                color: '#06b6d4',
                icon: 'gamepad-2'
              },
              'transport': {
                keywords: ['transport', 'taxi', 'uber', 'bus', 'train', 'travel', 'fuel', 'gas'],
                color: '#f59e0b',
                icon: 'car'
              },
              'technology': {
                keywords: ['tech', 'computer', 'software', 'app', 'chatgpt', 'ai', 'subscription'],
                color: '#10b981',
                icon: 'cpu'
              },
              'health': {
                keywords: ['health', 'medical', 'doctor', 'pharmacy', 'medicine'],
                color: '#f43f5e',
                icon: 'heart'
              }
            };
            
            // Find matching category
            for (const [category, config] of Object.entries(categoryMappings)) {
              if (config.keywords.some(keyword => desc.includes(keyword))) {
                primaryCategory = category;
                categoryColor = config.color;
                categoryIcon = config.icon;
                break;
              }
            }
            
            return {
              areaTags: [primaryCategory],
              contextTags: ['personal'],
              fallbackTag: {
                tag_id: primaryCategory,
                name: primaryCategory.charAt(0).toUpperCase() + primaryCategory.slice(1),
                icon: categoryIcon,
                colors: {
                  hex: categoryColor,
                  bgHex: categoryColor + '20', // Add transparency
                  textHex: categoryColor
                }
              }
            };
          };

          const { areaTags, contextTags, fallbackTag } = assignTags(description);
          console.log(`[parseExpenseData] Categorized "${description}" as ${fallbackTag.name} with icon ${fallbackTag.icon}`);
          
          expenseData = {
            id: `parsed-${messageId}`, // Generate a temporary ID
            amount: parseFloat(amount),
            currency: currencyMap[currencySymbol] || 'EUR',
            short_text: description.trim(),
            raw_text: description.trim(),
            timestamp: new Date().toISOString(),
            // Add intelligently assigned tags
            area_tags: areaTags,
            context_tags: contextTags,
            // Add fallback tag for immediate styling
            tag: fallbackTag,
            // Add some default values that ExpenseCard expects
            user_id: 'current-user',
            main_tag_icon: null // Will be resolved by the tag system
          };
        }
      }
      
      // Cache the parsed data
      if (expenseData) {
        setParsedExpenseCache(prev => ({
          ...prev,
          [messageId]: expenseData
        }));
      }
      
      return expenseData;
    } catch (error) {
      console.error('Error parsing expense data:', error);
      return null;
    }
  }, [parsedExpenseCache]);

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(() => ({
    messages: data || [],
    isLoading: !error && !data,
    isProcessing,
    isValidating,
    isError: error,
    sendMessage,
    deleteMessage,
    parseExpenseData,
    mutate
  }), [
    data, 
    error, 
    isProcessing, 
    isValidating, 
    sendMessage, 
    deleteMessage, 
    parseExpenseData, 
    mutate
  ]);
}
