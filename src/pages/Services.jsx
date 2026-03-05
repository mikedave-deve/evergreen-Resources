import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionReveal from '../components/SectionReveal'
import { services, processSteps } from '../data/services'
import * as Icons from 'lucide-react'
import { cn } from '../lib/utils'

function Accordion({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="divide-y divide-cream-200 border border-cream-200">
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-cream-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-display text-lg text-forest-900">{item.title}</span>
            <ChevronDown size={18} className={cn('text-gold-600 transition-transform shrink-0', open === i && 'rotate-180')} />
          </button>
          {open === i && (
            <div className="px-6 pb-5">
              <p className="text-forest-700 text-sm leading-relaxed mb-4">{item.description}</p>
              <ul className="space-y-2">
                {item.details.map((d, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-forest-700">
                    <span className="text-gold-500 mt-1">✓</span>{d}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Services() {
  return (
    <>
      <PageHero
        label="Our Services"
        title="Talent solutions built for real results."
        subtitle="We offer flexible engagement models to match your hiring strategy — whether you need one specialized hire or an ongoing recruitment partner."
        cta="Contact Us"
        ctaHref="/contact"
      />

      {/* Service Grid */}
      <section className="section-pad bg-cream-100">
        <div className="container-main">
          <SectionReveal>
            <div className="text-center max-w-2xl mx-auto mb-14 gsap-hidden">
              <p className="label-tag">What We Offer</p>
              <h2 className="heading-lg text-forest-900">Four ways we can help</h2>
            </div>
          </SectionReveal>

          <SectionReveal options={{ stagger: 0.12 }}>
            <div className="grid sm:grid-cols-2 gap-6 mb-16">
              {services.map((service) => {
                const Icon = Icons[service.icon] || Icons.Briefcase
                return (
                  <div key={service.id} className="gsap-hidden bg-white border border-cream-200 p-8 hover:border-forest-600 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 bg-forest-900 group-hover:bg-gold-500 flex items-center justify-center mb-5 transition-colors">
                      <Icon size={22} className="text-cream-100 group-hover:text-forest-950 transition-colors" />
                    </div>
                    <h3 className="font-display text-2xl text-forest-900 mb-3">{service.title}</h3>
                    <p className="text-forest-700 text-sm leading-relaxed mb-5">{service.description}</p>
                    <ul className="space-y-2">
                      {service.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-forest-600">
                          <span className="text-gold-500 mt-0.5 shrink-0">→</span>{d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </SectionReveal>

          {/* Accordion FAQ */}
          <SectionReveal>
            <div className="max-w-3xl mx-auto gsap-hidden">
              <div className="text-center mb-8">
                <p className="label-tag">Quick Overview</p>
                <h3 className="heading-md text-forest-900">Service details at a glance</h3>
              </div>
              <Accordion items={services} />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad bg-forest-950">
        <div className="container-main">
          <SectionReveal>
            <div className="text-center max-w-xl mx-auto mb-14 gsap-hidden">
              <p className="label-tag">How It Works</p>
              <h2 className="heading-lg text-cream-100">Our six-step process</h2>
            </div>
          </SectionReveal>
          <SectionReveal options={{ stagger: 0.1 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step) => (
                <div key={step.step} className="gsap-hidden border border-forest-700 p-7 hover:border-gold-500 transition-colors group">
                  <div className="font-display text-4xl font-300 text-gold-500/30 group-hover:text-gold-500/60 transition-colors mb-3">{step.step}</div>
                  <h4 className="font-display text-xl text-cream-100 mb-2">{step.title}</h4>
                  <p className="text-sm text-cream-300 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
