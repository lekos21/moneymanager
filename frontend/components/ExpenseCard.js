import React, { useState } from 'react';
import { Trash2, X, Check } from 'lucide-react';
import DynamicIcon from './DynamicIcon';
import expenseService from '../services/expenseService';
import chatService from '../services/chatService';

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

// Simplified color mapping based on tags - can be expanded
const tagColors = {
  food: 'border-orange-500',
  groceries: 'border-green-500',
  restaurant: 'border-orange-400',
  shopping: 'border-purple-500',
  entertainment: 'border-red-500',
  travel: 'border-blue-500',
  transport: 'border-blue-400',
  health: 'border-red-500',
  utilities: 'border-yellow-500',
  home: 'border-teal-500',
  personal: 'border-indigo-500',
  education: 'border-blue-600',
  gift: 'border-pink-500',
  default: 'border-gray-300'
};

// Get currency symbol or fallback to currency code
export const getCurrencySymbol = (code) => {
  return currencySymbols[code] || code;
};

const ExpenseCard = ({ expense, messageId, onDelete, fullWidth = false }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  
  const handleDelete = async () => {
    console.log('Deleting expense with ID:', expense.id);
    if (!expense.id) {
      console.error('No expense ID found:', expense);
      return;
    }
    
    try {
      // Step 1: Delete the expense from the database
      await expenseService.deleteExpense(expense.id);
      console.log('Expense deleted successfully');
      
      // Step 2: Delete the associated message if we have a message ID
      if (messageId) {
        console.log('Deleting associated message with ID:', messageId);
        await chatService.deleteMessage(messageId);
        console.log('Message deleted successfully');
      }
      
      // Step 3: Notify parent component about the deletion with both IDs
      onDelete(expense.id, messageId);
      setShowConfirmDelete(false);
    } catch (error) {
      console.error('Failed to delete expense or message:', error);
      alert('Failed to delete. Please try again.');
      setShowConfirmDelete(false);
    }
  };
  
  // Determine border color based on the first area_tag
  const getBorderColorClass = () => {
    if (expense && expense.area_tags && expense.area_tags.length > 0) {
      const firstTag = expense.area_tags[0].toLowerCase();
      return tagColors[firstTag] || tagColors.default;
    }
    return tagColors.default;
  };

  const borderColorClass = getBorderColorClass();
  const iconName = expense && expense.area_tags && expense.area_tags.length > 0 ? expense.area_tags[0] : 'default';

  const cardWidthClasses = fullWidth ? 'w-full' : 'w-full'; // Reverted: non-fullWidth also w-full, to fill parent

  return (
    <div className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white ${cardWidthClasses} border-2 border-l-4 ${borderColorClass}`}>
      <div className="flex justify-between items-center py-2 px-3 bg-gray-50 border-b-2 border-gray-100">
        <div className="flex items-center">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white mr-2`}>
            <DynamicIcon iconName={iconName} size={20} />
          </div>
          <div>
            <h4 className="text-base font-semibold text-gray-800">{expense.short_text || "Expense"}</h4>
            <span className="flex items-center text-xs text-gray-500 space-x-1">
              <span>{new Date(expense.timestamp).toLocaleDateString(undefined, { month:'short', day:'numeric' })}</span>
              <span>•</span>
              <span>{new Date(expense.timestamp).toLocaleTimeString(undefined, { hour:'2-digit', minute:'2-digit' })}</span>
            </span>
          </div>
        </div>
        <div className="font-bold">
          {getCurrencySymbol(expense.currency)}{parseFloat(expense.amount).toFixed(2)}
        </div>
      </div>
      <div className="px-3 py-2 flex justify-between items-center">
        <div className="flex flex-wrap gap-1.5">
          {/* Area tags (purple) */}
          {expense.area_tags && expense.area_tags.map(tag => (
            <span 
              key={`area-${tag}`}
              className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
          
          {/* Context tags (blue) */}
          {expense.context_tags && expense.context_tags.map(tag => (
            <span 
              key={`context-${tag}`}
              className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
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
