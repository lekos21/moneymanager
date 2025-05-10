import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import expenseService from '../services/expenseService';
import ExpenseCard from '../components/ExpenseCard';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric' };
  const dateStr = date.toLocaleDateString('en-US', options);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${dateStr}, ${hours}:${minutes}`;
};

export default function History() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTags, setSelectedTags] = useState({ areaTags: [], contextTags: [] });
  const [availableTags, setAvailableTags] = useState({ areaTags: [], contextTags: [] });
  const [notification, setNotification] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const extractUniqueTags = (list) => {
    const area = new Set(), context = new Set();
    list.forEach(e => {
      if (Array.isArray(e.area_tags)) e.area_tags.forEach(t => area.add(t));
      if (Array.isArray(e.context_tags)) e.context_tags.forEach(t => context.add(t));
    });
    return { areaTags: [...area], contextTags: [...context] };
  };

  const getFilteredExpenses = () => {
    if (!selectedTags.areaTags.length && !selectedTags.contextTags.length) return expenses;
    return expenses.filter(exp => {
      const hasArea = !selectedTags.areaTags.length ||
        (exp.area_tags && selectedTags.areaTags.some(t => exp.area_tags.includes(t)));
      const hasContext = !selectedTags.contextTags.length ||
        (exp.context_tags && selectedTags.contextTags.some(t => exp.context_tags.includes(t)));
      return hasArea && hasContext;
    });
  };

  const toggleTagSelection = (tag, type) => {
    setSelectedTags(prev => {
      const list = [...prev[type]];
      const idx = list.indexOf(tag);
      if (idx === -1) list.push(tag);
      else list.splice(idx, 1);
      return { ...prev, [type]: list };
    });
  };

  useEffect(() => {
    if (!user) return;
    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        const data = await expenseService.getExpenses();
        console.log('Raw expense data from API:', data);
        
        // Safety checks to ensure we have data to work with
        if (!Array.isArray(data)) {
          console.error('API did not return an array for expenses:', data);
          setExpenses([]); 
          setAvailableTags({ areaTags: [], contextTags: [] });
          setTotalAmount(0);
          setError('Failed to load expenses. Unexpected data format.');
          setIsLoading(false);
          return;
        }

        const validExpenses = data.filter(exp => exp && typeof exp.amount === 'number' && exp.timestamp);
        const sortedExpenses = validExpenses.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setExpenses(sortedExpenses);
        setAvailableTags(extractUniqueTags(sortedExpenses));
        
        // Calculate total amount
        const total = sortedExpenses.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
        setTotalAmount(total);
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch expenses:', err);
        setError('Failed to load expenses. Please try again later.');
        setExpenses([]); 
        setAvailableTags({ areaTags: [], contextTags: [] });
        setTotalAmount(0);
      }
      setIsLoading(false);
    };
    fetchExpenses();
  }, [user]);

  const handleExpenseDeleted = (deletedExpenseId) => {
    setExpenses(prevExpenses => prevExpenses.filter(exp => exp.id !== deletedExpenseId));
    // Recalculate total and tags
    const updatedExpenses = expenses.filter(exp => exp.id !== deletedExpenseId);
    setAvailableTags(extractUniqueTags(updatedExpenses));
    const total = updatedExpenses.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
    setTotalAmount(total);
    setNotification({ type: 'success', message: 'Expense deleted successfully' });
    setTimeout(() => setNotification(null), 3000); 
    setShowConfirmDelete(null); 
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>Expense History | MoneyManager</title>
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
                        <button
                          key={`area-${tag}`}
                          onClick={() => toggleTagSelection(tag, 'areaTags')}
                          className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                            selectedTags.areaTags.includes(tag)
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {tag}
                        </button>
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
                        <button
                          key={`context-${tag}`}
                          onClick={() => toggleTagSelection(tag, 'contextTags')}
                          className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                            selectedTags.contextTags.includes(tag)
                              ? 'bg-gradient-to-r from-pink-400 to-orange-400 text-white'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {tag}
                        </button>
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
              <div className="flex justify-center items-center h-full">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-red-500">{error}</p>
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
              <div className="space-y-3 max-w-lg mx-auto">
                {getFilteredExpenses().map(expense => (
                  <ExpenseCard 
                    key={expense.id} 
                    expense={expense} 
                    onDelete={() => handleExpenseDeleted(expense.id)}
                    fullWidth={true}
                  />
                ))}
              </div>
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
