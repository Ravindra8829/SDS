import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
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
  exam_type: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true
  },
  max_marks: {
    type: Number,
    default: 100
  },
  grade: {
    type: String
  },
  percentage: {
    type: Number
  },
  exam_date: {
    type: Date
  },
  added_by: {
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

// Index for better performance
resultSchema.index({ student_id: 1, subject_id: 1 });

// Calculate percentage before saving
resultSchema.pre('save', function(next) {
  if (this.marks && this.max_marks) {
    this.percentage = (this.marks / this.max_marks) * 100;
  }
  next();
});

export default mongoose.model('Result', resultSchema);