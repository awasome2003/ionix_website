import Lead from '../models/Lead.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { paginate } from '../utils/paginate.js'

// --- Public ---

// POST /api/contact
export const createLead = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body
  const lead = await Lead.create({ name, email, phone, subject, message })
  res.status(201).json({
    success: true,
    message: "Thanks for reaching out — we'll be in touch shortly.",
    id: lead._id,
  })
})

// --- Admin ---

// GET /api/admin/leads?status=&page=&limit=
export const listLeads = asyncHandler(async (req, res) => {
  const query = {}
  if (req.query.status) query.status = req.query.status
  const data = await paginate(Lead, { query, page: req.query.page, limit: req.query.limit })
  res.json({ success: true, ...data })
})

// PATCH /api/admin/leads/:id  (update status)
export const updateLeadStatus = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true },
  )
  if (!lead) throw new ApiError(404, 'Lead not found')
  res.json({ success: true, lead })
})

// DELETE /api/admin/leads/:id
export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id)
  if (!lead) throw new ApiError(404, 'Lead not found')
  res.json({ success: true, message: 'Lead deleted' })
})
