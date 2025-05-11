import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import expenseService from '../services/expenseService';
import userService from '../services/userService';
import DynamicIcon from '../components/DynamicIcon';
import LoadingAnimation from '../components/LoadingAnimation';
import MonthlyExpenseChart from '../components/MonthlyExpenseChart';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [activeTab, setActiveTab] = useState('monthly');
  const [error, setError] = useState(null);
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [weeklyExpenses, setWeeklyExpenses] = useState([]);
  const [budget, setBudget] = useState(null); // Will be fetched from the backend
  
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        // Fetch expenses and user data in parallel
        const [data, userData] = await Promise.all([
          expenseService.getExpenses(),
          userService.getUserData()
        ]);
        
        // Set budget from user data if available
        if (userData && userData.budget) {
          setBudget(userData.budget);
        }
        
        // Sort expenses by date (newest first)
        const sortedExpenses = [...data].sort((a, b) => 
          new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date)
        );
        
        setExpenses(sortedExpenses);
        
        // Calculate date ranges
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        // For weekly calculation
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        // Filter monthly expenses
        const monthlyExpenses = data.filter(expense => {
          const expenseDate = new Date(expense.timestamp || expense.date);
          return expenseDate.getMonth() === currentMonth && 
                 expenseDate.getFullYear() === currentYear;
        });
        
        // Filter weekly expenses
        const weeklyExpenses = data.filter(expense => {
          const expenseDate = new Date(expense.timestamp || expense.date);
          return expenseDate >= oneWeekAgo;
        });
        
        // Calculate monthly total
        const monthlyTotal = monthlyExpenses.reduce((sum, expense) => 
          sum + (parseFloat(expense.amount) || 0), 0
        );
        
        // Calculate weekly total
        const weeklyTotal = weeklyExpenses.reduce((sum, expense) => 
          sum + (parseFloat(expense.amount) || 0), 0
        );
        
        setMonthlyTotal(monthlyTotal);
        setWeeklyTotal(weeklyTotal);
        
        // Generate daily spending data for the current month
        const dailySpendingMap = {};
        
        // Initialize all days of the current month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
          const dayStr = i.toString();
          dailySpendingMap[dayStr] = { day: dayStr, amount: 0 };
        }
        
        // Fill in the actual spending data
        monthlyExpenses.forEach(expense => {
          const expenseDate = new Date(expense.timestamp || expense.date);
          const day = expenseDate.getDate().toString();
          if (dailySpendingMap[day]) {
            dailySpendingMap[day].amount += parseFloat(expense.amount) || 0;
          }
        });
        
        // Convert to array and sort by day
        const dailySpendingArray = Object.values(dailySpendingMap)
          .sort((a, b) => parseInt(a.day) - parseInt(b.day));
        
        setDailyExpenses(dailySpendingArray);
        
        // Generate weekly spending data
        const weeklySpendingMap = {};
        
        // Get the start of the week (Sunday)
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        
        // Initialize all days of the current week
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 0; i < 7; i++) {
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + i);
          weeklySpendingMap[i] = { 
            day: dayNames[i], 
            date: new Date(day), 
            amount: 0 
          };
        }
        
        // Fill in the actual spending data
        weeklyExpenses.forEach(expense => {
          const expenseDate = new Date(expense.timestamp || expense.date);
          const dayIndex = expenseDate.getDay(); // 0 = Sunday, 6 = Saturday
          if (weeklySpendingMap[dayIndex]) {
            weeklySpendingMap[dayIndex].amount += parseFloat(expense.amount) || 0;
          }
        });
        
        // Convert to array
        const weeklySpendingArray = Object.values(weeklySpendingMap);
        
        setWeeklyExpenses(weeklySpendingArray);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch expenses:', err);
        setError('Failed to load expenses');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExpenses();
  }, [user]);
  
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
          <title>Dashboard | MoneyManager</title>
        </Head>
        
        <div className="px-4 py-6 max-w-lg mx-auto">
          {/* Header with Welcome and Date/Time */}
          <header className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome!</h1>
                <p className="text-gray-500">
                  {user && (user.displayName || user.email)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  {(() => {
                    const now = new Date();
                    const options = { month: 'long', day: 'numeric' };
                    const dateStr = now.toLocaleDateString('en-US', options);
                    const hours = now.getHours();
                    const minutes = now.getMinutes().toString().padStart(2, '0');
                    return `${dateStr}, ${hours}:${minutes}`;
                  })()}
                </p>
              </div>
            </div>
          </header>
          
          {/* Tabs */}
          <div className="flex bg-white rounded-full p-1 shadow-md mb-6 relative overflow-hidden">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all relative z-10 ${
                activeTab === 'monthly'
                  ? 'text-white font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={activeTab === 'monthly' ? { background: 'linear-gradient(135deg, #42A5F5, #cf8ef9, #fe9169)' } : {}}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all relative z-10 ${
                activeTab === 'weekly'
                  ? 'text-white font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={activeTab === 'weekly' ? { background: 'linear-gradient(135deg, #42A5F5, #cf8ef9, #fe9169)' } : {}}
            >
              Weekly
            </button>
          </div>
          
          {isLoading ? (
            <div className="bg-white rounded-3xl shadow-md p-6 flex justify-center items-center h-64">
              <LoadingAnimation />
            </div>
          ) : error ? (
            <div className="bg-white rounded-3xl shadow-md p-6 text-center">
              <p className="text-red-500">{error}</p>
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
                        <div className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ background: 'linear-gradient(45deg, #42A5F5, #cf8ef9)' }}>
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
                        <div className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ background: 'linear-gradient(45deg, #cf8ef9, #fe9169)' }}>
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