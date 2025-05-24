import useSWR from 'swr';
import expenseService from '../services/expenseService';

/**
 * Custom hook for fetching and managing expenses data
 * Uses SWR for caching, revalidation, and deduplication
 * 
 * @param {Object} options - SWR configuration options
 * @returns {Object} - Expenses data, loading state, error state, and mutate function
 */
export function useExpenses(options = {}) {
  const {
    shouldFetch = true,
    revalidateOnFocus = false,
    dedupingInterval = 30000, // 30 seconds
    ...swrOptions
  } = options;

  // Use SWR to fetch expenses data
  const { data, error, mutate, isValidating } = useSWR(
    shouldFetch ? '/api/expenses/' : null,
    async () => {
      try {
        const data = await expenseService.getExpenses();
        // Sort expenses by date (newest first)
        return [...data].sort((a, b) => 
          new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date)
        );
      } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
      }
    },
    {
      revalidateOnFocus,
      dedupingInterval,
      ...swrOptions
    }
  );

  return {
    expenses: data || [],
    isLoading: !error && !data,
    isValidating,
    isError: error,
    mutate
  };
}

/**
 * Custom hook for expense statistics based on the current expenses data
 * 
 * @param {Array} expenses - Array of expense objects
 * @returns {Object} - Calculated expense statistics
 */
export function useExpenseStats(expenses = []) {
  // Calculate date ranges
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // For weekly calculation
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  // Filter monthly expenses
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.timestamp || expense.date);
    return expenseDate.getMonth() === currentMonth && 
           expenseDate.getFullYear() === currentYear;
  });
  
  // Filter weekly expenses
  const weeklyExpenses = expenses.filter(expense => {
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
  const dailyExpenses = Object.values(dailySpendingMap).sort((a, b) => 
    parseInt(a.day) - parseInt(b.day)
  );

  // Generate weekly spending data for the chart (last 7 days)
  const weeklySpendingMap = {};
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Initialize last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayName = dayNames[date.getDay()];
    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    weeklySpendingMap[dateKey] = { 
      day: dayName,
      date: dateKey,
      amount: 0 
    };
  }
  
  // Fill in the actual spending data for weekly chart
  weeklyExpenses.forEach(expense => {
    const expenseDate = new Date(expense.timestamp || expense.date);
    const dateKey = expenseDate.toISOString().split('T')[0];
    if (weeklySpendingMap[dateKey]) {
      weeklySpendingMap[dateKey].amount += parseFloat(expense.amount) || 0;
    }
  });
  
  // Convert to array and sort by date
  const weeklyExpensesChart = Object.values(weeklySpendingMap).sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  return {
    monthlyTotal,
    weeklyTotal,
    monthlyExpenses,
    weeklyExpenses,
    dailyExpenses,
    weeklyExpensesChart
  };
}
