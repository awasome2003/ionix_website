import Subscriber from '../models/Subscriber.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { paginate } from '../utils/paginate.js'

// --- Public ---

// POST /api/newsletter
export const subscribe = asyncHandler(async (req, res) => {
  const email = req.body.email.toLowerCase()

  // Re-subscribing an existing email is idempotent (reactivate, don't error).
  const existing = await Subscriber.findOne({ email })
  if (existing) {
    if (!existing.active) {
      existing.active = true
      await existing.save()
    }
    return res.status(200).json({ success: true, message: "You're subscribed!" })
  }

  await Subscriber.create({ email })
  res.status(201).json({ success: true, message: 'Thanks for subscribing!' })
})

// POST /api/newsletter/unsubscribe
export const unsubscribe = asyncHandler(async (req, res) => {
  const email = req.body.email.toLowerCase()
  await Subscriber.findOneAndUpdate({ email }, { active: false })
  res.json({ success: true, message: 'You have been unsubscribed.' })
})

// --- Admin ---

// GET /api/admin/subscribers?page=&limit=
export const listSubscribers = asyncHandler(async (req, res) => {
  const query = {}
  if (req.query.active !== undefined) query.active = req.query.active === 'true'
  const data = await paginate(Subscriber, {
    query,
    page: req.query.page,
    limit: req.query.limit,
  })
  res.json({ success: true, ...data })
})

// DELETE /api/admin/subscribers/:id
export const deleteSubscriber = asyncHandler(async (req, res) => {
  const sub = await Subscriber.findByIdAndDelete(req.params.id)
  if (!sub) throw new ApiError(404, 'Subscriber not found')
  res.json({ success: true, message: 'Subscriber deleted' })
})
