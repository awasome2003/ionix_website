import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

// Verifies a Bearer JWT and attaches { id, email } to req.admin.
export function requireAuth(req, _res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return next(new ApiError(401, 'Authentication required'))
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret)
    req.admin = { id: payload.sub, email: payload.email }
    next()
  } catch {
    next(new ApiError(401, 'Invalid or expired token'))
  }
}

export function signToken(admin) {
  return jwt.sign({ sub: admin._id.toString(), email: admin.email }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  })
}
