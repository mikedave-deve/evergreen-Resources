import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, ChevronDown, Leaf } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '../components/ui/Sheet'
import { cn } from '../lib/utils'

const navLinks = [
  { to: '/',           label: 'Home'       },
  { to: '/about',      label: 'About'      },
  { to: '/services',   label: 'Services'   },
  { to: '/industries', label: 'Industries' },
  {
    label: 'Work With Us',
    children: [
      { to: '/employers',      label: 'For Employers'  },
      { to: '/candidates',     label: 'For Candidates' },
      { to: '/jobs',           label: 'Job Board'      },
      { to: '/submit-resume',  label: 'Submit Resume'  },
    ],
  },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { pathname }                    = useLocation()

  // Close dropdown on route change
  useEffect(() => { setDropdownOpen(false) }, [pathname])

  // Scroll listener for background transition
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const isHero = pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || !isHero
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-forest-100'
          : 'bg-transparent'
      )}
    >
      <nav className="container-base flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-forest-700 rounded-sm flex items-center justify-center
                          group-hover:bg-forest-600 transition-colors">
            <Leaf className="w-4 h-4 text-cream-100" />
          </div>
          <div className="leading-none">
            <span className={cn(
              'font-display font-bold text-lg tracking-tight block transition-colors',
              scrolled || !isHero ? 'text-forest-900' : 'text-white'
            )}>
              Evergreen
            </span>
            <span className={cn(
              'font-body text-[10px] tracking-[0.18em] uppercase block transition-colors',
              scrolled || !isHero ? 'text-forest-500' : 'text-cream-200/80'
            )}>
              Resources
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <li key={link.label} className="relative">
                  <button
                    onClick={() => setDropdownOpen(v => !v)}
                    className={cn(
                      'nav-link flex items-center gap-1 px-3 py-2 text-sm font-medium font-body',
                      'transition-colors rounded-sm hover:bg-forest-50',
                      scrolled || !isHero ? 'text-forest-800' : 'text-white/90 hover:bg-white/10'
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn(
                      'w-3.5 h-3.5 transition-transform duration-200',
                      dropdownOpen && 'rotate-180'
                    )} />
                  </button>

                  {dropdownOpen && (
                    <ul className="absolute top-full left-0 mt-1 w-44 bg-white border border-forest-100
                                   shadow-lg rounded-sm overflow-hidden z-50 py-1">
                      {link.children.map((child) => (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            className={({ isActive }) => cn(
                              'block px-4 py-2.5 text-sm font-body transition-colors',
                              isActive
                                ? 'bg-forest-50 text-forest-700 font-medium'
                                : 'text-forest-800 hover:bg-forest-50 hover:text-forest-700'
                            )}
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            }

            return (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => cn(
                    'nav-link block px-3 py-2 text-sm font-medium font-body',
                    'transition-colors rounded-sm',
                    isActive && (scrolled || !isHero) && 'text-forest-600',
                    scrolled || !isHero
                      ? 'text-forest-800 hover:bg-forest-50 hover:text-forest-700'
                      : 'text-white/90 hover:bg-white/10'
                  )}
                >
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            to="/submit-resume"
            className={cn(
              'text-sm font-medium font-body px-4 py-2 rounded-sm transition-all duration-200',
              scrolled || !isHero
                ? 'text-forest-700 border border-forest-200 hover:bg-forest-50'
                : 'text-white/80 border border-white/20 hover:bg-white/10'
            )}
          >
            Submit Resume
          </Link>
          <Link to="/contact" className="btn-primary text-sm py-2 px-5">
            Find Talent
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <button className={cn(
              'lg:hidden p-2 rounded-sm transition-colors touch-manipulation',
              scrolled || !isHero ? 'text-forest-800 hover:bg-forest-50' : 'text-white hover:bg-white/10'
            )}>
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-forest-700 rounded-sm flex items-center justify-center">
                    <Leaf className="w-3.5 h-3.5 text-cream-100" />
                  </div>
                  Evergreen Resources
                </div>
              </SheetTitle>
            </SheetHeader>
            <nav className="px-6 pb-6">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  if (link.children) {
                    return (
                      <li key={link.label}>
                        <div className="py-2 text-xs font-semibold tracking-wider uppercase text-forest-400 font-body mt-4 mb-1">
                          {link.label}
                        </div>
                        {link.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            className={({ isActive }) => cn(
                              'flex items-center py-2.5 pl-4 text-sm font-body border-l-2 transition-colors touch-manipulation',
                              isActive
                                ? 'border-forest-500 text-forest-700 font-medium'
                                : 'border-forest-100 text-forest-700 hover:border-forest-400 hover:text-forest-600'
                            )}
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </li>
                    )
                  }
                  return (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) => cn(
                          'flex items-center py-2.5 text-sm font-body transition-colors rounded-sm px-2 touch-manipulation',
                          isActive
                            ? 'text-forest-700 font-medium bg-forest-50'
                            : 'text-forest-800 hover:text-forest-600 hover:bg-forest-50'
                        )}
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-6 pt-6 border-t border-forest-100 space-y-3">
                <Link to="/submit-resume" className="btn-outline w-full justify-center text-sm touch-manipulation">Submit Resume</Link>
                <Link to="/contact"       className="btn-primary w-full justify-center text-sm touch-manipulation">Find Talent</Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}