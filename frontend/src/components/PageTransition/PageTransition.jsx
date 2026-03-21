import { createContext, useContext, useRef, useCallback, useState, useMemo, useEffect } from 'react'
import { useLocation, Routes } from 'react-router-dom'
import gsap from 'gsap'
import './PageTransition.css'

/* ── Context ──────────────────────────────────────── */
const TransitionContext = createContext(null)

export function usePageTransition() {
  return useContext(TransitionContext)
}

/* ── Wrapper for <Routes> to freeze location ─────── */
export function TransitionRoutes({ children }) {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const { triggerTransition } = usePageTransition()

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      triggerTransition(() => {
        setDisplayLocation(location)
        
        // Reset scroll seamlessly during the blackout
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual'
        }
        if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
          window.__lenis.scrollTo(0, { immediate: true })
        } else {
          window.scrollTo(0, 0)
        }
      })
    }
  }, [location, displayLocation.pathname, triggerTransition])

  return (
    <Routes location={displayLocation}>
      {children}
    </Routes>
  )
}

/* ── SVG path keyframes (viewBox = "0 0 100 100") ── */
// Flat line sitting just below the viewport
const PATH_START =
  'M 0 100 V 100 Q 50 100 100 100 V 100 H 0 Z'

// Curved wave rising from bottom
const PATH_CURVE =
  'M 0 100 V 50 Q 50 0 100 50 V 100 H 0 Z'

// Full rectangle covering the entire viewport
const PATH_FULL =
  'M 0 100 V 0 Q 50 0 100 0 V 100 H 0 Z'

// Switch to a top-anchored path that ALSO covers the screen
const PATH_TOP_FULL =
  'M 0 0 V 100 Q 50 100 100 100 V 0 H 0 Z'

// For the reveal (exit) phase — bottom edge lifts, curving upward
const PATH_EXIT_CURVE =
  'M 0 0 V 50 Q 50 0 100 50 V 0 H 0 Z'

// Final flat line above the viewport (gone)
const PATH_EXIT_END =
  'M 0 0 V 0 Q 50 0 100 0 V 0 H 0 Z'

/* ── Provider + Overlay ───────────────────────────── */
export function TransitionProvider({ children }) {
  const pathRef = useRef(null)
  const overlayRef = useRef(null)
  const loaderRef = useRef(null)
  const counterRef = useRef(null)
  const lineFillRef = useRef(null)
  const isAnimating = useRef(false)
  const [animClass, setAnimClass] = useState('')
  const finishRef = useRef(null)

  const triggerTransition = useCallback((onMidpoint) => {
    if (isAnimating.current) return
    isAnimating.current = true
    setAnimClass('is-animating')

    // Lock scroll during transition
    document.body.classList.add('preloader-active')
    if (window.__lenis) window.__lenis.stop()

    const path = pathRef.current
    const loader = loaderRef.current
    const counter = counterRef.current
    const counterObj = { val: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false
        setAnimClass('')

        // Unlock scroll and ensure we're at top
        document.body.classList.remove('preloader-active')
        if (window.__lenis) {
          window.__lenis.start()
          window.__lenis.scrollTo(0, { immediate: true })
        }
        window.scrollTo(0, 0)
      },
    })

    // ── COVER phase ──
    tl.set(path, { attr: { d: PATH_START } })

      // 1) Flat → Curve (wave rises from bottom)
      .to(path, {
        attr: { d: PATH_CURVE },
        duration: 0.35,
        ease: 'power3.in',
      })

      // 2) Curve → Full cover
      .to(path, {
        attr: { d: PATH_FULL },
        duration: 0.35,
        ease: 'power3.out',
      })

      // Show loader + start counter
      .call(() => {
        if (counter) counter.textContent = '0'
        counterObj.val = 0
      })
      .to(loader, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      }, '-=0.1')

      // Phase 1: Animate counter 0 → 90
      .to(counterObj, {
        val: 90,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(counterObj.val)
          if (counter) counter.textContent = v
          if (lineFillRef.current) lineFillRef.current.style.width = v + '%'
        },
      }, '-=0.1')

      // ── MIDPOINT: swap the page & WAIT for iframe ──
      .call(() => {
        if (onMidpoint) onMidpoint()
        
        tl.pause()

        finishRef.current = () => {
          // Phase 2: Animate counter 90 → 100, then resume reveal
          gsap.to(counterObj, {
            val: 100,
            duration: 0.4,
            ease: 'power2.out',
            onUpdate: () => {
              const v = Math.round(counterObj.val)
              if (counter) counter.textContent = v
              if (lineFillRef.current) lineFillRef.current.style.width = v + '%'
            },
            onComplete: () => {
              if (tl.paused()) {
                tl.play()
              }
            },
          })
        }

        // Failsafe: auto-resume after 6s (generous for mobile iframe loading)
        setTimeout(() => {
          if (finishRef.current) {
            finishRef.current()
            finishRef.current = null
          }
        }, 6000)
      })

      // Hide loader before peeling
      .to(loader, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      })

      // ── REVEAL phase ──
      .set(path, { attr: { d: PATH_TOP_FULL } })
      
      .to(path, {
        attr: { d: PATH_EXIT_CURVE },
        duration: 0.35,
        ease: 'power3.in',
      })

      .to(path, {
        attr: { d: PATH_EXIT_END },
        duration: 0.35,
        ease: 'power3.out',
      })
  }, [])

  const finishTransition = useCallback(() => {
    if (finishRef.current) {
      finishRef.current()
      finishRef.current = null
    }
  }, [])

  const contextValue = useMemo(
    () => ({ triggerTransition, finishTransition }),
    [triggerTransition, finishTransition]
  )

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}

      {/* Fixed SVG overlay */}
      <div
        ref={overlayRef}
        className={`page-transition ${animClass}`}
      >
        <svg
          className="page-transition__svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d={PATH_EXIT_END}
            fill="#f0ece2"
          />
        </svg>

        {/* Loading UI */}
        <div className="page-transition__loader" ref={loaderRef}>
          <div className="page-transition__row">
            <img src="/m-logo.png" alt="" className="page-transition__logo" />
            <h2 className="page-transition__brand">Mishra</h2>
          </div>
          <span className="page-transition__counter" ref={counterRef}>0</span>
          <div className="page-transition__line">
            <div className="page-transition__line-fill" ref={lineFillRef} />
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  )
}
