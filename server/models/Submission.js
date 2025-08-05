import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  assignment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  file_path: {
    type: String
  },
  submission_text: {
    type: String
  },
  marks_obtained: {
    type: Number
  },
  feedback: {
    type: String
  },
  submitted_at: {
    type: Date,
    default: Date.now
  },
  graded_at: {
    type: Date
  },
  graded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Compound index to ensure unique submission per assignment per student
submissionSchema.index({ assignment_id: 1, student_id: 1 }, { unique: true });

export default mongoose.model('Submission', submissionSchema);