import Registration from '../models/Registration.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { paginate } from '../utils/paginate.js'

// --- Public ---

// POST /api/registrations
export const createRegistration = asyncHandler(async (req, res) => {
  const { type, name, email, phone, sport, participants, ageGroup, message } = req.body
  const reg = await Registration.create({
    type,
    name,
    email,
    phone,
    sport,
    participants,
    ageGroup,
    message,
  })
  const label = type === 'tournament' ? 'tournament enquiry' : 'academy registration'
  res.status(201).json({
    success: true,
    message: `Your ${label} has been received. Our team will reach out soon.`,
    id: reg._id,
  })
})

// --- Admin ---

// GET /api/admin/registrations?type=&status=&page=&limit=
export const listRegistrations = asyncHandler(async (req, res) => {
  const query = {}
  if (req.query.type) query.type = req.query.type
  if (req.query.status) query.status = req.query.status
  const data = await paginate(Registration, {
    query,
    page: req.query.page,
    limit: req.query.limit,
  })
  res.json({ success: true, ...data })
})

// PATCH /api/admin/registrations/:id
export const updateRegistrationStatus = asyncHandler(async (req, res) => {
  const reg = await Registration.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true },
  )
  if (!reg) throw new ApiError(404, 'Registration not found')
  res.json({ success: true, registration: reg })
})

// DELETE /api/admin/registrations/:id
export const deleteRegistration = asyncHandler(async (req, res) => {
  const reg = await Registration.findByIdAndDelete(req.params.id)
  if (!reg) throw new ApiError(404, 'Registration not found')
  res.json({ success: true, message: 'Registration deleted' })
})
