import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useTags } from '../hooks/useTags';
import { ProtectedRoute } from '../components/ProtectedRoute';
import ExpenseCard from '../components/ExpenseCard';
import PageErrorBoundary from '../components/PageErrorBoundary';
import SkeletonCard from '../components/skeletons/SkeletonCard';
import { useExpenses } from '../hooks/useExpenses';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric' };
  const dateStr = date.toLocaleDateString('en-US', options);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${dateStr}, ${hours}:${minutes}`;
};

export default function History() {
  return (
    <PageErrorBoundary pageName="expense history">
      <HistoryContent />
    </PageErrorBoundary>
  );
}

function HistoryContent() {
  const { user } = useAuth();
  const { getTag } = useTags();
  const [selectedTags, setSelectedTags] = useState({ areaTags: [], contextTags: [] });
  const [notification, setNotification] = useState(null);
  
  // Use our custom hook for expenses data
  const { expenses, isLoading, isError, mutate } = useExpenses();

  // Extract unique tags from expenses - memoized for performance
  const availableTags = useMemo(() => {
    const area = new Set(), context = new Set();
    expenses.forEach(e => {
      if (Array.isArray(e.area_tags)) e.area_tags.forEach(t => area.add(t));
      if (Array.isArray(e.context_tags)) e.context_tags.forEach(t => context.add(t));
    });
    return { areaTags: [...area], contextTags: [...context] };
  }, [expenses]);
  
  // Calculate total amount - memoized for performance
  const totalAmount = useMemo(() => {
    return expenses.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
  }, [expenses]);

  // Get filtered expenses based on selected tags - memoized for performance
  const filteredExpenses = useMemo(() => {
    if (!selectedTags.areaTags.length && !selectedTags.contextTags.length) return expenses;
    return expenses.filter(exp => {
      const hasArea = !selectedTags.areaTags.length ||
        (exp.area_tags && selectedTags.areaTags.some(t => exp.area_tags.includes(t)));
      const hasContext = !selectedTags.contextTags.length ||
        (exp.context_tags && selectedTags.contextTags.some(t => exp.context_tags.includes(t)));
      return hasArea && hasContext;
    });
  }, [expenses, selectedTags.areaTags, selectedTags.contextTags]);

  const toggleTagSelection = (tag, type) => {
    setSelectedTags(prev => {
      const list = [...prev[type]];
      const idx = list.indexOf(tag);
      if (idx === -1) list.push(tag);
      else list.splice(idx, 1);
      return { ...prev, [type]: list };
    });
  };

  // Handle expense deletion
  const handleExpenseDeleted = (deletedExpenseId) => {
    // Optimistically update the UI
    mutate(expenses.filter(exp => exp.id !== deletedExpenseId), false);
    
    // Show success notification
    setNotification({ type: 'success', message: 'Expense deleted successfully' });
  };

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>Expense History | Piggy</title>
        </Head>
        <div className="h-[calc(100vh-64px)] flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800">Expense History</h1>
            </div>
            <div className="space-y-2 mt-4">
              {/* Area Tags */}
              {availableTags.areaTags.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Area Tags</p>
                  <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex space-x-2">
                      {availableTags.areaTags.map(tag => (
                        (() => {
                          const selected = selectedTags.areaTags.includes(tag);
                          const tagData = getTag(tag.toLowerCase());
                          const bgColor = tagData?.colors?.bgHex || '#EBF5FF';
                          const textColor = tagData?.colors?.textHex || '#3B82F6';
                          return (
                            <button
                              key={`area-${tag}`}
                              onClick={() => toggleTagSelection(tag, 'areaTags')}
                              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${selected ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : ''}`}
                              style={!selected ? { backgroundColor: bgColor, color: textColor } : {}}
                            >{tag}</button>
                          );
                        })()
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Context Tags */}
              {availableTags.contextTags.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Context Tags</p>
                  <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex space-x-2">
                      {availableTags.contextTags.map(tag => (
                        (() => {
                          const selected = selectedTags.contextTags.includes(tag);
                          const tagData = getTag(tag.toLowerCase());
                          const bgColor = tagData?.colors?.bgHex || '#F0F7FF';
                          const textColor = tagData?.colors?.textHex || '#2563EB';
                          return (
                            <button
                              key={`context-${tag}`}
                              onClick={() => toggleTagSelection(tag, 'contextTags')}
                              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${selected ? 'bg-gradient-to-r from-pink-400 to-orange-400 text-white' : ''}`}
                              style={!selected ? { backgroundColor: bgColor, color: textColor } : {}}
                            >{tag}</button>
                          );
                        })()
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="space-y-4 max-w-lg mx-auto">
                {[...Array(5)].map((_, i) => (
                  <SkeletonCard key={i} hasHeader={true} hasFooter={true} />
                ))}
              </div>
            ) : isError ? (
              <div className="flex justify-center items-center h-full">
                <div className="text-center">
                  <p className="text-red-500 mb-4">Failed to load expenses. Please try again.</p>
                  <button 
                    onClick={() => mutate()}
                    className="btn-primary"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : expenses.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💰</span>
                  </div>
                  <p className="text-gray-500">No expenses found. Start tracking your expenses in the chat!</p>
                </div>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                <div className="space-y-3 max-w-lg mx-auto">
                  {filteredExpenses.map(expense => (
                    <motion.div
                      key={expense.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <ExpenseCard
                        expense={expense}
                        onDelete={() => handleExpenseDeleted(expense.id)}
                        fullWidth={true}
                      />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>

          {/* No floating button here anymore */}

          {/* Confirmation Dialog is now managed by ExpenseCard */}
          {/* Notification (can remain here or be moved to Layout if global) */}
          {notification && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div
                className={`px-6 py-3 rounded-xl shadow-lg whitespace-nowrap ${
                  notification.type === 'success' ? 'bg-green-400' : 'bg-red-400'
                } text-white font-medium text-center`}
              >
                {notification.message}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
