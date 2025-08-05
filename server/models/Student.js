import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  section: {
    type: String,
    default: 'A'
  },
  roll_no: {
    type: String,
    required: true
  },
  admission_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated'],
    default: 'active'
  },
  guardian_name: {
    type: String
  },
  guardian_phone: {
    type: String
  },
  address: {
    type: String
  }
}, {
  timestamps: true
});

// Index for better performance
studentSchema.index({ user_id: 1 });
studentSchema.index({ department: 1 });

export default mongoose.model('Student', studentSchema);