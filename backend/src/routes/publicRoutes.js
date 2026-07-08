import { Router } from 'express'
import { validate } from '../middleware/validate.js'
import { formLimiter } from '../middleware/rateLimit.js'
import { createLead } from '../controllers/leadController.js'
import { createRegistration } from '../controllers/registrationController.js'
import { subscribe, unsubscribe } from '../controllers/newsletterController.js'
import { listPublishedGallery } from '../controllers/galleryController.js'
import { makeContentController } from '../controllers/contentController.js'
import Testimonial from '../models/Testimonial.js'
import Event from '../models/Event.js'
import {
  leadRules,
  registrationRules,
  emailRule,
} from '../validators/index.js'

const router = Router()

const testimonials = makeContentController(Testimonial, {
  name: 'Testimonial',
  fields: ['name', 'role', 'quote', 'avatarUrl', 'rating', 'order', 'published'],
})
const events = makeContentController(Event, {
  name: 'Event',
  fields: ['title', 'description', 'category', 'imageUrl', 'location', 'date', 'order', 'published'],
})

// --- Form submissions (rate-limited) ---
router.post('/contact', formLimiter, leadRules, validate, createLead)
router.post('/registrations', formLimiter, registrationRules, validate, createRegistration)
router.post('/newsletter', formLimiter, emailRule, validate, subscribe)
router.post('/newsletter/unsubscribe', formLimiter, emailRule, validate, unsubscribe)

// --- Public content (read-only) ---
router.get('/gallery', listPublishedGallery)
router.get('/testimonials', testimonials.listPublished)
router.get('/events', events.listPublished)

export default router
