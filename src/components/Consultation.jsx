import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FIELDS = [
  { name: 'name', label: 'Full Name', placeholder: 'e.g. Rahul Sharma', type: 'text' },
  { name: 'phone', label: 'Phone Number', placeholder: 'e.g. +919876543210', type: 'tel' },
  { name: 'email', label: 'Email Address', placeholder: 'e.g. rahul@email.com', type: 'email' },
]

const inputClass =
  'w-full rounded-lg border border-transparent bg-slate-100 px-4 py-3.5 text-ink placeholder:text-slate-400 outline-none transition focus:border-brand/40 focus:bg-white focus:ring-2 focus:ring-brand/25'

function Consultation() {
  const rootRef = useRef(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', inquiry: '' })
  const [submitted, setSubmitted] = useState(false)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // One-page site: no backend. Surface a success state.
    setSubmitted(true)
    setForm({ name: '', phone: '', email: '', inquiry: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cons-anim', {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: rootRef.current, start: 'top 78%', once: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={rootRef} data-bg="1" className="py-24 backdrop-blur-sm">
      {/* Heading */}
      <div className="mx-auto max-w-[1600px] px-5 text-center lg:px-8">
        <p className="cons-anim font-mono text-xs font-bold tracking-[0.35em] text-brand uppercase">
          Free Consultation
        </p>
        <h2 className="cons-anim mt-3 font-display text-3xl font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl">
          <span className="text-white">Book a Free</span>{' '}
          <span className="text-brand">Consultation</span>
        </h2>
      </div>

      {/* Form card */}
      <div className="cons-anim mx-auto mt-12 max-w-2xl px-5">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.06)] lg:p-9"
        >
          <div className="space-y-5">
            {FIELDS.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="mb-2 block font-mono text-xs font-semibold tracking-[0.15em] text-slate-400 uppercase"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={update}
                  placeholder={field.placeholder}
                  required
                  className={inputClass}
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="inquiry"
                className="mb-2 block font-mono text-xs font-semibold tracking-[0.15em] text-slate-400 uppercase"
              >
                Ask Inquiry
              </label>
              <textarea
                id="inquiry"
                name="inquiry"
                rows={4}
                value={form.inquiry}
                onChange={update}
                placeholder="Any special requirements or questions"
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-7 flex items-center justify-end gap-4">
            {submitted && (
              <span className="text-sm font-medium text-accent">
                ✓ Thanks! We'll be in touch shortly.
              </span>
            )}
            <button
              type="submit"
              className="magnetic group inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand/30 transition-shadow hover:shadow-xl hover:shadow-brand/40"
            >
              Submit
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Consultation
