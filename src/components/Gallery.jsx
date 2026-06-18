import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = ['All', 'Training', 'Events', 'Winners', 'Corporate', 'Facilities']

// Real IONIX Sports photos (in /public).
const PHOTOS = [
  { id: 0, cat: 'Facilities', src: '/image.jpeg', ratio: 'aspect-[4/3]' },
  { id: 1, cat: 'Training', src: '/image12.jpeg', ratio: 'aspect-[4/3]' },
  { id: 2, cat: 'Events', src: '/image1.jpeg', ratio: 'aspect-[4/3]' },
  { id: 3, cat: 'Winners', src: '/Image2.jpeg', ratio: 'aspect-[3/4]' },
  { id: 4, cat: 'Winners', src: '/image3.jpeg', ratio: 'aspect-[3/4]' },
  { id: 5, cat: 'Winners', src: '/image4.jpeg', ratio: 'aspect-[3/4]' },
  { id: 6, cat: 'Corporate', src: '/image5.jpeg', ratio: 'aspect-[3/4]' },
  { id: 7, cat: 'Winners', src: '/image6.jpeg', ratio: 'aspect-[3/4]' },
  { id: 8, cat: 'Winners', src: '/image7.jpeg', ratio: 'aspect-[3/4]' },
  { id: 9, cat: 'Winners', src: '/image8.jpeg', ratio: 'aspect-[3/4]' },
  { id: 10, cat: 'Corporate', src: '/image9.jpeg', ratio: 'aspect-[3/4]' },
  { id: 11, cat: 'Corporate', src: '/image10.jpeg', ratio: 'aspect-[3/4]' },
  { id: 12, cat: 'Events', type: 'video', src: '/video1.mp4', ratio: 'aspect-[3/4]' },
  { id: 13, cat: 'Training', type: 'video', src: '/video2.mp4', ratio: 'aspect-[3/4]' },
]

const COL_COUNT = 6

// Lighter mode on mobile/tablet (skip video autoplay etc. for smoother scroll).
const LITE =
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 1024px)').matches

function Tile({ p, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(p)}
      className="tilt group relative mb-4 block w-full overflow-hidden rounded-xl bg-slate-200"
    >
      {p.type === 'video' ? (
        <video
          src={p.src}
          muted
          loop
          autoPlay={!LITE}
          playsInline
          preload={LITE ? 'metadata' : 'auto'}
          className={`w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110 ${p.ratio}`}
        />
      ) : (
        <img
          src={p.src}
          alt={p.cat}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110 ${p.ratio}`}
        />
      )}

      {/* video badge */}
      {p.type === 'video' && (
        <span className="absolute top-2.5 right-2.5 grid h-7 w-7 place-items-center rounded-full bg-black/55 text-white backdrop-blur">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      )}

      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="p-3 text-left">
          <span className="rounded-md bg-accent/90 px-2 py-0.5 text-[11px] font-semibold text-white">
            {p.cat}
          </span>
        </span>
      </span>
    </button>
  )
}

function Gallery() {
  const rootRef = useRef(null)
  const wallRef = useRef(null)
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null) // lightbox index within `photos`

  const photos = useMemo(
    () => (filter === 'All' ? PHOTOS : PHOTOS.filter((p) => p.cat === filter)),
    [filter],
  )

  // Distribute photos round-robin into columns.
  const columns = useMemo(() => {
    const cols = Array.from({ length: COL_COUNT }, () => [])
    photos.forEach((p, i) => cols[i % COL_COUNT].push(p))
    return cols
  }, [photos])

  const openLightbox = (p) => setActive(photos.findIndex((x) => x.id === p.id))

  /* Heading entrance + wall fade-in on filter change */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gal-head > *', {
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

  useLayoutEffect(() => {
    if (wallRef.current) {
      gsap.fromTo(
        wallRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
      )
    }
  }, [filter])

  /* Lightbox keyboard controls */
  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % photos.length)
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + photos.length) % photos.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, photos.length])

  return (
    <section id="gallery" ref={rootRef} className="bg-white py-24">
      {/* Heading */}
      <div className="gal-head mx-auto max-w-[1600px] px-5 text-center lg:px-8">
        <p className="font-mono text-xs font-bold tracking-[0.35em] text-brand uppercase">
          Visual Story
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl">
          <span className="text-navy">Our Sports</span>{' '}
          <span className="text-brand">Gallery</span>
        </h2>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => {
            const on = f === filter
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-lg border px-5 py-2 text-sm font-semibold transition-all ${
                  on
                    ? 'border-accent bg-accent text-white shadow-lg shadow-accent/30'
                    : 'border-slate-200 bg-white text-ink/70 hover:border-accent/40 hover:text-accent'
                }`}
              >
                {f}
              </button>
            )
          })}
        </div>
      </div>

      {/* Scrolling wall */}
      <div className="relative mt-12 px-5 lg:px-8">
        {/* top/bottom fade masks */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white to-transparent" />

        <div
          ref={wallRef}
          className="mx-auto flex h-[600px] max-w-[1600px] gap-4 overflow-hidden lg:h-[720px]"
        >
          {columns.map((col, c) => {
            if (col.length === 0) return null
            const dir = c % 2 === 0 ? 'gal-track-up' : 'gal-track-down'
            const duration = 32 + c * 5
            // responsive: show 2 cols on mobile, 4 on sm, 6 on lg
            const vis =
              c < 2 ? 'flex' : c < 4 ? 'hidden sm:flex' : 'hidden lg:flex'
            return (
              <div
                key={c}
                className={`gal-col relative h-full flex-1 ${vis} flex-col overflow-hidden`}
              >
                <div
                  className={`${dir} flex flex-col`}
                  style={{ animationDuration: `${duration}s` }}
                >
                  {[...col, ...col].map((p, i) => (
                    <Tile key={`${p.id}-${i}`} p={p} onOpen={openLightbox} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setActive((i) => (i - 1 + photos.length) % photos.length)
            }}
            className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {photos[active].type === 'video' ? (
            <video
              key={active}
              src={photos[active].src}
              controls
              autoPlay
              loop
              playsInline
              onClick={(e) => e.stopPropagation()}
              className="lightbox-img max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl"
            />
          ) : (
            <img
              key={active}
              src={photos[active].src}
              alt={photos[active].cat}
              onClick={(e) => e.stopPropagation()}
              className="lightbox-img max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            />
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setActive((i) => (i + 1) % photos.length)
            }}
            className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}

export default Gallery
