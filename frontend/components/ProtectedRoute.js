import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Only run the check once when component mounts or auth state changes
    if (!loading) {
      if (!isAuthenticated()) {
        router.push('/login');
      } else {
        setAuthChecked(true);
      }
    }
  }, [isAuthenticated, loading, router]);

  // Show minimal loading state while checking
  if (loading || !authChecked) {
    return <div className="flex items-center justify-center h-screen bg-gray-50"></div>;
  }

  // If authenticated, show the protected content
  return children;
}

export default ProtectedRoute;
