import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionReveal from '../components/SectionReveal'
import { industries } from '../data/industries'
import * as Icons from 'lucide-react'

export default function Industries() {
  return (
    <>
      <PageHero
        label="Sectors We Serve"
        title="Deep expertise across eight industries."
        subtitle="Our consultants aren't generalists — they're specialists who speak your industry's language."
        cta="Browse Open Jobs"
        ctaHref="/jobs"
      />

      <section className="section-pad bg-cream-100">
        <div className="container-main">
          <SectionReveal>
            <div className="text-center max-w-2xl mx-auto mb-14 gsap-hidden">
              <p className="label-tag">Industry Focus</p>
              <h2 className="heading-lg text-forest-900">Where we specialize</h2>
              <p className="mt-4 text-forest-700 leading-relaxed">
                Each vertical is led by consultants with hands-on industry experience, 
                ensuring we understand the nuances of every role we recruit for.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal options={{ stagger: 0.1 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {industries.map((ind) => {
                const Icon = Icons[ind.icon] || Icons.Building2
                return (
                  <div key={ind.id}
                    className={`gsap-hidden group p-7 border ${ind.color} hover:shadow-xl transition-all duration-300 cursor-pointer`}
                  >
                    <div className="mb-4">
                      <Icon size={28} className={`${ind.accent} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <h3 className={`font-display text-xl ${ind.accent} mb-3`}>{ind.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{ind.description}</p>
                    <Link to="/jobs" className={`text-xs ${ind.accent} flex items-center gap-1 hover:gap-2 transition-all font-500`}>
                      View Roles <ArrowRight size={12} />
                    </Link>
                  </div>
                )
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-cream-200">
        <div className="container-main text-center max-w-2xl mx-auto">
          <SectionReveal>
            <div className="gsap-hidden">
              <p className="label-tag">Ready to Connect?</p>
              <h2 className="heading-lg text-forest-900 mb-5">Don't see your industry listed?</h2>
              <p className="text-forest-700 leading-relaxed mb-8">
                Our consultants regularly place talent outside our listed verticals. 
                Reach out and tell us what you need.
              </p>
              <Link to="/contact" className="btn-primary">Start a Conversation <ArrowRight size={16} /></Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
