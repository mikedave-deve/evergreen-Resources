import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle2, Users, Briefcase, Award, Building2 } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'
import StatCounter from '../components/StatCounter'
import { services } from '../data/services'
import { industries } from '../data/industries'
import { testimonials } from '../data/testimonials'
import * as Icons from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '3200', label: 'Placements Made', suffix: '+' },
  { value: '450', label: 'Partner Companies', suffix: '+' },
  { value: '16', label: 'Years in Business', suffix: '' },
  { value: '94', label: 'Retention Rate', suffix: '%' },
]

export default function Home() {
  const heroTitleRef = useRef(null)
  const heroSubRef = useRef(null)
  const heroCtaRef = useRef(null)
  const heroBadgeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        [heroBadgeRef.current, heroTitleRef.current, heroSubRef.current, heroCtaRef.current],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: 'power3.out', delay: 0.2 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1f13 0%, #1a4a2e 55%, #0d2818 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #d4a853, transparent 70%)' }} />
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #52b788, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.8) 60px),
                                repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.8) 60px)`,
            }} />
        </div>

        <div className="container-main relative z-10 py-36 md:py-44 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div ref={heroBadgeRef} className="opacity-0 inline-flex items-center gap-2 border border-gold-500/40 text-gold-400 px-3 py-1 text-xs font-body uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              Talent Solutions Since 2008
            </div>
            <h1 ref={heroTitleRef} className="opacity-0 font-display text-5xl sm:text-6xl md:text-7xl font-300 text-cream-100 leading-tight mb-6">
              We Place <br />
              <span className="italic text-gold-400">Exceptional</span> <br />
              Talent.
            </h1>
            <p ref={heroSubRef} className="opacity-0 text-cream-300 text-base sm:text-lg leading-relaxed max-w-md mb-10">
              Evergreen Resources connects driven professionals with 
              organizations that are building something worth working for. 
              Permanent, contract, and executive search — done right.
            </p>
            <div ref={heroCtaRef} className="opacity-0 flex flex-wrap gap-3">
              <Link to="/jobs" className="btn-gold">Explore Open Roles <ArrowRight size={16} /></Link>
              <Link to="/employers" className="border border-cream-300/50 text-cream-100 px-6 py-3 text-sm font-body hover:border-cream-100 transition-colors flex items-center gap-2">
                I'm Hiring <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Hero card panel */}
          <div className="hidden lg:block relative">
            <div className="relative ml-8">
              <div className="bg-forest-900/80 border border-forest-700/50 backdrop-blur-sm p-8 mb-4">
                <p className="label-tag text-xs mb-3">Latest Opening</p>
                <h3 className="font-display text-xl text-cream-100 mb-1">VP of Product Management</h3>
                <p className="text-sm text-cream-300 mb-4">Crestline Software · Remote · $175k–$210k</p>
                <Link to="/jobs" className="text-xs text-gold-400 flex items-center gap-1 hover:gap-2 transition-all">
                  View Position <ArrowRight size={12} />
                </Link>
              </div>
              <div className="bg-gold-500/10 border border-gold-500/30 p-6 ml-12">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 size={18} className="text-gold-400" />
                  <span className="text-sm text-cream-100 font-500">94% placement retention</span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 size={18} className="text-gold-400" />
                  <span className="text-sm text-cream-100 font-500">3,200+ successful placements</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-gold-400" />
                  <span className="text-sm text-cream-100 font-500">450+ partner companies</span>
                </div>
              </div>
              {/* Decorative line */}
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-gradient-to-b from-cream-300/50 to-transparent" />
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ─────────────────────────────────── */}
      <section className="section-pad bg-cream-100">
        <div className="container-main">
          <SectionReveal>
            <div className="text-center max-w-2xl mx-auto mb-14 gsap-hidden">
              <p className="label-tag">What We Do</p>
              <h2 className="heading-lg text-forest-900 mb-4">
                Full-spectrum talent solutions
              </h2>
              <p className="text-forest-700 leading-relaxed">
                From entry-level placements to C-suite searches, we bring the 
                same rigor and care to every engagement.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal options={{ stagger: 0.12 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => {
                const Icon = Icons[service.icon] || Briefcase
                return (
                  <div key={service.id} className="gsap-hidden group bg-white border border-cream-200 p-7 hover:border-forest-600 hover:shadow-lg transition-all duration-300">
                    <div className="w-11 h-11 bg-forest-900 flex items-center justify-center mb-5 group-hover:bg-gold-500 transition-colors">
                      <Icon size={20} className="text-cream-100 group-hover:text-forest-950 transition-colors" />
                    </div>
                    <h3 className="font-display text-xl text-forest-900 mb-3">{service.title}</h3>
                    <p className="text-sm text-forest-700 leading-relaxed mb-4">{service.description}</p>
                    <Link to="/services" className="text-xs text-gold-600 flex items-center gap-1 hover:gap-2 transition-all font-500">
                      Learn More <ArrowRight size={12} />
                    </Link>
                  </div>
                )
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section className="section-pad bg-forest-900">
        <div className="container-main">
          <SectionReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat) => (
                <StatCounter key={stat.label} value={stat.value} label={stat.label} suffix={stat.suffix} />
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── INDUSTRIES ───────────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 gsap-hidden">
              <div>
                <p className="label-tag">Sectors We Serve</p>
                <h2 className="heading-lg text-forest-900">Industries We Know</h2>
              </div>
              <Link to="/industries" className="text-sm text-gold-600 flex items-center gap-1 hover:gap-2 transition-all font-500 shrink-0">
                View All Industries <ArrowRight size={14} />
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal options={{ stagger: 0.08 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industries.map((ind) => {
                const Icon = Icons[ind.icon] || Building2
                return (
                  <div key={ind.id} className={`gsap-hidden group p-6 border ${ind.color} hover:shadow-md transition-all duration-300 cursor-pointer`}>
                    <Icon size={22} className={`${ind.accent} mb-3 group-hover:scale-110 transition-transform`} />
                    <h4 className={`font-display text-lg ${ind.accent} mb-1`}>{ind.name}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed hidden md:block">{ind.description}</p>
                  </div>
                )
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section-pad bg-cream-200">
        <div className="container-main">
          <SectionReveal>
            <div className="text-center max-w-xl mx-auto mb-12 gsap-hidden">
              <p className="label-tag">Client Stories</p>
              <h2 className="heading-lg text-forest-900">What our partners say</h2>
            </div>
          </SectionReveal>

          <SectionReveal options={{ stagger: 0.2 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="gsap-hidden bg-white p-8 border border-cream-200 hover:shadow-lg transition-all duration-300">
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-gold-500 text-sm">★</span>
                    ))}
                  </div>
                  <blockquote className="font-display text-lg text-forest-800 leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-forest-800 flex items-center justify-center text-cream-100 font-display text-sm rounded-full">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-body font-600 text-forest-900">{t.name}</p>
                      <p className="text-xs text-forest-600">{t.title} · {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── BOTTOM CTA ───────────────────────────────────────── */}
      <section
        className="section-pad relative overflow-hidden"
        style={{ background: 'linear-gradient(120deg, #0a1f13 0%, #2d6a4f 100%)' }}
      >
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 50%, #d4a853 0%, transparent 60%)`,
          }}
        />
        <div className="container-main relative z-10 text-center max-w-2xl mx-auto">
          <SectionReveal>
            <div className="gsap-hidden">
              <p className="label-tag">Start Today</p>
              <h2 className="heading-lg text-cream-100 mb-5">Ready to find your next great hire?</h2>
              <p className="text-cream-300 leading-relaxed mb-8">
                Whether you're building a team or building a career, Evergreen 
                Resources is your strategic partner every step of the way.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="btn-gold">Get in Touch <ArrowRight size={16} /></Link>
                <Link to="/jobs" className="border border-cream-300/50 text-cream-100 px-6 py-3 text-sm hover:border-cream-100 transition-colors">
                  Browse Jobs
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
