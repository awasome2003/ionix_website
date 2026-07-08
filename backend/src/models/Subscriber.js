import mongoose from 'mongoose'

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: 160,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export default mongoose.model('Subscriber', subscriberSchema)
