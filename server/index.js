import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import compression from 'compression';
import nodemailer from 'nodemailer';
import 'dotenv/config';

// Import models
import User from './models/User.js';
import Student from './models/Student.js';
import Subject from './models/Subject.js';
import Assignment from './models/Assignment.js';
import Submission from './models/Submission.js';
import SyllabusDownload from './models/SyllabusDownload.js';
import Enquiry from './models/Enquiry.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Create uploads directories if they don't exist
const uploadDirs = ['uploads', 'uploads/assignments', 'uploads/submissions', 'uploads/syllabus'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';
    if (req.route.path.includes('assignment')) {
      uploadPath = 'uploads/assignments/';
    } else if (req.route.path.includes('submission')) {
      uploadPath = 'uploads/submissions/';
    } else if (req.route.path.includes('syllabus')) {
      uploadPath = 'uploads/syllabus/';
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|ppt|pptx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Email configuration
const emailTransporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// MongoDB connection
async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sds_college', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
    
    // Insert demo data if database is empty
    await insertDemoData();
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

// Insert demo data
async function insertDemoData() {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Demo data already exists');
      return;
    }

    console.log('Inserting demo data...');

    // Create demo users
    const adminUser = new User({
      name: 'Jane Smith',
      email: 'admin@demo.com',
      enrollment_id: 'ADMIN001',
      password_hash: 'admin123',
      role: 'admin',
      phone: '+91-9876543211',
      date_of_birth: new Date('1985-08-20')
    });

    const studentUser1 = new User({
      name: 'John Doe',
      email: 'student@demo.com',
      enrollment_id: 'SDS2024001',
      password_hash: 'student123',
      role: 'student',
      phone: '+91-9876543210',
      date_of_birth: new Date('2000-05-15')
    });

    const studentUser2 = new User({
      name: 'Alice Johnson',
      email: 'alice@demo.com',
      enrollment_id: 'SDS2024002',
      password_hash: 'student123',
      role: 'student',
      phone: '+91-9876543212',
      date_of_birth: new Date('2001-03-10')
    });

    await Promise.all([
      adminUser.save(),
      studentUser1.save(),
      studentUser2.save()
    ]);

    // Create student records
    const student1 = new Student({
      user_id: studentUser1._id,
      department: 'Computer Science',
      year: '2nd Year',
      section: 'A',
      roll_no: 'CS2024001'
    });

    const student2 = new Student({
      user_id: studentUser2._id,
      department: 'Computer Science',
      year: '1st Year',
      section: 'B',
      roll_no: 'CS2024002'
    });

    await Promise.all([student1.save(), student2.save()]);

    // Create demo subjects with syllabus placeholders
    const subjects = [
      {
        name: 'Mathematics',
        code: 'MATH101',
        department: 'Science',
        credits: 4,
        semester: 1,
        description: 'Fundamental mathematics concepts',
        uploaded_by: adminUser._id
      },
      {
        name: 'Physics',
        code: 'PHY101',
        department: 'Science',
        credits: 4,
        semester: 1,
        description: 'Basic physics principles',
        uploaded_by: adminUser._id
      },
      {
        name: 'Computer Science',
        code: 'CS101',
        department: 'Computer Science',
        credits: 4,
        semester: 1,
        description: 'Introduction to programming',
        uploaded_by: adminUser._id
      }
    ];

    await Subject.insertMany(subjects);

    console.log('Demo data inserted successfully');
  } catch (error) {
    console.error('Error inserting demo data:', error);
  }
}

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Role-based access control middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    
    next();
  };
};

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { userId, password, role } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ message: 'User ID and password are required' });
    }

    // Find user by enrollment_id or email
    const user = await User.findOne({
      $or: [
        { enrollment_id: userId },
        { email: userId }
      ],
      is_active: true
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials or account not found' });
    }

    // Check if role matches (if specified)
    if (role && user.role !== role) {
      return res.status(401).json({ message: 'Invalid role for this account' });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { 
        id: user._id, 
        enrollment_id: user.enrollment_id,
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '8h' }
    );

    // Get additional user info if student
    let userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      enrollment_id: user.enrollment_id,
      role: user.role
    };

    if (user.role === 'student') {
      const studentInfo = await Student.findOne({ user_id: user._id });
      if (studentInfo) {
        userData = { ...userData, ...studentInfo.toObject() };
      }
    }

    res.json({ token, user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Public routes for syllabus download
app.get('/api/public/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find({ syllabus_file: { $exists: true, $ne: null } })
      .select('name code department credits semester description')
      .sort({ department: 1, name: 1 });
    
    res.json(subjects);
  } catch (error) {
    console.error('Get public subjects error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/public/download-syllabus', async (req, res) => {
  try {
    const { name, email, phone, subjectId } = req.body;

    if (!name || !email || !phone || !subjectId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find subject
    const subject = await Subject.findById(subjectId);
    if (!subject || !subject.syllabus_file) {
      return res.status(404).json({ message: 'Syllabus not found' });
    }

    // Record download
    const download = new SyllabusDownload({
      name,
      email,
      phone,
      subject_id: subjectId,
      subject_name: subject.name,
      ip_address: req.ip,
      user_agent: req.get('User-Agent')
    });

    await download.save();

    // Return download URL
    res.json({ 
      message: 'Download recorded successfully',
      downloadUrl: `/uploads/syllabus/${path.basename(subject.syllabus_file)}`
    });
  } catch (error) {
    console.error('Download syllabus error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Enquiry routes
app.post('/api/public/enquiry', async (req, res) => {
  try {
    const { name, email, phone, course_interest, message } = req.body;

    if (!name || !email || !phone || !course_interest || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const enquiry = new Enquiry({
      name,
      email,
      phone,
      course_interest,
      message
    });

    await enquiry.save();

    // Send notification email to admin (optional)
    try {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'admin@sdsbadamiacollege.com',
        subject: 'New Admission Enquiry',
        html: `
          <h3>New Admission Enquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Course Interest:</strong> ${course_interest}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    res.json({ message: 'Enquiry submitted successfully' });
  } catch (error) {
    console.error('Submit enquiry error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Student routes
app.get('/api/student/assignments', authenticateToken, requireRole(['student']), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const assignments = await Assignment.find()
      .populate('subject_id', 'name')
      .populate('uploaded_by', 'name')
      .sort({ due_date: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Check submission status for each assignment
    const assignmentsWithStatus = await Promise.all(
      assignments.map(async (assignment) => {
        const submission = await Submission.findOne({
          assignment_id: assignment._id,
          student_id: req.user.id
        });

        return {
          ...assignment,
          subject_name: assignment.subject_id?.name,
          submitted: !!submission,
          submission_id: submission?._id,
          submitted_at: submission?.submitted_at
        };
      })
    );

    const total = await Assignment.countDocuments();

    res.json({
      assignments: assignmentsWithStatus,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/student/submit-assignment', authenticateToken, requireRole(['student']), upload.single('file'), async (req, res) => {
  try {
    const { assignmentId, submissionText } = req.body;
    const filePath = req.file ? req.file.path : null;

    if (!assignmentId) {
      return res.status(400).json({ message: 'Assignment ID is required' });
    }

    // Check if assignment exists and is not past due
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (new Date() > new Date(assignment.due_date)) {
      return res.status(400).json({ message: 'Assignment submission deadline has passed' });
    }

    // Check if already submitted
    const existingSubmission = await Submission.findOne({
      assignment_id: assignmentId,
      student_id: req.user.id
    });

    if (existingSubmission) {
      return res.status(400).json({ message: 'Assignment already submitted' });
    }

    // Create submission
    const submission = new Submission({
      assignment_id: assignmentId,
      student_id: req.user.id,
      file_path: filePath,
      submission_text: submissionText
    });

    await submission.save();

    res.json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    console.error('Submit assignment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin routes
app.get('/api/admin/students', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    let query = { role: 'student', is_active: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { enrollment_id: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password_hash')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get student info for each user
    const studentsWithInfo = await Promise.all(
      users.map(async (user) => {
        const studentInfo = await Student.findOne({ user_id: user._id }).lean();
        return {
          ...user,
          ...studentInfo
        };
      })
    );

    const total = await User.countDocuments(query);

    res.json({
      students: studentsWithInfo,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/admin/students', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { name, email, department, year, roll_no, phone, guardian_name, guardian_phone, address } = req.body;

    if (!name || !department || !year) {
      return res.status(400).json({ message: 'Name, department, and year are required' });
    }

    // Generate enrollment ID
    const currentYear = new Date().getFullYear();
    const deptCode = department.substring(0, 3).toUpperCase();
    
    // Get next sequence number
    const lastStudent = await User.findOne({
      enrollment_id: { $regex: `^${deptCode}${currentYear}` }
    }).sort({ enrollment_id: -1 });

    let nextSequence = 1;
    if (lastStudent) {
      const lastSequence = parseInt(lastStudent.enrollment_id.slice(-3));
      nextSequence = lastSequence + 1;
    }

    const enrollmentId = `${deptCode}${currentYear}${nextSequence.toString().padStart(3, '0')}`;

    // Create user
    const user = new User({
      name,
      email,
      enrollment_id: enrollmentId,
      password_hash: 'student123',
      role: 'student',
      phone
    });

    await user.save();

    // Create student record
    const student = new Student({
      user_id: user._id,
      department,
      year,
      roll_no,
      guardian_name,
      guardian_phone,
      address
    });

    await student.save();

    res.json({ 
      message: 'Student added successfully',
      enrollmentId,
      defaultPassword: 'student123'
    });
  } catch (error) {
    console.error('Add student error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Student with this email or enrollment ID already exists' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

// Syllabus management routes
app.get('/api/admin/subjects', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.json(subjects);
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/admin/subjects', authenticateToken, requireRole(['admin']), upload.single('syllabus'), async (req, res) => {
  try {
    const { name, code, department, credits, semester, description } = req.body;
    const syllabusFile = req.file ? req.file.path : null;

    if (!name || !code) {
      return res.status(400).json({ message: 'Name and code are required' });
    }

    const subject = new Subject({
      name,
      code: code.toUpperCase(),
      department,
      credits: credits || 3,
      semester,
      description,
      syllabus_file: syllabusFile,
      uploaded_by: req.user.id
    });

    await subject.save();

    res.json({ message: 'Subject added successfully' });
  } catch (error) {
    console.error('Add subject error:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Subject with this code already exists' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

app.put('/api/admin/subjects/:id/syllabus', authenticateToken, requireRole(['admin']), upload.single('syllabus'), async (req, res) => {
  try {
    const { id } = req.params;
    const syllabusFile = req.file ? req.file.path : null;

    if (!syllabusFile) {
      return res.status(400).json({ message: 'Syllabus file is required' });
    }

    const subject = await Subject.findByIdAndUpdate(
      id,
      { 
        syllabus_file: syllabusFile,
        uploaded_by: req.user.id
      },
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json({ message: 'Syllabus uploaded successfully' });
  } catch (error) {
    console.error('Upload syllabus error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Assignment management routes
app.post('/api/admin/assignments', authenticateToken, requireRole(['admin']), upload.single('file'), async (req, res) => {
  try {
    const { title, description, subject_id, due_date, max_marks, instructions } = req.body;
    const filePath = req.file ? req.file.path : null;

    if (!title || !subject_id || !due_date) {
      return res.status(400).json({ message: 'Title, subject, and due date are required' });
    }

    const assignment = new Assignment({
      title,
      description,
      subject_id,
      due_date,
      max_marks: max_marks || 100,
      instructions,
      file_path: filePath,
      uploaded_by: req.user.id
    });

    await assignment.save();

    res.json({ message: 'Assignment created successfully' });
  } catch (error) {
    console.error('Create assignment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/admin/submissions', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const submissions = await Submission.find()
      .populate('assignment_id', 'title due_date')
      .populate('student_id', 'name enrollment_id')
      .sort({ submitted_at: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Submission.countDocuments();

    res.json({
      submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Analytics routes
app.get('/api/admin/syllabus-downloads', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const downloads = await SyllabusDownload.find()
      .populate('subject_id', 'name code')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await SyllabusDownload.countDocuments();

    res.json({
      downloads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get syllabus downloads error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/admin/enquiries', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Enquiry.countDocuments();

    res.json({
      enquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get enquiries error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Initialize database and start server
connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await mongoose.connection.close();
  process.exit(0);
});