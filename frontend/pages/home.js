import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import DynamicIcon from '../components/DynamicIcon';
import LoadingAnimation from '../components/LoadingAnimation';
import SkeletonCard from '../components/skeletons/SkeletonCard';
import SkeletonChart from '../components/skeletons/SkeletonChart';
import { useExpenses, useExpenseStats } from '../hooks/useExpenses';
import { useUserData } from '../hooks/useUserData';

// Dynamically import chart component for better performance
const MonthlyExpenseChart = dynamic(
  () => import('../components/MonthlyExpenseChart'),
  { loading: () => <SkeletonChart /> }
);

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('monthly');
  
  // Use SWR hooks for data fetching
  const { expenses, isLoading, isError } = useExpenses();
  const { userData } = useUserData();
  
  // Calculate expense statistics using our custom hook
  const { 
    monthlyTotal, 
    weeklyTotal, 
    dailyExpenses, 
    weeklyExpenses 
  } = useExpenseStats(expenses);
  
  // Get budget from user data
  const budget = userData?.budget;
  
  // Mock income for now - in a real app, this would come from an API
  const totalIncome = 2500.00;
  const balance = totalIncome - monthlyTotal;
  
  // Calculate budget progress
  const budgetProgress = budget ? (monthlyTotal / budget) * 100 : null;
  const budgetRemaining = budget ? budget - monthlyTotal : null;
  const budgetStatus = budgetRemaining && budgetRemaining < 0 ? 'over' : 'under';
  
  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>Dashboard | Piggy</title>
        </Head>
        
        <div className="px-4 py-6 max-w-lg mx-auto">
          {/* Header with Welcome and Date/Time */}
          <header className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome {user && (user.displayName || user.email)}!</h1>
              </div>
            </div>
          </header>
          
          {/* Tabs */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveTab('monthly')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${activeTab === 'monthly' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setActiveTab('weekly')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${activeTab === 'weekly' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}
              >
                Weekly
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="space-y-6">
              <SkeletonChart height="h-64" />
              <div className="grid grid-cols-2 gap-4">
                <SkeletonCard />
                <SkeletonCard />
              </div>
              <div className="space-y-3">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          ) : isError ? (
            <div className="text-center py-10">
              <p className="text-red-500">Failed to load expenses. Please try again later.</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Monthly Expense Chart Component */}
              <MonthlyExpenseChart
                activeTab={activeTab}
                monthlyTotal={monthlyTotal}
                weeklyTotal={weeklyTotal}
                dailyExpenses={dailyExpenses}
                weeklyExpenses={weeklyExpenses}
                budget={budget}
              />
              
              {/* Transactions Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Latest Expenses</h2>
                  <Link href="/history" legacyBehavior>
                    <a className="text-sm font-semibold bg-clip-text text-transparent" 
                      style={{ backgroundImage: 'linear-gradient(45deg, #42A5F5, #cf8ef9, #fe9169)' }}>
                      View All
                    </a>
                  </Link>
                </div>
                
                {expenses.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <p>No expenses found. Add your first expense!</p>
                  </div>
                ) : (
                  <div className="space-y-3"> 
                    {expenses.slice(0, 4).map(expense => {
                      // Get the first area tag if available
                      const category = expense.area_tags && expense.area_tags.length > 0 ? 
                        expense.area_tags[0] : 'default';
                      
                      // Format the date
                      const date = new Date(expense.timestamp || expense.date);
                      const formattedDate = formatDate(date);
                      
                      // Determine the category name for the icon
                      let categoryName = 'default';
                      if (category) {
                        // Try to map common categories
                        if (category.toLowerCase().includes('food') || 
                            category.toLowerCase().includes('restaurant') || 
                            category.toLowerCase().includes('grocery')) {
                          categoryName = 'food';
                        } else if (category.toLowerCase().includes('transport') || 
                                   category.toLowerCase().includes('travel')) {
                          categoryName = 'transport';
                        } else if (category.toLowerCase().includes('shop') || 
                                   category.toLowerCase().includes('clothes')) {
                          categoryName = 'shopping';
                        } else {
                          categoryName = category;
                        }
                      }
                      
                      return (
                        <div 
                          key={expense.id || `${expense.timestamp}-${expense.amount}-${Math.random()}`}
                          className="bg-white rounded-2xl shadow-md p-3 flex items-center justify-between"
                        >
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm">
                            <DynamicIcon iconName={expense.main_tag_icon || categoryName} size={20} className="text-gray-700" />
                          </div>
                          <div className="flex-1 ml-3">
                            <p className="font-medium text-gray-800">{expense.short_text}</p>
                            <p className="text-xs text-gray-500">{formattedDate}</p>
                          </div>
                          <p className="font-bold text-gray-800">-${parseFloat(expense.amount).toFixed(2)}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <div key="add-expense">
                  <Link href="/chat" legacyBehavior>
                    <a className="block">
                      <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-800">Add Expense</span>
                      </div>
                    </a>
                  </Link>
                </div>
                
                <div key="monthly-report">
                  <Link href="/reports" legacyBehavior>
                    <a className="block">
                      <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-secondary">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-800">Monthly Report</span>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

// Helper functions
function getCategoryColor(category) {
  const colors = {
    'Food': 'bg-orange-500',
    'Transport': 'bg-blue-500',
    'Shopping': 'bg-purple-500',
    'Entertainment': 'bg-red-500',
    'Bills': 'bg-yellow-500',
    'Health': 'bg-green-500',
    'Personal': 'bg-indigo-500',
  };
  
  return colors[category] || 'bg-gray-500';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}