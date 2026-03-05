import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StatCounter({ value, label, suffix = '', prefix = '' }) {
  const numRef = useRef(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return

    const numericEnd = parseInt(value.replace(/\D/g, ''), 10)

    const ctx = gsap.context(() => {
      const counter = { val: 0 }
      gsap.to(counter, {
        val: numericEnd,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        onUpdate() {
          el.textContent = `${prefix}${Math.round(counter.val).toLocaleString()}${suffix}`
        },
      })
    })
    return () => ctx.revert()
  }, [value])

  return (
    <div className="text-center gsap-hidden">
      <div className="font-display text-5xl sm:text-6xl font-300 text-cream-100 mb-2">
        <span ref={numRef}>{prefix}0{suffix}</span>
      </div>
      <p className="text-sm font-body text-cream-300 tracking-wide uppercase">{label}</p>
    </div>
  )
}
