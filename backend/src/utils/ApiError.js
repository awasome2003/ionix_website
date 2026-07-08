// A typed error carrying an HTTP status code, used throughout the API
// so the central error handler can respond consistently.
export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ApiError'
  }
}
