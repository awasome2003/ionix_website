import { Router } from 'express'
import { validate } from '../middleware/validate.js'
import { loginLimiter } from '../middleware/rateLimit.js'
import { requireAuth } from '../middleware/auth.js'
import { login, me } from '../controllers/authController.js'
import { loginRules } from '../validators/index.js'

const router = Router()

router.post('/login', loginLimiter, loginRules, validate, login)
router.get('/me', requireAuth, me)

export default router
