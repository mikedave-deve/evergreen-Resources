import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, Briefcase, Clock, User, Mail, Phone, Calendar, MapPin, FileText, ChevronDown } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Backend base URL — set VITE_API_URL in your .env (e.g. https://your-backend.vercel.app)
const API_BASE = import.meta.env.VITE_API_URL ?? ''

// ─── Page Header ──────────────────────────────────────────────────────────
function PageHeader() {
  const headerRef = useRef(null)
  const titleRef  = useRef(null)
  const subRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })
      tl.fromTo(
        titleRef.current.querySelectorAll('.header-word'),
        { opacity: 0, y: 40, rotateX: -15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.75, stagger: 0.07, ease: 'power3.out' }
      ).fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.35'
      )
    }, headerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={headerRef} className="bg-forest-950 pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container-base">
        <p className="section-label text-forest-400 mb-3">Join Our Network</p>
        <h1
          ref={titleRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl mb-6"
          style={{ perspective: '800px' }}
        >
          {['Apply', 'Now'].map(w => (
            <span key={w} className="header-word inline-block mr-[0.25em]">{w}</span>
          ))}
          <br />
          {['&'].map(w => (
            <span key={w} className="header-word inline-block mr-[0.25em]">{w}</span>
          ))}
          {['Start', 'Your', 'Journey'].map(w => (
            <span key={w} className="header-word inline-block mr-[0.25em] text-forest-400">{w}</span>
          ))}
        </h1>
        <p ref={subRef} className="font-body text-base md:text-lg text-cream-200/60 max-w-xl leading-relaxed">
          Take the first step toward your next career milestone. Complete the form below and
          a dedicated recruiter will be in touch within one business day.
        </p>
      </div>
    </div>
  )
}

// ─── Trust Badges ─────────────────────────────────────────────────────────
const trustItems = [
  { icon: <User className="w-4 h-4 text-forest-500" />,    title: 'Personalized Match',  body: 'Every application is reviewed by a human recruiter who specialises in your field.' },
  { icon: <Clock className="w-4 h-4 text-forest-500" />,   title: '24-Hr Response',      body: 'We respond to every submission within one business day — no automated filters.' },
  { icon: <Briefcase className="w-4 h-4 text-forest-500" />, title: 'Active Openings',   body: 'We keep an active pipeline of vetted roles across multiple sectors and locations.' },
  { icon: <FileText className="w-4 h-4 text-forest-500" />, title: 'Confidential',        body: 'Your details are never shared with employers without your explicit consent.' },
]

// ─── The Application Form ─────────────────────────────────────────────────
function ApplicationForm() {
  const [submitted,   setSubmitted]   = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [submitError, setSubmitError] = useState('')

  const inputClass = [
    'w-full px-4 py-3 text-sm font-body',
    'border border-forest-200 rounded-sm',
    'bg-forest-50 text-forest-900 placeholder-forest-400',
    'focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent',
    'transition-all duration-200',
  ].join(' ')

  const labelClass = 'block font-body text-xs font-medium text-forest-700 mb-1.5 tracking-wide uppercase'

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitError('')
    setLoading(true)

    // Collect all field values from the form
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch(`${API_BASE}/api/apply`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        // Surface backend validation errors or generic error message
        const msg = Array.isArray(json.errors)
          ? json.errors.join(' ')
          : (json.message || 'Something went wrong. Please try again.')
        setSubmitError(msg)
        return
      }

      setSubmitted(true)
    } catch {
      setSubmitError('Unable to reach the server. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8 text-forest-600" />
        </div>
        <h3 className="font-display text-2xl font-bold text-forest-900 mb-3">
          Application Received
        </h3>
        <p className="font-body text-sm text-forest-700/70 max-w-sm leading-relaxed">
          Thank you for applying. One of our recruiters will review your information and reach
          out within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>

      {/* Row 1 – Full Name */}
      <div>
        <label htmlFor="fullName" className={labelClass}>Full Name *</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400 pointer-events-none" />
          <input
            id="fullName" name="fullName" type="text" required
            className={`${inputClass} pl-10`}
            placeholder="Jane Smith"
          />
        </div>
      </div>

      {/* Row 2 – Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400 pointer-events-none" />
            <input
              id="email" name="email" type="email" required
              className={`${inputClass} pl-10`}
              placeholder="jane@email.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400 pointer-events-none" />
            <input
              id="phone" name="phone" type="tel" required
              className={`${inputClass} pl-10`}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      </div>

      {/* Row 3 – DOB + Home Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dob" className={labelClass}>Date of Birth *</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400 pointer-events-none" />
            <input
              id="dob" name="dob" type="date" required
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="address" className={labelClass}>Home Address *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400 pointer-events-none" />
            <input
              id="address" name="address" type="text" required
              className={`${inputClass} pl-10`}
              placeholder="123 Main St, City, State"
            />
          </div>
        </div>
      </div>

      {/* Row 4 – Job Position + Additional Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="jobPosition" className={labelClass}>Job Position *</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400 pointer-events-none" />
            <select
              id="jobPosition" name="jobPosition" defaultValue="" required
              className={`${inputClass} pl-10 appearance-none`}
            >
              <option value="" disabled>Select a position…</option>
              <option value="environmental-pm">Environmental Project Manager</option>
              <option value="customer-service">Customer Service Representative</option>
              <option value="accounts-payable">Accounts Payable Clerk</option>
              <option value="data-entry">Data Entry Clerk</option>
              <option value="payroll-specialist">Payroll Specialist</option>
              <option value="hr-coordinator">HR Coordinator</option>
              <option value="office-admin">Office Administrator</option>
              <option value="other">Other / Open to Opportunities</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400 pointer-events-none" />
          </div>
        </div>
        <div>
          <label htmlFor="additionalInfo" className={labelClass}>Additional Information</label>
          <input
            id="additionalInfo" name="additionalInfo" type="text"
            className={inputClass}
            placeholder="Certifications, LinkedIn, portfolio…"
          />
        </div>
      </div>

      {/* Row 5 – Full Time / Part Time + Work Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Availability *</label>
          <div className="flex gap-3">
            {['Full Time', 'Part Time'].map(opt => (
              <label
                key={opt}
                className="flex items-center gap-2 flex-1 px-4 py-3 border border-forest-200 rounded-sm
                           bg-forest-50 cursor-pointer hover:border-forest-400 transition-colors
                           has-[:checked]:border-forest-600 has-[:checked]:bg-forest-100"
              >
                <input type="radio" name="availability" value={opt} required className="accent-forest-600" />
                <span className="font-body text-sm text-forest-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="workDuration" className={labelClass}>Work Duration *</label>
          <div className="relative">
            <select
              id="workDuration" name="workDuration" defaultValue="" required
              className={`${inputClass} appearance-none`}
            >
              <option value="" disabled>Select duration…</option>
              <option value="temporary">Temporary (under 3 months)</option>
              <option value="contract">Contract (3–12 months)</option>
              <option value="permanent">Permanent / Long-term</option>
              <option value="seasonal">Seasonal</option>
              <option value="open">Open to Discussion</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Row 6 – Message */}
      <div>
        <label htmlFor="message" className={labelClass}>Message <span className="normal-case text-forest-400 tracking-normal">(optional)</span></label>
        <textarea
          id="message" name="message" rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your background, goals, preferred work environment, or anything else that would help us find the right fit…"
        />
      </div>

      {submitError && (
        <div className="flex items-start gap-2.5 p-4 bg-red-50 border border-red-200 rounded-sm">
          <span className="text-red-500 text-sm shrink-0 mt-0.5">!</span>
          <p className="font-body text-sm text-red-700">{submitError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-sm py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Submitting Application…
          </>
        ) : 'Submit Application'}
      </button>

      <p className="font-body text-xs text-center text-forest-400">
        By submitting, you agree that your information may be used to connect you with suitable employers.
      </p>
    </form>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────
function ApplicationSection() {
  const ref = useScrollReveal('.reveal')

  return (
    <section className="section-wrapper bg-white" ref={ref}>
      <div className="container-base">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Form Column */}
          <div className="lg:col-span-3 reveal">
            <p className="section-label mb-3">Application Form</p>
            <h2 className="section-title mb-8">
              Tell Us About <span className="text-forest-600">Yourself</span>
            </h2>
            <div className="bg-forest-50 border border-forest-100 rounded-sm p-7">
              <ApplicationForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5 reveal">
            <p className="section-label mb-4">Why Apply With Us</p>
            {trustItems.map(item => (
              <div key={item.title} className="p-5 bg-white border border-forest-100 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <span className="font-body text-sm font-semibold text-forest-900">{item.title}</span>
                </div>
                <p className="font-body text-xs text-forest-700/70 leading-relaxed">{item.body}</p>
              </div>
            ))}

            {/* Highlight box */}
            <div className="p-5 bg-forest-900 rounded-sm">
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-forest-400 mb-2">
                Since 2006
              </p>
              <p className="font-display text-2xl font-bold text-white mb-2 leading-snug">
                Over 2,000+ successful placements
              </p>
              <p className="font-body text-xs text-cream-200/60 leading-relaxed">
                We have spent nearly two decades building a network of trusted employers and
                talented professionals across every major sector.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function ApplyNowPage() {
  return (
    <>
      <PageHeader />
      <ApplicationSection />
    </>
  )
}