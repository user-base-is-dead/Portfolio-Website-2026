import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { usePageTransition } from '../../components/PageTransition/PageTransition'
import './ContactPage.css'

gsap.registerPlugin(ScrollTrigger)

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4Z" />
  </svg>
)

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
    <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
  </svg>
)

function ContactPage() {
  const pageRef = useRef(null)
  const [toast, setToast] = useState('')
  const { finishTransition } = usePageTransition()

  const contactItems = useMemo(() => {
    const email = 'debasritmishra8@gmail.com'
    return [
      {
        key: 'email',
        title: 'Email',
        subtitle: email,
        icon: EmailIcon,
        primary: {
          label: 'Compose',
          href: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        },
        secondary: {
          label: 'Copy',
          action: async () => {
            await navigator.clipboard.writeText(email)
            setToast('Email copied')
          },
        },
      },
      {
        key: 'discord',
        title: 'Discord',
        subtitle: 'user_data76',
        icon: LinkIcon,
        primary: {
          label: 'Open profile',
          href: 'https://discord.com/users/1318549874740035654',
        },
        secondary: {
          label: 'Copy ID',
          action: async () => {
            await navigator.clipboard.writeText('user_data76')
            setToast('Discord copied')
          },
        },
      },
      {
        key: 'github',
        title: 'GitHub',
        subtitle: 'user-base-is-dead',
        icon: LinkIcon,
        primary: {
          label: 'Open GitHub',
          href: 'http://github.com/user-base-is-dead',
        },
        secondary: {
          label: 'Copy link',
          action: async () => {
            await navigator.clipboard.writeText('http://github.com/user-base-is-dead')
            setToast('GitHub link copied')
          },
        },
      },
      {
        key: 'x',
        title: 'X',
        subtitle: '@777Koding',
        icon: LinkIcon,
        primary: {
          label: 'Open X',
          href: 'https://x.com/777Koding',
        },
        secondary: {
          label: 'Copy link',
          action: async () => {
            await navigator.clipboard.writeText('https://x.com/777Koding')
            setToast('X link copied')
          },
        },
      },
    ]
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 1700)
    return () => clearTimeout(t)
  }, [toast])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-hero__title', {
        y: 26,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      gsap.from('.contact-hero__subtitle', {
        y: 18,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out',
      })

      gsap.from('.contact-hero__badge', {
        y: 16,
        opacity: 0,
        duration: 0.7,
        delay: 0.18,
        ease: 'power3.out',
      })

      gsap.from('.contact-card', {
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 80%',
        },
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      })

      gsap.from('.contact-form', {
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 85%',
        },
        y: 26,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    setToast('This form is UI-only for now')
  }

  const onSafeAction = async (action) => {
    try {
      await action()
    } catch {
      setToast('Copy failed (browser blocked)')
    }
  }

  return (
    <div className="contactpage" ref={pageRef}>
      <section className="contact-hero">
        <Navbar />

        <div className="contact-hero__video-bg">
          <iframe
            onLoad={() => finishTransition()}
            src="https://www.youtube.com/embed/qGQVz0J6jOE?autoplay=1&mute=1&loop=1&playlist=qGQVz0J6jOE&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playsinline=1"
            title="Background Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        <div className="contact-hero__overlay" />

        <div className="contact-hero__content">
          <p className="contact-hero__eyebrow">CONTACT</p>
          <h1 className="contact-hero__title">LET’S BUILD SOMETHING</h1>
          <p className="contact-hero__subtitle">
            Fast replies. Clean communication. Strong execution.
          </p>

          <div className="contact-hero__badge" role="status" aria-label="Availability">
            <span className="contact-hero__badge-dot" aria-hidden="true" />
            <span className="contact-hero__badge-text">Available for collabs</span>
          </div>
        </div>

        <div className="contact-hero__scroll">
          <span className="contact-hero__scroll-text">Scroll</span>
          <div className="contact-hero__scroll-line" />
        </div>
      </section>

      <section className="contact-body">
        <div className="contact-smoke-layer" aria-hidden="true">
          <div className="contact-smoke-blob contact-smoke-blob--1" />
          <div className="contact-smoke-blob contact-smoke-blob--2" />
          <div className="contact-smoke-blob contact-smoke-blob--3" />
          <div className="contact-smoke-blob contact-smoke-blob--4" />
        </div>

        <div className="contact-container">
          <div className="contact-header">
            <h2 className="contact-heading">REACH OUT</h2>
            <p className="contact-desc">
              Choose a channel below or drop a message. The “Copy” buttons are
              instant so you can paste anywhere.
            </p>
          </div>

          <div className="contact-grid">
            {contactItems.map((item) => {
              const Icon = item.icon
              return (
                <div className="contact-card" key={item.key}>
                  <div className="contact-card__top">
                    <span className="contact-card__icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div className="contact-card__meta">
                      <h3 className="contact-card__title">{item.title}</h3>
                      <p className="contact-card__subtitle">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="contact-card__actions">
                    <a
                      className="contact-btn contact-btn--primary"
                      href={item.primary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SendIcon />
                      <span>{item.primary.label}</span>
                    </a>

                    <button
                      type="button"
                      className="contact-btn contact-btn--ghost"
                      onClick={() => onSafeAction(item.secondary.action)}
                    >
                      <CopyIcon />
                      <span>{item.secondary.label}</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <div className="contact-form__header">
              <h3 className="contact-form__title">Send a message</h3>
              <p className="contact-form__hint">
                This is a styled form. If you want, I can connect it to EmailJS
                or your backend later.
              </p>
            </div>

            <div className="contact-form__grid">
              <label className="contact-field">
                <span className="contact-field__label">Name</span>
                <input className="contact-field__input" name="name" placeholder="Your name" autoComplete="name" />
              </label>

              <label className="contact-field">
                <span className="contact-field__label">Email</span>
                <input className="contact-field__input" name="email" placeholder="you@example.com" autoComplete="email" />
              </label>

              <label className="contact-field contact-field--full">
                <span className="contact-field__label">Message</span>
                <textarea className="contact-field__textarea" name="message" rows={6} placeholder="Tell me what you want to build..." />
              </label>
            </div>

            <div className="contact-form__footer">
              <button className="contact-btn contact-btn--primary contact-btn--submit" type="submit">
                <SendIcon />
                <span>Send</span>
              </button>
              <p className="contact-form__fineprint">
                By sending, you agree to be awesome.
              </p>
            </div>
          </form>
        </div>
      </section>

      {toast ? (
        <div className="contact-toast" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}

      <Footer />
    </div>
  )
}

export default ContactPage

