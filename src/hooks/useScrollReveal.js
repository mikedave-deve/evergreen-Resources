import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once at module level — safe to call multiple times but wasteful
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
  // Stable ref for options so the effect only runs once per mount
  const optionsRef = useRef(options)

  useEffect(() => {
    if (!containerRef.current) return

    const opts = optionsRef.current
    const elements = containerRef.current.querySelectorAll(selector)
    if (!elements.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: opts.duration || 0.7,
          stagger:  opts.stagger  || 0.1,
          ease:     opts.ease     || 'power2.out',
          scrollTrigger: {
            trigger:  containerRef.current,
            start:    opts.start  || 'top 85%',
            toggleActions: 'play none none none',
            ...opts.scrollTrigger,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [selector]) // selector is stable; options stabilised via ref

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
