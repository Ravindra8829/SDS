

# SDS College (Educational Project)

This repository contains a college management system project created **solely for educational purposes**. It is **not an official college website** and is not affiliated with any real institution. All development, code, and content are original and belong to me (the developer).

---

## 🏗️ Architecture

- **Backend:** Django (REST APIs), Node.js (additional features)
- **Frontend:** React (Vite)
- **Database:** MongoDB and SQLite (see setup guides)

---


## 🚀 Features

### Core Modules

1. User Authentication & Authorization (Admin/Student)
2. Academics Management (Courses, Subjects, Results)
3. Attendance Tracking
4. Assignment Management (Upload, Submission, Grading)
5. File Uploads (Assignments, Submissions, Profiles)
6. Admin & Student Dashboards
7. Enquiry & Contact Forms
8. Downloadable Syllabus & Resources
9. Analytics & Reporting (basic)
10. Modular API endpoints for all major features

### Security Features

- Role-based access control (Admin, Student)
- Password hashing and secure authentication
- Input validation and error handling
- No public access to sensitive endpoints

---


## 📋 Prerequisites

- Python 3.9+ (for Django backend)
- Node.js 16+ and npm (for Node.js server and React frontend)
- MongoDB 5.0+ (for MongoDB features)
- Git
- Visual Studio Code (recommended)

### Required VS Code Extensions
- Python (by Microsoft)
- Pylance (by Microsoft)
- ESLint (for JS/TS linting)
- Prettier (for code formatting)
- Docker (optional, for containerized development)

### Third-Party Software
- **MongoDB**: Required for backend data storage (Node.js server)
    - Download: https://www.mongodb.com/try/download/community
    - For macOS: Use Homebrew (`brew install mongodb-community`)
    - For Windows: Use the official installer and follow the setup wizard
- **PostgreSQL** (optional, for Django production): https://www.postgresql.org/download/

---

## 💻 Platform-Specific Setup

### macOS
1. Install Homebrew (if not already installed):
    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
2. Install Python, Node.js, and MongoDB:
    ```sh
    brew install python@3.9 node mongodb-community
    ```
3. Follow the main setup instructions below.

### Windows
1. Download and install:
    - [Python 3.9+](https://www.python.org/downloads/windows/)
    - [Node.js 16+](https://nodejs.org/en/download/)
    - [MongoDB Community Server](https://www.mongodb.com/try/download/community)
    - [Git for Windows](https://git-scm.com/download/win)
2. Add Python and Node.js to your PATH during installation.
3. Use Command Prompt or PowerShell for commands.
4. For virtual environments:
    ```sh
    python -m venv venv
    venv\Scripts\activate
    ```
5. For MongoDB, follow the installer prompts and start the MongoDB service from the Services app or with `net start MongoDB`.
6. Continue with the main setup instructions below.

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/sds_college.git
cd sds_college
```

### 2. Backend Setup (Django)

```sh
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# Set up your environment variables if needed (see .env.example)
python manage.py migrate
python manage.py runserver
```

- The Django server will start at `http://127.0.0.1:8000/`

### 3. Node.js Server Setup

```sh
cd server
npm install
node index.js
```

- The Node.js server will start at `http://localhost:5000/` (or as configured)

### 4. Frontend Setup (React + Vite)

```sh
cd src
npm install
npm run dev
```

- The React app will start at `http://localhost:5173/` (default Vite port)

---

## 🔧 Configuration

- **Django:** Edit `backend/.env` or settings as needed.
- **Node.js:** Edit `server/.env` or config files as needed.
- **MongoDB:** Ensure MongoDB is running if using related features.

---


## � API Endpoints (Sample)

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Academics

- `GET /api/academics/courses` - List courses
- `POST /api/academics/subjects` - Add subject

### Assignments

- `GET /api/assignments` - List assignments
- `POST /api/assignments` - Create assignment
- `POST /api/assignments/submit` - Submit assignment

### Attendance

- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/mark` - Mark attendance

### Results

- `GET /api/results` - Get student results

> _See code for full API details. Endpoints may differ based on backend (Django/Node.js)._

---

## 🚀 Deployment

### Backend Deployment

```sh
cd backend
python manage.py collectstatic
# Use gunicorn, uwsgi, or similar for production
```

### Node.js Server Deployment

```sh
cd server
npm run build
# Use pm2 or similar for production
```

### Frontend Deployment

```sh
cd src
npm run build
# Deploy the build folder to your web server
```

---

## 🔒 Security Considerations

- All sensitive endpoints require authentication
- Role-based access control implemented
- Passwords are securely hashed
- Input validation and error handling throughout
- No sensitive data in public repo

```
sds_college/
├── backend/        # Django backend
├── server/         # Node.js backend
├── src/            # React frontend
├── README.md
├── DJANGO_SETUP_GUIDE.md
├── MONGODB_SETUP_GUIDE.md
└── ...
```

---

## 📝 License

This project is for educational use only. You may use, modify, or share it for learning purposes. Do not use for any official or commercial deployment.

---

## 🤝 Support

For questions or support, connect on [LinkedIn](https://www.linkedin.com/in/ravindra-kumar-suthar-882ravi/).

---

**Note:** All unnecessary files (databases, logs, media, uploads, virtual environments, node_modules, etc.) have been removed for a clean public release.
