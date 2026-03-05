import { industries } from '../data'
import { useScrollReveal } from '../hooks/useScrollReveal'

function PageHeader() {
  return (
    <div className="bg-forest-950 pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container-base">
        <p className="section-label text-forest-400 mb-3">Sector Focus</p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl mb-6">
          Deep Expertise Across{' '}
          <span className="text-forest-400">Every Industrial Discipline</span>
        </h1>
        <p className="font-body text-base md:text-lg text-cream-200/60 max-w-xl leading-relaxed">
          We're devoted to bringing you thee best. Our practice spans
          every major discipline within the sector.
        </p>
      </div>
    </div>
  )
}

const extendedIndustries = [
  ...industries,
  {
    id: 'climate',
    title: 'Climate & Sustainability',
    icon: '🌍',
    description: 'Corporate sustainability, carbon accounting, and climate strategy professionals.',
    color: 'bg-forest-50 border-forest-200',
  },
  {
    id: 'mining',
    title: 'Mining & Reclamation',
    icon: '⛰️',
    description: 'Mine closure, reclamation bonds, and post-mining land use specialists.',
    color: 'bg-cream-50 border-cream-300',
  },
  {
    id: 'waste',
    title: 'Waste Management',
    icon: '♻️',
    description: 'Solid waste, hazardous materials, and landfill operations professionals.',
    color: 'bg-forest-50 border-forest-200',
  },
  {
    id: 'oil',
    title: 'Oil & Gas Environmental',
    icon: '🛢️',
    description: 'Upstream and midstream environmental compliance, spill response, and permitting.',
    color: 'bg-cream-50 border-cream-300',
  },
]

function IndustriesGrid() {
  const ref = useScrollReveal('.reveal')
  return (
    <section className="section-wrapper bg-white" ref={ref}>
      <div className="container-base">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {extendedIndustries.map((ind) => (
            <div key={ind.id}
                 className={`reveal group p-6 rounded-sm border ${ind.color}
                             hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer`}>
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {ind.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-forest-900 mb-2
                             group-hover:text-forest-700 transition-colors">
                {ind.title}
              </h3>
              <p className="font-body text-sm text-forest-700/65 leading-relaxed">
                {ind.description}
              </p>
              <div className="mt-4 h-0.5 w-8 bg-forest-400 group-hover:w-full transition-all duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhySpecialize() {
  const ref = useScrollReveal('.reveal')
  return (
    <section className="section-wrapper bg-forest-900" ref={ref}>
      <div className="container-base">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label text-forest-400 mb-3 reveal">Why It Matters</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 reveal">
            Specialization Produces Better Outcomes
          </h2>
          <p className="font-body text-base text-cream-200/60 leading-relaxed mb-10 reveal">
            A recruiter views various industry sector as a category.
            We view it as a calling. That difference shows up in every conversation,
            every screen, and every placement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: '94%', label: '1-Year Retention', desc: 'Because we validate true fit, not just keywords' },
              { stat: '18d', label: 'Avg. Time-to-Offer', desc: 'vs. 42 days industry average' },
              { stat: '8', label: 'Technical Disciplines', desc: 'Covered by our specialized practice teams' },
            ].map((item) => (
              <div key={item.label} className="reveal bg-forest-800/50 rounded-sm p-6 border border-forest-700/50">
                <div className="font-display text-4xl font-bold text-forest-300 mb-2">{item.stat}</div>
                <div className="font-body text-sm font-semibold text-white mb-1">{item.label}</div>
                <div className="font-body text-xs text-forest-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function IndustriesPage() {
  return (
    <>
      <PageHeader />
      <IndustriesGrid />
      <WhySpecialize />
    </>
  )
}
