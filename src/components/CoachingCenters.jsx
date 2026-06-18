import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-white/55" fill="currentColor">
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  )
}
function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-white/55" fill="currentColor">
      <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 1a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0 2c-2.7 0-6 1.3-6 4v2h7v-2c0-1 .4-1.9 1-2.6A8 8 0 0 0 8 14Zm8 0c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4Z" />
    </svg>
  )
}
function TableIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M3 5h18v2H3Zm0 4h8v8H9v-6H5v6H3Zm10 0h8v2h-3v6h-2v-6h-3Z" />
    </svg>
  )
}

const CENTERS = [
  {
    name: 'Vedant Sports Academy',
    subtitle: 'Advanced Coaching + Tournament',
    badge: '8 Tables',
    badgeIcon: true,
    logo: true,
    location: 'Nigdi, Pune',
    players: '100+ Active Players',
    features: ['Advanced Coaching', 'Video Analysis', 'Monthly Tournaments', 'ITTF Standards'],
  },
  {
    name: 'Hindustan Antibiotics',
    subtitle: 'Premium Coaching Facility',
    badge: '8 Tables',
    badgeIcon: true,
    image: '/image.jpeg',
    location: 'Pimpri, Pune',
    players: '60+ Active Players',
    features: ['Professional Tables', 'LED Lighting', 'Coaching Studio', 'Locker Rooms'],
  },
  {
    name: 'Personal Coaching',
    subtitle: 'One-to-One Performance Training',
    badge: 'Personal Coaching',
    badgeIcon: false,
    image: '/Image2.jpeg',
    location: 'Pune & PCMC',
    players: 'Personalized Coaching Sessions',
    features: ['Individual Skill Development', 'Match Strategy Training', 'Technical Stroke Correction', 'Video Performance Analysis'],
  },
]

function VedantLogo() {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#065f46] shadow-lg">
        <svg viewBox="0 0 24 24" className="h-10 w-10 text-white" fill="currentColor">
          <path d="M12 2C7 2 3 6 3 11c0 6 9 11 9 11s9-5 9-11c0-5-4-9-9-9Zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
        </svg>
      </span>
      <div className="leading-none">
        <div className="font-display text-3xl font-extrabold tracking-tight text-[#334155]">
          vedant
        </div>
        <div className="mt-1 text-xs font-semibold tracking-[0.3em] text-[#64748b]">
          SPORTS ACADEMY
        </div>
      </div>
    </div>
  )
}

function CenterCard({ c }) {
  return (
    <article className="center-card tilt group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy shadow-xl shadow-black/40">
      {/* Top media */}
      <div className="relative h-52 overflow-hidden">
        {c.logo ? (
          <div className="grid h-full w-full place-items-center bg-white">
            <VedantLogo />
          </div>
        ) : (
          <img
            src={c.image}
            alt={c.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}

        {/* Badge */}
        <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-md border border-accent/60 bg-black/45 px-2.5 py-1 font-mono text-xs font-medium text-accent backdrop-blur">
          {c.badgeIcon && <TableIcon />}
          {c.badge}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col bg-gradient-to-b from-[#1a2b4d] to-[#0e1830] p-6">
        <h3 className="font-display text-xl font-bold tracking-tight text-white">
          {c.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-amber-400">{c.subtitle}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
          <span className="inline-flex items-center gap-1.5">
            <PinIcon /> {c.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UsersIcon /> {c.players}
          </span>
        </div>

        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
          {c.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-white/80">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function CoachingCenters() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cc-head > *', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      })
      gsap.from('.center-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cc-grid', start: 'top 82%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="centers" ref={rootRef} data-bg="2" className="backdrop-blur-sm py-24">
      <div className="cc-head mx-auto max-w-[1600px] px-5 text-center lg:px-8">
        <p className="font-mono text-xs font-bold tracking-[0.35em] text-brand uppercase">
          Our Facilities
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-[#1b3b6f] to-[#3b82f6] bg-clip-text text-transparent">
            Professional
          </span>{' '}
          <span className="text-brand">Coaching Centers</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/45">
          3 state-of-the-art facilities across Pune &amp; PCMC. 21 professional
          tables. 200+ active players.
        </p>
      </div>

      <div className="cc-grid mx-auto max-w-[1600px] mt-14 grid grid-cols-1 gap-7 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {CENTERS.map((c) => (
          <CenterCard key={c.name} c={c} />
        ))}
      </div>
    </section>
  )
}

export default CoachingCenters
