import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock } from 'lucide-react';
import TagSelector from './TagSelector';
import expenseService from '../../services/expenseService';
import { useExpenses } from '../../hooks/useExpenses';
import { getCurrencySymbol } from '../../utils/formatters';

export default function ExpenseEditDialog({ expense, isOpen, onClose }) {
  const { mutate: refreshExpenses } = useExpenses();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: 0,
    currency: 'USD',
    short_text: '',
    raw_text: '',
    area_tags: [],
    context_tags: [],
    timestamp: new Date().toISOString()
  });

  // Initialize form data when expense changes
  useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount || 0,
        currency: expense.currency || 'USD',
        short_text: expense.short_text || '',
        raw_text: expense.raw_text || '',
        area_tags: expense.area_tags || [],
        context_tags: expense.context_tags || [],
        timestamp: expense.timestamp || new Date().toISOString()
      });
    }
  }, [expense]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData(prev => ({
      ...prev,
      amount: value
    }));
  };

  const handleTagsChange = ({ area_tags, context_tags }) => {
    setFormData(prev => ({
      ...prev,
      area_tags,
      context_tags
    }));
  };

  // Backdrop animation variants
  const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
    visible: { opacity: 1, backdropFilter: 'blur(8px)' }
  };

  // Dialog animation variants
  const dialogVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const handleSave = async () => {
    if (!expense?.id) return;
    
    setIsLoading(true);
    try {
      await expenseService.updateExpense(expense.id, formData);
      refreshExpenses();
      onClose();
    } catch (error) {
      console.error('Failed to update expense:', error);
      // TODO: Add error notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-[var(--z-index-modal-backdrop)]"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          
          {/* Dialog */}
          <motion.div
            className="fixed top-[8%] left-[4%] -translate-x-1/2
                      max-w-md w-[92%] max-h-[80vh] md:max-h-[80vh]
                      bg-white rounded-2xl shadow-2xl 
                      z-[var(--z-index-modal)] 
                      flex flex-col overflow-hidden"
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-[#00e4ff] to-[#4d9fff] text-white px-4 py-3 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Edit Expense</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main form content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Amount and Currency Section */}
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-1">
                  <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-500">
                      {getCurrencySymbol(formData.currency)}
                    </span>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleAmountChange}
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg
                               focus:outline-none focus:ring-2 focus:ring-[#4d9fff] 
                               focus:border-transparent transition-all duration-200
                               text-gray-900 placeholder-gray-400 text-right"
                    />
                  </div>
                </div>
                <div className="w-2/5 space-y-1">
                  <label htmlFor="currency" className="text-sm font-medium text-gray-700">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-[#4d9fff] 
                             focus:border-transparent transition-all duration-200
                             text-gray-900"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="CAD">CAD</option>
                    {/* Add more currencies as needed */}
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1">
                <label htmlFor="short_text" className="text-sm font-medium text-gray-700">
                  Quick Description
                </label>
                <input
                  type="text"
                  id="short_text"
                  name="short_text"
                  value={formData.short_text}
                  onChange={handleInputChange}
                  placeholder="e.g., Coffee at Starbucks"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-[#4d9fff] 
                           focus:border-transparent transition-all duration-200
                           text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Full Message */}
              <div className="space-y-1">
                <label htmlFor="raw_text" className="text-sm font-medium text-gray-700">
                  Full Details (Optional)
                </label>
                <textarea
                  id="raw_text"
                  name="raw_text"
                  value={formData.raw_text}
                  onChange={handleInputChange}
                  placeholder="Add any additional notes..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-[#4d9fff] 
                           focus:border-transparent transition-all duration-200
                           text-gray-900 placeholder-gray-400 resize-none"
                  rows={3}
                />
              </div>

              {/* Tag Selection Section */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Categories & Tags
                </label>
                <TagSelector
                  selectedAreaTags={formData.area_tags}
                  selectedContextTags={formData.context_tags}
                  onTagsChange={handleTagsChange}
                  showAllTags={true}
                />
              </div>

              {/* Date/Time Section - simplified for now */}
              <div className="space-y-1">
                <label htmlFor="timestamp" className="text-sm font-medium text-gray-700">
                  Date & Time
                </label>
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <input
                    type="datetime-local"
                    id="timestamp"
                    name="timestamp"
                    value={formData.timestamp.slice(0, 16)} // Format for datetime-local input
                    onChange={handleInputChange}
                    className="flex-1 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 px-4 py-3 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300
                         text-gray-700 font-medium hover:bg-gray-50
                         transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg bg-gradient-to-r from-[#d233e9] to-[#4d9fff] text-white
                          font-medium hover:from-[#d233e9]/90 hover:to-[#4d9fff]/90 transition-all
                          duration-200 flex items-center gap-2
                          ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
