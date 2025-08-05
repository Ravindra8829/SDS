import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  department: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    default: 3
  },
  semester: {
    type: Number
  },
  description: {
    type: String
  },
  syllabus_file: {
    type: String // File path for syllabus
  },
  uploaded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for better performance
subjectSchema.index({ code: 1 });
subjectSchema.index({ department: 1 });

export default mongoose.model('Subject', subjectSchema);