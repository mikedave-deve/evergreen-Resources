import { Link } from 'react-router-dom'
import { ArrowRight, FileText, Search, MessageSquare, Handshake, CheckCircle2, BookOpen } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionReveal from '../components/SectionReveal'

const steps = [
  { icon: FileText, step: '01', title: 'Submit Your Resume', description: 'Share your background with us. Our consultants review every submission personally — no automated rejections.' },
  { icon: MessageSquare, step: '02', title: 'Discovery Call', description: 'A 30-minute conversation to understand your goals, preferences, compensation expectations, and timeline.' },
  { icon: Search, step: '03', title: 'Active Matching', description: 'We search our active client base and proactively reach out on your behalf to companies we know are a fit.' },
  { icon: Handshake, step: '04', title: 'Interviews & Offer', description: 'We prepare you for every interview, advocate for your compensation, and guide you through offer negotiation.' },
]

const tips = [
  { title: 'Lead with impact, not duties', description: 'Quantify your achievements wherever possible. "Grew revenue by 40%" beats "Responsible for sales" every time.' },
  { title: 'Tailor your summary', description: 'Your professional summary should reflect the role you want — not just a recap of where you\'ve been.' },
  { title: 'Keep formatting simple', description: 'Clean, ATS-friendly formatting outperforms creative layouts when applying through automated systems.' },
  { title: 'Include key skills prominently', description: 'Technical skills, certifications, and industry keywords should be easy for recruiters to scan quickly.' },
  { title: 'Match length to seniority', description: 'One page for under 5 years experience; two pages maximum for senior roles. Rarely more.' },
  { title: 'Proofread ruthlessly', description: 'A single typo can disqualify an otherwise strong candidate. Have someone else review before submitting.' },
]

const resources = [
  { icon: BookOpen, title: 'Salary Research Guide', description: 'Know your market value before you negotiate. Download our 2024 compensation guide.' },
  { icon: MessageSquare, title: 'Interview Prep Workbook', description: 'Structured exercises to help you articulate your story with clarity and confidence.' },
  { icon: CheckCircle2, title: 'Offer Evaluation Checklist', description: 'Beyond base salary — a full framework for evaluating any job offer.' },
]

export default function Candidates() {
  return (
    <>
      <PageHero
        label="For Candidates"
        title="Your next chapter starts here."
        subtitle="We go beyond job boards — our consultants advocate for your career the way a great mentor would."
        cta="Submit Your Resume"
        ctaHref="/contact"
        secondary="View Open Jobs"
        secondaryHref="/jobs"
      />

      {/* Application Process */}
      <section className="section-pad bg-cream-100">
        <div className="container-main">
          <SectionReveal>
            <div className="text-center max-w-2xl mx-auto mb-14 gsap-hidden">
              <p className="label-tag">How It Works</p>
              <h2 className="heading-lg text-forest-900">Our candidate process</h2>
              <p className="mt-4 text-forest-700">Four simple steps from first contact to your new role.</p>
            </div>
          </SectionReveal>
          <SectionReveal options={{ stagger: 0.15 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s) => (
                <div key={s.step} className="gsap-hidden bg-white border border-cream-200 p-7 relative overflow-hidden group hover:border-forest-600 transition-colors">
                  <div className="absolute top-4 right-4 font-display text-5xl font-300 text-forest-900/5 group-hover:text-forest-900/10 transition-colors">{s.step}</div>
                  <s.icon size={22} className="text-gold-600 mb-4" />
                  <h4 className="font-display text-xl text-forest-900 mb-2">{s.title}</h4>
                  <p className="text-sm text-forest-600 leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Resume Tips */}
      <section className="section-pad bg-forest-950">
        <div className="container-main">
          <SectionReveal>
            <div className="text-center max-w-xl mx-auto mb-12 gsap-hidden">
              <p className="label-tag">Career Advice</p>
              <h2 className="heading-lg text-cream-100">Resume tips from our recruiters</h2>
            </div>
          </SectionReveal>
          <SectionReveal options={{ stagger: 0.1 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tips.map((tip) => (
                <div key={tip.title} className="gsap-hidden border border-forest-700 p-6 hover:border-gold-500 transition-colors">
                  <h4 className="font-display text-lg text-cream-100 mb-2">{tip.title}</h4>
                  <p className="text-sm text-cream-300 leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Resources */}
      <section className="section-pad bg-cream-100">
        <div className="container-main">
          <SectionReveal>
            <div className="text-center max-w-xl mx-auto mb-12 gsap-hidden">
              <p className="label-tag">Free Resources</p>
              <h2 className="heading-lg text-forest-900">Tools for your job search</h2>
            </div>
          </SectionReveal>
          <SectionReveal options={{ stagger: 0.15 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((r) => (
                <div key={r.title} className="gsap-hidden bg-white border border-cream-200 p-7 group hover:shadow-md transition-all">
                  <r.icon size={24} className="text-forest-800 mb-4 group-hover:text-gold-600 transition-colors" />
                  <h4 className="font-display text-xl text-forest-900 mb-2">{r.title}</h4>
                  <p className="text-sm text-forest-600 leading-relaxed mb-4">{r.description}</p>
                  <button className="text-xs text-gold-600 font-500 flex items-center gap-1 hover:gap-2 transition-all">
                    Download Free <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="gsap-hidden mt-12 text-center">
              <Link to="/contact" className="btn-primary">Talk to a Recruiter <ArrowRight size={16} /></Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
