import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { services } from '../data'
import { useScrollReveal } from '../hooks/useScrollReveal'
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent
} from '../components/ui/Accordion'

function PageHeader() {
  return (
    <div className="bg-forest-950 pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container-base">
        <p className="section-label text-forest-400 mb-3">What We Offer</p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl mb-6">
          Staffing Solutions That{' '}
          <span className="text-forest-400">Match Your Scale</span>
        </h1>
        <p className="font-body text-base md:text-lg text-cream-200/60 max-w-xl leading-relaxed">
          From single contract placements to full workforce strategies, our services
          are built around the unique demands of the environmental sector.
        </p>
      </div>
    </div>
  )
}

function ServicesDetail() {
  const ref = useScrollReveal('.reveal')
  return (
    <section className="section-wrapper bg-white" ref={ref}>
      <div className="container-base">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((service, i) => (
            <div key={service.id}
                 className="reveal border border-forest-100 rounded-sm p-7 hover:shadow-md
                            hover:border-forest-200 transition-all bg-white">
              <div className="text-3xl mb-4">{service.icon}</div>
              <h2 className="font-display text-2xl font-bold text-forest-900 mb-3">{service.title}</h2>
              <p className="font-body text-sm text-forest-700/75 leading-relaxed mb-6">{service.description}</p>
              <ul className="space-y-2.5 mb-6">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-forest-500 mt-0.5 shrink-0" />
                    <span className="font-body text-sm text-forest-800">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-medium font-body
                               text-forest-600 hover:text-forest-800 transition-colors">
                Get started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const ref = useScrollReveal('.reveal')
  const steps = [
    { n: '01', title: 'Discovery Call',         body: 'We learn your organization, culture, required technical competencies, and timeline. No generic intake forms.' },
    { n: '02', title: 'Search & Screening',     body: 'We search our network, conduct technical phone screens, and validate credentials before you see any resume.' },
    { n: '03', title: 'Curated Shortlist',      body: 'You receive 3-5 thoroughly vetted candidates - not a dump of 30 semi-qualified profiles.' },
    { n: '04', title: 'Interview Coordination', body: 'We schedule, brief candidates, and provide interview frameworks tailored to the role\'s technical demands.' },
    { n: '05', title: 'Offer & Close',          body: 'We facilitate offer negotiations, handle counteroffers, and ensure a smooth close with both parties.' },
    { n: '06', title: 'Onboarding Support',     body: '30/60/90-day check-ins with placed candidates and clients ensure the placement sticks.' },
  ]
  return (
    <section className="section-wrapper bg-forest-50" ref={ref}>
      <div className="container-base">
        <div className="text-center mb-12 reveal">
          <p className="section-label mb-3">How It Works</p>
          <h2 className="section-title">Our Process</h2>
          <p className="section-subtitle max-w-xl mx-auto mt-4">
            A disciplined, transparent workflow from first call to first day.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.n}
                 className="reveal bg-white border border-forest-100 rounded-sm p-6
                            hover:shadow-md hover:border-forest-200 transition-all">
              <div className="font-display text-4xl font-bold text-forest-200 mb-3">{step.n}</div>
              <h3 className="font-display text-lg font-semibold text-forest-900 mb-2">{step.title}</h3>
              <p className="font-body text-sm text-forest-700/70 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const ref = useScrollReveal('.reveal')
  const faqs = [
    { q: 'What is your typical time-to-fill for a permanent placement?', a: 'For most roles, we present an initial shortlist within 7-10 business days. Our average time-to-offer is 18 business days, significantly faster than the 42-day industry average.' },
    { q: 'Do you work with clients nationwide or only in the Pacific Northwest?', a: 'We place candidates across the continental U.S. Our core hubs are Portland, Seattle, and San Francisco, but we have successfully completed searches in 38 states.' },
    { q: 'What is your placement guarantee for direct hires?', a: 'All direct placement engagements include a 90-day guarantee. If a placed candidate leaves for any reason within 90 days, we conduct a full replacement search at no additional fee.' },
    { q: 'How do you screen candidates for technical competency?', a: 'Every candidate undergoes a structured phone screen conducted by a team member with relevant field experience. We evaluate both technical knowledge and communication skills needed for the role.' },
    { q: 'Do you offer payroll and benefits administration for contract workers?', a: 'Yes. All contract placements are W-2 employees of Evergreen Resources. We handle payroll, workers\' compensation, unemployment insurance, and can include health benefits.' },
    { q: 'How are your fees structured?', a: 'Direct placement fees are a percentage of the candidate\'s first-year base salary, negotiated based on role complexity. Contract staffing is billed at an hourly bill rate inclusive of our margin.' },
  ]
  return (
    <section className="section-wrapper bg-white" ref={ref}>
      <div className="container-base max-w-3xl">
        <div className="text-center mb-12 reveal">
          <p className="section-label mb-3">FAQ</p>
          <h2 className="section-title">Common Questions</h2>
        </div>
        <Accordion type="single" collapsible className="reveal">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-base font-medium text-forest-900">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-forest-700/80 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader />
      <ServicesDetail />
      <ProcessSection />
      <FAQSection />
    </>
  )
}
