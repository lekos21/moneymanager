import { useExpenses } from '../hooks/useExpenses';
import { useAuth } from '../contexts/AuthContext';

export default function DebugExpenses() {
  const { user } = useAuth();
  const { expenses, isLoading, isError } = useExpenses();
  
  console.log('Debug - User:', user);
  console.log('Debug - Expenses:', expenses);
  console.log('Debug - Is Loading:', isLoading);
  console.log('Debug - Is Error:', isError);
  
  return (
    <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
      <h3 className="font-bold">Debug Info:</h3>
      <p>User authenticated: {user ? 'Yes' : 'No'}</p>
      <p>User email: {user?.email || 'N/A'}</p>
      <p>Expenses loading: {isLoading ? 'Yes' : 'No'}</p>
      <p>Expenses error: {isError ? 'Yes' : 'No'}</p>
      <p>Expenses count: {expenses?.length || 0}</p>
      <p>API URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}</p>
    </div>
  );
}
