import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/AuthContext'
import DynamicIcon from './DynamicIcon'

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
  // Helper function to map icon names to Font Awesome icon names
  const getIconName = (iconType) => {
    switch (iconType) {
      case 'home': return 'house';
      case 'reports': return 'chart-simple';
      case 'history': return 'clock-rotate-left';
      case 'profile': return 'user';
      case 'add': return 'plus';
      default: return 'circle';
    }
  };
  // Special styling for the add/chat button
  if (icon === 'add') {
    return (
      <Link href={href} className="flex items-center justify-center p-3">
        <div className="flex items-center justify-center h-12 w-12 rounded-full shadow-md bg-gradient-to-r from-[#7B3FE4] to-[#9C6EFF]">
          <DynamicIcon 
            iconName="plus" 
            className="h-6 w-6 text-white" 
          />
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
        <DynamicIcon 
          iconName={getIconName(icon)}
          className={`h-5 w-5 ${active ? 'text-purple-600' : 'text-gray-400'}`}
          style={{ fontWeight: active ? 'bold' : 'normal' }}
        />
      </div>
    </Link>
  )
}
