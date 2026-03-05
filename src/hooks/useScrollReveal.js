import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollReveal - attaches GSAP ScrollTrigger fade-up animations
 * to all elements matching `selector` inside the returned `ref`.
 *
 * @param {string}  selector  CSS selector for target children
 * @param {object}  options   GSAP / ScrollTrigger overrides
 */
export function useScrollReveal(selector = '.reveal', options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const elements = containerRef.current.querySelectorAll(selector)
    if (!elements.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.8,
          stagger:  options.stagger  || 0.15,
          ease:     options.ease     || 'power2.out',
          scrollTrigger: {
            trigger:  containerRef.current,
            start:    options.start  || 'top 82%',
            end:      options.end    || 'bottom 20%',
            toggleActions: 'play none none none',
            ...options.scrollTrigger,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [selector, options.duration, options.stagger])

  return containerRef
}

/**
 * useCounterAnimation - animates numeric values on scroll entry
 *
 * @param {Array<{value: number}>}  stats   array of stat objects
 */
export function useCounterAnimation(stats) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !stats?.length) return

    const counters = containerRef.current.querySelectorAll('[data-counter]')
    if (!counters.length) return

    const ctx = gsap.context(() => {
      counters.forEach((el, i) => {
        const target = stats[i]?.value ?? 0
        const obj = { val: 0 }

        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          delay: i * 0.15,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate() {
            el.textContent = Math.round(obj.val).toLocaleString()
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [stats])

  return containerRef
}
