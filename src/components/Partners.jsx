import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Partner logos (in /public). */
const PARTNERS = [
  { name: 'MIT College Pune', category: 'Educational Institution', logo: '/MIT.jpg' },
  { name: 'Hindustan Antibiotics', category: 'Corporate Client', logo: '/HA.jpg' },
  { name: 'Chalo Khelne', category: 'Technology Platform', logo: '/CK.png' },
  { name: 'Vedant Academy', category: 'Training Partner', logo: '/Vedant.png' },
]

function PartnerItem({ p }) {
  return (
    <div className="group flex w-56 shrink-0 flex-col items-center gap-3 px-6">
      <div className="grid h-20 w-20 place-items-center rounded-2xl shadow-lg transition duration-300 group-hover:scale-110">
        <img
          src={p.logo}
          alt={p.name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="text-center">
        <div className="font-display text-base font-bold text-white">{p.name}</div>
        <div className="mt-0.5 text-xs font-medium text-white/60">{p.category}</div>
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
    <section ref={rootRef} data-bg="0" className="bg-[#000]/50 py-20 lg:backdrop-blur-sm">
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
