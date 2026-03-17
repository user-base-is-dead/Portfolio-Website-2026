import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import SplitType from 'split-type'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import profileImg from '../../assets/profile.jpg'
import bot1Img from '../../assets/bot1.jpg'
import bot2Img from '../../assets/bot2.jpg'
import cheat1Img from '../../assets/cheatss1.png'
import cheat2Img from '../../assets/cheatss2.png'
import cheat3Img from '../../assets/cheatss3.png'
import './AboutPage.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const AboutPage = () => {
  const pageRef = useRef(null)
  const modalRef = useRef(null)
  const modalPanelRef = useRef(null)
  const modalCloseBtnRef = useRef(null)
  const schoolStoryScrollRef = useRef(null)
  const [activeExperienceKey, setActiveExperienceKey] = useState(null)
  const [isModalClosing, setIsModalClosing] = useState(false)

  const experiences = useMemo(
    () => [
      {
        key: 'etn-wp',
        title: 'ETN Solutions Pvt Ltd - WordPress Developer',
        role: 'WordPress Frontend Developer',
        timeframe: '2025 - 2026',
        tags: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'Elementor', 'PHP'],
        description:
          'Detail-oriented WordPress Frontend Developer with hands-on experience in designing and developing responsive websites. Skilled in creating user-friendly interfaces and optimizing website performance to enhance user experience.',

        notes: [
          'Developed and customized responsive WordPress websites.',
          'Designed and modified themes using HTML, CSS, and JavaScript.',
          'Integrated plugins and optimized website speed and performance.',
          'Ensured cross-browser compatibility and mobile responsiveness.',
          'Collaborated with backend team for API integration.',
          'Implemented UI/UX improvements based on client requirements.'
        ],
      },
      {
        key: 'etn-sql',
        title: 'ETN Solutions Pvt Ltd - Database Management',
        role: 'Entry-Level SQL Professional',
        timeframe: '2025 - 2026',
        tags: ['SQL', 'Database Management', 'Data Handling'],
        description:
          'Entry-level SQL professional with hands-on exposure to database maintenance and query execution. Collaborated with senior developers to support website development and database management activities, handling assigned tasks and learning best practices in a professional environment.',

        notes: [
          'Executed basic SQL queries (SELECT, INSERT, UPDATE, DELETE) for data handling.',
          'Assisted in maintaining database records and updating information as required.',
          'Monitored database entries to ensure consistency and accuracy.',
          'Learned database structure and management practices under supervision.',
          'Collaborated with backend team to support database tasks.'
        ],
      },
      {
        key: 'discord-bots',
        title: 'Discord Bot Development',
        role: 'Python Developer (Discord Bots)',
        timeframe: 'Self Experience',
        // tags: ['Python', 'discord.py', 'Discord API', 'yt-dlp', 'FFmpeg', 'asyncio'],
        // description:
        //   '',
        // notes: [
        //   'Built using discord.py and yt-dlp, streaming audio directly from YouTube via FFmpeg for low latency and optimal sound quality (even under concurrent requests).',
        //   'Asynchronous command system supporting both slash and prefix commands, with full playback control (volume, queue, skip, pause, loop).',
        //   'Queue management, auto-disconnect logic, idle-time detection, and a 24/7 persistent mode for long sessions.',
        //   'Strong error handling + logging + clean coroutine management to prevent command blocking and memory leaks.',
        //   'Modular architecture designed for future upgrades (Spotify integration, database song caching, web dashboard).',
        //   'Tech stack: Python, Discord API, yt-dlp, FFmpeg, asyncio, logging, error handling, OOP design pattern.',
        //   'Role: independently conceptualized, designed, coded, and optimized core systems from scratch (scalability, stability, UX).',
        //   'Source: https://github.com/user-base-is-dead/eva_music_bot',
        //   'Invite: https://discord.com/oauth2/authorize?client_id=1387626887358185635&permissions=8&integration_type=0&scope=bot',
        //   'Also built a Discord bot list project with a team (“ParadiseBotLists”) during the peak era of bot lists; later sold it due to time constraints.',
        // ],
        projects: [
          {
            key: 'bot-1',
            name: 'Eva BeatNix',
            description: 'A Music Bot.',
            features: [
              'Eva BeatNix is an advanced, production-ready Discord music bot engineered entirely in Python, designed to deliver smooth, high-quality, real-time music streaming experiences within Discord servers.',
              'Built using discord.py and yt-dlp, it efficiently fetches and streams audio directly from YouTube using FFmpeg, ensuring low latency and optimal sound quality even under concurrent requests.',
              'Implements a robust asynchronous command handling system supporting both slash and prefix-based commands, allowing users to interact seamlessly with precise control over playback, volume, queue, skip, pause, and loop functionalities.',
              'Features intelligent queue management, auto-disconnect logic, idle-time detection, and a 24/7 persistent mode, ensuring reliability and consistent uptime during long sessions.',
              'Optimized with advanced error handling, logging mechanisms, and clean coroutine management to prevent memory leaks and command blocking during multi-threaded operations.',
              'Modular architecture making it easily extendable for future updates such as Spotify integration, database-based song caching, and web dashboard control.'
            ],
            techStack: 'Python | Discord API | yt-dlp | FFmpeg | asyncio | logging | error handling | OOP design pattern',
            role: 'Independently conceptualized, designed, coded, and optimized all core systems from scratch, focusing on scalability, stability, and user experience.',
            links: [
              { label: 'Source Code Of My Bot Eva BeatNix', url: 'https://github.com/user-base-is-dead/eva_music_bot', text: 'View Source on GitHub' },
              { label: 'Invite my Music Bot To Your Server', url: 'https://discord.com/oauth2/authorize?client_id=1387626887358185635&permissions=8&integration_type=0&scope=bot', text: 'Invite Eva BeatNix' }
            ],
            screenshots: [{ src: bot1Img, alt: 'Eva BeatNix screenshot'}],
          },
          {
            key: 'bot-2',
            name: 'Other Bots',
            description: 'All kind of bots like security, music, moderatrion, etcs.',
            features: [
              '2024 was a time when Discord Bot lists were at peak, So me and a team decided to make our bot list',
              'So we ended up making ParadiseBotLists. But now to this year 2025 I do not own it anymore as back then had no time to dev/own it so I decided to sell it onwards.'

            ],
            screenshots: [{ src: bot2Img, alt: 'Screenshot'}],
          },
        ]
      },
      {
        key: 'anticheat',
        title: 'Anticheat Bypass And Cheats',
        role: 'Reverse Engineering / Security Research',
        timeframe: 'Self Experience',
        tags: ['Reverse engineering', 'Bypass'],
        // description: '',
        // notes: [
        //   'Placeholder note 1...',
        //   'Placeholder note 2...'
        // ],
        projects: [
          {
            key: 'cheat-1',
            name: 'Anticheat Bypass And Cheats Of PUBG/BGMI',
            description: '⚠️This is for educational purpose, currently I\'m not involve in any of these projects.⚠️',
            features: [
              'I previously created unauthorized game modifications (hacks and anti-cheat bypasses for PUBG/BGMI)',
              'Early in my career I developed game hacks and anti-cheat bypasses for PUBG and BGMI. That experience gave me deep reverse-engineering and systems knowledge — skills I now aim to apply responsibly.'
            ],
            screenshots: [{ src: cheat1Img, alt: 'Eva BeatNix screenshot'}],
          },
          {
            key: 'cheat-2',
            name: 'Anticheat Bypass of DayZ Game',
            description: '⚠️This is for educational purpose, currently I\'m not involve in any of these projects.⚠️',
            features: [
              'My very own Anti-Cheat System for not just DayZ but for most top-played games!',
              'I started this Anti-Cheat journey in 2023, and it has been one of the best experiences — from getting advice and technical help to connecting with some of the top cybersecurity professionals. Right now, I\'m proud that it\'s gradually being introduced into multiple platforms. The system uses AI intelligence to differentiate between cheaters and legitimate human behavior.'

            ],
            screenshots: [{ src: cheat2Img, alt: 'Screenshot'}],
          },
          {
            key: 'cheat-3',
            name: 'Back In 2016-17 Mini Militia Hack At The Age Of 13',
            description: 'You don\'t need to judge this. I only shared it with you because it\'s just some nostalgic memories of mine — the things we used to do for fun, just for enjoyment.',
            features: [
              'This is my first game that I made its mod version with cheat feature with my neighbour friend SUJAL',
              'Even though we didn\'t know binary, we saw weapon names in the hex/dot layout next to the binary lines, so we randomly changed the values, tested until something worked, and shared the working changes publicly on our TG channel.',
              'At that time back in 2016 me and my neighbourhood friend we both are only of 13 age and there is no AI and YouTube videos for a proper guidance.'
            ],
            screenshots: [{ src: cheat3Img, alt: 'Screenshot'}],
          },
        ]
      },
    ],
    []
  )

  const activeExperience = useMemo(() => {
    if (!activeExperienceKey) return null
    return experiences.find((e) => e.key === activeExperienceKey) ?? null
  }, [activeExperienceKey, experiences])

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  }, [])

  const openExperience = useCallback((key) => {
    setActiveExperienceKey(key)
  }, [])

  const closeExperience = useCallback(() => {
    if (!activeExperienceKey || isModalClosing) return
    if (reducedMotion) {
      setActiveExperienceKey(null)
      return
    }

    const overlay = modalRef.current
    const panel = modalPanelRef.current
    if (!overlay || !panel) {
      setActiveExperienceKey(null)
      return
    }

    setIsModalClosing(true)
    gsap
      .timeline({
        onComplete: () => {
          setActiveExperienceKey(null)
          setIsModalClosing(false)
        },
      })
      .to(panel, {
        y: 12,
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
      })
      .to(
        overlay,
        {
          opacity: 0,
          duration: 0.18,
          ease: 'power2.in',
        },
        '-=0.16'
      )
  }, [activeExperienceKey, isModalClosing, reducedMotion])

  useEffect(() => {
    if (!activeExperienceKey) return

    // Lock background scroll while reading
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeExperience()
    }
    window.addEventListener('keydown', onKeyDown)

    const overlay = modalRef.current
    const panel = modalPanelRef.current
    if (overlay && panel) {
      gsap.set(overlay, { opacity: 0 })
      gsap.set(panel, {
        opacity: 0,
        y: 18,
        clipPath: 'polygon(0 4%, 100% 0, 100% 96%, 0 100%)',
      })

      if (!reducedMotion) {
        gsap
          .timeline()
          .to(overlay, { opacity: 1, duration: 0.22, ease: 'power2.out' })
          .to(
            panel,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.08'
          )
          .fromTo(
            panel.querySelectorAll('.skillsxp-modal__stagger'),
            { y: 10, opacity: 0, filter: 'blur(6px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.55,
              ease: 'power3.out',
              stagger: 0.05,
              delay: 0.04,
            },
            '-=0.18'
          )
      } else {
        gsap.set(overlay, { opacity: 1 })
        gsap.set(panel, { opacity: 1, y: 0, clipPath: 'none' })
      }
    }

    // Move focus to close button for keyboard users
    setTimeout(() => modalCloseBtnRef.current?.focus?.(), 0)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [activeExperienceKey, closeExperience, reducedMotion])

  useEffect(() => {
    // Split the text into lines for BOTH sections
    const splitTextAbout = new SplitType('.about-text-anim', { types: 'lines' })
    const splitTextSchool = new SplitType('.school-text-anim', { types: 'lines' })

    // Helper to wrap lines for the slide-up reveal
    const wrapLines = (splitInstance) => {
      splitInstance.lines.forEach(line => {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        wrapper.style.display = 'inline-block'
        wrapper.style.verticalAlign = 'bottom'
        line.parentNode.insertBefore(wrapper, line)
        wrapper.appendChild(line)
      })
    }

    wrapLines(splitTextAbout)
    wrapLines(splitTextSchool)

    const ctx = gsap.context(() => {
      // Simple load animation for the Hero section Title (No scroll scrub)
      gsap.from('.aboutpage-hero__title', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      })

      // Timeline for about-me content text elements
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.aboutpage-content',
          start: 'top 85%',
          end: 'bottom 85%',
          scrub: 1
        }
      })

      tl.from('.aboutpage-heading', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, 0)
      .from(splitTextAbout.lines, {
        y: 60,
        opacity: 0,
        rotateZ: 5,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      }, '-=0.4')

      // Image swipe-up reveal (about me)
      gsap.fromTo('.aboutpage-image',
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
        },
        {
          scrollTrigger: {
            trigger: '.aboutpage-image-wrapper',
            start: 'top 85%',
            end: 'bottom 85%',
            scrub: 1
          },
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power3.inOut'
        }
      )

      // Heading animation — uses scrub so it reverses on scroll-up
      gsap.from('.schoolstory-heading', {
        scrollTrigger: {
          trigger: '.schoolstory-section',
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })

      // Text lines inside the scrollable container — play once, do NOT
      // reverse on scroll-up (otherwise scrub reversal causes bleed-through
      // with the overflow-y scroll container)
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.schoolstory-content',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })

      tl2.from(splitTextSchool.lines, {
        y: 60,
        opacity: 0,
        rotateZ: 5,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      })

      // Image swipe-up reveal (school story) — scrub so it reverses
      gsap.fromTo('.schoolstory-image',
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
        },
        {
          scrollTrigger: {
            trigger: '.schoolstory-image-wrapper',
            start: 'top 85%',
            end: 'bottom 85%',
            scrub: 1
          },
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power3.inOut'
        }
      )

      // Skills & Experience reveal
      const rm =
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
      if (!rm) {
        const skillsHeaderTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.skillsxp-section',
            start: 'top 80%',
            end: 'bottom 85%',
            scrub: 1,
            toggleActions: 'play reverse play reverse'
          },
        })

        skillsHeaderTl
          .fromTo(
            '.skillsxp-heading',
            { y: 34, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
          )
          .fromTo(
            '.skillsxp-subtitle',
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
            '-=0.75' // Reduced delay so it animates almost together with heading
          )

        ScrollTrigger.batch('.skillsxp-card', {
          start: 'top 85%',
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { y: 34, opacity: 0, scale: 0.985 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.12,
                overwrite: true,
                clearProps: 'transform'
              }
            ),
          onEnterBack: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: 'power3.out',
              stagger: 0.06,
              overwrite: true,
              clearProps: 'transform'
            }),
          onLeave: (batch) =>
            gsap.to(batch, {
              opacity: 0,
              y: 18,
              scale: 0.99,
              duration: 0.35,
              ease: 'power2.out',
              stagger: 0.04,
              overwrite: true,
            }),
          onLeaveBack: (batch) =>
            gsap.to(batch, {
              opacity: 0,
              y: 18,
              scale: 0.99,
              duration: 0.35,
              ease: 'power2.out',
              stagger: 0.04,
              overwrite: true,
            }),
        })
      }

    }, pageRef)

    return () => {
      ctx.revert()
      splitTextAbout.revert()
      splitTextSchool.revert()
    }
  }, [])

  useEffect(() => {
    const el = schoolStoryScrollRef.current
    if (!el) return
    if (reducedMotion) return

    // Use GSAP (ScrollToPlugin) for smooth inner-box scrolling on wheel/trackpad.
    // Keep touch scrolling native (mobile momentum).
    let targetTop = el.scrollTop

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

    const onWheel = (e) => {
      if (el.scrollHeight <= el.clientHeight) return
      if (e.ctrlKey) return

      e.preventDefault()

      const maxTop = el.scrollHeight - el.clientHeight
      targetTop = clamp(targetTop + e.deltaY, 0, Math.max(0, maxTop))

      gsap.to(el, {
        scrollTo: { y: targetTop, autoKill: false },
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      gsap.killTweensOf(el)
    }
  }, [reducedMotion])

  return (
    <div className="aboutpage" ref={pageRef}>
      {/* ── Hero Section ── */}
      <section className="aboutpage-hero">
        <Navbar />

        <div className="aboutpage-hero__video-bg">
          <iframe
            src="https://www.youtube.com/embed/FmHNJa4Wh68?autoplay=1&mute=1&loop=1&playlist=FmHNJa4Wh68&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playsinline=1"
            title="Background Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        <div className="aboutpage-hero__overlay" />

        <div className="aboutpage-hero__content">
          <h1 className="aboutpage-hero__title">ABOUT</h1>
          <p className="aboutpage-hero__subtitle">
            Get to know the person behind the pixels.
          </p>
        </div>

        <div className="aboutpage-hero__scroll">
          <span className="aboutpage-hero__scroll-text">Scroll</span>
          <div className="aboutpage-hero__scroll-line" />
        </div>
      </section>

      {/* ── About Me Content ── */}
      <section className="aboutpage-body">
        {/* Smoke Background */}
        <div className="aboutpage-smoke-layer">
          <div className="aboutpage-smoke-blob aboutpage-smoke-blob--1" />
          <div className="aboutpage-smoke-blob aboutpage-smoke-blob--2" />
          <div className="aboutpage-smoke-blob aboutpage-smoke-blob--3" />
          <div className="aboutpage-smoke-blob aboutpage-smoke-blob--4" />
        </div>

        <div className="aboutpage-container">
          {/* ── Left Side: Text ── */}
          <div className="aboutpage-content">
            <h2 className="aboutpage-heading">ABOUT ME</h2>
            <p className="aboutpage-text">
              Hi everyone, my real name is Debasrit Mishra, but most people call me Yansh or simply Mishra. Online, I go by the name ErinPowerX, as I prefer keeping my real name private. The reason behind this choice is that the digital world works like a permanent footprint, where everything we do remains recorded forever.
            </p>
            <p className="aboutpage-text">
              It's not just about names; every action, from viral posts to cyber activities, becomes part of our digital identity. Because of this, I created a separate identity and personality for my online presence.
            </p>
            <p className="aboutpage-text">
              I am currently a college student at NIT, in my fourth and final year as of October 5, 2025. I am 22 years old, and it still surprises me how quickly time has passed. I was born in Jajpur, Odisha, a beautiful place located in the eastern state of Odisha, India.
            </p>
          </div>

          {/* ── Right Side: Photo ── */}
          <div className="aboutpage-image-wrapper">
            <img src={profileImg} alt="Debasrit Mishra" className="aboutpage-image" />
          </div>
        </div>
      </section>

      {/* ── Black Days Of School Years ── */}
      <section className="aboutpage-body schoolstory-section">
        <div className="aboutpage-smoke-layer">
          <div className="aboutpage-smoke-blob aboutpage-smoke-blob--1" />
          <div className="aboutpage-smoke-blob aboutpage-smoke-blob--2" />
          <div className="aboutpage-smoke-blob aboutpage-smoke-blob--3" />
          <div className="aboutpage-smoke-blob aboutpage-smoke-blob--4" />
        </div>

        <div className="aboutpage-container schoolstory-container">
          {/* ── Left Side: Image ── */}
          <div className="schoolstory-image-wrapper">
            <img src={profileImg} alt="School Years" className="schoolstory-image" />
          </div>

          {/* ── Right Side: Heading + Scrollable Text ── */}
          <div className="schoolstory-right">
            <h2 className="schoolstory-heading">BLACK DAYS OF SCHOOL YEARS</h2>
            <div className="schoolstory-content" data-lenis-prevent ref={schoolStoryScrollRef}>

            <p className="aboutpage-text">
              When I was in school, I had a few hobbies — one of them was art, and the other was learning new things about technology — back then, I was very good at drawing and painting, and from my childhood until the end of my school years, I created many artworks and paintings, dreaming that one day I would become an artist — along with that, I always had a deep interest in technology — even during those days, I started learning web languages like HTML, and I actually mastered HTML when I was in class 5, purely by watching tutorials on YouTube — I used to write code on a site called Blogger.com, where I created simple blog-style web pages using HTML — at that time, I was just a kid, but I found the structure and format of coding very unique and well-organized, which made my interest in coding grow even more — the main reason behind this was that I wasn't very strong in regular school studies and didn't enjoy writing notes in notebooks, but when I wrote code, it looked clean, logical, and creative, and that made me love it — my handwriting was always beautiful, but coding gave me a new way to express myself neatly and meaningfully — I still remember writing blogs back then, and sometimes I wish I had saved them, because reading them now would bring a nostalgic feeling, though sadly, they're lost with time.
            </p>

            <p className="aboutpage-text">
              The worst thing that happened to me was that after class 10, I didn't get any time to continue my art. But even before that, in class 8, I was restricted from using computers and laptops for 4 years — something that had a huge impact on my coding journey. Because of that, my growth in coding came to a complete halt for 4 years, and I started to develop a strong dislike for my school and, honestly, for the entire education system — a feeling that still remains with me to this day. There's a story behind this, and I'm going to share it here.
            </p>

            <p className="aboutpage-text">
              First of all, as you know, in most Indian schools — especially during my time — there used to be a lot of study pressure. And those who were weak in studies were made fun of by teachers themselves, whose real job was supposed to be to guide and teach students who struggled, because anyone can easily teach students who are already good at studies. The human brain is not the same for everyone — some are naturally more advanced while some are a bit slower or have a different nature. That's why schools exist — to emotionally and mentally shape students to the right level.
            </p>

            <p className="aboutpage-text">
              But unfortunately, weak students like me had to face constant taunts and humiliation instead of guidance. And if the teacher behaves like that, other students naturally follow the same behavior. That's exactly what happened to me, and it affected me so deeply that I started distancing myself from everyone, even from my own friends — almost cutting off completely and isolating myself.
            </p>

            <p className="aboutpage-text">
              Now coming to the main topic — I was in class 8, and I was really fond of making tattoos. As I told you earlier, my maturity came quite late, so at that time, I had this childish excitement that I wanted to make a tattoo myself. In school, I saw some of my classmates using dividers to write their names on their hands, so I thought I'd also write the first four letters of my name softly using a divider. I did it carefully for four days — it was just a light mark, no bleeding, no injury, nothing serious.
            </p>

            <p className="aboutpage-text">
              But some of my classmates did it harshly, causing real injuries and bleeding. The problem was, those same students went to the teachers and lied, saying I was playing the "Blue Whale" game. If you don't know, Blue Whale was a so-called "game" that allegedly encouraged people to commit suicide — it was a baseless hype. I mean, if someone tells you to die, will you actually die? I don't know what kind of society that was, believing every fake rumor blindly. Anyway, they complained, and soon many teachers came angrily into my class and checked my hand. It just looked like a small pressed mark, but they made a huge scene out of it — saying I was trying to commit suicide while playing Blue Whale.
            </p>

            <p className="aboutpage-text">
              I was terrified and panicked. All the teachers started saying I should be expelled and given a Transfer Certificate (TC). When I heard that, I literally started crying out of fear. I gathered courage and called the classmates who had done it before me — those who had actually injured themselves badly — to tell the truth. But they all made excuses and lied, and despite me telling the truth, no one believed me.
            </p>

            <p className="aboutpage-text">
              There was a deeper reason behind that — I was the weakest student in class, not good in studies or exams, and because of that, no one listened to me — not the teachers, not even my classmates. Things were so bad that during PTMs (Parent-Teacher Meetings), teachers didn't even look at my parents with the same respect they showed to others. They treated my parents as the worst, which is why, from class 7 onwards, I started going alone to PTMs, collecting my report card myself.
            </p>

            <p className="aboutpage-text">
              So that day, all my classmates who complained left after lying, and the teachers didn't say a word to them because they were good in studies. Those who weren't good were at least smart enough to impress teachers. I, on the other hand, wasn't liked even 1% by any teacher — and that's exactly why all of them, literally every single teacher, took action against me.
            </p>

            <p className="aboutpage-text">
              I was taken to the principal's office, where no one wanted to hear my side. It really broke me inside. All the lady teachers stood behind the principal, complaining one after another. I didn't even get a chance to speak, I was trembling with fear. The principal decided to expel me and told them to call my parents.
            </p>

            <p className="aboutpage-text">
              At that time, my father wasn't around — he was away for business — so my mother came. And all those teachers were just waiting for her to arrive, so they could complain and humiliate her too. That's exactly what happened. They all started shouting at her, even saying things like "Why do people even give birth to such a child?"
            </p>

            <p className="aboutpage-text">
              The principal asked how many computers I had. My mother, trying to protect me, lied and said I had no computer, no phone, nothing — even though I actually had one. Then they asked how I played the Blue Whale game. My mom said, "He doesn't play, but maybe if he did, it could've been on a friend's phone." She made up excuses to save me, while in reality, I never played any such game — I only used my computer for coding. The Blue Whale thing was just a fake viral trend that created unnecessary panic.
            </p>

            <p className="aboutpage-text">
              After many strange and hurtful questions, my mother kept pleading and requesting for two hours. Finally, the principal decided to give me a warning and one last chance to stay in school. When we got home, my mom lovingly asked me the truth, and I told her everything honestly — that I was innocent and had been falsely accused. She believed me, but the fear planted in her mind by the school about that Blue Whale rumor made her restrict me completely from using the computer — from that day till class 12. Even when I was allowed, it was for a very limited time.
            </p>

            <p className="aboutpage-text">
              Because of all this, my image and reputation in school were completely ruined. Whenever I stepped out of class, other students would mock me — not just them, even teachers made fun of me. It felt terrible. I decided that after class 10, I would somehow leave that place.
            </p>

            <p className="aboutpage-text">
              During classes 9 and 10, I hardly went to school — just two or three days a week. The rest of the time, I stayed home, enjoying my own space and life with my neighborhood friends or spending time alone in parks. After finishing school, I deleted every contact — from teachers to classmates — and focused only on improving myself and gaining knowledge rather than memorizing school books.
            </p>

            <p className="aboutpage-text">
              I can never forget this incident. Even today, I still remember the names of most of those teachers and classmates as well. Time is truly the greatest and most valuable teacher — it teaches you through real, practical experiences, no matter how painful they may be.
            </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills & Experience ── */}
      <section className="aboutpage-body skillsxp-section" aria-labelledby="skillsxp-heading">
        <div className="aboutpage-smoke-layer">
          <div className="aboutpage-smoke-blob aboutpage-smoke-blob--1" />
          <div className="aboutpage-smoke-blob aboutpage-smoke-blob--2" />
          <div className="aboutpage-smoke-blob aboutpage-smoke-blob--3" />
          <div className="aboutpage-smoke-blob aboutpage-smoke-blob--4" />
        </div>

        <div className="skillsxp-container">
          <header className="skillsxp-header">
            <h2 className="skillsxp-heading" id="skillsxp-heading">
              SKILLS &amp; EXPERIENCE
            </h2>
            <p className="skillsxp-subtitle">
              A snapshot of what I’ve built, shipped, and explored.
            </p>
          </header>

          <div className="skillsxp-grid">
            {experiences.map((exp) => (
              <button
                type="button"
                className="skillsxp-card skillsxp-card--clickable"
                key={exp.key}
                onClick={() => openExperience(exp.key)}
              >
                <div className="skillsxp-card__top">
                  <div className="skillsxp-card__titles">
                    <h3 className="skillsxp-card__title">{exp.title}</h3>
                    <p className="skillsxp-card__role">
                      <span className="skillsxp-card__roleLabel">{exp.role}</span>
                      <span className="skillsxp-card__dot" aria-hidden="true">
                        •
                      </span>
                      <span className="skillsxp-card__time">{exp.timeframe}</span>
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience Detail (Click to Read) ── */}
      {activeExperience ? (
        <div
          className="skillsxp-modal"
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeExperience.title} details`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeExperience()
          }}
        >
          <div className="skillsxp-modal__panel" ref={modalPanelRef} data-lenis-prevent>
            <div className="skillsxp-modal__top skillsxp-modal__stagger">
              <div className="skillsxp-modal__titles">
                <p className="skillsxp-modal__kicker">SKILLS &amp; EXPERIENCE</p>
                <h3 className="skillsxp-modal__title">{activeExperience.title}</h3>
                <p className="skillsxp-modal__role">
                  <span>{activeExperience.role}</span>
                  <span className="skillsxp-modal__dot" aria-hidden="true">
                    •
                  </span>
                  <span>{activeExperience.timeframe}</span>
                </p>
              </div>

              <button
                type="button"
                className="skillsxp-modal__close"
                onClick={closeExperience}
                ref={modalCloseBtnRef}
              >
                Close
              </button>
            </div>

            {'tags' in activeExperience ? (
              <ul className="skillsxp-tags skillsxp-modal__stagger" aria-label="Skills">
                {activeExperience.tags.map((t) => (
                  <li key={t} className="skillsxp-tag">
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}

            {'description' in activeExperience ? (
              <p className="skillsxp-desc skillsxp-modal__stagger">{activeExperience.description}</p>
            ) : null}

            {'notes' in activeExperience ? (
              <div className="skillsxp-modal__block skillsxp-modal__stagger">
                <h4 className="skillsxp-modal__h">Highlights</h4>
                <ul className="skillsxp-notes" aria-label="Highlights">
                  {activeExperience.notes.map((n, idx) => (
                    <li key={idx}>{n}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {'screenshots' in activeExperience ? (
              <div className="skillsxp-modal__block skillsxp-modal__stagger">
                <h4 className="skillsxp-modal__h">Screenshots</h4>
                <div className="skillsxp-shots" aria-label="Screenshots">
                  {activeExperience.screenshots.map((s, idx) => (
                    <figure className="skillsxp-shot" key={idx}>
                      {s.src ? (
                        <img src={s.src} alt={s.alt} />
                      ) : (
                        <div className="skillsxp-shot__placeholder" aria-hidden="true">
                          <span>{s.caption || 'Add screenshot'}</span>
                        </div>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            ) : null}

            {'customers' in activeExperience ? (
              <div className="skillsxp-modal__block skillsxp-modal__stagger">
                <h4 className="skillsxp-modal__h">Customer cases</h4>
                <div className="skillsxp-customers skillsxp-customers--detail" aria-label="Customer examples">
                  {activeExperience.customers.map((c) => (
                    <section className="skillsxp-customer skillsxp-customer--detail" key={c.key}>
                      <div className="skillsxp-customer__head">
                        <h4 className="skillsxp-customer__name">{c.name}</h4>
                        <p className="skillsxp-customer__desc">{c.description}</p>
                      </div>

                      <div className="skillsxp-shots skillsxp-shots--compact" aria-label={`${c.name} screenshots`}>
                        {c.screenshots.map((s, idx) => (
                          <figure className="skillsxp-shot" key={idx}>
                            {s.src ? (
                              <img src={s.src} alt={s.alt} />
                            ) : (
                              <div className="skillsxp-shot__placeholder" aria-hidden="true">
                                <span>{s.caption || 'Add screenshot'}</span>
                              </div>
                            )}
                          </figure>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            ) : null}

            {'projects' in activeExperience ? (
              <div className="skillsxp-modal__block skillsxp-modal__stagger">
                <h4 className="skillsxp-modal__h">Projects</h4>
                <div className="skillsxp-customers skillsxp-customers--detail" aria-label="Project examples">
                  {activeExperience.projects.map((p) => (
                    <section className="skillsxp-customer skillsxp-customer--detail" key={p.key}>
                      <div className="skillsxp-customer__head">
                        <h4 className="skillsxp-customer__name">{p.name}</h4>
                        <div className="skillsxp-customer__desc">
                          {p.description.split('\n').map((line, i) => (
                            <span key={i} style={{ display: 'block', minHeight: '1em' }}>
                              {line}
                            </span>
                          ))}
                        </div>

                        {'features' in p ? (
                          <div className="skillsxp-modal__block skillsxp-modal__stagger" style={{ marginTop: '1rem' }}>
                            <ul className="skillsxp-notes" aria-label={`${p.name} Features`}>
                              {p.features.map((n, idx) => (
                                <li key={idx} style={{ marginBottom: '0.6rem' }}>{n}</li>
                              ))}
                            </ul>
                          </div>
                        ) : ('notes' in p ? (
                          <div className="skillsxp-modal__block skillsxp-modal__stagger" style={{ marginTop: '1rem' }}>
                            <ul className="skillsxp-notes" aria-label={`${p.name} Highlights`}>
                              {p.notes.map((n, idx) => (
                                <li key={idx} style={{ marginBottom: '0.6rem' }}>{n}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null)}

                        {'techStack' in p && (
                           <div className="skillsxp-modal__block skillsxp-modal__stagger" style={{ marginTop: '1.4rem' }}>
                             <h4 className="skillsxp-modal__h">Tech Stack</h4>
                             <p className="skillsxp-customer__desc" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>{p.techStack}</p>
                           </div>
                        )}

                        {'role' in p && (
                           <div className="skillsxp-modal__block skillsxp-modal__stagger" style={{ marginTop: '1.2rem' }}>
                             <h4 className="skillsxp-modal__h">Role</h4>
                             <p className="skillsxp-customer__desc" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>{p.role}</p>
                           </div>
                        )}

                        {'links' in p && (
                           <div className="skillsxp-modal__block skillsxp-modal__stagger" style={{ marginTop: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                             {p.links.map((lnk, idx) => (
                               <div key={idx}>
                                 <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-rajdhani)', marginRight: '8px' }}>{lnk.label}:</span>
                                 <a href={lnk.url} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline', fontFamily: 'var(--font-rajdhani)', letterSpacing: '0.5px' }}>
                                   {lnk.text}
                                 </a>
                               </div>
                             ))}
                           </div>
                        )}
                      </div>

                      <div className="skillsxp-shots skillsxp-shots--compact" aria-label={`${p.name} screenshots`}>
                        {p.screenshots.map((s, idx) => (
                          <figure className="skillsxp-shot" key={idx}>
                            {s.src ? (
                              <img src={s.src} alt={s.alt} />
                            ) : (
                              <div className="skillsxp-shot__placeholder" aria-hidden="true">
                                <span>{s.caption || 'Add screenshot'}</span>
                              </div>
                            )}
                          </figure>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  )
}

export default AboutPage
