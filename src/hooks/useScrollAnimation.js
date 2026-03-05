import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll('.gsap-hidden')
    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.8,
          stagger: options.stagger || 0.15,
          ease: options.ease || 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start || 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}

export function useCounterAnimation(targetRef, end, duration = 2) {
  useEffect(() => {
    const el = targetRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        { val: 0 },
        { val: end, duration, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          onUpdate: function () {
            el.textContent = Math.round(this.targets()[0].val).toLocaleString()
          },
        }
      )
    })

    return () => ctx.revert()
  }, [end, duration])
}
