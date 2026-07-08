import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth.jsx'

const NAV = [
  { to: '/admin', label: 'Dashboard', end: true, icon: 'M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z' },
  { to: '/admin/leads', label: 'Leads', icon: 'M2 5h20v4H2V5Zm0 6h20v8H2v-8Zm2 2v4h16v-4H4Z' },
  { to: '/admin/registrations', label: 'Registrations', icon: 'M9 2h6a2 2 0 0 1 2 2v1h2a1 1 0 0 1 1 1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h2V4a2 2 0 0 1 2-2Zm0 4h6V4H9v2Z' },
  { to: '/admin/subscribers', label: 'Subscribers', icon: 'M3 5h18v14H3V5Zm2 3.4V17h14V8.4l-7 4.6-7-4.6Z' },
  { to: '/admin/gallery', label: 'Gallery', icon: 'M3 5h18v14H3V5Zm2 2v10h14V7H5Zm3 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-1 8 4-4 3 3 2-2 3 3H7Z' },
  { to: '/admin/testimonials', label: 'Testimonials', icon: 'M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1Z' },
  { to: '/admin/events', label: 'Events', icon: 'M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7ZM5 9h14v10H5V9Z' },
]

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
      <path d={d} />
    </svg>
  )
}

export default function Layout() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const onLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  const links = (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-brand text-white'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <Icon d={item.icon} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-navy p-5 lg:flex">
        <div className="mb-8 flex items-center gap-2 px-1">
          <img src="/Logo.png" alt="IONIX" className="h-9 w-auto brightness-0 invert" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand">
            Admin
          </span>
        </div>
        {links}
        <div className="mt-auto border-t border-white/10 pt-4">
          <p className="px-3 text-xs text-slate-400">Signed in as</p>
          <p className="truncate px-3 text-sm font-medium text-white">{admin?.email}</p>
          <button
            onClick={onLogout}
            className="mt-3 w-full rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <img src="/Logo.png" alt="IONIX" className="h-8 w-auto" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand">
            Admin
          </span>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-navy p-5">
            {links}
            <button
              onClick={onLogout}
              className="mt-4 w-full rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-slate-300"
            >
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-navy">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions}
    </div>
  )
}
