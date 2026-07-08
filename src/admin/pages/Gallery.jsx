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
  Select,
  useToast,
} from '../ui.jsx'

const blank = { title: '', category: 'general', order: 0, published: true }

export default function Gallery() {
  const toast = useToast()
  const { data, loading, error, reload } = useAsync(() => api.gallery(), [])
  const items = data?.items ?? []
  const [editing, setEditing] = useState(null) // item being edited, or 'new', or null
  const [form, setForm] = useState(blank)
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)

  const openNew = () => {
    setForm(blank)
    setFile(null)
    setEditing('new')
  }
  const openEdit = (item) => {
    setForm({
      title: item.title || '',
      category: item.category || 'general',
      order: item.order ?? 0,
      published: item.published,
      imageUrl: item.imageUrl,
    })
    setFile(null)
    setEditing(item)
  }
  const close = () => setEditing(null)

  const save = async () => {
    const isNew = editing === 'new'
    if (isNew && !file && !form.imageUrl) {
      toast.error('Choose an image file or provide an image URL')
      return
    }
    setSaving(true)
    try {
      const fd = new FormData()
      if (file) fd.append('image', file)
      else if (form.imageUrl) fd.append('imageUrl', form.imageUrl)
      fd.append('title', form.title)
      fd.append('category', form.category)
      fd.append('order', String(form.order))
      fd.append('published', String(form.published))

      if (isNew) await api.createGallery(fd)
      else await api.updateGallery(editing._id, fd)

      toast.success(isNew ? 'Photo added' : 'Photo updated')
      close()
      reload()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (item) => {
    if (!confirm('Delete this photo?')) return
    try {
      await api.deleteGallery(item._id)
      toast.success('Photo deleted')
      reload()
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Photos shown on the website."
        actions={<Button onClick={openNew}>+ Add photo</Button>}
      />

      {loading ? (
        <PageLoader />
      ) : error ? (
        <EmptyState>Couldn’t load gallery: {error.message}</EmptyState>
      ) : !items.length ? (
        <EmptyState>No photos yet. Add your first one.</EmptyState>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <div className="relative aspect-[4/3] bg-slate-100">
                <img
                  src={resolveImage(item.imageUrl)}
                  alt={item.title || ''}
                  className="h-full w-full object-cover"
                />
                {!item.published && (
                  <span className="absolute left-2 top-2 rounded bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                    Hidden
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-slate-800">
                  {item.title || 'Untitled'}
                </p>
                <p className="text-xs text-slate-400">{item.category}</p>
                <div className="mt-2 flex gap-3">
                  <button
                    onClick={() => openEdit(item)}
                    className="text-xs font-medium text-brand hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(item)}
                    className="text-xs font-medium text-red-600 hover:underline"
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
        title={editing === 'new' ? 'Add photo' : 'Edit photo'}
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
          <Field label="Image file" hint="Upload a JPG/PNG/WebP (max 8 MB), or use a URL below.">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
          </Field>
          <Field label="…or image URL">
            <Input
              value={form.imageUrl || ''}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://…"
            />
          </Field>
          <Field label="Title">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </Field>
            <Field label="Order">
              <Input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              />
            </Field>
          </div>
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
      </Modal>
    </>
  )
}
