import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import LoadingAnimation from '../components/LoadingAnimation';
import { FiPieChart, FiTrendingUp, FiShield, FiEye, FiEyeOff, FiMail, FiLock, FiUser } from 'react-icons/fi';

export default function Login() {
  const router = useRouter();
  const { user, loading, signInWithEmail, signUp, error, setError } = useAuth();
  const [animateIn, setAnimateIn] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin', 'signup', or 'google'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user && !loading) {
      router.push('/home');
    }
    
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateIn(true);
    }, 100);
  }, [user, loading, router]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (authMode === 'signup') {
      if (!formData.displayName) {
        errors.displayName = 'Display name is required';
      }
      
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormLoading(true);
    setError(null);
    
    try {
      if (authMode === 'signin') {
        await signInWithEmail(formData.email, formData.password);
        router.push('/home');
      } else if (authMode === 'signup') {
        await signUp(formData.email, formData.password, formData.displayName);
        router.push('/home');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Error is handled by AuthContext
    } finally {
      setFormLoading(false);
    }
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    });
    setFormErrors({});
    setError(null);
  };

  const renderEmailForm = () => (
    <form onSubmit={handleSubmit} className="space-y-3">
      {authMode === 'signup' && (
        <div>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="displayName"
              placeholder="Display Name"
              value={formData.displayName}
              onChange={handleInputChange}
              className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm ${
                formErrors.displayName ? 'border-red-500' : 'border-gray-200'
              }`}
            />
          </div>
          {formErrors.displayName && (
            <p className="text-red-500 text-xs mt-1">{formErrors.displayName}</p>
          )}
        </div>
      )}
      
      <div>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm ${
              formErrors.email ? 'border-red-500' : 'border-gray-200'
            }`}
          />
        </div>
        {formErrors.email && (
          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
        )}
      </div>
      
      <div>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full pl-9 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm ${
              formErrors.password ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
          </button>
        </div>
        {formErrors.password && (
          <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
        )}
      </div>
      
      {authMode === 'signup' && (
        <div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full pl-9 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm ${
                formErrors.confirmPassword ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
            </button>
          </div>
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
          )}
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-2.5">
          <p className="text-red-600 text-xs">{error}</p>
        </div>
      )}
      
      <button
        type="submit"
        disabled={formLoading}
        className="w-full bg-gradient-to-r from-[#7B3FE4] to-[#9C6EFF] text-white py-2.5 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
      >
        {formLoading ? (
          <div className="flex items-center justify-center">
            <LoadingAnimation type="spinner" />
            <span className="ml-2">
              {authMode === 'signin' ? 'Signing in...' : 'Creating account...'}
            </span>
          </div>
        ) : (
          authMode === 'signin' ? 'Sign In' : 'Create Account'
        )}
      </button>
    </form>
  );

  return (
    <>
      <Head>
        <title>Login | Piggy</title>
      </Head>
      <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 z-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  opacity: Math.random() * 0.3,
                  filter: 'blur(40px)',
                  animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Main content */}
        <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className={`transform transition-all duration-700 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} md:w-1/2`}>
          <div className="text-center md:text-left mb-4">
            <div className="relative w-40 h-40 mx-auto md:mx-0 transform transition-all duration-500 hover:scale-105">
              <Image 
                src="/PiggyLogo.png" 
                alt="Piggy Logo" 
                width={160} 
                height={160} 
                priority
                className="object-contain drop-shadow-lg"
              />
            </div>
            <h1 className="text-5xl font-black leading-normal pb-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-700 bg-clip-text text-transparent">Piggy</h1>
            <p className="text-gray-600 text-xl max-w-md">Track, analyze and optimize your expenses</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8 max-w-md w-full transition-all duration-300 hover:shadow-lg">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <LoadingAnimation type="spinner" />
                <p className="mt-4 text-gray-600">Loading your account...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Google Login - Priority */}
                <GoogleLoginButton />
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                {/* Auth Mode Selector */}
                <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => switchAuthMode('signin')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      authMode === 'signin'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => switchAuthMode('signup')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      authMode === 'signup'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Email Form */}
                {renderEmailForm()}
              </div>
            )}
            <p className="mt-8 text-center text-sm text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="font-medium bg-gradient-to-r from-purple-700 via-blue-500 to-cyan-400 bg-clip-text text-transparent hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium bg-gradient-to-r from-purple-700 via-blue-500 to-cyan-400 bg-clip-text text-transparent hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Feature highlights - only visible on medium screens and up */}
        <div className="hidden md:block md:w-1/2">
          <div className={`transform transition-all duration-700 delay-300 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Why choose Piggy?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl text-white">
                    <FiPieChart size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Smart Analytics</h3>
                    <p className="text-gray-600">Visualize your spending patterns with beautiful, interactive charts</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white">
                    <FiTrendingUp size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Budget Goals</h3>
                    <p className="text-gray-600">Set and track financial goals with personalized recommendations</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl text-white">
                    <FiShield size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Secure & Private</h3>
                    <p className="text-gray-600">Your financial data is encrypted and never shared with third parties</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </>
  );
}
