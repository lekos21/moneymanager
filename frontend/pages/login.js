import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import LoadingAnimation from '../components/LoadingAnimation';
import { FiPieChart, FiTrendingUp, FiShield } from 'react-icons/fi';

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
          <div className="text-center md:text-left mb-8">
            <div className="mb-4 relative w-40 h-40 mx-auto md:mx-0 transform transition-all duration-500 hover:scale-105">
              <Image 
                src="/PiggyLogo.png" 
                alt="Piggy Logo" 
                width={160} 
                height={160} 
                priority
                className="object-contain drop-shadow-lg"
              />
            </div>
            <h1 className="text-5xl font-black mb-3 leading-normal pb-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-700 bg-clip-text text-transparent">Piggy</h1>
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
