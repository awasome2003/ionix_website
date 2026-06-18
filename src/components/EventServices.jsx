import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PATHS = {
  clipboard: 'M9 2h6a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V3a1 1 0 0 1 1-1Zm0 4h6V4H9Zm-2 5h2v2H7Zm4 1h6v1h-6Zm-4 3h2v2H7Zm4 1h6v1h-6Z',
  referee: 'M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4 0-9 2-9 6v2h18v-2c0-4-5-6-9-6Z',
  box: 'm12 2 9 5v10l-9 5-9-5V7Zm0 2.3L5 8l7 3.9 7-3.9Zm-7 5.5v6.4l6 3.3v-6.3Zm14 0-6 3.4v6.3l6-3.3Z',
  monitor: 'M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-6v2h3v2H7v-2h3v-2H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v9h14V6Z',
  medal: 'M8.5 2 12 7l3.5-5h2.4l-3.6 5.1a6 6 0 1 1-4.6 0L6.1 2ZM12 9a4 4 0 1 0 4 4 4 4 0 0 0-4-4Z',
  megaphone: 'M4 10v4a1 1 0 0 0 1 1h1.5L9 20h2l-1.6-5H11l8 3.5v-13L11 9H5a1 1 0 0 0-1 1Zm17-1v6a3 3 0 0 0 0-6Z',
}

const SERVICES = [
  {
    icon: 'clipboard',
    tint: 'text-blue-400',
    title: 'Tournament Planning',
    items: ['Draws & Fixtures', 'Scheduling & Format', 'Registration Management', 'Group Allocation'],
  },
  {
    icon: 'referee',
    tint: 'text-amber-400',
    title: 'Umpires & Officials',
    items: ['Certified Chief Referees', 'Professional Referees', 'Digital Scoring', 'Score Validators'],
  },
  {
    icon: 'box',
    tint: 'text-emerald-400',
    title: 'Equipment Setup',
    items: ['Professional Tables', 'Balls & Nets', 'Scoreboards', 'PA System & Mics'],
  },
  {
    icon: 'monitor',
    tint: 'text-amber-400',
    title: 'Software Management',
    items: ['Chalo Khelenge Platform', 'Online Registration', 'Live Scores', 'Rankings & Analytics'],
  },
  {
    icon: 'medal',
    tint: 'text-emerald-400',
    title: 'Branding & Prizes',
    items: ['Event Banners', 'Certificates', 'Medals & Trophies', 'Sponsor Integration'],
  },
  {
    icon: 'megaphone',
    tint: 'text-blue-400',
    title: 'Event Promotion',
    items: ['Social Media', 'WhatsApp Broadcast', 'Photography', 'Video Highlights'],
  },
]

function ServiceCard({ s }) {
  return (
    <article className="svc-card group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-slate-200/60">
      {/* watermark */}
      <svg
        viewBox="0 0 24 24"
        className={`pointer-events-none absolute -right-4 bottom-0 h-40 w-40 opacity-[0.07] ${s.tint} transition-transform duration-500 group-hover:scale-110`}
        fill="currentColor"
      >
        <path d={PATHS[s.icon]} />
      </svg>

      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d={PATHS[s.icon]} />
            </svg>
          </span>
          <h3 className="font-display text-xl font-bold tracking-tight text-navy">
            {s.title}
          </h3>
        </div>

        <ul className="mt-5 space-y-2.5">
          {s.items.map((it) => (
            <li key={it} className="flex items-center gap-2.5 text-sm text-ink/70">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {it}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function EventServices() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.es-head > *', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
      })
      gsap.from('.svc-card', {
        y: 36,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.es-grid', start: 'top 82%', once: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={rootRef} data-bg="0" className="bg-[#000]/50 py-24 lg:backdrop-blur-md">
      <div className="es-head mx-auto max-w-[1600px] px-5 text-center lg:px-8">
        <p className="font-mono text-xs font-bold tracking-[0.35em] text-brand uppercase">
          Event Management
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl">
          <span className="text-white">Complete</span>{' '}
          <span className="text-brand">Event Management Service</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white">
          Every service you need to run a professional tournament — under one
          roof.
        </p>
      </div>

      <div className="es-grid mx-auto max-w-[1600px] mt-14 grid grid-cols-1 gap-6 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {SERVICES.map((s) => (
          <ServiceCard key={s.title} s={s} />
        ))}
      </div>
    </section>
  )
}

export default EventServices
