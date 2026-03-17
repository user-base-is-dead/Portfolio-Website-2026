import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Home from '../../components/Home/Home'
import About from '../../components/About/About'
import Work from '../../components/Work/Work'
import Footer from '../../components/Footer/Footer'

gsap.registerPlugin(ScrollTrigger)

const LandingPage = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      // Get all sections with the 'panel' class
      const panels = gsap.utils.toArray('.panel')
      
      panels.forEach((panel, i) => {
        // We pin every panel except the very last one
        if (i < panels.length - 1) {
          const isAbout = panel.classList.contains('about-panel')
          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            end: isAbout ? '+=150%' : 'bottom top', // '+150%' waits 50vh spacer + 100vh slide
            pin: true, 
            pinSpacing: false // Allows the next panel to slide over this one
          })
        }
      })
    }, containerRef)

    return () => {
      lenis.destroy()
      ctx.revert()
    }
  }, [])

  return (
    <main ref={containerRef} className="app-container">
      {/* We add the 'panel' class to wrappers to identify them for GSAP */}
      <div className="panel">
        <Home />
      </div>
      <div className="panel about-panel">
        <About />
      </div>
      {/* Slight Scroll Height Delay before Section 3 */}
      <div className="spacer" style={{ height: '50vh' }}></div>
      <div className="panel">
        <Work />
      </div>
      <Footer />
    </main>
  )
}

export default LandingPage
