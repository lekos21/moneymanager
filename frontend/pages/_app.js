import '../styles/globals.css'
import { SWRConfig } from 'swr'
import { AuthProvider } from '../contexts/AuthContext'
import { TagsProvider } from '../contexts/TagsContext'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <TagsProvider>
        <Head>
          <title>MoneyManager - Track Your Expenses</title>
          <meta name="description" content="A modern expense tracking application" />
        </Head>
        <SWRConfig value={{ 
          fetcher: (resource, init) => {
            // Get token from localStorage
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            
            // Add authorization header if token exists
            const headers = {
              'Content-Type': 'application/json',
              ...(token && { 'Authorization': `Bearer ${token}` })
            };
            
            return fetch(`${process.env.NEXT_PUBLIC_API_URL}${resource}`, {
              ...init,
              headers: {
                ...headers,
                ...(init?.headers || {})
              }
            }).then(res => {
              // Handle unauthorized responses
              if (res.status === 401 && typeof window !== 'undefined') {
                localStorage.removeItem('token');
                window.location.href = '/';
                return Promise.reject('Unauthorized');
              }
              return res.json();
            });
          }
        }}>
          <Component {...pageProps} />
        </SWRConfig>
      </TagsProvider>
    </AuthProvider>
  )
}

export default MyApp
