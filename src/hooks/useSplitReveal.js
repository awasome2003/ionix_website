import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(SplitText, ScrollTrigger)

/**
 * Reveals the text inside `ref` by splitting it into words or characters
 * and animating each one up from behind a per-line mask (GSAP SplitText).
 *
 * @param {React.RefObject} ref   element holding the text
 * @param {object} opts
 *   type      'words' | 'chars'
 *   scroll    play on scroll-into-view (true) or on load (false)
 *   delay, duration, stagger, ease, start, once
 */
export function useSplitReveal(ref, opts = {}) {
  const {
    type = 'words',
    scroll = true,
    delay = 0,
    duration = 0.8,
    stagger = 0.04,
    ease = 'power3.out',
    start = 'top 85%',
    once = true,
  } = opts

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    let split, tween
    let killed = false

    // Hide until split is ready to avoid a flash of un-animated text.
    gsap.set(el, { autoAlpha: 0 })

    const build = () => {
      if (killed || !el) return
      split = new SplitText(el, {
        type: type === 'chars' ? 'lines,words,chars' : 'lines,words',
        mask: 'lines',
        linesClass: 'split-line',
      })
      const targets = type === 'chars' ? split.chars : split.words

      gsap.set(el, { autoAlpha: 1 })

      const vars = {
        yPercent: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        delay,
      }
      if (scroll) {
        vars.scrollTrigger = { trigger: el, start, once }
      }
      tween = gsap.fromTo(targets, { yPercent: 110, opacity: 0 }, vars)
    }

    // Wait for webfonts so line breaks are measured correctly.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(build)
    } else {
      build()
    }

    return () => {
      killed = true
      tween?.scrollTrigger?.kill()
      tween?.kill()
      split?.revert()
    }
  }, [])
}
