import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ExpenseCard from './ExpenseCard';

const MultiExpenseCard = ({ 
  expenses, 
  totalCount, 
  processingTime, 
  originalText, 
  error 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <span className="text-red-600 text-sm font-medium">Error parsing expenses:</span>
        </div>
        <p className="text-red-700 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 border border-gray-200/60 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-200">
      {/* Header */}
      <div 
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="font-semibold text-gray-800 text-base">
              ✅ {totalCount} expenses saved
            </h3>
            {processingTime != null && processingTime > 0 && (
              <span className="text-xs text-gray-500">
                Processed in {processingTime.toFixed(1)}s
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </motion.div>
        </div>
      </div>

      {/* Original Text - if provided */}
      {originalText && (
        <div className="mt-3 px-3 py-2 bg-white/60 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 italic leading-relaxed">
            "{originalText}"
          </p>
        </div>
      )}

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3">
              {expenses && expenses.map((expense, index) => (
                <motion.div 
                  key={expense.id || index} 
                  className="relative"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.1 }}
                >
                  {index > 0 && (
                    <div className="absolute -top-1.5 left-4 right-4 h-px bg-gray-200/60"></div>
                  )}
                  <ExpenseCard 
                    expense={expense}
                    fullWidth={true}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiExpenseCard;
