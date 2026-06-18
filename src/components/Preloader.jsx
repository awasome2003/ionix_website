import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Preloader({ onReveal }) {
  const [done, setDone] = useState(false)
  const rootRef = useRef(null)
  const ballRef = useRef(null)
  const barRef = useRef(null)
  const textRef = useRef(null)

  useLayoutEffect(() => {
    const html = document.documentElement
    html.style.overflow = 'hidden'

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Continuous ball bounce.
      const bounce = reduce
        ? null
        : gsap.to(ballRef.current, {
            y: -70,
            duration: 0.42,
            ease: 'power2.out',
            yoyo: true,
            repeat: -1,
          })

      const tl = gsap.timeline({
        onComplete: () => {
          bounce?.kill()
          html.style.overflow = ''
          ScrollTrigger.refresh()
          setDone(true)
        },
      })

      tl.from(textRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, 0)
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: reduce ? 0.4 : 1.4, ease: 'power1.inOut' },
          0,
        )
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          // Hand off to the hero entry the moment the curtain starts lifting.
          onStart: () => onReveal?.(),
        }, '+=0.15')
    }, rootRef)

    return () => {
      ctx.revert()
      html.style.overflow = ''
    }
  }, [])

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-navy"
    >
      {/* ball + floor */}
      <div className="flex h-24 items-end">
        <span
          ref={ballRef}
          className="h-7 w-7 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, #fff, #f9a36a 42%, #f26522 95%)',
            boxShadow: '0 0 18px rgba(242,101,34,.6)',
          }}
        />
      </div>
      <div className="h-px w-40 bg-white/15" />

      {/* wordmark */}
      <div ref={textRef} className="mt-6 font-display text-2xl font-extrabold tracking-tight">
        <span className="text-white">IONIX</span>{' '}
        <span className="text-brand">SPORTS</span>
      </div>

      {/* progress bar */}
      <div className="mt-5 h-1 w-44 overflow-hidden rounded-full bg-white/10">
        <div
          ref={barRef}
          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-brand to-[#ff8a4c]"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  )
}

export default Preloader
