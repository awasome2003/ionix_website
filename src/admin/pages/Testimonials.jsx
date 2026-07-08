import { useState } from 'react'
import { api } from '../api.js'
import { useAsync } from '../useAsync.js'
import { PageHeader } from '../components/Layout.jsx'
import {
  PageLoader,
  EmptyState,
  Button,
  Modal,
  Field,
  Input,
  Textarea,
  Select,
  useToast,
} from '../ui.jsx'

const blank = { name: '', role: '', quote: '', avatarUrl: '', rating: 5, order: 0, published: true }

export default function Testimonials() {
  const toast = useToast()
  const { data, loading, error, reload } = useAsync(() => api.testimonials(), [])
  const items = data?.items ?? []
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(blank)
  const [saving, setSaving] = useState(false)

  const openNew = () => {
    setForm(blank)
    setEditing('new')
  }
  const openEdit = (t) => {
    setForm({
      name: t.name || '',
      role: t.role || '',
      quote: t.quote || '',
      avatarUrl: t.avatarUrl || '',
      rating: t.rating ?? 5,
      order: t.order ?? 0,
      published: t.published,
    })
    setEditing(t)
  }
  const close = () => setEditing(null)

  const save = async () => {
    if (!form.name.trim() || !form.quote.trim()) {
      toast.error('Name and quote are required')
      return
    }
    setSaving(true)
    try {
      if (editing === 'new') await api.createTestimonial(form)
      else await api.updateTestimonial(editing._id, form)
      toast.success(editing === 'new' ? 'Testimonial added' : 'Testimonial updated')
      close()
      reload()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (t) => {
    if (!confirm(`Delete testimonial from ${t.name}?`)) return
    try {
      await api.deleteTestimonial(t._id)
      toast.success('Deleted')
      reload()
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <>
      <PageHeader
        title="Testimonials"
        subtitle="Client and player quotes."
        actions={<Button onClick={openNew}>+ Add testimonial</Button>}
      />

      {loading ? (
        <PageLoader />
      ) : error ? (
        <EmptyState>Couldn’t load testimonials: {error.message}</EmptyState>
      ) : !items.length ? (
        <EmptyState>No testimonials yet.</EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((t) => (
            <div key={t._id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {t.avatarUrl && (
                    <img src={t.avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
                  )}
                  <div>
                    <p className="font-semibold text-navy">{t.name}</p>
                    {t.role && <p className="text-xs text-slate-400">{t.role}</p>}
                  </div>
                </div>
                <span className="text-amber-500">{'★'.repeat(t.rating)}</span>
              </div>
              <p className="mt-3 text-sm italic text-slate-600">“{t.quote}”</p>
              <div className="mt-4 flex items-center gap-3">
                {!t.published && <span className="text-xs font-bold uppercase text-slate-400">Hidden</span>}
                <button onClick={() => openEdit(t)} className="text-sm font-medium text-brand hover:underline">
                  Edit
                </button>
                <button onClick={() => remove(t)} className="text-sm font-medium text-red-600 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={!!editing}
        onClose={close}
        title={editing === 'new' ? 'Add testimonial' : 'Edit testimonial'}
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button onClick={save} loading={saving}>
              Save
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Role / company">
            <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </Field>
          <Field label="Quote">
            <Textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
          </Field>
          <Field label="Avatar URL">
            <Input
              value={form.avatarUrl}
              onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
              placeholder="https://…"
            />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Rating">
              <Select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} ★
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Order">
              <Input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              />
            </Field>
            <Field label="Visibility">
              <Select
                value={form.published ? 'true' : 'false'}
                onChange={(e) => setForm({ ...form, published: e.target.value === 'true' })}
              >
                <option value="true">Published</option>
                <option value="false">Hidden</option>
              </Select>
            </Field>
          </div>
        </div>
      </Modal>
    </>
  )
}
