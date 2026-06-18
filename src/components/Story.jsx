import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  {
    year: '2022',
    title: 'Foundation',
    text: 'Started coaching and community development in Pune with a vision to build a serious sports ecosystem.',
  },
  {
    year: '2023',
    title: 'Monthly Leagues',
    text: 'Launched competitive monthly leagues, creating regular tournament opportunities for players of all ages.',
  },
  {
    year: '2024',
    title: 'Corporate Expansion',
    text: 'Corporate tournament execution started, bringing professional sports experiences to leading companies.',
  },
  {
    year: '2025',
    title: 'Vedant Academy',
    text: 'Vedant Sports Academy launched — expanding professional coaching infrastructure across the region.',
  },
  {
    year: '2026',
    title: '30+ Milestones',
    text: '30+ tournaments completed successfully. Chalo Khelenge platform scaling across multiple cities.',
  },
]

function Story() {
  const rootRef = useRef(null)
  const fillRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Left column fade-in */
      gsap.from('.story-left > *', {
        x: -30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
      })

      /* Progress line draws on scroll */
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: 0.5,
          },
        },
      )

      /* Each milestone lights up + slides in */
      gsap.utils.toArray('.milestone').forEach((el) => {
        gsap.from(el, {
          x: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          onEnter: () => el.classList.add('is-active'),
          onLeaveBack: () => el.classList.remove('is-active'),
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={rootRef} className="bg-white py-24">
      <div className="mx-auto max-w-[1600px] grid grid-cols-1 gap-16 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Left — narrative */}
        <div className="story-left lg:pt-16">
          <p className="font-mono text-xs font-bold tracking-[0.35em] text-brand uppercase">
            Our Story
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy uppercase sm:text-5xl">
            From a Coaching
            <br />
            Dream to a <span className="text-brand">Sports Empire</span>
          </h2>

          <p className="mt-7 text-base leading-relaxed text-ink/70">
            IONIX Sports was born from a passion for table tennis and a belief
            that Pune deserves world-class sports infrastructure. We don't just
            organize tournaments — we build communities, train champions, and
            deliver professional event experiences that create lasting memories.
          </p>
          <p className="mt-5 text-base leading-relaxed text-ink/70">
            Today, IONIX Sports manages end-to-end sports events, runs three
            professional training centers, operates monthly competitive leagues,
            and powers the Chalo Khelenge technology platform used by players
            across Pune and PCMC.
          </p>
        </div>

        {/* Right — timeline */}
        <div ref={trackRef} className="relative">
          {/* track + animated fill */}
          <div className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-slate-200" />
          <div
            ref={fillRef}
            className="absolute top-2 bottom-2 left-[7px] w-0.5 origin-top bg-gradient-to-b from-accent to-emerald-600"
          />

          <ul className="space-y-12">
            {MILESTONES.map((m) => (
              <li key={m.year} className="milestone relative pl-12">
                <span className="dot absolute top-1 left-0 grid h-4 w-4 place-items-center rounded-full border-2 border-accent bg-white transition-all duration-300">
                  <span className="h-1.5 w-1.5 scale-0 rounded-full bg-accent transition-transform duration-300" />
                </span>

                <h3 className="flex items-baseline gap-3 font-display text-2xl font-bold tracking-tight">
                  <span className="text-accent">{m.year}</span>
                  <span className="text-navy">{m.title}</span>
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/65">
                  {m.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .milestone.is-active .dot {
          border-color: #34d399;
          box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.18);
        }
        .milestone.is-active .dot > span {
          transform: scale(1);
        }
      `}</style>
    </section>
  )
}

export default Story
