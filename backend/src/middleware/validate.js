import { validationResult } from 'express-validator'
import { ApiError } from '../utils/ApiError.js'

// Runs after a chain of express-validator rules; collects any failures
// into a single 400 response.
export function validate(req, _res, next) {
  const result = validationResult(req)
  if (result.isEmpty()) return next()

  const details = result.array().map((e) => ({ field: e.path, message: e.msg }))
  const err = new ApiError(400, 'Validation failed')
  err.details = details
  next(err)
}
