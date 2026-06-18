import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#academy' },
  { label: 'Centers', href: '#centers' },
  { label: 'Portfolio', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact-info' },
]

function Logo({ scrolled }) {
  return (
    <a href="#home" className="flex shrink-0 items-center">
      <img
        src="/Logo.png"
        alt="IONIX Sports"
        className={`h-14 w-auto transition duration-300 ${
          scrolled ? '' : 'brightness-0 invert'
        }`}
      />
    </a>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 },
    )
  }, [])

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-6 px-5 py-3 lg:px-8">
        <Logo scrolled={scrolled} />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`group relative rounded-lg px-3 py-2 text-[16px] font-medium transition-colors hover:text-brand ${
                  scrolled ? 'text-[#1b3b6f]' : 'text-white'
                }`}
              >
                {link.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="magnetic hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold tracking-wide text-white uppercase shadow-lg shadow-brand/30 transition-shadow hover:shadow-xl hover:shadow-brand/40 lg:inline-block"
          >
            Contact Us
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-ink/10 bg-white/70 backdrop-blur lg:hidden"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-ink transition-all ${open ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-ink transition-all ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-ink transition-all ${open ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`border-t border-ink/5 bg-white/95 backdrop-blur-xl transition-[max-height] duration-300 lg:hidden ${
          open ? 'max-h-[80dvh] overflow-y-auto' : 'max-h-0 overflow-hidden'
        }`}
      >
        <ul className="space-y-1 px-5 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-brand/5 hover:text-brand"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
