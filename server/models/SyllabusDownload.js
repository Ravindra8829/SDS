import mongoose from 'mongoose';

const syllabusDownloadSchema = new mongoose.Schema({
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
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  subject_name: {
    type: String,
    required: true
  },
  ip_address: {
    type: String
  },
  user_agent: {
    type: String
  }
}, {
  timestamps: true
});

// Index for analytics
syllabusDownloadSchema.index({ subject_id: 1 });
syllabusDownloadSchema.index({ email: 1 });
syllabusDownloadSchema.index({ createdAt: 1 });

export default mongoose.model('SyllabusDownload', syllabusDownloadSchema);