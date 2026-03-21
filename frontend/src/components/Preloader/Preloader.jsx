import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import './Preloader.css'

export default function Preloader({ onReady, iframeReady }) {
  const [loaded, setLoaded] = useState(false)
  const [exiting, setExiting] = useState(false)
  const progressRef = useRef(null)
  const counterRef = useRef(null)
  const buttonsRef = useRef(null)

  // Coordination refs
  const counterObjRef = useRef({ val: 0 })
  const reachedNinety = useRef(false)
  const finishedToHundred = useRef(false)

  // Lock scroll on mount
  useEffect(() => {
    document.body.classList.add('preloader-active')
    if (window.__lenis) window.__lenis.stop()

    return () => {
      document.body.classList.remove('preloader-active')
      if (window.__lenis) window.__lenis.start()
    }
  }, [])

  // Animate counter 90 → 100 then mark loaded
  const animateToHundred = useCallback(() => {
    if (finishedToHundred.current) return
    finishedToHundred.current = true

    const co = counterObjRef.current
    gsap.to(co, {
      val: 100,
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: () => {
        const v = Math.round(co.val)
        if (counterRef.current) counterRef.current.textContent = v
        if (progressRef.current) progressRef.current.style.width = v + '%'
      },
      onComplete: () => setLoaded(true),
    })
  }, [])

  // Phase 1: animate counter 0 → 90
  useEffect(() => {
    const co = counterObjRef.current
    co.val = 0

    gsap.to(co, {
      val: 90,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(co.val)
        if (counterRef.current) counterRef.current.textContent = v
        if (progressRef.current) progressRef.current.style.width = v + '%'
      },
      onComplete: () => {
        reachedNinety.current = true
        // If iframe already loaded by now, finish immediately
        if (iframeReady) {
          animateToHundred()
        }
      },
    })

    // Failsafe: if iframe takes too long (8s total), finish anyway
    const failsafe = setTimeout(() => animateToHundred(), 8000)
    return () => clearTimeout(failsafe)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // When iframeReady flips true and counter is at 90 → finish to 100
  useEffect(() => {
    if (iframeReady && reachedNinety.current) {
      animateToHundred()
    }
  }, [iframeReady, animateToHundred])

  useEffect(() => {
    if (loaded && buttonsRef.current) {
      buttonsRef.current.classList.add('is-visible')
    }
  }, [loaded])

  const handleEnter = useCallback(
    (withSound) => {
      if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
        window.__lenis.scrollTo(0, { immediate: true })
      }
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0

      setExiting(true)

      setTimeout(() => {
        document.body.classList.remove('preloader-active')
        if (window.__lenis) window.__lenis.start()
        if (onReady) onReady(withSound)
      }, 500)
    },
    [onReady]
  )

  return (
    <div className={`preloader ${exiting ? 'is-exiting' : ''}`}>
      <div className="preloader__row">
        <img src="/m-logo.png" alt="" className="preloader__logo" />
        <h1 className="preloader__brand">Mishra</h1>
      </div>

      <p className="preloader__status">
        {loaded ? 'Ready' : 'Loading'}
      </p>

      <div className="preloader__progress">
        <div className="preloader__progress-fill" ref={progressRef} />
      </div>

      <span className="preloader__counter" ref={counterRef}>0</span>

      <div className="preloader__buttons" ref={buttonsRef}>
        <button
          className="preloader__btn preloader__btn--primary"
          onClick={() => handleEnter(true)}
        >
          With Sound
        </button>
        <button
          className="preloader__btn"
          onClick={() => handleEnter(false)}
        >
          Without Sound
        </button>
      </div>
    </div>
  )
}

