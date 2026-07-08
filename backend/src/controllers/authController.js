import Admin from '../models/Admin.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { signToken } from '../middleware/auth.js'

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+passwordHash')
  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const token = signToken(admin)
  res.json({
    success: true,
    token,
    admin: { id: admin._id, email: admin.email, name: admin.name },
  })
})

// GET /api/auth/me  (verifies the current token)
export const me = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id)
  if (!admin) throw new ApiError(404, 'Admin not found')
  res.json({ success: true, admin: { id: admin._id, email: admin.email, name: admin.name } })
})
