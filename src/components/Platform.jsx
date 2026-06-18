import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CK_GREEN = '#15A765'

const FEATURES = [
  { title: 'Online Registration', desc: 'Seamless player signup with automated confirmations and payment collection.' },
  { title: 'Live Match Scoring', desc: 'Real-time score updates visible to players, coaches, and spectators.' },
  { title: 'Tournament Brackets', desc: 'Auto-generated draws for knockout, round-robin, and league formats.' },
  { title: 'League Management', desc: 'Points tables, standings, and season-long league tracking.' },
  { title: 'Ranking System', desc: 'Dynamic player ratings updated after every match automatically.' },
  { title: 'Player Profiles', desc: 'Complete match history, win/loss stats, and achievement tracking.' },
  { title: 'Payment Tracking', desc: 'UPI, card, and net banking integration with automated receipts.' },
  { title: 'Reports & Analytics', desc: 'Tournament summaries, participation trends, and revenue reports.' },
]

function Check() {
  return (
    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function PhoneMockup() {
  return (
    <div className="phone-enter relative mx-auto w-[270px] sm:w-[300px]">
      {/* glow */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-accent/10 blur-3xl" />

      <div className="phone-float rounded-[2.8rem] border border-slate-200 bg-[#0b0b0d] p-2.5 shadow-2xl shadow-slate-400/40">
        <div className="relative overflow-hidden rounded-[2.3rem] bg-white">
          {/* dynamic island */}
          <div className="absolute top-2 left-1/2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          {/* status bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-semibold text-black">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M2 20h3v-6H2Zm5 0h3V9H7Zm5 0h3V4h-3Zm5 0h3v-9h-3Z" /></svg>
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M12 18a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm0-5a5 5 0 0 1 4 2l1.5-1.5a7 7 0 0 0-11 0L8 15a5 5 0 0 1 4-2Zm0-5a10 10 0 0 1 8 4l1.5-1.5a12 12 0 0 0-19 0L4 12a10 10 0 0 1 8-4Z" /></svg>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M3 8h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H3Zm19 3h1v2h-1Z" /></svg>
            </span>
          </div>

          {/* app body */}
          <div className="px-4 pb-5">
            <h4 className="mt-1 text-sm font-bold text-slate-800">Events</h4>

            {/* main tabs */}
            <div className="mt-2 flex rounded-full bg-slate-100 p-1 text-[11px] font-semibold">
              <span className="flex-1 rounded-full py-1.5 text-center text-white" style={{ background: CK_GREEN }}>
                Events
              </span>
              <span className="flex-1 py-1.5 text-center text-slate-500">Leaderboard</span>
            </div>

            {/* sub tabs */}
            <div className="mt-3 flex gap-4 text-[10px] font-medium">
              <span className="border-b-2 pb-1" style={{ color: CK_GREEN, borderColor: CK_GREEN }}>Live</span>
              <span className="text-slate-400">Upcoming</span>
              <span className="text-slate-400">Past</span>
              <span className="text-slate-400">My Registration</span>
            </div>

            {/* search */}
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-[10px] text-slate-400">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" strokeLinecap="round" /></svg>
              <span className="flex-1">Search sports, turfs or players</span>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11Z" /></svg>
            </div>

            {/* event card 1 */}
            <div className="mt-3 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <div className="relative h-24">
                <img src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=600&auto=format&fit=crop" alt="" className="h-full w-full object-cover" />
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[8px] font-bold text-white">
                  <span className="h-1 w-1 rounded-full bg-white" /> Live
                </span>
              </div>
              <div className="p-3">
                <span className="text-[9px] font-semibold" style={{ color: CK_GREEN }}>Football</span>
                <div className="flex items-center justify-between">
                  <h5 className="text-[13px] font-bold text-slate-800">Football Tournament</h5>
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-slate-400" fill="currentColor"><path d="M18 8a3 3 0 1 0-2.8-4L8.9 7.6a3 3 0 1 0 0 4.8l6.3 3.6A3 3 0 1 0 18 14a3 3 0 0 0-2 .8l-6.3-3.6a3 3 0 0 0 0-.4L16 7.2A3 3 0 0 0 18 8Z" /></svg>
                </div>
                <p className="text-[10px] text-slate-500">Sideline Culb</p>
                <div className="mt-1 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">Apr 24 - Apr 26</span>
                  <span className="font-semibold text-slate-700">₹350/- Onward</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[9px] font-medium text-red-500">Closes today at 11.00 AM</span>
                  <button className="rounded-md px-3 py-1 text-[10px] font-semibold text-white" style={{ background: CK_GREEN }}>Register</button>
                </div>
              </div>
            </div>

            {/* event card 2 */}
            <div className="mt-3 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <div className="relative h-20">
                <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop" alt="" className="h-full w-full object-cover" />
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[8px] font-bold text-white">
                  <span className="h-1 w-1 rounded-full bg-white" /> Live
                </span>
              </div>
              <div className="p-3">
                <span className="text-[9px] font-semibold" style={{ color: CK_GREEN }}>Badminton</span>
                <h5 className="text-[13px] font-bold text-slate-800">Shuttle smash & social</h5>
                <p className="text-[10px] text-slate-500">The Shuttle Club</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Platform() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pf2-anim', {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%', once: true },
      })
      gsap.from('.phone-enter', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%', once: true },
      })
      /* continuous float is handled by a pure CSS animation (.phone-float)
         on an inner element so it never conflicts with the entrance tween. */
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="platform" ref={rootRef} className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-[1600px] grid grid-cols-1 items-center gap-14 px-5 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        {/* Left */}
        <div>
          <p className="pf2-anim font-mono text-xs font-bold tracking-[0.35em] text-brand uppercase">
            SaaS Platform
          </p>
          <h2 className="pf2-anim mt-4 font-display text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
            <span className="text-navy">Chalo Khelne</span>{' '}
            <span className="text-brand">Sports Tech</span>{' '}
            <span className="text-navy">Platform</span>
          </h2>
          <p className="pf2-anim mt-5 max-w-2xl text-base leading-relaxed text-ink/65">
            The complete digital backbone for modern sports tournaments. From
            registration to results, manage every aspect of your event on one
            powerful platform built for Indian sports communities.
          </p>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="pf2-anim flex gap-3">
                <Check />
                <div>
                  <h3 className="font-display text-base font-bold text-navy">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/60">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="pf2-anim mt-9 flex flex-wrap gap-4">
            <a
              href="https://chalokhelne.com/l/home"
              target="_blank"
              rel="noreferrer"
              className="magnetic group inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand/30 transition-shadow hover:shadow-xl hover:shadow-brand/40"
            >
              Book Demo
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="https://chalokhelne.com/l/home"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-lg border border-accent/60 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-accent transition-all hover:bg-accent/10"
            >
              Get App
            </a>
          </div>
        </div>

        {/* Right — phone */}
        <div className="flex justify-center">
          <PhoneMockup />
        </div>
      </div>
    </section>
  )
}

export default Platform
