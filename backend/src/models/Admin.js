import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    // Never selected by default — must be explicitly requested for login.
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, trim: true, default: 'Admin' },
  },
  { timestamps: true },
)

adminSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash)
}

adminSchema.statics.hashPassword = function (plain) {
  return bcrypt.hash(plain, 10)
}

export default mongoose.model('Admin', adminSchema)
