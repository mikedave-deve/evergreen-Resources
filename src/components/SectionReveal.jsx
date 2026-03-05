import { useScrollAnimation } from '../hooks/useScrollAnimation'

/**
 * Wrapper that gives children GSAP scroll-triggered reveal animation.
 * Children must have className="gsap-hidden" to animate.
 */
export default function SectionReveal({ children, className = '', options = {} }) {
  const ref = useScrollAnimation(options)

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
