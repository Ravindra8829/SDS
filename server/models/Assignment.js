import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  uploaded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  file_path: {
    type: String
  },
  max_marks: {
    type: Number,
    default: 100
  },
  instructions: {
    type: String
  }
}, {
  timestamps: true
});

// Index for better performance
assignmentSchema.index({ due_date: 1 });
assignmentSchema.index({ uploaded_by: 1 });
assignmentSchema.index({ subject_id: 1 });

export default mongoose.model('Assignment', assignmentSchema);