import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = ['All', 'Players', 'Parents', 'Corporate Clients', 'Academy Members']

const TESTIMONIALS = [
  {
    cat: 'Players',
    quote:
      "IONIX Sports changed how I experience table tennis. The monthly leagues are incredibly well-organized, live scores are instant, and the coaching at Vedant Academy is world-class. I've improved more in 6 months here than in 3 years elsewhere.",
    name: 'Ankit Mehta',
    role: 'Player',
  },
  {
    cat: 'Parents',
    quote:
      "My daughter's confidence has soared since joining IONIX. The coaches genuinely care, the facilities are safe and professional, and the regular tournaments keep her motivated. As a parent, I couldn't ask for more.",
    name: 'Sunita Deshmukh',
    role: 'Parent',
  },
  {
    cat: 'Corporate Clients',
    quote:
      'IONIX ran our company tournament end-to-end — registration, officials, live scoring, branding, awards. It was flawless and our employees are still talking about it. Truly professional event management.',
    name: 'Rajesh Kulkarni',
    role: 'HR Head, TechCorp',
  },
  {
    cat: 'Academy Members',
    quote:
      'The structured training and personalized feedback at the academy are exceptional. The Chalo Khelenge app makes tracking my progress and matches effortless. This is how a modern sports academy should be run.',
    name: 'Arjun Patil',
    role: 'Academy Member',
  },
  {
    cat: 'Players',
    quote:
      'From booking to results, everything just works. The live brackets and rankings make every match feel like a real competition. IONIX has built something special for Pune players.',
    name: 'Priya Nair',
    role: 'Player',
  },
]

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
}

function Testimonials() {
  const rootRef = useRef(null)
  const cardRef = useRef(null)
  const [filter, setFilter] = useState('All')
  const [index, setIndex] = useState(0)

  const list = useMemo(
    () => (filter === 'All' ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.cat === filter)),
    [filter],
  )
  const len = list.length
  const t = list[index] ?? list[0]

  const selectFilter = (f) => {
    setFilter(f)
    setIndex(0)
  }
  const next = () => setIndex((i) => (i + 1) % len)
  const prev = () => setIndex((i) => (i - 1 + len) % len)

  /* Crossfade card content on change */
  useLayoutEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
    )
  }, [index, filter])

  /* Auto-advance (resets when index/filter changes) */
  useEffect(() => {
    if (len <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % len), 6000)
    return () => clearInterval(id)
  }, [index, len])

  /* Heading entrance */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tm-head > *', {
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
    <section id="testimonials" ref={rootRef} data-bg="2" className="bg-[#000]/50 py-24">
      {/* Heading */}
      <div className="tm-head mx-auto max-w-[1600px] px-5 text-center lg:px-8">
        <p className="font-mono text-xs font-bold tracking-[0.35em] text-brand uppercase">
          Social Proof
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl">
          <span className="text-white">What Our</span>{' '}
          <span className="text-brand">Community Says</span>
        </h2>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => {
            const on = f === filter
            return (
              <button
                key={f}
                type="button"
                onClick={() => selectFilter(f)}
                className={`rounded-lg border px-5 py-2 text-sm font-semibold transition-all ${
                  on
                    ? 'border-accent bg-accent text-white shadow-lg shadow-accent/30'
                    : 'border-white/20 bg-white/5 text-white/75 backdrop-blur hover:border-accent/50 hover:text-accent'
                }`}
              >
                {f}
              </button>
            )
          })}
        </div>
      </div>

      {/* Card */}
      <div className="mx-auto mt-12 max-w-4xl px-5">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-10 shadow-2xl shadow-black/30 lg:p-14 lg:backdrop-blur-xl">
          <div ref={cardRef}>
            {/* quote mark */}
            <svg viewBox="0 0 24 24" className="mx-auto h-12 w-12 text-accent/40" fill="currentColor">
              <path d="M7 7h4v4c0 3-2 5-5 5v-2c1.7 0 2.6-1 2.9-2H7Zm9 0h4v4c0 3-2 5-5 5v-2c1.7 0 2.6-1 2.9-2H16Z" />
            </svg>

            <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-white/80">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-slate-300 to-slate-400 font-display text-sm font-bold text-white">
                {initials(t.name)}
              </span>
              <div className="text-left">
                <div className="font-display text-base font-bold text-white">{t.name}</div>
                <div className="text-sm text-white/55">{t.role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white/70 backdrop-blur transition hover:border-brand hover:text-brand"
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-7 bg-brand' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white/70 backdrop-blur transition hover:border-brand hover:text-brand"
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
