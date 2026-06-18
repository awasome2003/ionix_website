import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  building: 'M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16h-3v-4h-2v4Zm3-13h2V6H7Zm4 0h2V6h-2ZM7 12h2v-2H7Zm4 0h2v-2h-2Zm6-3h3a1 1 0 0 1 1 1v11h-4Zm1 4h2v-2h-2Zm0 4h2v-2h-2Z',
  cap: 'M12 3 1 9l11 6 9-4.9V17h2V9Zm-6 9.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.8l-6 3.3Z',
  calendar: 'M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2Zm12 7v10H5V9Z',
  trophy: 'M6 4h12v2a4 4 0 0 1-4 4h-4A4 4 0 0 1 6 6V4Zm-3 1h3v2a3 3 0 0 1-3-3V5Zm18 0v-1a3 3 0 0 1-3 3V5h3ZM10 12h4v3h2v2H8v-2h2v-3Z',
  phone: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 3v13h10V5Zm4 14h2v.5h-2Z',
  layers: 'm12 2 10 5-10 5L2 7Zm0 8.2L20.5 6 22 7l-10 5L2 7l1.5-1ZM2 12l10 5 10-5 1 1-11 5.5L1 13Zm0 5 10 5 10-5 1 1-11 5.5L1 18Z',
  school: 'M8 4a4 4 0 0 1 8 0h2a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Zm2 0h4a2 2 0 0 0-4 0Zm-1 6a1 1 0 0 0-1 1v3h8v-3a1 1 0 0 0-1-1Z',
}

const SERVICES = [
  {
    key: 'corporate',
    nav: 'Corporate Events',
    icon: 'building',
    title: 'Corporate Events & Tournament Management',
    desc: 'Professional tournament management for corporates, institutions, and organizations — from planning and setup to execution and participant experience.',
    highlights: [
      'End-to-End Tournament Execution',
      'Professional Umpires & Officials',
      'Equipment & Venue Setup',
      'Live Scoring & Match Management',
      'Custom Branding & Awards',
      'Employee Engagement Programs',
    ],
    stats: [
      { v: '50+', l: 'Events Managed' },
      { v: '5000+', l: 'Participants' },
      { v: '100%', l: 'Operational Support' },
      { v: 'Multiple', l: 'Corporate Clients' },
    ],
    deliverables: ['Tournament Planning', 'Competition Structure', 'Equipment Setup', 'Officials & Referees', 'Technology Integration', 'Live Operations', 'Awards & Closing Ceremony'],
  },
  {
    key: 'academy',
    nav: 'Academy Training',
    icon: 'cap',
    title: 'Professional Academy & Athlete Training',
    desc: 'Structured coaching programs for every level — from first-time beginners to competitive athletes — led by ITTF-certified coaches.',
    highlights: [
      'ITTF Certified Coaching',
      'Beginner to Advanced Batches',
      'Personalized Training Plans',
      'Fitness & Conditioning',
      'Match Practice Sessions',
      'Performance Tracking',
    ],
    stats: [
      { v: '100+', l: 'Athletes Trained' },
      { v: '3', l: 'Training Centers' },
      { v: 'ITTF L-1', l: 'Certified Coaches' },
      { v: 'All Ages', l: 'Age Groups' },
    ],
    deliverables: ['Skill Assessment', 'Custom Training Plan', 'Group & Private Coaching', 'Fitness Programs', 'Progress Reports', 'Tournament Prep', 'Certification Pathway'],
  },
  {
    key: 'leagues',
    nav: 'Monthly Leagues',
    icon: 'calendar',
    title: 'Competitive Monthly Leagues',
    desc: 'Regular competitive leagues that give players consistent match opportunities, rankings, and a thriving community of all skill levels.',
    highlights: [
      'Monthly Competitive Fixtures',
      'Player Rankings & Ratings',
      'Multiple Skill Divisions',
      'Round-Robin & Knockout Formats',
      'Live Standings',
      'Community Meetups',
    ],
    stats: [
      { v: '100+', l: 'Monthly Participants' },
      { v: '12+', l: 'Leagues / Year' },
      { v: 'All Levels', l: 'Skill Divisions' },
      { v: 'Live', l: 'Rankings' },
    ],
    deliverables: ['League Scheduling', 'Division Seeding', 'Match Officiating', 'Score Tracking', 'Leaderboards', 'Prizes & Recognition', 'Season Finals'],
  },
  {
    key: 'tournament',
    nav: 'Tournament Management',
    icon: 'trophy',
    title: 'End-to-End Tournament Management',
    desc: 'Complete tournament execution — brackets, scheduling, live scoring, and awards — for competitive events of any scale.',
    highlights: [
      'Automated Bracket Generation',
      'Real-time Live Scoring',
      'Multi-Category Draws',
      'Officials & Referee Management',
      'Digital Certificates',
      'Awards & Ceremonies',
    ],
    stats: [
      { v: '30+', l: 'Tournaments' },
      { v: '5000+', l: 'Matches' },
      { v: '100%', l: 'On-time Delivery' },
      { v: 'Multi-Sport', l: 'Ready' },
    ],
    deliverables: ['Registration Management', 'Draw & Seeding', 'Scheduling', 'Live Scoring', 'Officials Coordination', 'Results & Reports', 'Award Ceremony'],
  },
  {
    key: 'technology',
    nav: 'Sports Technology',
    icon: 'phone',
    title: 'Chalo Khelenge Sports Technology',
    desc: 'A complete digital platform powering registrations, payments, live scoring, rankings, and player engagement across every event.',
    highlights: [
      'Online Registration & Payments',
      'Live Match Scoring',
      'Automated Brackets',
      'Player Profiles & Rankings',
      'Real-time Notifications',
      'Analytics Dashboard',
    ],
    stats: [
      { v: '5000+', l: 'Platform Users' },
      { v: '30+', l: 'Events Powered' },
      { v: '99.9%', l: 'Uptime' },
      { v: 'Mobile + Web', l: 'Access' },
    ],
    deliverables: ['Registration Portal', 'Payment Gateway', 'Live Scoring Engine', 'Ranking System', 'Notifications', 'Admin Dashboard', 'Analytics & Reports'],
  },
  {
    key: 'infrastructure',
    nav: 'Sports Infrastructure',
    icon: 'layers',
    title: 'Professional Sports Infrastructure',
    desc: 'World-class training facilities and venues designed for professional play, competitive events, and community engagement.',
    highlights: [
      'ITTF-standard Tables & Flooring',
      'Professional Lighting',
      'Spectator Seating',
      'Equipment Pro-shop',
      'Multi-court Venues',
      'Accessible Facilities',
    ],
    stats: [
      { v: '3', l: 'Centers' },
      { v: 'Multiple', l: 'Courts' },
      { v: 'ITTF', l: 'Standard' },
      { v: 'Pune & PCMC', l: 'Locations' },
    ],
    deliverables: ['Venue Setup', 'Equipment Supply', 'Court Maintenance', 'Lighting & AV', 'Seating Arrangement', 'Safety Compliance', 'Facility Management'],
  },
  {
    key: 'school',
    nav: 'School Programs',
    icon: 'school',
    title: 'School Sports Programs & Inter-School Events',
    desc: 'Structured school sports programs — from in-school coaching and PE-curriculum support to inter-school tournaments and annual sports-day management.',
    highlights: [
      'In-School Coaching Programs',
      'Inter-School Tournaments',
      'Annual Sports Day Management',
      'Talent Identification & Scouting',
      'Student Progress Tracking',
      'Certificates & Recognition',
    ],
    stats: [
      { v: '20+', l: 'Partner Schools' },
      { v: '2000+', l: 'Students Engaged' },
      { v: 'Curriculum', l: 'Aligned Programs' },
      { v: 'All Grades', l: 'Age Groups' },
    ],
    deliverables: ['Program Design', 'Certified School Coaches', 'Equipment & Setup', 'Inter-School Fixtures', 'Sports Day Execution', 'Progress Reports', 'Awards & Certificates'],
  },
]

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Ecosystem() {
  const rootRef = useRef(null)
  const panelRef = useRef(null)
  const [active, setActive] = useState(0)
  const s = SERVICES[active]

  /* Animate the detail panel whenever the active service changes */
  useLayoutEffect(() => {
    if (!panelRef.current) return
    gsap.fromTo(
      panelRef.current.querySelectorAll('.panel-anim'),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
    )
  }, [active])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.eco-head > *', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      })
      gsap.from('.eco-tab', {
        x: -24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        immediateRender: false, // fail-safe: tabs stay visible if trigger never fires
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%', once: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="academy"
      ref={rootRef}
      className="relative overflow-hidden bg-navy py-24 text-white"
    >
      {/* Decorative backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-[#0c1a38] to-navy" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        <div className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#1b3b6f]/40 blur-[120px]" />
      </div>

      {/* Heading */}
      <div className="eco-head relative z-10 mx-auto max-w-[1600px] px-5 text-center lg:px-8">
        <p className="font-mono text-xs font-bold tracking-[0.35em] text-brand uppercase">
          Our Services
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-[#1b3b6f] to-[#3b82f6] bg-clip-text text-transparent">
            The IONIX Sports
          </span>{' '}
          <span className="text-brand">Ecosystem</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/45">
          A complete sports platform — from athlete coaching to corporate
          tournament management to technology.
        </p>
      </div>

      {/* Body */}
      <div className="eco-body relative z-10 mx-auto max-w-[1600px] mt-14 grid grid-cols-1 gap-6 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:px-8">
        {/* Left tabs */}
        <div className="flex flex-col gap-4">
          {SERVICES.map((srv, i) => {
            const isActive = i === active
            return (
              <button
                key={srv.key}
                type="button"
                onClick={() => setActive(i)}
                className={`eco-tab group flex items-center gap-4 rounded-2xl bg-white px-6 py-5 text-left transition-all duration-300 ${
                  isActive
                    ? 'border-2 border-brand shadow-[0_0_35px_rgba(242,101,34,0.25)]'
                    : 'border-2 border-transparent hover:-translate-y-0.5 hover:shadow-lg'
                }`}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl transition-colors ${
                    isActive ? 'bg-brand/10 text-brand' : 'bg-accent/10 text-accent'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <path d={ICONS[srv.icon]} />
                  </svg>
                </span>
                <span className="font-display text-lg font-bold tracking-tight text-navy">
                  {srv.nav}
                </span>
              </button>
            )
          })}
        </div>

        {/* Right detail panel */}
        <div
          ref={panelRef}
          className="relative overflow-hidden rounded-3xl border border-brand/25 bg-[#0a1326]/90 p-7 lg:p-9"
        >
          {/* orange glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/30 blur-[90px]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/15 via-transparent to-transparent" />

          <div className="relative">
            <span className="panel-anim mb-5 inline-grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-brand">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                <path d={ICONS[s.icon]} />
              </svg>
            </span>

            <h3 className="panel-anim font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
              {s.title}
            </h3>
            <p className="panel-anim mt-3 text-sm leading-relaxed text-white/55">
              {s.desc}
            </p>

            {/* Highlights + Statistics */}
            <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-2">
              <div>
                <h4 className="panel-anim mb-3 text-sm font-bold text-white">
                  Key Highlights
                </h4>
                <ul className="space-y-2.5">
                  {s.highlights.map((h) => (
                    <li
                      key={h}
                      className="panel-anim rounded-lg border-l-2 border-brand/60 bg-white/[0.04] px-4 py-2.5 text-sm text-white/80"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="panel-anim mb-3 text-sm font-bold text-white">
                  Statistics
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {s.stats.map((st) => (
                    <div
                      key={st.l}
                      className="panel-anim rounded-xl border border-white/5 bg-white/[0.04] px-4 py-5 text-center"
                    >
                      <div className="font-display text-xl font-extrabold text-white">
                        {st.v}
                      </div>
                      <div className="mt-1 text-xs text-white/55">{st.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="mt-7">
              <h4 className="panel-anim mb-3 text-sm font-bold text-white">
                Service Deliverables
              </h4>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {s.deliverables.map((d) => (
                  <span
                    key={d}
                    className="panel-anim inline-flex items-center gap-2 text-xs text-white/75"
                  >
                    <Check />
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ecosystem
