import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// IONIX sports & their coaches. A gradient base sits behind every panel so
// missing photos still look intentional.
const SPORTS = [
  { name: 'Table Tennis', emoji: '🏓', tint: '#f26522', image: '/image.jpeg' },
  { name: 'Badminton', emoji: '🏸', tint: '#16a34a', image: '/Badminton.jpeg' },
  { name: 'Box Cricket', emoji: '🏏', tint: '#3b82f6', image: '/Box-cricket.jpeg' },
  { name: 'Pickleball', emoji: '🎾', tint: '#8b5cf6', image: '/pickelball.jpeg' },
  { name: 'Chess', emoji: '♟️', tint: '#475569', image: '/CHess.jpeg' },
  { name: 'Carrom', emoji: '🎯', tint: '#b45309', image: '/carrom.jpeg' },
  { name: 'Football', emoji: '⚽', tint: '#f59e0b', image: '/football.jpeg' },
  { name: 'Volleyball', emoji: '🏐', tint: '#0ea5e9', image: '/volleyball.jpeg' },
  { name: 'Karate', emoji: '🥋', tint: '#ef4444', image: '/karate.jpeg' },
  { name: 'Hockey', emoji: '🏑', tint: '#7c3aed', image: '/hockey.jpeg' },
  { name: 'Athletics', emoji: '🏃', tint: '#14b8a6', image: '/athletes.jpeg' },
  { name: 'Kho Kho', emoji: '🤾', tint: '#0891b2' },
  { name: 'Gymnastics', emoji: '🤸', tint: '#ec4899', image: '/Gymnastics.jpeg' },
  { name: 'Lathi Kathi', emoji: '🥍', tint: '#6366f1' },
  { name: 'Throwball', emoji: '🥎', tint: '#f97316' },
  { name: 'Skating', emoji: '🛼', tint: '#06b6d4', image: '/skating.jpeg' },
  { name: 'Basketball', emoji: '🏀', tint: '#ea580c', image: '/Basketball.jpeg' },
  { name: 'Handball', emoji: '🤽', tint: '#10b981', image: '/handball.jpeg' },
]

function Sports() {
  const rootRef = useRef(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sp-head > *', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
      })
      gsap.from('.sp-panel', {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.sp-accordion', start: 'top 82%', once: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="sports" ref={rootRef} className="bg-white py-24">
      <div className="sp-head mx-auto max-w-[1600px] px-5 text-center lg:px-8">
        <p className="font-mono text-xs font-bold tracking-[0.35em] text-brand uppercase">
          One Club · Every Sport
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl">
          <span className="text-navy">Multi-Sport</span>{' '}
          <span className="text-brand">Coaching & Tournaments</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-ink/55">
          From table tennis to football, athletics, and traditional Indian
          sports — led by dedicated coaches. Hover or tap a sport to explore.
        </p>
      </div>

      {/* Expanding accordion (scrolls horizontally on desktop) */}
      <div className="sp-accordion mx-auto mt-14 flex max-w-[1600px] flex-col gap-3 px-5 lg:h-[460px] lg:flex-row lg:overflow-x-auto lg:px-8 lg:pb-3">
        {SPORTS.map((s, i) => {
          const isActive = i === active
          return (
            <article
              key={s.name}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`sp-panel group relative h-40 cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out lg:h-auto lg:shrink-0 ${
                isActive ? 'lg:w-[400px]' : 'lg:w-[110px]'
              }`}
            >
              {/* gradient base / fallback */}
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(140deg, ${s.tint}, #0b1220 88%)` }}
              />

              {/* photo */}
              {s.image && (
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                    isActive ? 'scale-100 opacity-100' : 'scale-110 opacity-60'
                  }`}
                />
              )}

              {/* scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

              {/* content */}
              <div className="relative flex h-full flex-col justify-between p-5 lg:p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 text-xl backdrop-blur">
                  {s.emoji}
                </span>

                <div className="min-w-0">
                  <h3
                    className={`font-display font-extrabold tracking-tight text-white transition-all duration-300 ${
                      isActive
                        ? 'text-2xl lg:text-3xl'
                        : 'text-xl lg:rotate-180 lg:text-lg lg:whitespace-nowrap lg:[writing-mode:vertical-rl]'
                    }`}
                  >
                    {s.name}
                  </h3>
                  <span
                    className={`mt-3 block h-1 rounded-full transition-all duration-500 ${
                      isActive ? 'w-16 opacity-100' : 'w-0 opacity-0'
                    }`}
                    style={{ background: s.tint }}
                  />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Sports
