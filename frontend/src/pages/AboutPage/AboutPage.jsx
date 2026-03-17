import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import Navbar from '../../components/Navbar/Navbar'
import profileImg from '../../assets/profile.jpg'
import './AboutPage.css'

gsap.registerPlugin(ScrollTrigger)

const AboutPage = () => {
  const pageRef = useRef(null)

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
      // Timeline for about-me text elements
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
      })
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

      // Timeline for school-story section
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.schoolstory-content',
          start: 'top 85%',
          end: 'bottom 85%',
          scrub: 1
        }
      })

      tl2.from('.schoolstory-heading', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from(splitTextSchool.lines, {
        y: 60,
        opacity: 0,
        rotateZ: 5,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      }, '-=0.4')

      // Image swipe-up reveal (school story)
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
    }, pageRef)

    return () => {
      ctx.revert()
      splitTextAbout.revert()
      splitTextSchool.revert()
    }
  }, [])

  return (
    <div className="aboutpage" ref={pageRef}>
      {/* ── Hero Section ── */}
      <section className="aboutpage-hero">
        <Navbar />

        <div className="aboutpage-hero__video-bg">
          <iframe
            src="https://www.youtube.com/embed/Vn-ms0Ny0WU?autoplay=1&mute=1&loop=1&playlist=Vn-ms0Ny0WU&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playsinline=1"
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

          {/* ── Right Side: Text ── */}
          <div className="schoolstory-content">
            <h2 className="schoolstory-heading">BLACK DAYS OF SCHOOL YEARS</h2>

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
      </section>
    </div>
  )
}

export default AboutPage
