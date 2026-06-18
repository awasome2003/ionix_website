import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Dark cinematic images that swap between reveal sections. */
const IMAGES = [
  'https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1611251135345-18c56206b863?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1920&auto=format&fit=crop',
]

function FixedBackground() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const imgs = gsap.utils.toArray('.fbg-img')
      let current = 0

      const setActive = (i) => {
        if (i === current) return
        current = i
        // Tween each image explicitly so exactly one ends fully visible.
        imgs.forEach((img, idx) => {
          gsap.to(img, {
            opacity: idx === i ? 1 : 0,
            duration: 0.6,
            ease: 'power2.inOut',
            overwrite: 'auto',
          })
        })
      }

      // Each transparent reveal section declares which image it shows via
      // `data-bg`. We swap to it while it is still off-screen (top reaches the
      // viewport bottom) — i.e. while the previous solid section still covers
      // the background — so the cross-fade is never seen mid-blend.
      const reveals = gsap.utils.toArray('[data-bg]')
      reveals.forEach((el, idx) => {
        const imgIndex = Number(el.dataset.bg) || 0
        const prevIndex =
          idx > 0 ? Number(reveals[idx - 1].dataset.bg) || 0 : imgIndex

        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => setActive(imgIndex),
          onEnterBack: () => setActive(imgIndex),
          onLeaveBack: () => setActive(prevIndex),
        })
      })

      // Subtle parallax scale drift (single layer — never causes double images).
      gsap.to('.fbg-scale', {
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="fixed inset-0 z-0 bg-black" aria-hidden="true">
      <div className="fbg-scale absolute inset-0">
        {IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="fbg-img absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}
      </div>
      {/* light unifying tint */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  )
}

export default FixedBackground
