import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import './Preloader.css'

export default function Preloader({ onReady }) {
  const [loaded, setLoaded] = useState(false)
  const [exiting, setExiting] = useState(false)
  const progressRef = useRef(null)
  const counterRef = useRef(null)
  const buttonsRef = useRef(null)

  // Lock scroll on mount
  useEffect(() => {
    document.body.classList.add('preloader-active')
    // Also pause Lenis if available
    if (window.__lenis) window.__lenis.stop()

    return () => {
      document.body.classList.remove('preloader-active')
      if (window.__lenis) window.__lenis.start()
    }
  }, [])

  useEffect(() => {
    const counterObj = { val: 0 }

    gsap.to(counterObj, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counterObj.val)
        if (counterRef.current) counterRef.current.textContent = v
        if (progressRef.current) progressRef.current.style.width = v + '%'
      },
      onComplete: () => {
        setLoaded(true)
      },
    })
  }, [])

  useEffect(() => {
    if (loaded && buttonsRef.current) {
      buttonsRef.current.classList.add('is-visible')
    }
  }, [loaded])

  const handleEnter = useCallback(
    (withSound) => {
      // Scroll to top BEFORE fading out so page is already at top
      if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
        window.__lenis.scrollTo(0, { immediate: true })
      }
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0

      // Now fade out the preloader
      setExiting(true)

      setTimeout(() => {
        // Unlock scroll
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
