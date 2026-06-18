import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Partner logos — placeholder monograms; swap for real logo images later. */
const PARTNERS = [
  {
    name: 'MIT College Pune',
    category: 'Educational Institution',
    mark: (
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#1b3b6f] text-white">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
          <path d="M12 3 4 7v1h16V7l-8-4Zm-6 7v6H5v2h14v-2h-1v-6h-2v6h-2v-6h-2v6H9v-6H7v6H6v-6Z" />
        </svg>
      </span>
    ),
  },
  {
    name: 'Hindustan Antibiotics',
    category: 'Corporate Client',
    mark: (
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#e2e8f0] font-display text-lg font-extrabold text-[#b91c1c]">
        HA
      </span>
    ),
  },
  {
    name: 'Chalo Khelne',
    category: 'Technology Platform',
    mark: (
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#0f172a] font-display text-lg font-extrabold tracking-tight">
        <span className="text-brand">C</span>
        <span className="-ml-1 text-accent">K</span>
      </span>
    ),
  },
  {
    name: 'Vedant Academy',
    category: 'Training Partner',
    mark: (
      <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#16a34a] to-[#065f46] text-white">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 2C7 2 3 6 3 11c0 6 9 11 9 11s9-5 9-11c0-5-4-9-9-9Zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
        </svg>
      </span>
    ),
  },
]

function PartnerItem({ p }) {
  return (
    <div className="group flex w-56 shrink-0 flex-col items-center gap-3 px-6">
      <div className="grayscale transition duration-300 group-hover:scale-110 group-hover:grayscale-0">
        {p.mark}
      </div>
      <div className="text-center">
        <div className="font-display text-base font-bold text-ink">{p.name}</div>
        <div className="mt-0.5 text-xs font-medium text-muted">{p.category}</div>
      </div>
    </div>
  )
}

function Partners() {
  const rootRef = useRef(null)
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...PARTNERS, ...PARTNERS, ...PARTNERS]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.partners-head > *', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} data-bg="0" className="py-20 backdrop-blur-sm">
      {/* Heading */}
      <div className="partners-head mx-auto max-w-[1600px] px-5 text-center lg:px-8">
        <p className="font-mono text-xs font-bold tracking-[0.35em] text-brand uppercase">
          Trusted Partners
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
          Trusted by Sports Communities
        </h2>
        <p className="mt-2 font-display text-lg font-medium tracking-wide text-white uppercase sm:text-xl">
          Across Pune &amp; PCMC
        </p>
      </div>

      {/* Marquee */}
      <div className="marquee group relative mt-14 overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-transparent to-transparent" />

        <div className="marquee-track flex w-max items-start">
          {loop.map((p, i) => (
            <PartnerItem key={`${p.name}-${i}`} p={p} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
        }
        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default Partners
