import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { usePageTransition } from './PageTransition'

/**
 * Drop-in replacement for react-router-dom's <Link>.
 * Intercepts clicks, plays the morphing SVG transition,
 * then navigates at the midpoint while the screen is covered.
 */
export default function TransitionLink({ to, children, className, ...rest }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { triggerTransition } = usePageTransition()

  const handleClick = useCallback(
    (e) => {
      e.preventDefault()

      // Don't animate if we're already on this page
      if (location.pathname === to) return

      triggerTransition(() => {
        navigate(to)
      })
    },
    [to, location.pathname, navigate, triggerTransition]
  )

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  )
}
