import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = [
  'All',
  'Monthly Leagues',
  'Corporate Events',
  'School Events',
  'Open Tournaments',
  'Sponsored Events',
]

const TOURNAMENTS = [
  {
    badge: 'Sponsored',
    category: 'Sponsored Events',
    title: 'MIT College Pune Open',
    participants: '128 Participants',
    location: 'MIT College, Pune',
    date: 'March 2026',
    result: 'Champion: Rahul Sharma',
    image: '/image1.jpeg',
  },
  {
    badge: 'Grand',
    category: 'Open Tournaments',
    title: 'November Grand Tournament',
    participants: '100 Participants',
    location: 'Vedant Sports Academy',
    date: 'Nov 2025',
    result: '100+ Players Competed',
    image: '/image.jpeg',
  },
  {
    badge: 'Corporate',
    category: 'Corporate Events',
    title: 'TechCorp Championship',
    participants: '80 Participants',
    location: 'Hinjewadi IT Park',
    date: 'Jan 2026',
    result: 'Team Finance Wins',
    image: '/image9.jpeg',
  },
  {
    badge: 'League',
    category: 'Monthly Leagues',
    title: 'MIT College Pune Open',
    participants: '45 Participants',
    location: 'Vedant Sports Academy',
    date: 'Mar 2026',
    result: 'Winner: Aryan Kulkarni',
    image: '/image12.jpeg',
  },
  {
    badge: 'School',
    category: 'School Events',
    title: 'November Grand Tournament',
    participants: '60 Participants',
    location: 'Sunrise International School',
    date: 'Feb 2026',
    result: '42 Students Certified',
    image: '/image3.jpeg',
  },
  {
    badge: 'Masters',
    category: 'Open Tournaments',
    title: 'TechCorp Championship',
    participants: '52 Participants',
    location: 'Hinjewadi IT Park',
    date: 'Apr 2026',
    result: 'Trophy: Suresh Patil',
    image: '/image10.jpeg',
  },
]

const PAGE_SIZE = 8

/* Tiny inline icons */
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-white/45" fill="currentColor">
    <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 1a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0 2c-2.7 0-6 1.3-6 4v2h7v-2c0-1 .4-1.9 1-2.6A8 8 0 0 0 8 14Zm8 0c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4Z" />
  </svg>
)
const PinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-white/45" fill="currentColor">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
  </svg>
)
const CalIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-white/45" fill="currentColor">
    <path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2Zm12 7v10H5V9Z" />
  </svg>
)
const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-amber-400" fill="currentColor">
    <path d="M6 4h12v2a4 4 0 0 1-4 4h-4A4 4 0 0 1 6 6V4Zm-3 1h3v2a3 3 0 0 1-3-3V5Zm18 0v-1a3 3 0 0 1-3 3V5h3ZM10 12h4v3h2v2H8v-2h2v-3Z" />
  </svg>
)

function TournamentCard({ t }) {
  return (
    <article className="portfolio-card tilt group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#15301f] to-[#091610] shadow-xl shadow-black/40">
      <div className="relative h-44 overflow-hidden">
        <img
          src={t.image}
          alt={t.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        <span className="absolute top-3 left-3 rounded-md border border-accent/50 bg-black/50 px-2.5 py-1 font-mono text-xs font-medium text-accent backdrop-blur">
          {t.badge}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-bold tracking-tight text-white">
          {t.title}
        </h3>

        <div className="mt-4 space-y-2 text-sm text-white/65">
          <p className="flex items-center gap-2">
            <UsersIcon /> {t.participants}
          </p>
          <p className="flex items-center gap-2">
            <PinIcon /> {t.location}
          </p>
          <p className="flex items-center gap-2">
            <CalIcon /> {t.date}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-sm font-medium text-amber-400">
          <TrophyIcon /> {t.result}
        </div>
      </div>
    </article>
  )
}

function Portfolio() {
  const rootRef = useRef(null)
  const gridRef = useRef(null)
  const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(0)

  const filtered = useMemo(
    () => (filter === 'All' ? TOURNAMENTS : TOURNAMENTS.filter((t) => t.category === filter)),
    [filter],
  )
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  const selectFilter = (f) => {
    setFilter(f)
    setPage(0)
  }

  /* Re-animate cards on filter / page change */
  useLayoutEffect(() => {
    if (!gridRef.current) return
    gsap.fromTo(
      gridRef.current.querySelectorAll('.portfolio-card'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' },
    )
  }, [filter, page])

  /* Heading + tabs entrance */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pf-head > *', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="events" ref={rootRef} className="bg-gradient-to-b from-[#15294d] to-[#0b1730] py-24">
      {/* Heading */}
      <div className="pf-head mx-auto max-w-[1600px] px-5 lg:px-8">
        <p className="font-mono text-xs font-bold tracking-[0.35em] text-brand uppercase">
          Portfolio
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-[#1b3b6f] to-[#3b82f6] bg-clip-text text-transparent">
            30+ Tournaments.
          </span>{' '}
          <span className="text-brand">Zero Compromises.</span>
        </h2>

        {/* Filter tabs */}
        <div className="mt-9 flex flex-wrap gap-3">
          {FILTERS.map((f) => {
            const active = f === filter
            return (
              <button
                key={f}
                type="button"
                onClick={() => selectFilter(f)}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                  active
                    ? 'bg-accent text-white shadow-lg shadow-accent/30'
                    : 'bg-white text-ink/80 hover:bg-white/90'
                }`}
              >
                {f}
              </button>
            )
          })}
        </div>
      </div>

      {/* Cards grid */}
      <div
        ref={gridRef}
        className="mx-auto max-w-[1600px] mt-10 grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8"
      >
        {visible.map((t, i) => (
          <TournamentCard key={`${t.title}-${i}`} t={t} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="grid h-9 w-9 place-items-center rounded-full text-white/60 transition hover:text-brand disabled:opacity-30"
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === page ? 'w-7 bg-brand' : 'w-4 bg-white/25 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          disabled={page >= pageCount - 1}
          className="grid h-9 w-9 place-items-center rounded-full text-white/60 transition hover:text-brand disabled:opacity-30"
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Portfolio
