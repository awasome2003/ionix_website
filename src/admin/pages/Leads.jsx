import { useState } from 'react'
import { api } from '../api.js'
import { useAsync } from '../useAsync.js'
import { PageHeader } from '../components/Layout.jsx'
import { PageLoader, EmptyState, Badge, Select, useToast } from '../ui.jsx'

const STATUSES = ['new', 'contacted', 'closed']

export default function Leads() {
  const toast = useToast()
  const [filter, setFilter] = useState('')
  const query = filter ? `?status=${filter}` : ''
  const { data, loading, error, reload, setData } = useAsync(() => api.leads(query), [query])
  const items = data?.items ?? []

  const changeStatus = async (lead, status) => {
    try {
      await api.updateLead(lead._id, status)
      setData((d) => ({
        ...d,
        items: d.items.map((l) => (l._id === lead._id ? { ...l, status } : l)),
      }))
      toast.success('Status updated')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const remove = async (lead) => {
    if (!confirm(`Delete lead from ${lead.name}?`)) return
    try {
      await api.deleteLead(lead._id)
      toast.success('Lead deleted')
      reload()
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <>
      <PageHeader
        title="Leads"
        subtitle="Contact enquiries submitted from the website."
        actions={
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        }
      />

      {loading ? (
        <PageLoader />
      ) : error ? (
        <EmptyState>Couldn’t load leads: {error.message}</EmptyState>
      ) : !items.length ? (
        <EmptyState>No leads found.</EmptyState>
      ) : (
        <div className="space-y-3">
          {items.map((l) => (
            <div
              key={l._id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-navy">{l.name}</h3>
                    <Badge tone={l.status}>{l.status}</Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">
                    <a href={`mailto:${l.email}`} className="text-brand hover:underline">
                      {l.email}
                    </a>
                    {l.phone && <span> · {l.phone}</span>}
                  </p>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(l.createdAt).toLocaleString()}
                </span>
              </div>

              {l.subject && (
                <p className="mt-3 text-sm font-medium text-slate-700">{l.subject}</p>
              )}
              <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{l.message}</p>

              <div className="mt-4 flex items-center gap-3">
                <Select
                  value={l.status}
                  onChange={(e) => changeStatus(l, e.target.value)}
                  className="!w-auto"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
                <button
                  onClick={() => remove(l)}
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
