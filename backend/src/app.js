import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import { env, isProd } from './config/env.js'
import { UPLOAD_DIR } from './middleware/upload.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import publicRoutes from './routes/publicRoutes.js'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app = express()

// Behind a proxy (e.g. Nginx/Render) so rate-limit sees the real client IP.
app.set('trust proxy', 1)

// crossOriginResourcePolicy is relaxed so the frontend on another origin
// can load uploaded gallery images.
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))

app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin / curl / server-to-server (no Origin header).
      if (!origin || env.clientOrigins.includes(origin)) return cb(null, true)
      cb(new Error(`Origin ${origin} not allowed by CORS`))
    },
    credentials: true,
  }),
)

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(isProd ? 'combined' : 'dev'))

// Serve uploaded gallery images.
app.use('/uploads', express.static(UPLOAD_DIR))

// Health check.
app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'ok', uptime: process.uptime() })
})

// Routes.
app.use('/api', publicRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

// 404 + error handling (must be last).
app.use(notFound)
app.use(errorHandler)

export default app
