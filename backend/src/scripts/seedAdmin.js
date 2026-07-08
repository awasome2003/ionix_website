// Creates the first admin user from ADMIN_EMAIL / ADMIN_PASSWORD in .env.
// Safe to re-run: it updates the password if the admin already exists.
//   npm run seed:admin
import mongoose from 'mongoose'
import { env } from '../config/env.js'
import { connectDB } from '../config/db.js'
import Admin from '../models/Admin.js'

async function run() {
  const { email, password } = env.admin
  if (!email || !password) {
    console.error('✖ Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.')
    process.exit(1)
  }

  await connectDB()
  const passwordHash = await Admin.hashPassword(password)

  const admin = await Admin.findOneAndUpdate(
    { email: email.toLowerCase() },
    { email: email.toLowerCase(), passwordHash },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  )

  console.log(`✔ Admin ready: ${admin.email}`)
  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error('✖ Seed failed:', err)
  process.exit(1)
})
