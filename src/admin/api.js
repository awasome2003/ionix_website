// Thin fetch wrapper for the IONIX admin API.
// Reads the base URL from VITE_API_URL (see project .env), defaulting to the
// local backend on port 5001.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

// The origin (without the trailing /api) — used to resolve relative /uploads
// image paths returned by the backend.
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, '')

const TOKEN_KEY = 'ionix_admin_token'

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
}

// Resolve an image URL that may be relative (/uploads/..) or absolute (https://..).
export function resolveImage(url) {
  if (!url) return ''
  return url.startsWith('http') ? url : `${API_ORIGIN}${url}`
}

class ApiError extends Error {
  constructor(message, status, details) {
    super(message)
    this.status = status
    this.details = details
  }
}

async function request(path, { method = 'GET', body, isForm = false } = {}) {
  const headers = {}
  const token = tokenStore.get()
  if (token) headers.Authorization = `Bearer ${token}`

  let payload
  if (isForm) {
    payload = body // FormData — let the browser set the Content-Type boundary
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    payload = JSON.stringify(body)
  }

  let res
  try {
    res = await fetch(`${API_URL}${path}`, { method, headers, body: payload })
  } catch {
    throw new ApiError('Cannot reach the server. Is the backend running?', 0)
  }

  // 401 -> token invalid/expired: clear it so the app bounces to login.
  if (res.status === 401) {
    tokenStore.clear()
  }

  let data = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { message: text }
    }
  }

  if (!res.ok) {
    throw new ApiError(data?.message || `Request failed (${res.status})`, res.status, data?.details)
  }
  return data
}

export const api = {
  // --- auth ---
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  me: () => request('/auth/me'),

  // --- leads ---
  leads: (params = '') => request(`/admin/leads${params}`),
  updateLead: (id, status) => request(`/admin/leads/${id}`, { method: 'PATCH', body: { status } }),
  deleteLead: (id) => request(`/admin/leads/${id}`, { method: 'DELETE' }),

  // --- registrations ---
  registrations: (params = '') => request(`/admin/registrations${params}`),
  updateRegistration: (id, status) =>
    request(`/admin/registrations/${id}`, { method: 'PATCH', body: { status } }),
  deleteRegistration: (id) => request(`/admin/registrations/${id}`, { method: 'DELETE' }),

  // --- subscribers ---
  subscribers: (params = '') => request(`/admin/subscribers${params}`),
  deleteSubscriber: (id) => request(`/admin/subscribers/${id}`, { method: 'DELETE' }),

  // --- gallery ---
  gallery: () => request('/admin/gallery'),
  createGallery: (formData) => request('/admin/gallery', { method: 'POST', body: formData, isForm: true }),
  updateGallery: (id, formData) =>
    request(`/admin/gallery/${id}`, { method: 'PATCH', body: formData, isForm: true }),
  deleteGallery: (id) => request(`/admin/gallery/${id}`, { method: 'DELETE' }),

  // --- testimonials ---
  testimonials: () => request('/admin/testimonials'),
  createTestimonial: (body) => request('/admin/testimonials', { method: 'POST', body }),
  updateTestimonial: (id, body) => request(`/admin/testimonials/${id}`, { method: 'PATCH', body }),
  deleteTestimonial: (id) => request(`/admin/testimonials/${id}`, { method: 'DELETE' }),

  // --- events ---
  events: () => request('/admin/events'),
  createEvent: (body) => request('/admin/events', { method: 'POST', body }),
  updateEvent: (id, body) => request(`/admin/events/${id}`, { method: 'PATCH', body }),
  deleteEvent: (id) => request(`/admin/events/${id}`, { method: 'DELETE' }),
}

export { ApiError }
