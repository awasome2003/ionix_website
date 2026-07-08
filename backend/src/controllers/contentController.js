import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'

// Builds a standard set of CRUD handlers for a simple content model
// (testimonials, events). `fields` is the whitelist of writable fields.
export function makeContentController(Model, { name, fields, sort = { order: 1, createdAt: -1 } }) {
  const pick = (body) => {
    const out = {}
    for (const f of fields) if (body[f] !== undefined) out[f] = body[f]
    return out
  }

  return {
    // GET /api/<resource>  (public — published only)
    listPublished: asyncHandler(async (req, res) => {
      const query = { published: true }
      if (req.query.category) query.category = req.query.category
      const items = await Model.find(query).sort(sort)
      res.json({ success: true, items })
    }),

    // GET /api/admin/<resource>
    listAll: asyncHandler(async (_req, res) => {
      const items = await Model.find().sort(sort)
      res.json({ success: true, items })
    }),

    // POST /api/admin/<resource>
    create: asyncHandler(async (req, res) => {
      const item = await Model.create(pick(req.body))
      res.status(201).json({ success: true, item })
    }),

    // PATCH /api/admin/<resource>/:id
    update: asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndUpdate(req.params.id, pick(req.body), {
        new: true,
        runValidators: true,
      })
      if (!item) throw new ApiError(404, `${name} not found`)
      res.json({ success: true, item })
    }),

    // DELETE /api/admin/<resource>/:id
    remove: asyncHandler(async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id)
      if (!item) throw new ApiError(404, `${name} not found`)
      res.json({ success: true, message: `${name} deleted` })
    }),
  }
}
