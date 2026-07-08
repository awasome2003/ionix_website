import mongoose from 'mongoose'

// Portfolio / past-and-upcoming events shown on the site.
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 4000 },
    category: { type: String, trim: true, maxlength: 60, index: true },
    imageUrl: { type: String, trim: true },
    location: { type: String, trim: true, maxlength: 200 },
    date: { type: Date },
    order: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
)

export default mongoose.model('Event', eventSchema)
