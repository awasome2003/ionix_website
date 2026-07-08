import { useState } from 'react'
import { api } from '../api.js'
import { useAsync } from '../useAsync.js'
import { PageHeader } from '../components/Layout.jsx'
import { PageLoader, EmptyState, Badge, Select, useToast } from '../ui.jsx'

const STATUSES = ['new', 'contacted', 'confirmed', 'closed']

export default function Registrations() {
  const toast = useToast()
  const [type, setType] = useState('')
  const query = type ? `?type=${type}` : ''
  const { data, loading, error, reload, setData } = useAsync(
    () => api.registrations(query),
    [query],
  )
  const items = data?.items ?? []

  const changeStatus = async (reg, status) => {
    try {
      await api.updateRegistration(reg._id, status)
      setData((d) => ({
        ...d,
        items: d.items.map((r) => (r._id === reg._id ? { ...r, status } : r)),
      }))
      toast.success('Status updated')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const remove = async (reg) => {
    if (!confirm(`Delete ${reg.type} registration from ${reg.name}?`)) return
    try {
      await api.deleteRegistration(reg._id)
      toast.success('Registration deleted')
      reload()
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <>
      <PageHeader
        title="Registrations"
        subtitle="Tournament and academy signups."
        actions={
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All types</option>
            <option value="tournament">Tournament</option>
            <option value="academy">Academy</option>
          </Select>
        }
      />

      {loading ? (
        <PageLoader />
      ) : error ? (
        <EmptyState>Couldn’t load registrations: {error.message}</EmptyState>
      ) : !items.length ? (
        <EmptyState>No registrations found.</EmptyState>
      ) : (
        <div className="space-y-3">
          {items.map((r) => (
            <div key={r._id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-navy">{r.name}</h3>
                    <Badge tone={r.type}>{r.type}</Badge>
                    <Badge tone={r.status}>{r.status}</Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">
                    <a href={`mailto:${r.email}`} className="text-brand hover:underline">
                      {r.email}
                    </a>{' '}
                    · {r.phone}
                  </p>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(r.createdAt).toLocaleString()}
                </span>
              </div>

              <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-1 text-sm">
                {r.sport && (
                  <div>
                    <dt className="inline text-slate-400">Sport: </dt>
                    <dd className="inline text-slate-700">{r.sport}</dd>
                  </div>
                )}
                {r.participants != null && (
                  <div>
                    <dt className="inline text-slate-400">Participants: </dt>
                    <dd className="inline text-slate-700">{r.participants}</dd>
                  </div>
                )}
                {r.ageGroup && (
                  <div>
                    <dt className="inline text-slate-400">Age group: </dt>
                    <dd className="inline text-slate-700">{r.ageGroup}</dd>
                  </div>
                )}
              </dl>
              {r.message && (
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{r.message}</p>
              )}

              <div className="mt-4 flex items-center gap-3">
                <Select
                  value={r.status}
                  onChange={(e) => changeStatus(r, e.target.value)}
                  className="!w-auto"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
                <button
                  onClick={() => remove(r)}
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
