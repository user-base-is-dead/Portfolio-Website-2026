import { useRef, useState, useCallback, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import './Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef(null)
  const linksRef = useRef([])
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    if (menuOpen) {
      closeMenu()
    }
  }, [location.pathname])

  const openMenu = useCallback(() => {
    setMenuOpen(true)
    const overlay = overlayRef.current
    const links = linksRef.current

    // Lock scroll
    document.body.style.overflow = 'hidden'
    if (window.__lenis) window.__lenis.stop()

    const tl = gsap.timeline()

    tl.set(overlay, { display: 'flex' })
      .to(overlay, {
        clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)',
        duration: 0.7,
        ease: 'power4.inOut',
      })
      .fromTo(
        links,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.3'
      )
  }, [])

  const closeMenu = useCallback(() => {
    const overlay = overlayRef.current
    const links = linksRef.current

    const tl = gsap.timeline({
      onComplete: () => {
        setMenuOpen(false)
        document.body.style.overflow = ''
        if (window.__lenis) window.__lenis.start()
      },
    })

    tl.to(links, {
      y: -40,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',
    })
      .to(overlay, {
        clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)',
        duration: 0.6,
        ease: 'power4.inOut',
      })
      .set(overlay, { display: 'none' })
  }, [])

  const toggleMenu = useCallback(() => {
    if (menuOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }, [menuOpen, openMenu, closeMenu])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="navbar" id="navbar">
      <Link to="/" className="navbar__logo">Mishra</Link>

      {/* Desktop links */}
      <ul className="navbar__links">
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="navbar__link">{link.label}</Link>
          </li>
        ))}
      </ul>

      {/* Hamburger button */}
      <button
        className={`navbar__burger ${menuOpen ? 'is-open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="navbar__burger-line" />
        <span className="navbar__burger-line" />
        <span className="navbar__burger-line" />
      </button>

      {/* Fullscreen mobile overlay */}
      <div
        className="navbar__overlay"
        ref={overlayRef}
        style={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)', display: 'none' }}
      >
        <ul className="navbar__overlay-links">
          {navLinks.map((link, i) => (
            <li
              key={link.to}
              ref={(el) => (linksRef.current[i] = el)}
              className="navbar__overlay-item"
            >
              <Link
                to={link.to}
                className="navbar__overlay-link"
                onClick={closeMenu}
              >
                <span className="navbar__overlay-number">0{i + 1}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
