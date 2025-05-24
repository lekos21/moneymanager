import React, { useState, memo } from 'react';
import { Trash2, X, Check, Edit2 } from 'lucide-react';
import ExpenseEditDialog from './ExpenseEditDialog/ExpenseEditDialog';
import TagIcon from './TagIcon';
import { formatCurrency } from '../utils/formatters';
import expenseService from '../services/expenseService';
import chatService from '../services/chatService';
import { useTagResolver } from '../hooks/useTags';

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

const ExpenseCard = memo(({ expense, messageId, onDelete, onEdit, fullWidth = false }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Use our custom hook to efficiently resolve tag data
  const { tag, iconName, iconColor, bgColor, textColor, borderColor } = useTagResolver(expense);

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

  const handleCardClick = (e) => {
    // Prevent triggering edit when clicking delete button
    if (e.target.closest('button')) return;
    setShowEditDialog(true);
    if (onEdit) onEdit(expense);
  };

  return (
    <>
      <div 
        className={`card ${cardWidthClasses} border-2 border-l-4 cursor-pointer hover:shadow-md transition-shadow`}
        style={{
          borderLeftColor: borderColor,
        }}
        onClick={handleCardClick}
    >
      <div className="card-header flex justify-between items-center py-2 px-3 gap-2">
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
      <div className="card-body px-3 py-2 flex justify-between items-center">
        <div className="flex flex-wrap gap-1.5">
          {/* Area tags with consistent styling */}
          {expense.area_tags && expense.area_tags.map(tagName => (
            <span 
              key={`area-${tagName}`}
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ 
                backgroundColor: bgColor || '#EBF5FF',
                color: textColor || '#3B82F6'
              }}
            >
              {tagName}
            </span>
          ))}
          
          {/* Context tags with consistent styling */}
          {expense.context_tags && expense.context_tags.map(tagName => (
            <span 
              key={`context-${tagName}`}
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ 
                backgroundColor: bgColor ? `${bgColor}80` : '#F0F7FF', // Lighter version of the bgColor
                color: textColor || '#2563EB'
              }}
            >
              {tagName}
            </span>
          ))}
        </div>
        
        {/* Delete button with icon */}
        {showConfirmDelete ? (
          <div className="flex space-x-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirmDelete(false);
              }}
              className="p-1 text-xs text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="p-1 text-xs text-white rounded-full hover:opacity-90 transition-opacity bg-gradient-secondary"
            >
              <Check className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="flex space-x-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowEditDialog(true);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Edit expense"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirmDelete(true);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Delete expense"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
      
    {/* Edit Dialog */}
    <ExpenseEditDialog
      expense={expense}
      isOpen={showEditDialog}
      onClose={() => setShowEditDialog(false)}
    />
    </>
  );
});

// Export currency symbols
export { currencySymbols };

export default ExpenseCard;
