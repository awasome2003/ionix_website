import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { uploadImage } from '../middleware/upload.js'

import { listLeads, updateLeadStatus, deleteLead } from '../controllers/leadController.js'
import {
  listRegistrations,
  updateRegistrationStatus,
  deleteRegistration,
} from '../controllers/registrationController.js'
import { listSubscribers, deleteSubscriber } from '../controllers/newsletterController.js'
import {
  listAllGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js'
import { makeContentController } from '../controllers/contentController.js'
import Testimonial from '../models/Testimonial.js'
import Event from '../models/Event.js'

import {
  mongoId,
  leadStatusRules,
  registrationStatusRules,
  testimonialRules,
  eventRules,
} from '../validators/index.js'

const router = Router()

// Everything under /api/admin requires a valid admin token.
router.use(requireAuth)

// --- Leads ---
router.get('/leads', listLeads)
router.patch('/leads/:id', mongoId(), leadStatusRules, validate, updateLeadStatus)
router.delete('/leads/:id', mongoId(), validate, deleteLead)

// --- Registrations ---
router.get('/registrations', listRegistrations)
router.patch(
  '/registrations/:id',
  mongoId(),
  registrationStatusRules,
  validate,
  updateRegistrationStatus,
)
router.delete('/registrations/:id', mongoId(), validate, deleteRegistration)

// --- Newsletter subscribers ---
router.get('/subscribers', listSubscribers)
router.delete('/subscribers/:id', mongoId(), validate, deleteSubscriber)

// --- Gallery (supports image upload via the "image" field) ---
router.get('/gallery', listAllGallery)
router.post('/gallery', uploadImage.single('image'), createGalleryItem)
router.patch('/gallery/:id', mongoId(), uploadImage.single('image'), validate, updateGalleryItem)
router.delete('/gallery/:id', mongoId(), validate, deleteGalleryItem)

// --- Testimonials ---
const testimonials = makeContentController(Testimonial, {
  name: 'Testimonial',
  fields: ['name', 'role', 'quote', 'avatarUrl', 'rating', 'order', 'published'],
})
router.get('/testimonials', testimonials.listAll)
router.post('/testimonials', testimonialRules, validate, testimonials.create)
router.patch('/testimonials/:id', mongoId(), testimonialRules, validate, testimonials.update)
router.delete('/testimonials/:id', mongoId(), validate, testimonials.remove)

// --- Events ---
const events = makeContentController(Event, {
  name: 'Event',
  fields: ['title', 'description', 'category', 'imageUrl', 'location', 'date', 'order', 'published'],
})
router.get('/events', events.listAll)
router.post('/events', eventRules, validate, events.create)
router.patch('/events/:id', mongoId(), eventRules, validate, events.update)
router.delete('/events/:id', mongoId(), validate, events.remove)

export default router
