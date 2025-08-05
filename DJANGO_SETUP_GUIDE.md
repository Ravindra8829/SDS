# Django Backend Setup Guide for SDS College Portal

## 🚀 Complete Setup Instructions


### Prerequisites
- Python 3.9+ installed
- PostgreSQL (recommended for production) or SQLite (for development)
- Node.js 16+ and npm (for frontend)
- Redis (optional, for background tasks)
- Git
- Visual Studio Code (recommended)

#### Required VS Code Extensions
- Python (by Microsoft)
- Pylance (by Microsoft)
- ESLint
- Prettier

#### Third-Party Software
- **MongoDB** (if using Node.js backend): https://www.mongodb.com/try/download/community
- **PostgreSQL** (for production): https://www.postgresql.org/download/

---

## 💻 Platform-Specific Setup

### macOS
1. Install Homebrew (if not already installed):
    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
2. Install Python, Node.js, and PostgreSQL:
    ```sh
    brew install python@3.9 node postgresql
    ```
3. (Optional) Install MongoDB:
    ```sh
    brew install mongodb-community
    ```

### Windows
1. Download and install:
    - [Python 3.9+](https://www.python.org/downloads/windows/)
    - [Node.js 16+](https://nodejs.org/en/download/)
    - [PostgreSQL](https://www.postgresql.org/download/windows/)
    - [MongoDB Community Server](https://www.mongodb.com/try/download/community)
    - [Git for Windows](https://git-scm.com/download/win)
2. Add Python and Node.js to your PATH during installation.
3. Use Command Prompt or PowerShell for commands.
4. For virtual environments:
    ```sh
    python -m venv venv
    venv\Scripts\activate
    ```
5. For PostgreSQL and MongoDB, follow the installer prompts and start the services from the Services app or with `net start postgresql` / `net start MongoDB`.
6. Continue with the main setup instructions below.

## Backend Setup (Django)

### 1. Create Virtual Environment
```bash
# Navigate to project root
cd your-project-directory

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt
```

### 3. Database Setup

#### Option A: PostgreSQL (Recommended for Production)
```bash
# Install PostgreSQL and create database
sudo apt-get install postgresql postgresql-contrib  # Ubuntu/Debian
# or
brew install postgresql  # macOS

# Start PostgreSQL service
sudo service postgresql start  # Ubuntu/Debian
# or
brew services start postgresql  # macOS

# Create database and user
sudo -u postgres psql
CREATE DATABASE sds_college;
CREATE USER sds_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE sds_college TO sds_user;
\q
```

#### Option B: SQLite (Development Only)
```python
# In settings.py, replace PostgreSQL config with:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

### 4. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

### 5. Django Setup
```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (admin)
python manage.py createsuperuser

# Collect static files (if needed)
python manage.py collectstatic --noinput

# Start development server
python manage.py runserver 8000
```

## Frontend Setup (React + Vite)

### 1. Install Dependencies
```bash
# Navigate to frontend directory (project root)
npm install
```

### 2. Update Configuration
```bash
# Update API endpoints in your React components to point to Django
# Example: http://localhost:8000/api/
```

### 3. Start Development Server
```bash
npm run dev
```

## 🔧 Key Features Implemented

### 🔐 Enhanced Login System
- **Two-step authentication**: Credentials → Role selection
- **Role-based redirects**: Students → Student Dashboard, Staff → Admin Dashboard
- **Smooth animations**: Sliding transitions between login states
- **Error handling**: Clear feedback for invalid credentials

### 👥 User Access Control

#### Students Can:
- ✅ View personal attendance (subject-wise and overall)
- ✅ See pending assignments list
- ✅ Upload assignment files with timestamp
- ✅ View only their own data
- ❌ Cannot self-register
- ❌ Cannot edit other students' data

#### College Staff/Admin Can:
- ✅ View all student assignment uploads with download option
- ✅ Add new students manually with auto-generated enrollment IDs
- ✅ Add subjects to the system
- ✅ Mark student attendance (present/absent)
- ❌ Cannot see students' personal information beyond academic data
- ❌ Cannot edit other staff records

### 🎨 UI/UX Enhancements
- **New Color Scheme**: Deep emerald green + neutral gray (replacing blue/orange)
- **Hero Slider**: 3 slides with campus photos and welcome messages
- **Hover Effects**: Smooth animations on navbar and CTA buttons
- **Mobile Responsive**: Optimized for all device sizes
- **Loading States**: Proper loading indicators throughout

### 🚫 Registration Restrictions
- **No Public Registration**: Removed open registration completely
- **Staff-Only Student Creation**: Only admins can add students
- **Enrollment ID System**: Auto-generated unique IDs
- **Password Setup**: Students can set passwords only if enrollment ID exists
- **Access Control**: Blocks access for unrecognized enrollment IDs

### ⚡ Performance Optimizations

#### Frontend:
- **Lazy Loading**: Components load on demand
- **Asset Compression**: Optimized images and fonts
- **Bundle Optimization**: Minimized JavaScript bundle size
- **Efficient Routing**: Optimized React Router setup

#### Backend:
- **Database Indexing**: Optimized queries with proper indexes
- **Pagination**: API responses use pagination for large datasets
- **CORS & Compression**: Enabled gzip compression and proper CORS
- **Query Optimization**: Efficient database queries with select_related/prefetch_related

### 🤖 AI Assistant Integration
- **OpenAI Integration**: GPT-powered student assistance
- **Context-Aware**: Personalized responses based on student data
- **24/7 Availability**: Always accessible help system
- **Query Categories**: Academic, assignment, career guidance
- **Chat History**: Persistent conversation sessions

## 📊 Database Schema

### Core Models:
- **User**: Custom user model with enrollment_id as username
- **Student**: Extended student profile information
- **Subject**: Academic subjects/courses
- **Assignment**: Assignment details and files
- **Submission**: Student assignment submissions
- **Attendance**: Daily attendance records
- **Result**: Exam results and grades
- **ChatSession**: AI assistant conversations

## 🔒 Security Features

### Authentication:
- **JWT Tokens**: Secure token-based authentication
- **Role-based Access**: Middleware enforces user permissions
- **Password Hashing**: bcrypt for secure password storage
- **Session Management**: Proper token refresh and expiry

### Data Protection:
- **Input Validation**: Comprehensive form validation
- **SQL Injection Prevention**: Django ORM protection
- **XSS Protection**: Built-in Django security features
- **CSRF Protection**: Cross-site request forgery prevention

## 🚀 Deployment Ready

### Production Settings:
- **Environment Variables**: Secure configuration management
- **Static Files**: WhiteNoise for static file serving
- **Database**: PostgreSQL for production
- **Logging**: Comprehensive logging configuration
- **Error Handling**: Graceful error responses

## 📱 API Endpoints

### Authentication:
- `POST /api/auth/login/` - User login with role selection
- `GET /api/auth/me/` - Get current user profile
- `POST /api/auth/check-enrollment/` - Verify enrollment ID
- `POST /api/auth/set-password/` - Set password for existing enrollment

### Student APIs:
- `GET /api/student/assignments/` - Get student assignments
- `GET /api/student/attendance/` - Get attendance records
- `GET /api/student/results/` - Get exam results
- `POST /api/student/submit-assignment/` - Submit assignment

### Admin APIs:
- `GET /api/admin/students/` - List all students (with search/filter)
- `POST /api/admin/students/` - Add new student
- `GET /api/admin/subjects/` - List subjects
- `POST /api/admin/subjects/` - Add new subject

### AI Assistant:
- `POST /api/ai/chat/` - Send message to AI assistant
- `GET /api/ai/sessions/` - Get chat sessions
- `GET /api/ai/prompts/` - Get suggested prompts

## 🔧 Development Commands

```bash
# Backend (Django)
python manage.py runserver 8000          # Start development server
python manage.py makemigrations          # Create migrations
python manage.py migrate                 # Apply migrations
python manage.py createsuperuser         # Create admin user
python manage.py shell                   # Django shell
python manage.py collectstatic           # Collect static files

# Frontend (React)
npm run dev                              # Start development server
npm run build                            # Build for production
npm run preview                          # Preview production build
npm run lint                             # Run ESLint

# Database
python manage.py dbshell                 # Database shell
python manage.py dumpdata > backup.json # Backup data
python manage.py loaddata backup.json   # Restore data
```

## 🎯 Demo Accounts

The system creates demo accounts automatically:

### Admin Account:
- **Login**: admin@demo.com or ADMIN001
- **Password**: admin123
- **Role**: College Staff/Admin

### Student Accounts:
- **Login**: student@demo.com or SDS2024001
- **Password**: student123
- **Role**: Student

## 🔍 Testing

### Manual Testing Checklist:
- [ ] Login with student credentials → Student dashboard
- [ ] Login with admin credentials → Admin dashboard
- [ ] Student can view assignments and upload files
- [ ] Admin can add new students
- [ ] Attendance marking works
- [ ] AI assistant responds correctly
- [ ] Mobile responsiveness
- [ ] Error handling

### API Testing:
```bash
# Test login endpoint
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"user_id": "SDS2024001", "password": "student123", "role": "student"}'

# Test protected endpoint
curl -X GET http://localhost:8000/api/student/assignments/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify database credentials in .env
   - Ensure database exists

2. **Migration Errors**
   - Delete migration files and recreate: `find . -path "*/migrations/*.py" -not -name "__init__.py" -delete`
   - Run: `python manage.py makemigrations` then `python manage.py migrate`

3. **CORS Issues**
   - Check CORS_ALLOWED_ORIGINS in settings.py
   - Ensure frontend URL is included

4. **Static Files Not Loading**
   - Run: `python manage.py collectstatic`
   - Check STATIC_URL and STATIC_ROOT settings

5. **AI Assistant Not Working**
   - Verify OPENAI_API_KEY in .env
   - Check API quota and billing

Your SDS College portal is now ready with all advanced features! 🎓✨

SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://user:password@localhost/sds_college
OPENAI_API_KEY=your-openai-key