import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Index() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to login page
    router.push('/login')
  }, [router])
  
  return (
    <>
      <Head>
        <title>MoneyManager</title>
      </Head>
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block mb-4 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xl font-medium bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Loading...</p>
        </div>
      </div>
    </>
  )
}
