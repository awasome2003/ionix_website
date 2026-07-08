import { useState } from 'react'
import { api, resolveImage } from '../api.js'
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

const blank = {
  title: '',
  description: '',
  category: '',
  imageUrl: '',
  location: '',
  date: '',
  order: 0,
  published: true,
}

// <input type="date"> wants YYYY-MM-DD.
const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '')

export default function Events() {
  const toast = useToast()
  const { data, loading, error, reload } = useAsync(() => api.events(), [])
  const items = data?.items ?? []
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(blank)
  const [saving, setSaving] = useState(false)

  const openNew = () => {
    setForm(blank)
    setEditing('new')
  }
  const openEdit = (ev) => {
    setForm({
      title: ev.title || '',
      description: ev.description || '',
      category: ev.category || '',
      imageUrl: ev.imageUrl || '',
      location: ev.location || '',
      date: toDateInput(ev.date),
      order: ev.order ?? 0,
      published: ev.published,
    })
    setEditing(ev)
  }
  const close = () => setEditing(null)

  const save = async () => {
    if (!form.title.trim()) {
      toast.error('Title is required')
      return
    }
    // Drop empty optional strings so they don't trip validators.
    const payload = { ...form }
    if (!payload.date) delete payload.date
    setSaving(true)
    try {
      if (editing === 'new') await api.createEvent(payload)
      else await api.updateEvent(editing._id, payload)
      toast.success(editing === 'new' ? 'Event added' : 'Event updated')
      close()
      reload()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (ev) => {
    if (!confirm(`Delete event "${ev.title}"?`)) return
    try {
      await api.deleteEvent(ev._id)
      toast.success('Deleted')
      reload()
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Portfolio of past and upcoming events."
        actions={<Button onClick={openNew}>+ Add event</Button>}
      />

      {loading ? (
        <PageLoader />
      ) : error ? (
        <EmptyState>Couldn’t load events: {error.message}</EmptyState>
      ) : !items.length ? (
        <EmptyState>No events yet.</EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((ev) => (
            <div
              key={ev._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              {ev.imageUrl && (
                <div className="aspect-video bg-slate-100">
                  <img
                    src={resolveImage(ev.imageUrl)}
                    alt={ev.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2">
                  {ev.category && (
                    <span className="rounded bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase text-brand">
                      {ev.category}
                    </span>
                  )}
                  {!ev.published && (
                    <span className="text-[10px] font-bold uppercase text-slate-400">Hidden</span>
                  )}
                </div>
                <h3 className="mt-2 font-semibold text-navy">{ev.title}</h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  {ev.location}
                  {ev.date && ` · ${new Date(ev.date).toLocaleDateString()}`}
                </p>
                {ev.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{ev.description}</p>
                )}
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => openEdit(ev)}
                    className="text-sm font-medium text-brand hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(ev)}
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={!!editing}
        onClose={close}
        wide
        title={editing === 'new' ? 'Add event' : 'Edit event'}
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
          <Field label="Title">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Description">
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </Field>
            <Field label="Location">
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Image URL">
            <Input
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://… or /uploads/…"
            />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Date">
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
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
