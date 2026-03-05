import { Link } from 'react-router-dom'
import { Leaf, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react'

const footerLinks = {
  Company: [
    { to: '/about',      label: 'About Us'       },
    { to: '/services',   label: 'Our Services'   },
    { to: '/industries', label: 'Industries'     },
    { to: '/contact',    label: 'Contact'        },
  ],
  'For Employers': [
    { to: '/employers',  label: 'Hire Talent'    },
    { to: '/services',   label: 'Staffing Solutions' },
    { to: '/contact',    label: 'Get a Quote'    },
  ],
  'For Candidates': [
    { to: '/jobs',       label: 'Job Board'      },
    { to: '/candidates', label: 'Career Resources' },
    { to: '/candidates', label: 'Resume Tips'   },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-forest-950 text-cream-200">
      {/* Top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-forest-600 via-forest-400 to-forest-600" />

      <div className="container-base py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 group mb-5">
              <div className="w-9 h-9 bg-forest-600 rounded-sm flex items-center justify-center
                              group-hover:bg-forest-500 transition-colors">
                <Leaf className="w-4.5 h-4.5 text-cream-100" />
              </div>
              <div className="leading-none">
                <span className="font-display font-bold text-xl text-white block">Evergreen</span>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-forest-400 block">Resources</span>
              </div>
            </Link>
            <p className="font-body text-sm text-cream-300/70 leading-relaxed max-w-xs mb-6">
              Connecting exceptional environmental professionals with mission-driven organizations
              since 2006. Specialists in staffing, search, and workforce consulting.
            </p>
            <div className="space-y-2.5 text-sm font-body">
              <a href="mailto:hello@evergreenresources.com"
                 className="flex items-center gap-2.5 text-cream-300/60 hover:text-forest-400 transition-colors">
                <Mail className="w-4 h-4" />
                hello@evergreenresources.com
              </a>
              <a href="tel:+15035550192"
                 className="flex items-center gap-2.5 text-cream-300/60 hover:text-forest-400 transition-colors">
                <Phone className="w-4 h-4" />
                (503) 555-0192
              </a>
              <span className="flex items-center gap-2.5 text-cream-300/60">
                <MapPin className="w-4 h-4" />
                Portland, OR · Seattle, WA · San Francisco, CA
              </span>
            </div>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#"
                   className="w-8 h-8 bg-forest-800/60 hover:bg-forest-600 rounded-sm
                              flex items-center justify-center transition-colors">
                  <Icon className="w-3.5 h-3.5 text-cream-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase
                             text-forest-400 mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-body text-sm text-cream-300/60 hover:text-forest-300
                                 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-forest-800/60 flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="font-body text-xs text-cream-300/40">
            © {currentYear} Evergreen Resources LLC. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs font-body text-cream-300/40">
            <a href="#" className="hover:text-forest-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-forest-400 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-forest-400 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
