import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  course_interest: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'enrolled', 'closed'],
    default: 'new'
  },
  responded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  response_notes: {
    type: String
  }
}, {
  timestamps: true
});

// Index for better performance
enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: 1 });

export default mongoose.model('Enquiry', enquirySchema);