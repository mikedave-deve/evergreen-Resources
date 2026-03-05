import { Link } from 'react-router-dom'
import { FileText, Clock, Users, ShieldCheck } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ResumeSubmissionForm from '../components/ResumeSubmissionForm'

// ─── Page Header — mirrors ContactPage header pattern exactly ─────────────
function PageHeader() {
  return (
    <div className="bg-forest-950 pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container-base">
        <p className="section-label text-forest-400 mb-3">Career Opportunities</p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl mb-6">
          Submit Your{' '}
          <span className="text-forest-400">Resume</span>
        </h1>
        <p className="font-body text-base md:text-lg text-cream-200/60 max-w-xl leading-relaxed">
          Share your experience with our team. We review every submission and reach out
          when we have a role that genuinely fits your background and goals.
        </p>
      </div>
    </div>
  )
}

// ─── Trust signals sidebar ────────────────────────────────────────────────
const trustItems = [
  {
    icon: <ShieldCheck className="w-4 h-4 text-forest-500" />,
    title: 'Confidential',
    body: 'Your resume and personal details are never shared without your explicit consent.',
  },
  {
    icon: <Clock className="w-4 h-4 text-forest-500" />,
    title: '3–5 Day Review',
    body: 'Every submission is personally reviewed by a specialist within 3–5 business days.',
  },
  {
    icon: <Users className="w-4 h-4 text-forest-500" />,
    title: 'Human Recruiters',
    body: 'No automated screening. A real recruiter with sector experience reviews your file.',
  },
  {
    icon: <FileText className="w-4 h-4 text-forest-500" />,
    title: 'Active Pipeline',
    body: 'Your profile stays active in our candidate database for 12 months after submission.',
  },
]

// ─── What Happens Next steps ──────────────────────────────────────────────
const nextSteps = [
  { n: '01', text: 'Our team reviews your resume within 3–5 business days.' },
  { n: '02', text: 'If there is a match, a recruiter will contact you directly.' },
  { n: '03', text: 'We discuss your goals and the opportunity in more detail.' },
  { n: '04', text: 'We introduce you to the client only with your consent.' },
]

// ─── Main Section — 5/3 grid mirrors ContactSection layout ───────────────
function SubmitSection() {
  const ref = useScrollReveal('.reveal')

  return (
    <section className="section-wrapper bg-white" ref={ref}>
      <div className="container-base">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── Form column (3/5) ───────────────────────────────────────── */}
          <div className="lg:col-span-3 reveal">
            <p className="section-label mb-3">Submit Your Application</p>
            <h2 className="section-title mb-2">Tell Us About Yourself</h2>
            <p className="font-body text-sm text-forest-700/60 mb-8 leading-relaxed">
              Fill in your details and attach your resume as a PDF. All fields marked
              with * are required.
            </p>

            {/* Form card — same container style as ContactPage */}
            <div className="bg-forest-50 border border-forest-100 rounded-sm p-7">
              {/* ⚠️  Replace YOUR_FORM_ID inside ResumeSubmissionForm.jsx */}
              <ResumeSubmissionForm />
            </div>
          </div>

          {/* ── Sidebar column (2/5) ────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5 reveal">

            {/* Trust signals */}
            <div>
              <p className="section-label mb-4">Why Submit With Us</p>
              <div className="space-y-3">
                {trustItems.map((item) => (
                  <div
                    key={item.title}
                    className="p-5 bg-forest-50 border border-forest-100 rounded-sm
                               hover:border-forest-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      {item.icon}
                      <span className="font-body text-sm font-semibold text-forest-900">
                        {item.title}
                      </span>
                    </div>
                    <p className="font-body text-xs text-forest-700/70 leading-relaxed pl-6">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* What happens next */}
            <div className="p-5 bg-forest-950 rounded-sm">
              <p className="font-body text-xs font-semibold tracking-widest uppercase
                            text-forest-400 mb-4">
                What Happens Next
              </p>
              <ol className="space-y-3">
                {nextSteps.map((step) => (
                  <li key={step.n} className="flex items-start gap-3">
                    <span className="font-display text-xs font-bold text-forest-500
                                     bg-forest-800/60 px-2 py-0.5 rounded-sm shrink-0 mt-0.5">
                      {step.n}
                    </span>
                    <p className="font-body text-xs text-cream-200/70 leading-relaxed">
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Already browsing jobs? */}
            <div className="p-5 bg-forest-50 border border-forest-100 rounded-sm">
              <p className="font-body text-sm font-semibold text-forest-900 mb-1.5">
                Looking for a specific role?
              </p>
              <p className="font-body text-xs text-forest-700/70 leading-relaxed mb-4">
                Browse our active job listings and apply directly to open positions.
              </p>
              <Link
                to="/jobs"
                className="btn-outline text-xs py-2 px-4 w-full justify-center"
              >
                View Open Positions
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Page export ──────────────────────────────────────────────────────────
export default function SubmitResumePage() {
  return (
    <>
      <PageHeader />
      <SubmitSection />
    </>
  )
}
