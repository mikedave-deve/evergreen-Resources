import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'

export default function PageHero({ label, title, subtitle, cta, ctaHref = '/', secondary, secondaryHref = '/contact', image }) {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [labelRef.current, titleRef.current, subtitleRef.current, ctaRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a1f13 0%, #1a4a2e 50%, #0d2818 100%)',
      }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, #d4a853 0%, transparent 50%), 
                            radial-gradient(circle at 80% 20%, #52b788 0%, transparent 50%)`,
        }}
      />
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 40px),
                            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 40px)`,
        }}
      />

      <div className="container-main relative z-10 py-32 md:py-40">
        <div className="max-w-3xl">
          {label && <p ref={labelRef} className="label-tag opacity-0">{label}</p>}
          <h1 ref={titleRef} className="heading-xl text-cream-100 mb-6 opacity-0">{title}</h1>
          {subtitle && <p ref={subtitleRef} className="text-base sm:text-lg text-cream-300 max-w-xl leading-relaxed mb-8 opacity-0">{subtitle}</p>}
          {cta && (
            <div ref={ctaRef} className="flex flex-wrap gap-3 opacity-0">
              <Link to={ctaHref} className="btn-gold">{cta}</Link>
              {secondary && <Link to={secondaryHref} className="btn-outline border-cream-200 text-cream-100 hover:bg-cream-100 hover:text-forest-900">{secondary}</Link>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
