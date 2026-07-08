import { Link } from 'react-router-dom'
import { api } from '../api.js'
import { useAsync } from '../useAsync.js'
import { PageHeader } from '../components/Layout.jsx'
import { PageLoader, EmptyState, Badge } from '../ui.jsx'

function StatCard({ label, value, to, accent }) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60"
    >
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-2 font-display text-3xl font-extrabold ${accent || 'text-navy'}`}>{value}</p>
    </Link>
  )
}

export default function Dashboard() {
  // Pull the first page of each collection; totals come from pagination meta.
  const { data, loading, error } = useAsync(
    () =>
      Promise.all([
        api.leads('?limit=5'),
        api.registrations('?limit=1'),
        api.subscribers('?limit=1'),
      ]),
    [],
  )

  if (loading) return <PageLoader />
  if (error) return <EmptyState>Couldn’t load dashboard: {error.message}</EmptyState>

  const [leads, regs, subs] = data
  const recent = leads.items || []

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of activity from your website." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label="Total leads" value={leads.pagination.total} to="/admin/leads" accent="text-brand" />
        <StatCard label="Registrations" value={regs.pagination.total} to="/admin/registrations" accent="text-violet-600" />
        <StatCard label="Subscribers" value={subs.pagination.total} to="/admin/subscribers" accent="text-emerald-600" />
      </div>

      <h2 className="mb-3 mt-10 font-display text-lg font-bold text-navy">Recent leads</h2>
      {recent.length === 0 ? (
        <EmptyState>No leads yet.</EmptyState>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recent.map((l) => (
                <tr key={l._id}>
                  <td className="px-4 py-3 font-medium text-slate-800">{l.name}</td>
                  <td className="px-4 py-3 text-slate-600">{l.email}</td>
                  <td className="px-4 py-3">
                    <Badge tone={l.status}>{l.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(l.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
