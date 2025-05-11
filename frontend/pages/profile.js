import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
  faUser
} from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userStats, setUserStats] = useState(null);
  const [userData, setUserData] = useState(null);
  const [budget, setBudget] = useState('');
  const [preferredCurrency, setPreferredCurrency] = useState('');
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isSaving, setIsSaving] = useState(false);

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await userService.getUserData();
        setUserData(data);
        if (data.budget) setBudget(data.budget.toString());
        if (data.preferred_currency) {
          setPreferredCurrency(data.preferred_currency);
        } else {
          setPreferredCurrency('EUR');
        }
        setUserStats({
          totalExpenses: data.totalExpenses || 1250.75,
          totalCategories: data.totalCategories || 8,
          expenseCount: data.expenseCount || 42,
          streak: data.streak || 0,
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setNotification({ show: true, message: 'Could not load user data.', type: 'error' });
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

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
      setUserData(updatedData);
      setPreferredCurrency(newCurrency);
      setNotification({
        show: true,
        message: 'Currency updated successfully!',
        type: 'success'
      });
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    } catch (error) {
      console.error('Failed to update currency:', error);
      setNotification({
        show: true,
        message: 'Failed to update currency.',
        type: 'error'
      });
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const saveBudget = async () => {
    try {
      setIsSaving(true);
      const updatedData = await userService.updateUserData({ budget: budget ? parseFloat(budget) : null });
      setUserData(updatedData);
      setNotification({
        show: true,
        message: budget ? 'Budget updated successfully!' : 'Budget removed successfully!',
        type: 'success'
      });
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
      setShowBudgetModal(false);
    } catch (error) {
      console.error('Failed to update budget:', error);
      setNotification({
        show: true,
        message: 'Failed to update budget.',
        type: 'error'
      });
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedRoute>
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

          {/* User Info Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 shadow-sm mb-4 sm:mb-0 sm:mr-6"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-4 sm:mb-0 sm:mr-6 border-2 border-gray-100">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <FontAwesomeIcon icon={faUser} className="w-8 h-8" />}
                </div>
              )}
              
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold">{user?.displayName || 'User'}</h2>
                <p className="text-gray-500 mb-4">{user?.email}</p>
                
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ) : userStats ? (
                  <div className="flex justify-between mt-2 bg-gray-50 rounded-lg p-3">
                    <div className="text-center px-3">
                      <p className="text-sm text-gray-500">Expenses</p>
                      <p className="text-xl font-bold">{userStats.expenseCount}</p>
                    </div>
                    <div className="text-center px-3 border-x border-gray-200">
                      <p className="text-sm text-gray-500">Categories</p>
                      <p className="text-xl font-bold">{userStats.totalCategories}</p>
                    </div>
                    <div className="text-center px-3">
                      <p className="text-sm text-gray-500">Streak</p>
                      <p className="text-xl font-bold">{userStats.streak} days</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">Settings</h2>

            <div className="divide-y divide-gray-100">
              {/* Budget Setting */}
              <button
                onClick={() => setShowBudgetModal(true)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-4 text-blue-500">
                    <FontAwesomeIcon icon={faDollarSign} className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-gray-800">Monthly Budget</span>
                    <p className="text-sm text-gray-500">
                      {userData?.budget ? `${getCurrencySymbol(preferredCurrency)}${parseFloat(userData.budget).toFixed(2)}` : 'Not set'}
                    </p>
                  </div>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-400" />
              </button>

              {/* Preferred Currency Setting */}
              <div className="w-full flex items-center justify-between p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-4 text-purple-500">
                    <FontAwesomeIcon icon={faCoins} className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-gray-800">Preferred Currency</span>
                    <p className="text-sm text-gray-500">
                      Current: {preferredCurrency ? `${preferredCurrency} (${getCurrencySymbol(preferredCurrency)})` : 'Not set'}
                    </p>
                  </div>
                </div>
                <select
                  value={preferredCurrency}
                  onChange={handleCurrencyChange}
                  className="text-sm text-gray-700 border border-gray-200 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  disabled={isSaving}
                >
                  {CURRENCIES.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency} ({getCurrencySymbol(currency)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Account & Security */}
              <div 
                className="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setNotification({ show: true, message: 'Account Security settings coming soon!', type: 'info' })}
              >
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4 text-green-500">
                  <FontAwesomeIcon icon={faShieldAlt} className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">Account & Security</p>
                  <p className="text-sm text-gray-500">Manage password, 2FA</p>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-400" />
              </div>

              {/* Notifications */}
              <div 
                className="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setNotification({ show: true, message: 'Notification settings coming soon!', type: 'info' })}
              >
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center mr-4 text-yellow-500">
                  <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">Notifications</p>
                  <p className="text-sm text-gray-500">Manage app notifications</p>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center mb-6 hover:bg-red-50 transition-colors"
          >
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-4 text-red-500">
              <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
            </div>
            <span className="font-medium text-gray-800">Logout</span>
          </button>

          {/* Budget Modal */}
          {showBudgetModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-white p-5 rounded-xl shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Set Monthly Budget</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Currency: {preferredCurrency} ({getCurrencySymbol(preferredCurrency)})
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="budgetAmount" className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">{getCurrencySymbol(preferredCurrency)}</span>
                      </div>
                      <input
                        id="budgetAmount"
                        type="text"
                        inputMode="decimal"
                        value={budget}
                        onChange={handleBudgetChange}
                        placeholder="e.g., 500.00"
                        className="pl-8 pr-3 py-3 block w-full text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Enter your monthly spending limit. Leave empty to remove budget.
                    </p>
                  </div>

                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      onClick={() => setShowBudgetModal(false)}
                      className="px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors font-medium"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveBudget}
                      className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${!budget || isSaving ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
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
        </div>
      </Layout>
    </ProtectedRoute>
  );
}