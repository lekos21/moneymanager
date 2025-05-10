import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';

export default function Reports() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('weekly');
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState(null);
  
  useEffect(() => {
    // Simulate loading report data
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock data for reports
      const mockWeeklyData = {
        totalSpent: 180.50,
        categories: [
          { name: 'Food', amount: 85.25, percentage: 47, color: 'from-orange-400 to-orange-500' },
          { name: 'Transport', amount: 35.00, percentage: 19, color: 'from-blue-400 to-blue-500' },
          { name: 'Shopping', amount: 45.25, percentage: 25, color: 'from-purple-400 to-purple-500' },
          { name: 'Other', amount: 15.00, percentage: 9, color: 'from-gray-400 to-gray-500' },
        ],
        dailySpending: [
          { day: 'Mon', amount: 25.50, color: 'from-blue-400 to-purple-500' },
          { day: 'Tue', amount: 15.00, color: 'from-blue-400 to-purple-500' },
          { day: 'Wed', amount: 35.25, color: 'from-blue-400 to-purple-500' },
          { day: 'Thu', amount: 45.25, color: 'from-blue-400 to-purple-500' },
          { day: 'Fri', amount: 35.00, color: 'from-blue-400 to-purple-500' },
          { day: 'Sat', amount: 20.50, color: 'from-blue-400 to-purple-500' },
          { day: 'Sun', amount: 4.00, color: 'from-blue-400 to-purple-500' },
        ]
      };
      
      const mockMonthlyData = {
        totalSpent: 720.80,
        categories: [
          { name: 'Food', amount: 320.75, percentage: 44, color: 'from-orange-400 to-orange-500' },
          { name: 'Transport', amount: 150.30, percentage: 21, color: 'from-blue-400 to-blue-500' },
          { name: 'Shopping', amount: 180.25, percentage: 25, color: 'from-purple-400 to-purple-500' },
          { name: 'Bills', amount: 69.50, percentage: 10, color: 'from-yellow-400 to-yellow-500' },
        ],
        weeklySpending: [
          { week: 'Week 1', amount: 180.50, color: 'from-blue-400 to-purple-500' },
          { week: 'Week 2', amount: 210.30, color: 'from-blue-400 to-purple-500' },
          { week: 'Week 3', amount: 150.75, color: 'from-blue-400 to-purple-500' },
          { week: 'Week 4', amount: 179.25, color: 'from-blue-400 to-purple-500' },
        ]
      };
      
      setReportData({
        weekly: mockWeeklyData,
        monthly: mockMonthlyData
      });
      
      setIsLoading(false);
    }, 1500);
  }, []);
  
  const data = reportData && reportData[activeTab];

  return (
    <ProtectedRoute>
      <Layout>
        <Head>
          <title>Reports | MoneyManager</title>
        </Head>
        
        <div className="px-4 py-6 max-w-lg mx-auto">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
            <p className="text-gray-500">View your spending analytics</p>
          </header>
          
          {/* Tabs */}
          <div className="flex bg-white rounded-full p-1 shadow-md mb-6">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'weekly'
                  ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'monthly'
                  ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly
            </button>
          </div>
          
          {isLoading ? (
            // Skeleton loading
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
              </div>
              
              <div className="bg-white rounded-3xl shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          ) : data ? (
            <div className="space-y-6">
              {/* Total Spent Card */}
              <div className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 rounded-3xl shadow-lg p-6 text-white">
                <h2 className="text-sm font-medium text-white text-opacity-90 mb-2">
                  {activeTab === 'weekly' ? 'Weekly' : 'Monthly'} Spending
                </h2>
                <p className="text-4xl font-bold mb-6">$ {data.totalSpent.toFixed(2)}</p>
                
                {/* Chart */}
                <div className="flex items-end h-24 space-x-2">
                  {activeTab === 'weekly' ? (
                    // Daily spending chart
                    data.dailySpending.map((day, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full rounded-t-lg bg-gradient-to-t from-white/30 to-white/10"
                          style={{ 
                            height: `${(day.amount / Math.max(...data.dailySpending.map(d => d.amount))) * 100}px`
                          }}
                        ></div>
                        <p className="text-xs text-white mt-2">{day.day}</p>
                      </div>
                    ))
                  ) : (
                    // Weekly spending chart
                    data.weeklySpending.map((week, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full rounded-t-lg bg-gradient-to-t from-white/30 to-white/10"
                          style={{ 
                            height: `${(week.amount / Math.max(...data.weeklySpending.map(w => w.amount))) * 100}px`
                          }}
                        ></div>
                        <p className="text-xs text-white mt-2">{week.week}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Categories Card */}
              <div className="bg-white rounded-3xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Spending by Category</h2>
                
                <div className="space-y-4">
                  {data.categories.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color} mr-2`}></div>
                          <span className="text-sm font-medium text-gray-700">{category.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">${category.amount.toFixed(2)} ({category.percentage}%)</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r ${category.color}`}
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-4">
                <button className="flex-1 bg-white rounded-2xl shadow-md p-4 flex items-center justify-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800">Download PDF</span>
                </button>
                
                <button className="flex-1 bg-white rounded-2xl shadow-md p-4 flex items-center justify-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800">Share Report</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-md p-6 text-center">
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
