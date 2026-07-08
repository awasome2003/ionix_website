import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, trim: true, maxlength: 120 },
    quote: { type: String, required: true, trim: true, maxlength: 2000 },
    avatarUrl: { type: String, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    order: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
)

export default mongoose.model('Testimonial', testimonialSchema)
