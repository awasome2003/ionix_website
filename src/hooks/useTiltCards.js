import { useEffect } from 'react'
import { gsap } from 'gsap'

/**
 * 3D tilt-toward-cursor for any element matching `selector` (delegated, so it
 * works with cards that mount/unmount on filtering). Also sets --mx/--my CSS
 * vars used by the `.tilt::after` glare in index.css.
 */
export function useTiltCards(selector = '.tilt', max = 8) {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    let active = null
    const reset = (el) =>
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' })

    const onMove = (e) => {
      const el = e.target.closest(selector)
      if (el !== active) {
        if (active) reset(active)
        active = el
      }
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
      gsap.to(el, {
        rotateY: (px - 0.5) * max * 2,
        rotateX: (0.5 - py) * max * 2,
        transformPerspective: 800,
        transformOrigin: 'center',
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (active) reset(active)
    }
  }, [selector, max])
}
