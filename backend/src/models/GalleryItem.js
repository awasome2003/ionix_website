import mongoose from 'mongoose'

// A photo in the site gallery. Image can be either an uploaded file
// (served from /uploads) or an external URL.
const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, maxlength: 160 },
    category: { type: String, trim: true, maxlength: 60, default: 'general', index: true },
    imageUrl: { type: String, required: true, trim: true },

    // Display ordering (ascending). Lower numbers show first.
    order: { type: Number, default: 0, index: true },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
)

export default mongoose.model('GalleryItem', galleryItemSchema)
