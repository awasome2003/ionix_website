import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  tabletennis:
    'M14.5 3.2c3.6 1 6 4.6 5.2 8.3-.8 3.7-4.3 6-7.9 5.4l-1.6 3.9a1.4 1.4 0 0 1-2.6-1l1.6-3.9c-2.7-2.5-3.2-6.6-1-9.6 1.9-2.5 5-3.6 6.3-3.1Z',
  shuttle:
    'M12 22a3 3 0 0 0 3-3H9a3 3 0 0 0 3 3Zm-3.5-5h7l2.5-12-3.5 2.5-2.5-4.5-2.5 4.5L6 5l2.5 12Z',
  cricket:
    'M14.7 2.3a2.5 2.5 0 0 1 3.5 3.5l-7.5 7.5-3.5-3.5 7.5-7.5ZM5.5 14.5l4 4-2.5 2.5-4-4 2.5-2.5ZM18 15a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z',
  football:
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4.2 3.6 2.6-1.4 4.2H9.8L8.4 8.8 12 6.2Z',
  pickleball:
    'M8 2h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-1l1 5h-2l-1-5H8a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4Zm1 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM9 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  racquet:
    'M9 13a6 6 0 1 1 6-6 6 6 0 0 1-6 6Zm0-9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm3.8 10.2 6 6-1.6 1.6-6-6 1.6-1.6Z',
  chess:
    'M12 2a3 3 0 0 0-2 5.2c-.6.5-1 1.3-1 2.3 0 1.1.6 2 1.5 2.6L9 18H7v3h10v-3h-2l-1.5-5.9c.9-.6 1.5-1.5 1.5-2.6 0-1-.4-1.8-1-2.3A3 3 0 0 0 12 2Z',
  carrom:
    'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1 2v14h14V5Zm7 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6.2 6a1.2 1.2 0 1 0 0 2.4A1.2 1.2 0 0 0 6.2 6Zm11.6 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM6.2 15.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm11.6 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z',
}

// A gradient base sits behind every panel so missing photos still look intentional.
const SPORTS = [
  {
    name: 'Table Tennis',
    icon: 'tabletennis',
    tint: '#f26522',
    tag: 'Leagues · Opens · Corporate Cups',
    image: '/image.jpeg',
  },
  {
    name: 'Box Cricket',
    icon: 'cricket',
    tint: '#3b82f6',
    tag: 'Team Knockout · Corporate',
  },
  {
    name: 'Box Football',
    icon: 'football',
    tint: '#f59e0b',
    tag: '5s · 7s on turf',
    image:
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Badminton',
    icon: 'shuttle',
    tint: '#16a34a',
    tag: 'Singles · Doubles',
    image:
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Pickleball',
    icon: 'pickleball',
    tint: '#8b5cf6',
    tag: "India's fastest-growing sport",
  },
  {
    name: 'Tennis',
    icon: 'racquet',
    tint: '#14b8a6',
    tag: 'Singles · Doubles · Ladders',
  },
  {
    name: 'Chess',
    icon: 'chess',
    tint: '#475569',
    tag: 'Classical · Rapid · Blitz',
  },
  {
    name: 'Carrom',
    icon: 'carrom',
    tint: '#b45309',
    tag: 'Singles · Doubles',
  },
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
        duration: 0.6,
        stagger: 0.08,
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
          <span className="text-brand">Tournaments</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-ink/55">
          IONIX isn't just table tennis — we organize and manage competitive
          tournaments across a growing range of sports. Hover or tap a sport to
          explore.
        </p>
      </div>

      {/* Expanding accordion */}
      <div className="sp-accordion mx-auto mt-14 flex max-w-[1600px] flex-col gap-3 px-5 lg:h-[460px] lg:flex-row lg:px-8">
        {SPORTS.map((s, i) => {
          const isActive = i === active
          return (
            <article
              key={s.name}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`sp-panel group relative h-44 cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out lg:h-auto ${
                isActive ? 'lg:flex-[3.5]' : 'lg:flex-[1]'
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

              {/* faint icon for gradient panels */}
              {!s.image && (
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute -right-6 -bottom-6 h-40 w-40 text-white/10"
                  fill="currentColor"
                >
                  <path d={ICONS[s.icon]} />
                </svg>
              )}

              {/* scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

              {/* content */}
              <div className="relative flex h-full flex-col justify-between p-5 lg:p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d={ICONS[s.icon]} />
                  </svg>
                </span>

                <div className="min-w-0">
                  {/* collapsed (desktop): vertical label; active/mobile: horizontal */}
                  <h3
                    className={`font-display font-extrabold tracking-tight text-white transition-all duration-300 ${
                      isActive
                        ? 'text-2xl lg:text-3xl'
                        : 'text-xl lg:rotate-180 lg:text-lg lg:whitespace-nowrap lg:[writing-mode:vertical-rl]'
                    }`}
                  >
                    {s.name}
                  </h3>
                  <p
                    className={`mt-1 text-sm text-white/75 transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-100 lg:opacity-0'
                    }`}
                  >
                    {s.tag}
                  </p>
                  {/* accent underline on active */}
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
