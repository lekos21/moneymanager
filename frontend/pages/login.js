import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import LoadingAnimation from '../components/LoadingAnimation';

export default function Login() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user && !loading) {
      router.push('/chat');
    }
    
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateIn(true);
    }, 100);
  }, [user, loading, router]);

  return (
    <>
      <Head>
        <title>Login | MoneyManager</title>
      </Head>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className={`transform transition-all duration-700 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-8">
            <div className="inline-block p-4 mb-4 rounded-3xl shadow-md" 
              style={{
                background: 'linear-gradient(45deg, #42A5F5, #cf8ef9, #fe9169)'
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">MoneyManager</h1>
            <p className="text-gray-600 text-lg">Track, analyze, and optimize your expenses</p>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-8 max-w-md w-full">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <LoadingAnimation />
                <p className="mt-4 text-gray-600">Loading your account...</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Welcome Back</h2>
                
                <div className="space-y-4">
                  <GoogleLoginButton />
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Coming soon</span>
                    </div>
                  </div>
                  
                  <button 
                    disabled 
                    className="w-full py-3 px-4 bg-gray-100 text-gray-400 rounded-full font-medium opacity-70 cursor-not-allowed"
                  >
                    Sign in with Email
                  </button>
                </div>
                
                <p className="mt-8 text-center text-sm text-gray-500">
                  By signing in, you agree to our{' '}
                  <a href="#" className="font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Privacy Policy
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
