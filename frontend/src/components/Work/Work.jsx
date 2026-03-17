import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import './Work.css';

gsap.registerPlugin(ScrollTrigger);

const workItems = [
  {
    id: 1,
    type: 'video',
    title: 'Bgmi / Pubg (Normal Features)',
    description:
      'Brutal gameplay featuring Autofire and 360, with precise prediction, high accuracy, and the fastest bullet registration compared to any other hacks.',
    youtubeId: 'fJwk6WeEyts',
  },
  {
    id: 2,
    type: 'video',
    title: 'BGMI / PUBG Gameplay with Admin Features',
    description:
      "This admin feature is extremely powerful. It includes Autofire, 360, Silent God View, Silent Magic, Anti-Silent God View, and many others. To illustrate just how potent these tools are: even if you're alone facing four to ten cheaters, their bullets won't hit you - they'll be eliminated before they even have time to think, and none of their cheats' manual or automatic features will work.",
    youtubeId: 'JMLChIcwFaU',
  },
  {
    id: 3,
    type: 'video',
    title: 'BGMI / PUBG Gameplay with Admin Features',
    description:
      'Total players: 100. Kills: 45 and Alive: 91. I got 45 kills within a few seconds, Most of them were killed in the air before they landed.',
    youtubeId: '4S9f8Hsd7ug',
  },
  {
    id: 4,
    type: 'video',
    title: 'I killed Mayur Gaming whole team with my cheats (His reaction)',
    description:
      'Warning: This video contains strong language / abusive words. Viewer discretion advised.',
    youtubeId: '1EpYvKkXTYc',
  },
  { id: 5, type: 'photo', title: 'Leaderboard #1', description: '', image: image1 },
  {
    id: 6,
    type: 'photo',
    title: 'Leaderboard #1 and #2',
    description: 'I did #1 and #2 rank both IDs within 7 days in the same season',
    image: image2,
  },
  {
    id: 7,
    type: 'video',
    title: 'I killed Faith PlayzZz whole team with my cheats (His reaction)',
    description: '',
    youtubeId: 'V3WfCV0rf5Q',
  },
  {
    id: 8,
    type: 'video',
    title: 'GTA 5 Online Cheats',
    description:
      'I made this just for my personal use, not for selling. I added features like Unlimited Level Up, Instant Prep, Instant Finish, and a strong BattleEye anti-cheat bypass.',
    youtubeId: 'LVch8W8HXzE',
  },
];

const WorkItem = ({ item, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const itemRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;

    const filterId = `#displacement-${item.id}`;
    const feDisplacementMap = document.querySelector(`${filterId} feDisplacementMap`);
    const feTurbulence = document.querySelector(`${filterId} feTurbulence`);

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      });

      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      if (feDisplacementMap && feTurbulence && !isPlaying) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());
            const mappedScale = gsap.utils.clamp(0, 150, velocity / 15);

            gsap.to(feDisplacementMap, {
              attr: { scale: mappedScale },
              duration: 0.1,
              ease: 'power2.out',
              overwrite: true,
              onComplete: () => {
                gsap.to(feDisplacementMap, {
                  attr: { scale: 0 },
                  duration: 0.8,
                  ease: 'power3.out',
                  overwrite: 'auto',
                });
              },
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, [isPlaying, item.id]);

  const indexDisplay = index < 9 ? `0${index + 1}` : index + 1;

  return (
    <div className="work-item-wrapper" ref={itemRef}>
      <svg className="work-svg-filter">
        <filter id={`displacement-${item.id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </svg>

      <div
        className="work-video-container"
        style={{ filter: isPlaying ? 'none' : `url(#displacement-${item.id})` }}
      >
        {item.type === 'video' ? (
          isPlaying ? (
            <iframe
              className="work-iframe"
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="work-thumbnail" onClick={() => setIsPlaying(true)}>
              <img
                src={`https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`}
                alt={item.title}
                className="work-img"
                onError={(e) => {
                  e.target.src = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
                }}
              />
              <div className="work-play-btn">▶</div>
            </div>
          )
        ) : (
          <div className="work-thumbnail">
            <img src={item.image} alt={item.title} className="work-img" />
          </div>
        )}
      </div>

      <div className="work-content-container" ref={contentRef}>
        <div className="work-content-left">
          <span className="work-index">{indexDisplay}</span>
          <h3 className="work-title">{item.title}</h3>
        </div>
        <div className="work-content-right">
          <p className="work-description">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-header-container',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="work-container" ref={containerRef} id="work">
      <div className="work-header-container">
        <h2 className="work-header">WORK</h2>
        <p className="work-subtitle">
          Some Gameplays Of The Games That I Reverse Engineered and Modified
        </p>
      </div>

      <div className="work-list">
        {workItems.map((item, index) => (
          <WorkItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Work;
