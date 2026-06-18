import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  phone: 'M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1Z',
  chat: 'M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1Zm3 5h10v2H7Zm0 3h7v2H7Z',
  mail: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7 8-5H4Zm0 2L4 9v8h16V9Z',
  clock: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 10V6h-2v8h6v-2Z',
  pin: 'M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z',
}

const CARDS = [
  { icon: 'phone', title: 'Call Us', value: '+91 95619 55125', href: 'tel:+919561955125' },
  { icon: 'chat', title: 'WhatsApp', value: '+91 95619 55125', href: 'https://wa.me/919561955125' },
  { icon: 'mail', title: 'Email', value: 'ionixsportsclub@gmail.com', href: 'mailto:ionixsportsclub@gmail.com', link: true },
  { icon: 'clock', title: 'Business Hours', value: '24×7' },
]

function ContactCard({ c }) {
  const inner = (
    <>
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d={ICONS[c.icon]} />
        </svg>
      </span>
      <h3 className="mt-5 font-display text-lg font-bold text-navy">{c.title}</h3>
      {c.link ? (
        <span className="mt-1 break-all text-sm text-blue-600 underline underline-offset-2">
          {c.value}
        </span>
      ) : (
        <p className="mt-1 text-sm text-ink/60">{c.value}</p>
      )}
    </>
  )

  const cls =
    'contact-card flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-slate-200/60'

  return c.href ? (
    <a
      href={c.href}
      target={c.icon === 'chat' ? '_blank' : undefined}
      rel="noreferrer"
      className={cls}
    >
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

function Contact() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-head > *', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
      })
      gsap.from('.contact-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.ct-grid', start: 'top 82%', once: true },
      })
      gsap.from('.ct-map', {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.ct-grid', start: 'top 82%', once: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact-info" ref={rootRef} className="bg-white py-24">
      {/* Heading */}
      <div className="ct-head mx-auto max-w-[1600px] px-5 text-center lg:px-8">
        <p className="font-mono text-xs font-bold tracking-[0.35em] text-brand uppercase">
          Get in Touch
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl">
          <span className="text-navy">Contact</span>{' '}
          <span className="text-brand">IONIX Sport</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="ct-grid mx-auto max-w-[1600px] mt-12 grid grid-cols-1 gap-6 px-5 lg:grid-cols-2 lg:px-8">
        {/* Left — contact cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CARDS.map((c) => (
            <ContactCard key={c.title} c={c} />
          ))}
        </div>

        {/* Right — centers / map card */}
        <div className="ct-map relative min-h-[300px] overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
            alt="IONIX Sports Centers"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/75" />

          <div className="relative flex h-full flex-col items-center justify-center px-6 py-10 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-accent/70 bg-black/30 text-accent">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                <path d={ICONS.pin} />
              </svg>
            </span>

            <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-white">
              IONIX SPORTS CENTERS
            </h3>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/85">
              486/2760, Shakuntala Niwas, Opp. Mahesh Nagar Datta Temple, Sant
              Tukaram Nagar, Pimpri, Pune — 411018
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Shakuntala%20Niwas%2C%20Opp.%20Mahesh%20Nagar%20Datta%20temple%2C%20Sant%20Tukaram%20Nagar%2C%20Pimpri%2C%20Pune%20411018"
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/40"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d={ICONS.pin} />
              </svg>
              View on Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
