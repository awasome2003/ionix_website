import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FOUNDERS = [
  {
    name: 'Suryakant Baranwal',
    roleAccent: 'Founder',
    roleRest: 'Sports Infrastructure Leader',
    photo: '/founder.jpeg',
    quote:
      'Sports infrastructure builds thriving communities. Every tournament we organize develops champions on and off-court.',
    stats: [
      { icon: 'trophy', text: '30+ Events Organized' },
      { icon: 'users', text: '500+ Community Members' },
      { icon: 'target', text: '3 Training Centers' },
    ],
    tags: ['Academy Operations', 'Tournament Execution', 'Sports Community Development'],
  },
  {
    name: 'Sagar Talekar',
    roleAccent: 'Co-Founder',
    roleRest: 'ITTF Certified Coach',
    photo: '/co-founder.jpeg',
    quote:
      'True coaching goes beyond technique. We develop athletes who think, compete, and excel.',
    stats: [
      { icon: 'medal', text: 'ITTF L-1 Certified' },
      { icon: 'star', text: '100+ Athletes Trained' },
      { icon: 'gear', text: 'Tournament Management' },
    ],
    tags: ['Professional Coaching', 'Athlete Development', 'Tournament Management'],
  },
]

function FounderCard({ f }) {
  return (
    <article className="founder-card flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition-transform duration-300 hover:-translate-y-1.5 sm:flex-row">
      {/* Photo */}
      <div className="shrink-0 sm:w-52">
        <img
          src={f.photo}
          alt={f.name}
          className="h-56 w-full object-cover sm:h-full"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <h3 className="font-display text-2xl font-bold tracking-tight text-navy">
          {f.name}
        </h3>
        <p className="mt-1 text-sm font-medium">
          <span className="text-brand">{f.roleAccent}</span>
          <span className="text-ink/60"> &amp; {f.roleRest}</span>
        </p>

        <blockquote className="mt-4 border-l-2 border-accent pl-4 text-sm italic leading-relaxed text-ink/70">
          {f.quote}
        </blockquote>

        {/* Stat chips */}
        {/* <div className="mt-5 flex flex-wrap gap-2.5">
          {f.stats.map((s) => (
            <span
              key={s.text}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs font-medium text-ink/75"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="currentColor">
                <path d={Icon[s.icon]} />
              </svg>
              {s.text}
            </span>
          ))}
        </div> */}

        {/* Skill tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {f.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-ink/60"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

function Founders() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.founders-head > *', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      })
      gsap.from('.founder-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.founders-grid', start: 'top 80%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="founders"
      ref={rootRef}
      data-bg="1"
      className="relative overflow-hidden py-24 backdrop-blur-sm"
    >
      <div className="relative z-10">
        {/* Heading */}
        <div className="founders-head mx-auto max-w-[1600px] px-5 text-center lg:px-8">
          <p className="font-mono text-xs font-bold tracking-[0.35em] text-brand uppercase">
            Meet the Founders
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
            The People Behind <span className="text-brand">IONIX Sports</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="founders-grid mx-auto max-w-[1600px] mt-14 grid grid-cols-1 gap-8 px-5 lg:grid-cols-2 lg:px-8">
          {FOUNDERS.map((f) => (
            <FounderCard key={f.name} f={f} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Founders
