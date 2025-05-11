import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import DateRangeSelector from '../components/DateRangeSelector';
import ExpenseDoughnutChart from '../components/ExpenseDoughnutChart';
import LoadingAnimation from '../components/LoadingAnimation';
import expenseService from '../services/expenseService';

export default function Reports() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // First day of current month
    endDate: new Date(), // Today
    rangeId: 'thisMonth'
  });

  // Fetch all expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const data = await expenseService.getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Filter expenses based on date range
  useEffect(() => {
    if (!expenses.length) {
      setFilteredExpenses([]);
      return;
    }

    const { startDate, endDate } = dateRange;
    
    // Ensure we have valid date objects
    const start = startDate instanceof Date ? startDate : new Date(startDate);
    const end = endDate instanceof Date ? endDate : new Date(endDate);
    
    // Set time to beginning and end of day for accurate comparison
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const filtered = expenses.filter(expense => {
      const expenseDate = new Date(expense.timestamp);
      return expenseDate >= start && expenseDate <= end;
    });

    setFilteredExpenses(filtered);
  }, [expenses, dateRange]);

  // Handle date range change
  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>Reports | MoneyManager</title>
        </Head>
        
        <div className="px-4 py-6 max-w-lg mx-auto">
          {/* Header */}
          <header className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
            <p className="text-gray-500 mb-4">View your spending analytics</p>
            
            {/* Date Range Selector */}
            <DateRangeSelector onDateRangeChange={handleDateRangeChange} />
          </header>
          
          {/* Main content */}
          <div className="mt-6">
            {/* Doughnut Chart */}
            <ExpenseDoughnutChart 
              expenses={filteredExpenses} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
