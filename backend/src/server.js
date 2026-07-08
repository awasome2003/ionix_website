import { env } from './config/env.js'
import { connectDB } from './config/db.js'
import app from './app.js'

async function start() {
  await connectDB()
  const server = app.listen(env.port, () => {
    console.log(`✔ IONIX API running on http://localhost:${env.port} (${env.nodeEnv})`)
  })

  const shutdown = (signal) => {
    console.log(`\n${signal} received — shutting down...`)
    server.close(() => process.exit(0))
  }
  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
}

start()
