import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Heart, Users, TrendingUp } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionReveal from '../components/SectionReveal'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { icon: Target, title: 'Precision', description: 'We prioritize quality over quantity. Every candidate we present is a genuine recommendation.' },
  { icon: Heart, title: 'Integrity', description: 'We do what we say. Transparent communication at every stage of the process.' },
  { icon: Users, title: 'Partnership', description: 'We invest in long-term relationships, not one-off transactions.' },
  { icon: TrendingUp, title: 'Results', description: '94% first-year retention rate across all placements. Outcomes matter.' },
]

const team = [
  { name: 'Catherine Reeves', title: 'Founder & CEO', bio: 'Former HR executive with 20+ years in talent strategy across Fortune 500 companies.', initial: 'CR' },
  { name: 'James Okafor', title: 'Managing Director', bio: 'Leads executive search practice. Previously a partner at a Big Four consulting firm.', initial: 'JO' },
  { name: 'Sophia Lin', title: 'VP of Candidate Experience', bio: 'Passionate about candidate advocacy and building sustainable career pathways.', initial: 'SL' },
  { name: 'Marcus Webb', title: 'Director of Client Relations', bio: 'Builds and nurtures partnerships with hiring organizations across eight industry verticals.', initial: 'MW' },
]

const timeline = [
  { year: '2008', event: 'Founded in Austin, TX with a focus on technology and finance placements.' },
  { year: '2012', event: 'Expanded to healthcare and legal verticals. Surpassed 500 cumulative placements.' },
  { year: '2016', event: 'Launched executive search practice. Named Best Staffing Firm by Austin Business Journal.' },
  { year: '2019', event: 'Opened second office in Chicago. Team grew to 45 full-time consultants.' },
  { year: '2022', event: 'Surpassed 3,000 lifetime placements. Recognized in Inc. 5000 fastest-growing companies.' },
  { year: '2024', event: 'Launched AI-assisted candidate matching. Expanded to energy and manufacturing sectors.' },
]

export default function About() {
  const timelineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-item')
      if (!items) return
      gsap.fromTo(items,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 78%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <PageHero
        label="Who We Are"
        title="Built on trust. Driven by results."
        subtitle="Evergreen Resources was founded on a simple belief — that the right hire transforms both organizations and careers."
        cta="Our Open Roles"
        ctaHref="/jobs"
        secondary="Contact Us"
        secondaryHref="/contact"
      />

      {/* Mission */}
      <section className="section-pad bg-cream-100">
        <div className="container-main">
          <SectionReveal>
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div className="gsap-hidden">
                <p className="label-tag">Our Mission</p>
                <h2 className="heading-lg text-forest-900 mb-6">
                  We believe the right person in the right role is a catalyst.
                </h2>
                <p className="text-forest-700 leading-relaxed mb-4">
                  Since 2008, Evergreen Resources has been connecting high-performing professionals 
                  with organizations that recognize talent as their greatest competitive advantage.
                </p>
                <p className="text-forest-700 leading-relaxed mb-8">
                  We operate at the intersection of deep industry knowledge and genuine human 
                  connection — investing in both sides of every placement to ensure lasting outcomes.
                </p>
                <Link to="/services" className="btn-primary">Explore Our Services <ArrowRight size={16} /></Link>
              </div>
              <div className="gsap-hidden grid grid-cols-2 gap-4">
                {values.map((v) => (
                  <div key={v.title} className="bg-white border border-cream-200 p-6 hover:border-forest-600 transition-colors">
                    <v.icon size={20} className="text-gold-600 mb-3" />
                    <h4 className="font-display text-lg text-forest-900 mb-2">{v.title}</h4>
                    <p className="text-xs text-forest-600 leading-relaxed">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-forest-950">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="label-tag">Our Journey</p>
            <h2 className="heading-lg text-cream-100">Milestones & growth</h2>
          </div>
          <div ref={timelineRef} className="max-w-2xl mx-auto">
            {timeline.map((item, i) => (
              <div key={item.year} className="timeline-item opacity-0 flex gap-6 pb-8 last:pb-0 relative">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gold-500 flex items-center justify-center text-forest-950 font-body font-700 text-xs shrink-0">
                    {item.year.slice(2)}
                  </div>
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-forest-800 mt-2" />}
                </div>
                <div className="pb-2">
                  <p className="font-body font-600 text-gold-400 text-sm mb-1">{item.year}</p>
                  <p className="text-cream-300 text-sm leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <SectionReveal>
            <div className="text-center max-w-xl mx-auto mb-12 gsap-hidden">
              <p className="label-tag">Leadership</p>
              <h2 className="heading-lg text-forest-900">Meet our team</h2>
            </div>
          </SectionReveal>
          <SectionReveal options={{ stagger: 0.15 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="gsap-hidden group text-center">
                  <div className="w-20 h-20 bg-forest-800 text-cream-100 font-display text-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500 group-hover:text-forest-950 transition-colors">
                    {member.initial}
                  </div>
                  <h4 className="font-display text-lg text-forest-900">{member.name}</h4>
                  <p className="text-xs text-gold-600 font-500 uppercase tracking-wide mb-2">{member.title}</p>
                  <p className="text-xs text-forest-600 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
