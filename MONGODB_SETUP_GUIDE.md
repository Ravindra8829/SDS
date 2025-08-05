
# MongoDB Setup Guide for SDS College Management System (macOS & Windows)


## Prerequisites

- macOS Big Sur (11.0) or later OR Windows 10/11
- Xcode Command Line Tools (macOS)
- Homebrew (macOS)
- Git
- Node.js 16+ and npm
- Visual Studio Code (recommended)

### Required VS Code Extensions
- ESLint
- Prettier


## Step 1: Install Prerequisites

### macOS
1. Install Homebrew (if not already installed):
    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
2. Install Node.js and MongoDB:
    ```sh
    brew install node mongodb-community
    ```

### Windows
1. Download and install:
    - [Node.js 16+](https://nodejs.org/en/download/)
    - [MongoDB Community Server](https://www.mongodb.com/try/download/community)
    - [Git for Windows](https://git-scm.com/download/win)
2. Add Node.js to your PATH during installation.
3. Use Command Prompt or PowerShell for commands.
4. For MongoDB, follow the installer prompts and start the MongoDB service from the Services app or with `net start MongoDB`.


## Step 2: Install MongoDB

- **macOS:**
    - Use Homebrew: `brew install mongodb-community`
    - Start service: `brew services start mongodb-community`
    - Verify: `mongosh --version`
- **Windows:**
    - Download and run the [MongoDB Community Server installer](https://www.mongodb.com/try/download/community)
    - Start MongoDB from the Services app or with `net start MongoDB`
    - Verify: Open Command Prompt and run `mongosh --version`

## Step 3: Configure MongoDB

### Create data directory:
```bash
sudo mkdir -p /usr/local/var/mongodb
sudo mkdir -p /usr/local/var/log/mongodb
sudo chown $(whoami) /usr/local/var/mongodb
sudo chown $(whoami) /usr/local/var/log/mongodb
```

### Start MongoDB manually (if not using brew services):
```bash
mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
```


## Step 3: Install Node.js (if not already installed)

- **macOS:**
    - Use Homebrew: `brew install node`
    - Verify: `node --version` and `npm --version`
- **Windows:**
    - Download and run the [Node.js installer](https://nodejs.org/en/download/)
    - Verify: `node --version` and `npm --version`

## Step 5: Setup the SDS College Project

### 1. Clone or setup the project:
```bash
# Navigate to your projects directory
cd ~/Documents/Projects

# If you have the project files, navigate to the project directory
cd sds-college-website

# If starting fresh, create the directory structure
mkdir sds-college-website
cd sds-college-website
```


### 2. Setup Backend (Server):
```sh
cd server
npm install
cp .env.example .env
```

### 3. Configure Environment Variables:
Edit the `.env` file:
```bash
nano .env
```

Add the following configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB Configuration (Local)
MONGODB_URI=mongodb://localhost:27017/sds_college

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=uploads

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```


### 3. Setup Frontend:
```sh
cd ../src
npm install
```

## Step 6: Start the Application

### Terminal 1 - Start MongoDB (if not running as service):
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# If not running, start it
brew services start mongodb/brew/mongodb-community

# Or start manually
mongod --config /usr/local/etc/mongod.conf
```


### Terminal 2 - Start Backend Server:
```sh
cd server
npm run dev
```


### Terminal 3 - Start Frontend:
```sh
cd ../src
npm run dev
```

## Step 7: Verify Setup

### Check MongoDB Connection:
```bash
# Connect to MongoDB shell
mongosh

# List databases
show dbs

# Use your database
use sds_college

# Check collections (after running the app)
show collections

# Exit MongoDB shell
exit
```

### Check Application:

1. **Frontend**: Open http://localhost:5173 (or the port shown in terminal)
2. **Backend**: Check http://localhost:5000/api/public/subjects
3. **MongoDB**: Should show `sds_college` database with demo data

## Step 8: Demo Accounts

The system automatically creates demo accounts:

### Admin Account:
- **Login**: admin@demo.com or ADMIN001
- **Password**: admin123
- **Role**: College Staff/Admin

### Student Accounts:
- **Login**: student@demo.com or SDS2024001
- **Password**: student123
- **Role**: Student

## Troubleshooting for M1 Pro

### 1. MongoDB Connection Issues:
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Check MongoDB logs
tail -f /usr/local/var/log/mongodb/mongo.log

# Restart MongoDB
brew services restart mongodb/brew/mongodb-community
```

### 2. Node.js/npm Issues:
```bash
# Clear npm cache
npm cache clean --force

# Reinstall node_modules
rm -rf node_modules package-lock.json
npm install
```

### 3. Port Conflicts:
```bash
# Check what's using port 5000
lsof -ti:5000

# Kill process if needed
kill -9 $(lsof -ti:5000)

# Or change port in .env file
PORT=5001
```

### 4. Permission Issues:
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### 5. M1 Pro Specific Issues:
```bash
# If you encounter architecture issues, ensure you're using ARM64 versions
arch -arm64 brew install mongodb-community
arch -arm64 npm install
```

## MongoDB Compass (GUI Tool)

### Install MongoDB Compass:
```bash
# Using Homebrew
brew install --cask mongodb-compass

# Or download from https://www.mongodb.com/products/compass
```

### Connect to your database:
- Connection String: `mongodb://localhost:27017`
- Database: `sds_college`

## Performance Tips for M1 Pro

1. **Use Rosetta 2 if needed**:
```bash
# Install Rosetta 2 if not already installed
softwareupdate --install-rosetta
```

2. **Optimize MongoDB for M1**:
```bash
# Create optimized MongoDB configuration
sudo nano /usr/local/etc/mongod.conf
```

Add these optimizations:
```yaml
storage:
  wiredTiger:
    engineConfig:
      cacheSizeGB: 2
    collectionConfig:
      blockCompressor: snappy
```

3. **Monitor Resource Usage**:
```bash
# Check system resources
top -o cpu
htop  # if installed: brew install htop
```

## Next Steps

1. **Explore the Application**:
   - Visit the homepage
   - Try the login system
   - Test the enquiry form
   - Download syllabi (requires form submission)

2. **Admin Features**:
   - Login as admin
   - Add new students
   - Upload syllabi for subjects
   - View enquiries and download analytics

3. **Development**:
   - The application supports hot reloading
   - MongoDB data persists between restarts
   - Check logs for any issues

Your SDS College website is now fully functional with MongoDB backend on your M1 Pro Mac! 🚀

## Useful Commands

```bash
# Start all services
brew services start mongodb/brew/mongodb-community
cd server && npm run dev &
npm run dev

# Stop all services
brew services stop mongodb/brew/mongodb-community
pkill -f "node"

# View logs
tail -f /usr/local/var/log/mongodb/mongo.log
tail -f server/logs/app.log  # if logging is configured

# Backup database
mongodump --db sds_college --out backup/

# Restore database
mongorestore --db sds_college backup/sds_college/
```