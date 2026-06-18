import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

/* Background carousel images */
const SLIDES = ['/bg-7.jpeg', '/bg-2.jpeg', '/bg-3.jpeg']

const STATS = [
  { value: 30, suffix: '+', label: 'Sports Events Managed', color: 'text-accent' },
  { value: 100, suffix: '+', label: 'Monthly League Participants', color: 'text-accent' },
  { value: 3, suffix: '+', label: 'Professional Training Centers', color: 'text-accent' },
  { value: 5000, suffix: '+', label: 'Matches Conducted', color: 'text-accent' },
  { value: 100, suffix: '%', label: 'End-to-End Management', color: 'text-accent' },
  { text: 'ITTF', label: 'Certified Coach', color: 'text-brand' },
]

function BackgroundCarousel() {
  const [active, setActive] = useState(0)
  // Ken Burns is a heavy continuous transform on a large image — skip on mobile.
  const noKenBurns =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 1024px)').matches

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hero-bg absolute left-0 right-0 top-[-20%] h-[140%] overflow-hidden bg-navy">
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover"
            style={{
              animation:
                i === active && !noKenBurns
                  ? 'kenburns 7s ease-out forwards'
                  : 'none',
            }}
          />
        </div>
      ))}

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05080f]/95 via-[#05080f]/70 to-[#05080f]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-[#05080f]/60" />

      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1) translateY(0); }
          100% { transform: scale(1.12) translateY(-1.5%); }
        }
      `}</style>
    </div>
  )
}

function CountUp({ value, suffix = '', play = true }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!play) return
    const obj = { n: 0 }
    const tween = gsap.to(obj, {
      n: value,
      duration: 2,
      delay: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.n) + suffix
      },
    })
    return () => tween.kill()
  }, [value, suffix, play])

  return <span ref={ref}>0{suffix}</span>
}

function Hero({ started = false }) {
  const rootRef = useRef(null)
  const headingRef = useRef(null)

  /* Initial hidden state so nothing flashes before the entry plays. */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-badge', { opacity: 0, y: 30 })
      gsap.set('.hero-sub', { opacity: 0, y: 40 })
      gsap.set('.hero-btn', { opacity: 0, y: 30 })
      gsap.set('.hero-stats', { opacity: 0, y: 50 })
      gsap.set(headingRef.current, { autoAlpha: 0 })
      gsap.set('.hero-bg', { scale: 1.2 })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  /* Depth-layered entry — fires when the preloader hands off. */
  useLayoutEffect(() => {
    if (!started) return
    let split
    const ctx = gsap.context(() => {
      // Background push-in (deepest layer, slowest).
      gsap.to('.hero-bg', { scale: 1, duration: 1.7, ease: 'power3.out' })

      const run = () => {
        split = new SplitText(headingRef.current, {
          type: 'lines,words,chars',
          mask: 'lines',
          linesClass: 'split-line',
        })
        gsap.set(headingRef.current, { autoAlpha: 1 })

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from(split.chars, { yPercent: 110, opacity: 0, duration: 0.7, stagger: 0.022 }, 0)
          .to('.hero-badge', { opacity: 1, y: 0, duration: 0.6 }, 0)
          .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7 }, 0.5)
          .to('.hero-btn', { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.7)
          .to('.hero-stats', { opacity: 1, y: 0, duration: 0.8 }, 0.95)
      }

      if (document.fonts && document.fonts.ready) document.fonts.ready.then(run)
      else run()
    }, rootRef)
    return () => {
      ctx.revert()
      split?.revert()
    }
  }, [started])

  /* Scroll parallax (depth on scroll) — desktop only to keep mobile smooth. */
  useLayoutEffect(() => {
    if (window.matchMedia('(max-width: 1024px)').matches) return
    const ctx = gsap.context(() => {
      gsap.to('.hero-bg', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-content', {
        yPercent: -12,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  /* Cursor parallax — layers drift at different depths with the mouse. */
  useLayoutEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const root = rootRef.current
    if (!root) return

    const bg = root.querySelector('.hero-bg')
    const content = root.querySelector('.hero-content')
    const head = headingRef.current
    const layers = [
      { el: bg, fx: 14, fy: 10 },
      { el: content, fx: -16, fy: -10 },
      { el: head, fx: -26, fy: -16 },
    ].filter((l) => l.el)
    const setters = layers.map((l) => ({
      x: gsap.quickTo(l.el, 'x', { duration: 0.8, ease: 'power3' }),
      y: gsap.quickTo(l.el, 'y', { duration: 0.8, ease: 'power3' }),
      fx: l.fx,
      fy: l.fy,
    }))

    const onMove = (e) => {
      const r = root.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      setters.forEach((s) => {
        s.x(nx * s.fx)
        s.y(ny * s.fy)
      })
    }
    root.addEventListener('mousemove', onMove)
    return () => root.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative isolate flex min-h-screen items-center overflow-hidden"
    >
      <BackgroundCarousel />

      <div className="hero-content relative z-10 mx-auto max-w-[1600px] w-full px-5 pt-28 pb-10 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="hero-badge inline-flex items-center rounded-full border border-brand/60 bg-brand/10 px-5 py-2 font-mono text-xs font-bold tracking-[0.3em] text-brand uppercase backdrop-blur">
            Pune's #1 Sports Platform
          </span>

          {/* Headline */}
          <h1
            ref={headingRef}
            className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            <span className="block">Pune's Leading</span>
            <span className="block text-brand">Sports Event</span>
            <span className="block">Management &amp;</span>
            <span className="text-outline block">Table Tennis Club</span>
          </h1>

          {/* Subtext */}
          <p className="hero-sub mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            30+ Successfully Managed Tournaments &amp; Corporate Events. Powered by{' '}
            <span className="font-semibold text-white">IONIX Sports</span> and{' '}
            <span className="font-semibold text-brand">Chalo Khelne</span> Sports
            Technology Platform.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="hero-btn magnetic group inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-brand/30 transition-shadow hover:shadow-2xl hover:shadow-brand/50"
            >
              Organize My Tournament
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a
              href="#contact"
              className="hero-btn inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/10"
            >
              Join Academy
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="hero-stats mt-14 grid grid-cols-2 divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md sm:grid-cols-3 lg:grid-cols-6 lg:divide-x">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="border-b border-white/10 px-5 py-6 text-center lg:border-b-0"
            >
              <div className={`font-display text-3xl font-extrabold ${s.color}`}>
                {s.text ? s.text : <CountUp value={s.value} suffix={s.suffix} play={started} />}
              </div>
              <div className="mt-1.5 text-xs font-medium text-white/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
