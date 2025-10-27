import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { LayoutDashboard, Calendar, Clock, Users, UserCog, UserCircle, Briefcase, Settings, Package, ChevronRight, ChevronLeft, LogOut } from 'lucide-react'
import { cn } from '../../lib/utils'
import reactLogo from '../../assets/react.svg'

// Navigation items configuration
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Appointments", href: "/appointments", icon: Calendar },
  { name: "Schedules", href: "/schedules", icon: Clock },
  { name: "Doctors", href: "/doctors", icon: Users },
  { name: "Staff", href: "/staff", icon: UserCog },
  { name: "Patients", href: "/patients", icon: UserCircle },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Settings", href: "/settings", icon: Settings },
]

// Mock user data (replace with actual auth data later)
const mockUser = {
  name: "Dr. John Smith",
  role: "Administrator",
  avatar: "https://ui-avatars.com/api/?name=John+Smith&background=D4AF37&color=000&bold=true"
}

export function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    // Set initial value
    handleResize()
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close logout popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLogoutPopup && !event.target.closest('.logout-popup-container')) {
        setShowLogoutPopup(false)
      }
    }
    
    if (showLogoutPopup) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showLogoutPopup])

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...')
    setShowLogoutPopup(false)
    // Example: redirect to login page
    // window.location.href = '/login'
  }

  if (isMobile) {
    return (
      <>
        {/* Mobile top header: show clinic name + small logo */}
        <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-[#D4AF37]/20 flex items-center px-4 shadow-lg">
          <div className="flex items-center gap-3">
            <img src={reactLogo} alt="React Logo" className="h-5 w-5 object-contain animate-spin-slow" />
            <h1 className="text-sm font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              MCDCN<span className="text-[#D4AF37]">3</span> Dental
            </h1>
          </div>
        </header>

        {/* Mobile bottom navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-gray-900 via-black to-gray-900 border-t border-[#D4AF37]/20 shadow-2xl">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex min-w-full p-2 gap-2 justify-around">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center py-2 px-3 rounded-xl flex-shrink-0 transition-all duration-200 min-w-[64px]",
                      isActive 
                        ? "bg-gradient-to-br from-[#D4AF37] to-[#C4A030] text-black shadow-lg shadow-[#D4AF37]/50" 
                        : "text-gray-400 hover:text-[#D4AF37] hover:bg-white/5"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-[10px] mt-1 whitespace-nowrap font-medium leading-tight">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </>
    )
  }

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 transition-all duration-300 shadow-2xl",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo and Toggle */}
        <div className="flex h-16 items-center justify-between border-b border-[#D4AF37]/20 px-6 bg-black/50">
          <div className="flex items-center gap-3">
            {isCollapsed ? (
              <img
                src={reactLogo}
                alt="React Logo"
                className="h-5 w-5 object-contain transition-all duration-200 animate-spin-slow flex-shrink-0"
              />
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src={reactLogo}
                  alt="React Logo"
                  className="w-8 h-8 object-contain flex-shrink-0 animate-spin-slow drop-shadow-lg"
                />
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  MCDCN<span className="text-[#D4AF37] drop-shadow-lg">3</span> Dental
                </h1>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-[#D4AF37] transition-all duration-200 flex-shrink-0 hover:scale-110"
          >
            {isCollapsed ? 
              <ChevronRight className="h-6 w-6" /> : 
              <ChevronLeft className="h-6 w-6" />
            }
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group",
                  isActive 
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#C4A030] text-black shadow-lg shadow-[#D4AF37]/30" 
                    : "text-gray-400 hover:bg-gradient-to-r hover:from-white/5 hover:to-white/10 hover:text-[#D4AF37]"
                )}
                title={isCollapsed ? item.name : ""}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  !isActive && "group-hover:scale-110"
                )} />
                {!isCollapsed && <span className="transition-all duration-200">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-[#D4AF37]/20 bg-black/50">
          {isCollapsed ? (
            <div className="flex items-center justify-center p-4 logout-popup-container relative">
              <div className="relative group">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="h-10 w-10 rounded-full ring-2 ring-[#D4AF37]/50 cursor-pointer hover:ring-[#D4AF37] transition-all duration-200 hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#D4AF37]/50"
                  title="Click for logout"
                  onClick={() => setShowLogoutPopup(!showLogoutPopup)}
                />
                {/* Pulsing ring effect when popup is active */}
                {showLogoutPopup && (
                  <div className="absolute inset-0 rounded-full ring-2 ring-[#D4AF37] animate-ping"></div>
                )}
              </div>
              
              {/* Logout Popup */}
              {showLogoutPopup && (
                <div className="absolute left-full ml-3 bottom-0 bg-gradient-to-br from-black via-gray-900 to-black border-2 border-[#D4AF37] rounded-xl shadow-2xl shadow-[#D4AF37]/50 py-2 px-2 min-w-[180px] animate-slide-down z-50 backdrop-blur-sm">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-bl-full"></div>
                  
                  {/* User info section */}
                  <div className="px-3 py-2 border-b border-[#D4AF37]/30 mb-2">
                    <p className="text-xs text-[#D4AF37] font-semibold">{mockUser.name}</p>
                    <p className="text-[10px] text-gray-400">{mockUser.role}</p>
                  </div>
                  
                  {/* Logout button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#C4A030] hover:text-black rounded-lg transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    
                    <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                    <span className="relative z-10">Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer group">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="h-10 w-10 rounded-full ring-2 ring-[#D4AF37]/50 group-hover:ring-[#D4AF37] transition-all duration-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{mockUser.name}</p>
                  <p className="text-xs text-gray-400 truncate">{mockUser.role}</p>
                </div>
                <button
                  className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}