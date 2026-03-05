import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Leaf } from 'lucide-react'
import { useNavbarScroll } from '../hooks/useNavbarScroll'
import { cn } from '../lib/utils'

const navLinks = [
  { label: 'About', href: '/about' },
  {
    label: 'Solutions',
    children: [
      { label: 'Services', href: '/services' },
      { label: 'Industries', href: '/industries' },
      { label: 'For Employers', href: '/employers' },
      { label: 'For Candidates', href: '/candidates' },
    ],
  },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const scrolled = useNavbarScroll(60)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const location = useLocation()

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(null)
  }, [location.pathname])

  const isHeroPage = ['/', '/about', '/employers', '/candidates'].includes(location.pathname)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || mobileOpen || !isHeroPage
          ? 'bg-forest-950 shadow-lg py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-main">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gold-500 flex items-center justify-center rounded-sm">
              <Leaf size={16} className="text-forest-950" />
            </div>
            <span className="font-display text-xl font-600 text-cream-100 tracking-wide">
              Evergreen <span className="text-gold-400 font-300 italic">Resources</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(link.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-body text-cream-200 hover:text-gold-400 transition-colors">
                    {link.label}
                    <ChevronDown size={14} className={cn('transition-transform', dropdownOpen === link.label && 'rotate-180')} />
                  </button>
                  {dropdownOpen === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-forest-950 border border-forest-800 shadow-xl py-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-cream-200 hover:text-gold-400 hover:bg-forest-900 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-4 py-2 text-sm font-body transition-colors',
                    location.pathname === link.href
                      ? 'text-gold-400'
                      : 'text-cream-200 hover:text-gold-400'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              to="/submit-resume"
              className="ml-4 bg-gold-500 text-forest-950 px-5 py-2 text-sm font-body font-600 hover:bg-gold-400 transition-colors"
            >
             Submit Your Resume
            </Link>

            <Link
              to="/jobs"
              className="ml-4 bg-gold-500 text-forest-950 px-5 py-2 text-sm font-body font-600 hover:bg-gold-400 transition-colors"
            >
              Find Talent
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-cream-100 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-forest-800 mt-3 pt-4 pb-6 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    className="flex items-center justify-between w-full px-2 py-2 text-sm text-cream-200 hover:text-gold-400"
                    onClick={() => setDropdownOpen(dropdownOpen === link.label ? null : link.label)}
                  >
                    {link.label}
                    <ChevronDown size={14} className={cn('transition-transform', dropdownOpen === link.label && 'rotate-180')} />
                  </button>
                  {dropdownOpen === link.label && (
                    <div className="pl-4 space-y-1">
                      {link.children.map((child) => (
                        <Link key={child.href} to={child.href} className="block py-2 text-sm text-cream-300 hover:text-gold-400">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} to={link.href} className="block px-2 py-2 text-sm text-cream-200 hover:text-gold-400">
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3">
              <Link to="/jobs" className="block text-center bg-gold-500 text-forest-950 px-5 py-3 text-sm font-600 hover:bg-gold-400 transition-colors">
                Submit Your Resume
              </Link>
            </div>
             <div className="pt-3">
              <Link to="/jobs" className="block text-center bg-gold-500 text-forest-950 px-5 py-3 text-sm font-600 hover:bg-gold-400 transition-colors">
                Find Talent
              </Link>
            </div>
            
          </div>
        )}
      </div>
    </header>
  )
}
