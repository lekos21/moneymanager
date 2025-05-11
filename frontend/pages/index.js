import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import LoadingAnimation from '../components/LoadingAnimation'

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
          <LoadingAnimation type="spinner" size="large" text="Loading..." />
        </div>
      </div>
    </>
  )
}
