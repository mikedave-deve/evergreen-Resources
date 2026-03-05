import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Clock, Shield, BarChart3, Users2, Star } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionReveal from '../components/SectionReveal'
import StatCounter from '../components/StatCounter'

const reasons = [
  { icon: Shield, title: 'Vetted talent only', description: 'Every candidate is screened for skills, culture fit, and professional integrity before we present them.' },
  { icon: Clock, title: 'Fast turnaround', description: 'Average time-to-shortlist is 7 business days. We move at the speed your business requires.' },
  { icon: BarChart3, title: 'Industry intelligence', description: 'Compensation benchmarking, market mapping, and talent supply insights included in every engagement.' },
  { icon: Star, title: 'Guaranteed placements', description: '90-day guarantee on all permanent placements. If it doesn\'t work out, we find your replacement at no cost.' },
  { icon: Users2, title: 'Dedicated consultant', description: 'You get a single point of contact who knows your business — not a rotating door of account managers.' },
  { icon: CheckCircle2, title: 'Diversity focus', description: 'We build diverse candidate slates as standard practice, not an afterthought.' },
]

const packages = [
  { name: 'Essential', description: 'Perfect for single or infrequent hires.', price: 'Contingency', features: ['1 dedicated recruiter', 'Standard 30-day guarantee', 'Email communication', 'Candidate profiles with assessment notes'] },
  { name: 'Growth', description: 'Ideal for organizations hiring 3–10 roles annually.', price: 'Retained', features: ['Senior recruiter + researcher', 'Expanded 60-day guarantee', 'Weekly progress calls', 'Compensation benchmarking included', 'Priority candidate access'], highlight: true },
  { name: 'Enterprise', description: 'For high-volume or executive-level engagements.', price: 'Custom', features: ['Dedicated team of consultants', '90-day guarantee + replacement', 'Weekly analytics reporting', 'Market mapping & competitor intelligence', 'DE&I slate guarantee', 'Onboarding support'] },
]

const stats = [
  { value: '7', suffix: ' days', label: 'Average time-to-shortlist' },
  { value: '450', suffix: '+', label: 'Employer partners' },
  { value: '94', suffix: '%', label: 'First-year retention' },
  { value: '3200', suffix: '+', label: 'Successful placements' },
]

export default function Employers() {
  return (
    <>
      <PageHero
        label="For Employers"
        title="Build the team you've been imagining."
        subtitle="Evergreen Resources partners with forward-thinking organizations to deliver talent that drives real business outcomes."
        cta="Request a Consultation"
        ctaHref="/contact"
        secondary="View Services"
        secondaryHref="/services"
      />

      {/* Why Choose Us */}
      <section className="section-pad bg-cream-100">
        <div className="container-main">
          <SectionReveal>
            <div className="text-center max-w-2xl mx-auto mb-14 gsap-hidden">
              <p className="label-tag">Why Evergreen</p>
              <h2 className="heading-lg text-forest-900">Six reasons clients stay with us</h2>
            </div>
          </SectionReveal>
          <SectionReveal options={{ stagger: 0.1 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.map((r) => (
                <div key={r.title} className="gsap-hidden bg-white border border-cream-200 p-7 hover:border-forest-600 hover:shadow-md transition-all group">
                  <r.icon size={22} className="text-gold-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-display text-xl text-forest-900 mb-2">{r.title}</h4>
                  <p className="text-sm text-forest-600 leading-relaxed">{r.description}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="section-pad bg-forest-900">
        <div className="container-main">
          <SectionReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s) => <StatCounter key={s.label} value={s.value} label={s.label} suffix={s.suffix} />)}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Packages */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <SectionReveal>
            <div className="text-center max-w-xl mx-auto mb-14 gsap-hidden">
              <p className="label-tag">Engagement Models</p>
              <h2 className="heading-lg text-forest-900">Choose the right partnership</h2>
            </div>
          </SectionReveal>
          <SectionReveal options={{ stagger: 0.18 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.name} className={`gsap-hidden border p-8 relative ${pkg.highlight ? 'border-forest-700 bg-forest-950 text-cream-100' : 'border-cream-200'}`}>
                  {pkg.highlight && <span className="absolute -top-3 left-6 bg-gold-500 text-forest-950 text-[10px] font-700 uppercase tracking-widest px-3 py-1">Most Popular</span>}
                  <p className="text-xs font-600 uppercase tracking-widest text-gold-600 mb-2">{pkg.price}</p>
                  <h3 className={`font-display text-2xl mb-2 ${pkg.highlight ? 'text-cream-100' : 'text-forest-900'}`}>{pkg.name}</h3>
                  <p className={`text-sm mb-6 ${pkg.highlight ? 'text-cream-300' : 'text-forest-600'}`}>{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${pkg.highlight ? 'text-cream-200' : 'text-forest-700'}`}>
                        <CheckCircle2 size={14} className="text-gold-500 mt-0.5 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className={pkg.highlight ? 'btn-gold text-sm w-full justify-center' : 'btn-outline text-sm w-full justify-center'}>
                    Get Started <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
