import fs from 'node:fs'
import path from 'node:path'
import GalleryItem from '../models/GalleryItem.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { UPLOAD_DIR } from '../middleware/upload.js'

// Remove an uploaded file from disk if the stored URL points at /uploads.
function removeUploadedFile(imageUrl) {
  if (!imageUrl || !imageUrl.startsWith('/uploads/')) return
  const filePath = path.join(UPLOAD_DIR, path.basename(imageUrl))
  fs.promises.unlink(filePath).catch(() => {})
}

// --- Public ---

// GET /api/gallery?category=
export const listPublishedGallery = asyncHandler(async (req, res) => {
  const query = { published: true }
  if (req.query.category) query.category = req.query.category
  const items = await GalleryItem.find(query).sort({ order: 1, createdAt: -1 })
  res.json({ success: true, items })
})

// --- Admin ---

// GET /api/admin/gallery
export const listAllGallery = asyncHandler(async (_req, res) => {
  const items = await GalleryItem.find().sort({ order: 1, createdAt: -1 })
  res.json({ success: true, items })
})

// POST /api/admin/gallery
// Accepts either an uploaded file (field: "image") or an imageUrl in the body.
export const createGalleryItem = asyncHandler(async (req, res) => {
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
  if (!imageUrl) throw new ApiError(400, 'An uploaded image or imageUrl is required')

  const item = await GalleryItem.create({
    title: req.body.title,
    category: req.body.category,
    imageUrl,
    order: req.body.order,
    published: req.body.published,
  })
  res.status(201).json({ success: true, item })
})

// PATCH /api/admin/gallery/:id
export const updateGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.findById(req.params.id)
  if (!item) throw new ApiError(404, 'Gallery item not found')

  // If a new file is uploaded, replace the old one and clean up disk.
  if (req.file) {
    removeUploadedFile(item.imageUrl)
    item.imageUrl = `/uploads/${req.file.filename}`
  } else if (req.body.imageUrl !== undefined) {
    item.imageUrl = req.body.imageUrl
  }

  for (const f of ['title', 'category', 'order', 'published']) {
    if (req.body[f] !== undefined) item[f] = req.body[f]
  }

  await item.save()
  res.json({ success: true, item })
})

// DELETE /api/admin/gallery/:id
export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.findByIdAndDelete(req.params.id)
  if (!item) throw new ApiError(404, 'Gallery item not found')
  removeUploadedFile(item.imageUrl)
  res.json({ success: true, message: 'Gallery item deleted' })
})
