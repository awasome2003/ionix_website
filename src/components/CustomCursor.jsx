import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const INTERACTIVE = 'a, button, input, textarea, select, label, [data-cursor]'

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Skip on touch / coarse-pointer devices.
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

    // Dot tracks tightly, ring trails with more easing.
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    let visible = false
    const move = (e) => {
      if (!visible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 })
        visible = true
      }
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }
    const leave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 })
      visible = false
    }
    const over = (e) => {
      if (e.target.closest?.(INTERACTIVE)) {
        ring.classList.add('is-hover')
        dot.classList.add('is-hover')
      }
    }
    const out = (e) => {
      if (e.target.closest?.(INTERACTIVE)) {
        ring.classList.remove('is-hover')
        dot.classList.remove('is-hover')
      }
    }
    const down = () => gsap.to(ring, { scale: 0.75, duration: 0.15 })
    const up = () => gsap.to(ring, { scale: 1, duration: 0.2 })

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.documentElement.classList.add('has-custom-cursor')

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

export default CustomCursor
