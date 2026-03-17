import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import './About.css'
import profileImg from '../../assets/profile.jpg'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Split the text into lines first
    const splitText = new SplitType('.about-text', { types: 'lines' })
    
    // Wrap each line in a div with overflow hidden so they can slide up from "below"
    splitText.lines.forEach(line => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'inline-block' // to keep layout intact
      wrapper.style.verticalAlign = 'bottom'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    const ctx = gsap.context(() => {
      // Timeline for text elements
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 85%',  // Starts when the top of the content hits 85% down the viewport
          end: 'bottom 85%', // Finishes faster when bottom of content hits 85% of viewport
          scrub: 1
        }
      })

      tl.from('.about-heading', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      // Animate the split lines instead of the whole paragraph
      .from(splitText.lines, {
        y: 60,
        opacity: 0,
        rotateZ: 5,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.about-btn-wrapper', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.2')

      // Separate animation for image (swipe up reveal effect)
      gsap.fromTo('.about-image', 
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
        },
        {
          scrollTrigger: {
            trigger: '.about-image-wrapper',
            start: 'top 85%', // Match text start
            end: 'bottom 85%', // Finish sooner
            scrub: 1
          },
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power3.inOut' // removed duration since scrub dictates it
        }
      )
    }, sectionRef)

    return () => {
      ctx.revert() // Cleanup GSAP matchMedia/context on unmount
      splitText.revert() // Revert the split type manipulation on unmount
    }
  }, [])

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      {/* ── Smoke / Cloud Background ── */}
      <div className="smoke-layer">
        <div className="smoke-blob smoke-blob--1" />
        <div className="smoke-blob smoke-blob--2" />
        <div className="smoke-blob smoke-blob--3" />
        <div className="smoke-blob smoke-blob--4" />
      </div>

      <div className="about-container">
        {/* ── Left Side: Text ── */}
        <div className="about-content">
          <h2 className="about-heading">ABOUT ME</h2>
          <p className="about-text">
            Hi everyone, my real name is Debasrit Mishra, but most people call me Yansh or simply Mishra. Online, I go by the name ErinPowerX, as I prefer keeping my real name private. The reason behind this choice is that the digital world works like a permanent footprint, where everything we do remains recorded forever.
          </p>
          <p className="about-text">
            It’s not just about names; every action, from viral posts to cyber activities, becomes part of our digital identity. Because of this, I created a separate identity and personality for my online presence.
          </p>
          <p className="about-text">
            I am currently a college student at NIT, in my fourth and final year as of October 5, 2025. I am 22 years old, and it still surprises me how quickly time has passed. I was born in Jajpur, Odisha, a beautiful place located in the eastern state of Odisha, India.
          </p>
          <div className="about-btn-wrapper">
            <a href="#" className="about-btn">
              CLICK TO KNOW MORE ABOUT ME
            </a>
          </div>
        </div>

        {/* ── Right Side: Photo ── */}
        <div className="about-image-wrapper">
          <img src={profileImg} alt="Debasrit Mishra" className="about-image" />
        </div>
      </div>
    </section>
  )
}

export default About
