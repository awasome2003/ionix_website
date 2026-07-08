import { body, param } from 'express-validator'

export const mongoId = (field = 'id') =>
  param(field).isMongoId().withMessage('Invalid id')

export const leadRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
  body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('phone').optional({ values: 'falsy' }).trim().isLength({ max: 30 }),
  body('subject').optional({ values: 'falsy' }).trim().isLength({ max: 160 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 4000 }),
]

export const leadStatusRules = [
  body('status').isIn(['new', 'contacted', 'closed']).withMessage('Invalid status'),
]

export const registrationRules = [
  body('type').isIn(['tournament', 'academy']).withMessage('type must be tournament or academy'),
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
  body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone is required').isLength({ max: 30 }),
  body('sport').optional({ values: 'falsy' }).trim().isLength({ max: 80 }),
  body('participants').optional({ values: 'falsy' }).isInt({ min: 0 }).toInt(),
  body('ageGroup').optional({ values: 'falsy' }).trim().isLength({ max: 40 }),
  body('message').optional({ values: 'falsy' }).trim().isLength({ max: 4000 }),
]

export const registrationStatusRules = [
  body('status').isIn(['new', 'contacted', 'confirmed', 'closed']).withMessage('Invalid status'),
]

export const emailRule = [
  body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
]

export const loginRules = [
  body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
]

export const testimonialRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
  body('quote').trim().notEmpty().withMessage('Quote is required').isLength({ max: 2000 }),
  body('role').optional({ values: 'falsy' }).trim().isLength({ max: 120 }),
  body('rating').optional({ values: 'falsy' }).isInt({ min: 1, max: 5 }).toInt(),
  body('order').optional({ values: 'falsy' }).isInt().toInt(),
  body('published').optional().isBoolean().toBoolean(),
]

export const eventRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('description').optional({ values: 'falsy' }).trim().isLength({ max: 4000 }),
  body('category').optional({ values: 'falsy' }).trim().isLength({ max: 60 }),
  body('location').optional({ values: 'falsy' }).trim().isLength({ max: 200 }),
  body('date').optional({ values: 'falsy' }).isISO8601().toDate(),
  body('order').optional({ values: 'falsy' }).isInt().toInt(),
  body('published').optional().isBoolean().toBoolean(),
]
