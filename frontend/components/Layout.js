import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'

export default function Layout({ children }) {
  const router = useRouter()
  const { user } = useAuth()
  
  // Don't show navigation on login page
  const isLoginPage = router.pathname === '/login' || router.pathname === '/'
  
  if (isLoginPage) {
    return <main className="min-h-screen bg-gradient-to-br from-[#7B3FE4] to-[#9C6EFF]">{children}</main>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 pb-16">{children}</main>
      
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 backdrop-blur-sm">
        <div className="flex justify-around items-center h-16">
          <NavItem href="/home" icon="home" active={router.pathname === '/home'} />
          <NavItem href="/reports" icon="reports" active={router.pathname === '/reports'} />
          <NavItem href="/chat" icon="add" active={router.pathname === '/chat'} />
          <NavItem href="/history" icon="history" active={router.pathname === '/history'} />
          <NavItem href="/profile" icon="profile" active={router.pathname === '/profile'} />
        </div>
      </nav>
    </div>
  )
}

function NavItem({ href, icon, active }) {
  // Special styling for the add/chat button
  if (icon === 'add') {
    return (
      <Link href={href} className="flex items-center justify-center p-3">
        <div className="flex items-center justify-center h-12 w-12 rounded-full shadow-md"
          style={{
            background: 'linear-gradient(45deg, #42A5F5, #cf8ef9, #fe9169)'
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </Link>
    )
  }
  
  return (
    <Link href={href} className="flex items-center justify-center p-3">
      <div className={`flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ${active ? 'scale-110 shadow-sm' : ''}`}
        style={{
          background: active 
            ? 'rgba(124, 58, 237, 0.15)' 
            : 'transparent'
        }}>
        {icon === 'home' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${active ? 'text-purple-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )}
        {icon === 'reports' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${active ? 'text-purple-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )}
        {icon === 'history' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${active ? 'text-purple-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {icon === 'profile' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${active ? 'text-purple-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2 : 1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>
    </Link>
  )
}
