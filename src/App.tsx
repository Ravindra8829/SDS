import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Facilities from './pages/Facilities';
import Gallery from './pages/Gallery';
import Downloads from './pages/Downloads';
import Events from './pages/Events';
import Contact from './pages/Contact';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Enquiry from './pages/Enquiry';
import './App.css';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {!user ? (
          <>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/events" element={<Events />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/enquiry" element={<Enquiry />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route 
              path="/student-dashboard" 
              element={
                user.role === 'student' ? (
                  <StudentDashboard user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/admin-dashboard" replace />
                )
              } 
            />
            <Route 
              path="/admin-dashboard" 
              element={
                user.role === 'admin' ? (
                  <AdminDashboard user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/student-dashboard" replace />
                )
              } 
            />
            <Route path="*" element={
              <Navigate 
                to={user.role === 'student' ? '/student-dashboard' : '/admin-dashboard'} 
                replace 
              />
            } />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;