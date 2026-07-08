import { api } from '../api.js'
import { useAsync } from '../useAsync.js'
import { PageHeader } from '../components/Layout.jsx'
import { PageLoader, EmptyState, Badge, Button, useToast } from '../ui.jsx'

export default function Subscribers() {
  const toast = useToast()
  const { data, loading, error, reload } = useAsync(() => api.subscribers('?limit=100'), [])
  const items = data?.items ?? []

  const remove = async (sub) => {
    if (!confirm(`Delete subscriber ${sub.email}?`)) return
    try {
      await api.deleteSubscriber(sub._id)
      toast.success('Subscriber deleted')
      reload()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const exportCsv = () => {
    const rows = [['email', 'active', 'subscribed'], ...items.map((s) => [s.email, s.active, s.createdAt])]
    const csv = rows.map((r) => r.join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'ionix-subscribers.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <PageHeader
        title="Subscribers"
        subtitle="Newsletter mailing list."
        actions={
          items.length ? (
            <Button variant="ghost" onClick={exportCsv}>
              Export CSV
            </Button>
          ) : null
        }
      />

      {loading ? (
        <PageLoader />
      ) : error ? (
        <EmptyState>Couldn’t load subscribers: {error.message}</EmptyState>
      ) : !items.length ? (
        <EmptyState>No subscribers yet.</EmptyState>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Subscribed</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((s) => (
                <tr key={s._id}>
                  <td className="px-4 py-3 font-medium text-slate-800">{s.email}</td>
                  <td className="px-4 py-3">
                    <Badge tone={s.active ? 'active' : 'inactive'}>
                      {s.active ? 'active' : 'inactive'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => remove(s)}
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
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
