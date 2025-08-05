import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    required: true
  },
  marked_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  remarks: {
    type: String
  }
}, {
  timestamps: true
});

// Compound index to ensure unique attendance per student per subject per date
attendanceSchema.index({ student_id: 1, subject_id: 1, date: 1 }, { unique: true });
attendanceSchema.index({ student_id: 1, date: 1 });

export default mongoose.model('Attendance', attendanceSchema);