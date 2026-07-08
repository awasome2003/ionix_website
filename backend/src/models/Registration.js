import mongoose from 'mongoose'

// Drives both CTAs on the site:
//  - "Organize My Tournament"  -> type: 'tournament'
//  - "Join Academy"            -> type: 'academy'
const registrationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['tournament', 'academy'],
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },

    // Sport of interest (e.g. "Table Tennis", "Box Cricket").
    sport: { type: String, trim: true, maxlength: 80 },

    // Tournament-specific: rough headcount / team size.
    participants: { type: Number, min: 0 },

    // Academy-specific: who's enrolling.
    ageGroup: { type: String, trim: true, maxlength: 40 },

    message: { type: String, trim: true, maxlength: 4000 },

    status: {
      type: String,
      enum: ['new', 'contacted', 'confirmed', 'closed'],
      default: 'new',
      index: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Registration', registrationSchema)
