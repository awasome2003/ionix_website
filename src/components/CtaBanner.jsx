import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function CtaBanner() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-anim', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%', once: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} data-bg="0" className="bg-[#000]/50 py-16 lg:backdrop-blur-sm">
      <div className="mx-auto max-w-[1600px] flex flex-col items-start gap-8 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="cta-anim font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Find Matches. Meet Players. Stay Active.
          </h2>
          <p className="cta-anim mt-3 max-w-2xl text-base text-white">
            Chalo Khelne helps you discover sports activities, connect with local
            players, and participate in events across multiple sports.
          </p>
        </div>

        <a
          href="#platform"
          className="cta-anim magnetic group inline-flex shrink-0 items-center gap-2.5 rounded-lg bg-brand px-7 py-4 text-sm text-white shadow-lg shadow-brand/30 transition-shadow hover:shadow-xl hover:shadow-brand/40"
        >
          <span className="font-bold uppercase tracking-wide">Explore</span>
          <span className="font-medium">Chalo Khelne</span>
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
      </div>
    </section>
  )
}

export default CtaBanner
