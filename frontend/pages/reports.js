import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import LoadingAnimation from '../components/LoadingAnimation';
import SkeletonChart from '../components/skeletons/SkeletonChart';
import { useExpenses } from '../hooks/useExpenses';
import { useUserData } from '../hooks/useUserData';
import { ChevronDown, Calendar } from 'lucide-react';

// Dynamically import chart component for better performance
const ExpenseDoughnutChart = dynamic(
  () => import('../components/ExpenseDoughnutChart'),
  { loading: () => <SkeletonChart /> }
);

export default function Reports() {
  const { user } = useAuth();
  const { expenses, isLoading: expensesLoading } = useExpenses();
  const { userData } = useUserData();
  const [selectedRange, setSelectedRange] = useState('This Month');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const rangeOptions = [
    'Today',
    'This Week', 
    'This Month',
    'Last Month',
    'Last 3 Months',
    'This Year',
    'Custom Range'
  ];

  const isLoading = expensesLoading;

  // Filter expenses based on selected range
  const getFilteredExpenses = () => {
    if (!expenses) return [];
    
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const startOfLast3Months = new Date(now.getFullYear(), now.getMonth() - 3, 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    return expenses.filter(expense => {
      const expenseDate = new Date(expense.timestamp || expense.date);
      
      switch (selectedRange) {
        case 'Today':
          return expenseDate >= startOfToday;
        case 'This Week':
          return expenseDate >= startOfWeek;
        case 'This Month':
          return expenseDate >= startOfMonth;
        case 'Last Month':
          return expenseDate >= startOfLastMonth && expenseDate <= endOfLastMonth;
        case 'Last 3 Months':
          return expenseDate >= startOfLast3Months;
        case 'This Year':
          return expenseDate >= startOfYear;
        case 'Custom Range':
          if (customStartDate && customEndDate) {
            const startDate = new Date(customStartDate);
            const endDate = new Date(customEndDate);
            endDate.setHours(23, 59, 59, 999); // Include end day
            return expenseDate >= startDate && expenseDate <= endDate;
          }
          return true;
        default:
          return true;
      }
    });
  };

  const filteredExpenses = getFilteredExpenses();
  const totalSpending = filteredExpenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);

  const getDateRangeText = () => {
    const now = new Date();
    const formatDate = (date) => {
      return date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      });
    };
    
    switch (selectedRange) {
      case 'Today':
        return formatDate(now);
      case 'This Week':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
      case 'This Month':
        return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      case 'Last Month':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return lastMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      case 'Last 3 Months':
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        return `${formatDate(threeMonthsAgo)} - ${formatDate(now)}`;
      case 'This Year':
        return now.getFullYear().toString();
      case 'Custom Range':
        if (customStartDate && customEndDate) {
          return `${formatDate(new Date(customStartDate))} - ${formatDate(new Date(customEndDate))}`;
        }
        return 'Select date range';
      default:
        return '';
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>Reports - MoneyManager</title>
          <meta name="description" content="View your spending analytics" />
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            {/* Header */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Reports
              </h1>
              <p className="text-gray-600 text-sm">
                View your spending analytics
              </p>
            </div>

            {/* Range Selector */}
            <div className="mb-4">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full max-w-md flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-[#4d9fff] focus:border-transparent"
                >
                  <span className="text-gray-700">{selectedRange}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 max-w-md mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {rangeOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedRange(option);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                          selectedRange === option 
                            ? 'bg-gradient-to-r from-[#7B3FE4] to-[#9C6EFF] text-white' 
                            : 'text-gray-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Range Inputs */}
              {selectedRange === 'Custom Range' && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <label className="text-sm font-medium text-gray-700">From:</label>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B3FE4] focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">To:</label>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B3FE4] focus:border-transparent"
                        min={customStartDate}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Total Spending Card */}
            <div className="mb-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Total Spending</h3>
                    <p className="text-sm text-gray-600">{getDateRangeText()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      €{totalSpending.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <LoadingAnimation />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <ExpenseDoughnutChart 
                  expenses={filteredExpenses} 
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}