const COLUMNS = [
  {
    title: 'Company',
    links: ['About Us', 'Our Story', 'Team', 'Careers'],
  },
  {
    title: 'Academy',
    links: ['Coaching Programs', 'Monthly Leagues', 'Age Categories', 'Join Academy'],
  },
  {
    title: 'Events',
    links: ['Tournament Portfolio', 'Event Management', 'Corporate Events', 'School Events'],
  },
  {
    title: 'Platform',
    links: ['Chalo Khelenge App', 'Live Scores', 'Online Registration', 'Rankings'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Cookie Policy'],
  },
]

const SOCIALS = [
  { label: 'Instagram', href: '#', path: 'M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5Zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm5-9.5a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2ZM21 8.5a6.5 6.5 0 0 0-.4-2.3 4.6 4.6 0 0 0-2.7-2.7A6.5 6.5 0 0 0 15.5 3h-7a6.5 6.5 0 0 0-2.3.4A4.6 4.6 0 0 0 3.4 6 6.5 6.5 0 0 0 3 8.5v7a6.5 6.5 0 0 0 .4 2.3 4.6 4.6 0 0 0 2.7 2.7 6.5 6.5 0 0 0 2.3.4h7a6.5 6.5 0 0 0 2.3-.4 4.6 4.6 0 0 0 2.7-2.7 6.5 6.5 0 0 0 .4-2.3ZM19 15.5a3.7 3.7 0 0 1-3.5 3.5h-7A3.7 3.7 0 0 1 5 15.5v-7A3.7 3.7 0 0 1 8.5 5h7A3.7 3.7 0 0 1 19 8.5Z' },
  { label: 'YouTube', href: '#', path: 'M23 12s0-3-.4-4.4a2.5 2.5 0 0 0-1.8-1.8C19.4 5.4 12 5.4 12 5.4s-7.4 0-8.8.4a2.5 2.5 0 0 0-1.8 1.8C1 9 1 12 1 12s0 3 .4 4.4a2.5 2.5 0 0 0 1.8 1.8c1.4.4 8.8.4 8.8.4s7.4 0 8.8-.4a2.5 2.5 0 0 0 1.8-1.8C23 15 23 12 23 12Zm-13 3V9l5 3Z' },
  { label: 'Facebook', href: '#', path: 'M14 9h3V6h-3a4 4 0 0 0-4 4v2H8v3h2v6h3v-6h2.5l.5-3H13v-2a1 1 0 0 1 1-1Z' },
  { label: 'Twitter', href: '#', path: 'M22 5.9c-.7.3-1.5.5-2.3.6a4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.5 1 4 4 0 0 0-6.8 3.6A11.4 11.4 0 0 1 3.8 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.8-.5a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.1 11.3 11.3 0 0 0 8.1 20c7.4 0 11.4-6.1 11.4-11.4v-.5A8 8 0 0 0 22 5.9Z' },
]

function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand shadow-lg shadow-brand/30">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                  <path d="M13 2 3 14h7l-1 8 10-12h-7Z" />
                </svg>
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight">
                <span className="text-white">IONIX</span>{' '}
                <span className="text-brand">SPORTS</span>
              </span>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Pune's leading sports event management company &amp; table tennis
              academy. Building champions since 2022.
            </p>

            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white/70 transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-bold tracking-[0.2em] text-white/45 uppercase">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-white/65 transition-colors hover:text-brand"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-white/45">
            © 2026 IONIX Sports. All rights reserved. Powered by Chalo Khelenge
            Platform.
          </p>
          <span className="flex items-center gap-2 font-mono text-sm text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
