import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail, Clock } from 'lucide-react'
import { cn } from '../../lib/utils'
import reactLogo from '../../assets/react.svg'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services-client' },
  { name: 'Doctors', href: '/doctors-client' },
  { name: 'Contact', href: '/contact' },
]

export default function ClientNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-black/95 backdrop-blur-lg shadow-lg shadow-[#D4AF37]/10"
            : "bg-gradient-to-r from-black via-gray-900 to-black"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#D4AF37] blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img
                  src={reactLogo}
                  alt="Logo"
                  className="h-10 w-10 relative z-10 group-hover:rotate-180 transition-transform duration-500"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                  Dental Clinic
                </h1>
                <p className="text-[10px] text-gray-400 -mt-1">Your Smile, Our Priority</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group",
                      isActive
                        ? "text-[#D4AF37]"
                        : "text-gray-300 hover:text-[#D4AF37]"
                    )}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/30"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                )
              })}
            </div>

            {/* Login Button */}
            <div className="hidden md:block">
              <Link
                to="/login"
                className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#C4A030] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/50 transition-all duration-300 hover:scale-105"
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-[#D4AF37] hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#D4AF37]/20 bg-black/95 backdrop-blur-lg animate-slide-down">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-[#D4AF37] to-[#C4A030] text-black"
                        : "text-gray-300 hover:bg-white/5 hover:text-[#D4AF37]"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C4A030] text-black font-semibold rounded-lg text-center text-sm"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
