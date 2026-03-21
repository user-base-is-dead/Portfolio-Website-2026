import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Home from '../../components/Home/Home'
import About from '../../components/About/About'
import Work from '../../components/Work/Work'
import Footer from '../../components/Footer/Footer'

gsap.registerPlugin(ScrollTrigger)

const LandingPage = ({ onIframeLoad }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only pin panels on desktop (>1024px)
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1025px)', () => {
        const panels = gsap.utils.toArray('.panel')
        
        panels.forEach((panel, i) => {
          if (i < panels.length - 1) {
            const isAbout = panel.classList.contains('about-panel')
            ScrollTrigger.create({
              trigger: panel,
              start: 'top top',
              end: isAbout ? '+=150%' : 'bottom top',
              pin: true, 
              pinSpacing: false
            })
          }
        })
      })
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <main ref={containerRef} className="app-container">
      {/* We add the 'panel' class to wrappers to identify them for GSAP */}
      <div className="panel">
        <Home onIframeLoad={onIframeLoad} />
      </div>
      <div className="panel about-panel">
        <About />
      </div>
      {/* Slight Scroll Height Delay before Section 3 (desktop only) */}
      <div className="spacer desktop-only" style={{ height: '50vh' }}></div>
      <div className="panel">
        <Work />
      </div>
      <Footer />
    </main>
  )
}

export default LandingPage
