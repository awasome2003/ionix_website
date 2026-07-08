import { isProd } from '../config/env.js'
import { ApiError } from '../utils/ApiError.js'

export function notFound(req, _res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`))
}

// Central error handler. Must keep the 4-arg signature for Express to use it.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal server error'
  let details = err.details

  // Mongoose duplicate key (e.g. subscribing the same email twice).
  if (err.code === 11000) {
    statusCode = 409
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    message = `That ${field} already exists`
  }

  // Mongoose validation errors.
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = 'Validation failed'
    details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }))
  }

  // Bad ObjectId in a route param.
  if (err.name === 'CastError') {
    statusCode = 400
    message = `Invalid ${err.path}`
  }

  if (statusCode >= 500) {
    console.error('✖', err)
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
    ...(isProd ? {} : { stack: err.stack }),
  })
}
