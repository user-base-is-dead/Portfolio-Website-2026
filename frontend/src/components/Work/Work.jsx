import { useEffect, useMemo, useRef, useState } from 'react';
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
  const mediaRef = useRef(null);
  const imgRef = useRef(null);
  const filterSvgRef = useRef(null);
  const displacementTriggerRef = useRef(null);

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }, []);

  const isDesktop = useMemo(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth > 768;
  }, []);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const feDisplacementMap = filterSvgRef.current?.querySelector('feDisplacementMap') ?? null;
    const feTurbulence = filterSvgRef.current?.querySelector('feTurbulence') ?? null;

    const ctx = gsap.context(() => {
      if (!reducedMotion && isDesktop) {
        // Subtle parallax on the thumbnail image while scrolling
        if (imgRef.current && !isPlaying) {
          gsap.to(imgRef.current, {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          });
        }

        // Velocity-driven displacement (disabled while playing, on mobile, and for reduced-motion users)
        if (feDisplacementMap && feTurbulence && !isPlaying) {
          displacementTriggerRef.current = ScrollTrigger.create({
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
              const velocity = Math.abs(self.getVelocity());
              const mappedScale = gsap.utils.clamp(0, 120, velocity / 18);

              gsap.to(feDisplacementMap, {
                attr: { scale: mappedScale },
                duration: 0.12,
                ease: 'power2.out',
                overwrite: true,
                onComplete: () => {
                  gsap.to(feDisplacementMap, {
                    attr: { scale: 0 },
                    duration: 0.9,
                    ease: 'power3.out',
                    overwrite: 'auto',
                  });
                },
              });
            },
          });
        }
      }
    });

    return () => {
      displacementTriggerRef.current?.kill();
      displacementTriggerRef.current = null;
      ctx.revert();
    };
  }, [isPlaying, item.id, reducedMotion, isDesktop]);

  const indexDisplay = index < 9 ? `0${index + 1}` : index + 1;
  const isVideo = item.type === 'video';
  const filterId = `displacement-${item.id}`;

  return (
    <article
      className={`work-item ${index % 2 === 1 ? 'is-reversed' : ''}`}
      ref={itemRef}
      aria-label={`${item.title}`}
    >
      <svg className="work-svg-filter" aria-hidden="true">
        <filter
          ref={filterSvgRef}
          id={filterId}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </svg>

      <div
        className="work-media"
        ref={mediaRef}
        style={{ filter: isPlaying || reducedMotion || !isDesktop ? 'none' : `url(#${filterId})` }}
      >
        {isVideo ? (
          isPlaying ? (
            <iframe
              className="work-iframe"
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button className="work-thumbnail" type="button" onClick={() => setIsPlaying(true)}>
              <img
                src={`https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`}
                alt={item.title}
                className="work-img"
                ref={imgRef}
                onError={(e) => {
                  e.target.src = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
                }}
              />
              <span className="work-play-btn" aria-hidden="true">
                ▶
              </span>
              <span className="work-play-label">Play</span>
            </button>
          )
        ) : (
          <div className="work-thumbnail is-static">
            <img src={item.image} alt={item.title} className="work-img" ref={imgRef} />
          </div>
        )}
      </div>

      <div className="work-content">
        <div className="work-meta">
          <span className="work-index">{indexDisplay}</span>
          <span className="work-badge">{isVideo ? 'Video' : 'Image'}</span>
        </div>
        <h3 className="work-title">{item.title}</h3>
        {item.description ? <p className="work-description">{item.description}</p> : null}

        {isVideo ? (
          <div className="work-actions">
            <a
              className="work-link"
              href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
              target="_blank"
              rel="noreferrer"
            >
              Open on YouTube
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
};

const Work = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion =
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
      if (reducedMotion) return;

      gsap.fromTo(
        '.work-header-container',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power4.out', // Much snappier finish
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'top 75%', // Finishes faster
            scrub: 1,
          },
        }
      );

      ScrollTrigger.batch('.work-item', {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.12,
              overwrite: true,
            }
          ),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="work-container" ref={containerRef} id="work">
      <div className="work-header-container">
        <h2 className="work-header">Work</h2>
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
