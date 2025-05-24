import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import userService from '../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDollarSign, 
  faCoins, 
  faSignOutAlt, 
  faChevronRight, 
  faBell, 
  faShieldAlt, 
  faUser,
  faCrown
} from '@fortawesome/free-solid-svg-icons';
import PageErrorBoundary from '../components/PageErrorBoundary';
import LoadingAnimation from '../components/LoadingAnimation';
import { useUserData } from '../hooks/useUserData';

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  // Use SWR hook for user data
  const { 
    userData, 
    isLoading, 
    isError, 
    mutate: refreshUserData 
  } = useUserData({
    shouldFetch: !!user,
    revalidateOnFocus: true
  });
  // Local state
  const [budget, setBudget] = useState(userData?.budget?.toString() || '');
  const [preferredCurrency, setPreferredCurrency] = useState(userData?.preferred_currency || 'EUR');
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Derived user stats
  const userStats = {
    totalExpenses: userData?.totalExpenses || 0,
    totalCategories: userData?.totalCategories || 0,
    expenseCount: userData?.expenseCount || 0,
    streak: userData?.streak || 0
  };

  const CURRENCY_SYMBOLS = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'CA$',
    AUD: 'A$',
    CHF: 'CHF',
    CNY: '¥',
    INR: '₹',
  };
  const CURRENCIES = Object.keys(CURRENCY_SYMBOLS);

  const getCurrencySymbol = (currencyCode) => {
    return CURRENCY_SYMBOLS[currencyCode] || currencyCode || '';
  };

  // Update local state when userData changes
  useEffect(() => {
    if (userData) {
      if (userData.budget) setBudget(userData.budget.toString());
      if (userData.preferred_currency) {
        setPreferredCurrency(userData.preferred_currency);
      }
    }
  }, [userData]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBudget(value);
    }
  };

  const handleCurrencyChange = async (e) => {
    const newCurrency = e.target.value;
    
    if (newCurrency === preferredCurrency) return;
    
    try {
      setIsSaving(true);
      const updatedData = await userService.updateUserData({ preferred_currency: newCurrency });
      setPreferredCurrency(newCurrency);
      refreshUserData();
      setNotification({ show: true, message: 'Currency updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Failed to update currency:', error);
      setNotification({ show: true, message: 'Failed to update currency.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const saveBudget = async () => {
    try {
      setIsSaving(true);
      const budgetValue = budget === '' ? 0 : parseFloat(budget);
      const updatedData = await userService.updateUserData({ budget: budgetValue });
      refreshUserData();
      setNotification({ show: true, message: 'Budget updated successfully!', type: 'success' });
      setShowBudgetModal(false);
    } catch (error) {
      console.error('Failed to update budget:', error);
      setNotification({ show: true, message: 'Failed to update budget.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  // Render loading state if data is being fetched
  if (isLoading) {
    return (
      <ProtectedRoute>
        <Layout>
          <LoadingAnimation />
        </Layout>
      </ProtectedRoute>
    );
  }

  // Render error state if data fetch failed
  if (isError) {
    return (
      <ProtectedRoute>
        <PageErrorBoundary>
          <Layout>
            <div className="flex items-center justify-center h-screen">
              <p className="text-red-500">Error loading profile. Please try again later.</p>
            </div>
          </Layout>
        </PageErrorBoundary>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <PageErrorBoundary>
        <Layout>
          <Head>
            <title>Profile | MoneyManager</title>
          </Head>

          <div className="px-4 py-6 max-w-lg mx-auto">
            {/* Header */}
            <header className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
              <p className="text-gray-500">Manage your account</p>
            </header>
            
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center">
                <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-200 mr-4">
                  {user?.photoURL && !imageError ? (
                    <Image 
                      src={user.photoURL} 
                      alt="Profile" 
                      layout="fill"
                      objectFit="cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-purple-100 text-purple-500">
                      <FontAwesomeIcon icon={faUser} className="text-2xl" />
                    </div>
                  )}
                </div>
                
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">{user?.displayName || 'User'}</h1>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
            
            {/* Premium Account Tier Card */}
            <div className="bg-gradient-to-r from-[#7B3FE4] to-[#9C6EFF] rounded-xl shadow-lg p-6 mb-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faCrown} className="text-yellow-300 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Premium Account</h3>
                    <p className="text-purple-100 text-sm">Active Subscription</p>
                  </div>
                </div>
              </div>
              <p className="text-purple-100 text-sm leading-relaxed">
                Enjoy unlimited expense tracking.
              </p>
            </div>
            
            {/* Settings */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {/* Budget Setting */}
                <div className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Monthly Budget</h3>
                    <p className="text-sm text-gray-500">Set your monthly spending limit</p>
                  </div>
                  <button 
                    onClick={() => setShowBudgetModal(true)}
                    className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
                  >
                    {userData?.budget ? `${getCurrencySymbol(preferredCurrency)}${userData.budget}` : 'Set Budget'}
                    <FontAwesomeIcon icon={faChevronRight} className="ml-2 text-sm" />
                  </button>
                </div>
                
                {/* Currency Setting */}
                <div className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Currency</h3>
                    <p className="text-sm text-gray-500">Select your preferred currency</p>
                  </div>
                  <select
                    value={preferredCurrency}
                    onChange={handleCurrencyChange}
                    className="border border-gray-300 rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isSaving}
                  >
                    {CURRENCIES.map(currency => (
                      <option key={currency} value={currency}>
                        {currency} ({getCurrencySymbol(currency)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
          </div>
          
          {/* Budget Modal */}
          {showBudgetModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">Set Monthly Budget</h3>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="budget">
                    Budget Amount ({getCurrencySymbol(preferredCurrency)})
                  </label>
                  <input
                    id="budget"
                    type="text"
                    value={budget}
                    onChange={handleBudgetChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter amount"
                  />

                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      onClick={() => setShowBudgetModal(false)}
                      className="px-4 py-2 mt-4 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors font-medium"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveBudget}
                      className={`px-4 py-2 mt-4 rounded-lg text-white font-medium transition-colors ${!budget || isSaving ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                      disabled={!budget || isSaving}
                    >
                      {isSaving ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : 'Save Budget'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Toast */}
          {notification.show && (
            <div className="fixed top-5 inset-x-0 flex justify-center items-start z-[100] px-4">
              <div className={`rounded-lg shadow-lg p-4 flex items-center text-white text-sm font-medium max-w-md w-full animate-fade-in-down
                ${notification.type === 'success' ? 'bg-green-500' : 
                  notification.type === 'error' ? 'bg-red-500' : 
                  'bg-blue-500'}`}>
                {notification.type === 'success' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : notification.type === 'error' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                )}
                {notification.message}
              </div>
            </div>
          )}
        </Layout>
      </PageErrorBoundary>
    </ProtectedRoute>
  );
}