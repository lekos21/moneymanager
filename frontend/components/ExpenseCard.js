import React, { useState } from 'react';
import { Trash2, X, Check } from 'lucide-react';
import TagIcon from './TagIcon';
import { formatCurrency } from '../utils/formatters';
import expenseService from '../services/expenseService';
import chatService from '../services/chatService';
import { useTags } from '../contexts/TagsContext';

// Currency symbol mapping
const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'Fr',
  CNY: '¥',
  INR: '₹',
  BRL: 'R$'
};

// Get currency symbol or fallback to currency code
export const getCurrencySymbol = (code) => {
  return currencySymbols[code] || code;
};

const ExpenseCard = ({ expense, messageId, onDelete, fullWidth = false }) => {
  const { getTag } = useTags();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Get tag data from context - try multiple approaches to find the best tag match
  let tag = null;
  
  // First priority: Use tag_id if available
  if (expense.tag_id) {
    tag = getTag(expense.tag_id);
  }
  // Second priority: Check the first area_tag
  else if (expense.area_tags && expense.area_tags.length > 0) {
    // Try to get the tag by the first area tag name
    tag = getTag(expense.area_tags[0].toLowerCase());
  }
  // Third priority: Fall back to any provided tag object
  else if (expense.tag) {
    tag = expense.tag;
  }
  
  const iconName = tag?.icon || 'tag'; // Default to 'tag' icon if not specified
  const iconColor = tag?.colors?.hex || '#6b7280'; // Default icon color (gray-500)
  const borderColor = tag?.colors?.hex || '#d1d5db'; // Default border color (gray-300)

  // Determine card width classes
  const cardWidthClasses = fullWidth ? 'w-full' : 'w-full min-w-[320px] max-w-[400px]';

  // Handle expense deletion
  const handleDelete = async () => {
    // Check for expense ID
    if (!expense.id) {
      console.error('No expense ID found:', expense);
      return;
    }

    // Attempt to delete the expense; ignore errors if already removed
    let expenseDeleted = false;
    try {
      await expenseService.deleteExpense(expense.id);
      expenseDeleted = true;
    } catch (err) {
      console.warn('Expense deletion skipped or failed:', err);
    }

    // Always attempt to delete the chat message if a messageId exists
    if (messageId) {
      try {
        await chatService.deleteMessage(messageId);
      } catch (err) {
        console.error('Failed to delete message:', err);
        alert('Failed to delete message. Please try again.');
        setShowConfirmDelete(false);
        return;
      }
    }

    // Notify parent: pass expenseId only if it was deleted, but always pass messageId
    onDelete(expenseDeleted ? expense.id : null, messageId);
    setShowConfirmDelete(false);
  };

  return (
    <div 
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white ${cardWidthClasses} border-2 border-l-4`}
      style={{
        borderLeftColor: borderColor,
      }}
    >
      <div className="flex justify-between items-center py-2 px-3 bg-gray-50 border-b-2 border-gray-100 gap-2">
        <div className="flex items-center">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-2`}>
            <TagIcon 
              iconName={iconName}
              iconColor={iconColor}
              className="text-gray-700"
              fallbackIcon="tag"
            />
          </div>
          <div className="min-w-0 flex-1 max-w-[200px]">
            <h4 className="text-base font-semibold text-gray-800 truncate overflow-hidden text-ellipsis" title={expense.short_text || "Expense"}>{expense.short_text || "Expense"}</h4>
            <span className="flex items-center text-xs text-gray-500 space-x-1">
              <span>{new Date(expense.timestamp).toLocaleDateString(undefined, { month:'short', day:'numeric' })}</span>
              <span>•</span>
              <span>{new Date(expense.timestamp).toLocaleTimeString(undefined, { hour:'2-digit', minute:'2-digit' })}</span>
            </span>
          </div>
        </div>
        <div className="font-bold whitespace-nowrap flex-shrink-0">
          {getCurrencySymbol(expense.currency)}{parseFloat(expense.amount).toFixed(2)}
        </div>
      </div>
      <div className="px-3 py-2 flex justify-between items-center">
        <div className="flex flex-wrap gap-1.5">
          {/* Area tags (with tag-specific colors and icons from TagsContext) */}
          {expense.area_tags && expense.area_tags.map(tagName => {
            // Get tag data from context
            const areaTag = getTag(tagName.toLowerCase());
            // Get colors or use defaults
            const bgColor = areaTag?.colors?.bgHex || '#EBF5FF';
            const textColor = areaTag?.colors?.textHex || '#3B82F6';
            const iconColor = areaTag?.colors?.hex || textColor;
            const iconName = areaTag?.icon || 'tag';
            
            return (
              <span 
                key={`area-${tagName}`}
                className={`px-2 py-0.5 rounded-full text-xs font-semibold`}
                style={{ 
                  backgroundColor: bgColor,
                  color: textColor
                }}
              >
                {tagName}
              </span>
            );
          })}
          
          {/* Context tags (with tag-specific colors and icons from TagsContext) */}
          {expense.context_tags && expense.context_tags.map(tagName => {
            // Get tag data from context
            const contextTag = getTag(tagName.toLowerCase());
            // Get colors or use defaults (slightly different defaults for context tags)
            const bgColor = contextTag?.colors?.bgHex || '#F0F7FF';
            const textColor = contextTag?.colors?.textHex || '#2563EB';
            const iconColor = contextTag?.colors?.hex || textColor;
            const iconName = contextTag?.icon || 'info-circle'; // Default to info-circle for context tags
            
            return (
              <span 
                key={`context-${tagName}`}
                className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ 
                  backgroundColor: bgColor,
                  color: textColor 
                }}
              >
                {tagName}
              </span>
            );
          })}
        </div>
        
        {/* Delete button with icon */}
        {showConfirmDelete ? (
          <div className="flex space-x-1">
            <button 
              onClick={() => setShowConfirmDelete(false)}
              className="p-1 text-xs text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <button 
              onClick={handleDelete}
              className="p-1 text-xs text-white rounded-full hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(45deg, #E74C3C, #cf8ef9)' }}
            >
              <Check className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setShowConfirmDelete(true)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Export currency symbols
export { currencySymbols };

export default ExpenseCard;
