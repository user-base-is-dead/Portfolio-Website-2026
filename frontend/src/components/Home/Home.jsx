import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../Navbar/Navbar'
import { usePageTransition } from '../PageTransition/PageTransition'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['FURTHER', 'BEYOND', 'OUT OF LIMITS', 'TO THE EDGE', 'NEXT LEVEL']

const Home = () => {
  const [wordIndex, setWordIndex] = useState(0)
  const [glitching, setGlitching] = useState(false)
  const homeRef = useRef(null)
  const { finishTransition } = usePageTransition()

  useEffect(() => {
    // Initial home load animation & scrub for scrolling back
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ['.home-hero__greeting', '.home-hero__title', '.home-hero__cycling-word', '.home-hero__subtitle', '.home-hero__scroll'],
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          delay: 0.2,
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.out'
        }
      )
    }, homeRef)

    const interval = setInterval(() => {
      setGlitching(true)

      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % WORDS.length)
      }, 200)

      setTimeout(() => {
        setGlitching(false)
      }, 500)
    }, 2500)

    return () => {
      clearInterval(interval)
      ctx.revert()
    }
  }, [])

  return (
    <section className="home-hero" id="home" ref={homeRef}>
      <Navbar />

      <div className="home-hero__video-bg">
        <iframe
          onLoad={() => finishTransition()}
          src="https://www.youtube.com/embed/Vn-ms0Ny0WU?autoplay=1&mute=1&loop=1&playlist=Vn-ms0Ny0WU&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playsinline=1"
          title="Background Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      <div className="home-hero__overlay" />

      <div className="home-hero__content">
        <p className="home-hero__greeting">Welcome to my site</p>
        <h1 className="home-hero__title">
          <span className="home-hero__take">TAKE </span>
          <span className="home-hero__creativity">CREATIVITY</span>
        </h1>
        <h1
          className={`home-hero__cycling-word ${glitching ? 'error-glitch' : ''}`}
          data-text={WORDS[wordIndex]}
        >
          {WORDS[wordIndex]}
        </h1>

        <p className="home-hero__subtitle">
          Crafting immersive digital experiences with clean code and bold design.
        </p>
      </div>

      <div className="home-hero__scroll">
        <span className="home-hero__scroll-text">Scroll</span>
        <div className="home-hero__scroll-line" />
      </div>
    </section>
  )
}

export default Home
