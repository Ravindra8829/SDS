import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  BarChart3, 
  Upload,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  LogOut,
  User
} from 'lucide-react';

const StudentDashboard = ({ user, onLogout }: { user: any; onLogout: () => void }) => {
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    // Call the parent logout handler
    onLogout();
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Fetch assignments
      const assignmentsResponse = await fetch('http://localhost:8000/api/student/assignments/', {
        headers
      });
      if (assignmentsResponse.ok) {
        const assignmentsData = await assignmentsResponse.json();
        setAssignments(assignmentsData.assignments || []);
      }

      // Fetch attendance
      const attendanceResponse = await fetch('http://localhost:8000/api/student/attendance/', {
        headers
      });
      if (attendanceResponse.ok) {
        const attendanceData = await attendanceResponse.json();
        setAttendance(attendanceData || []);
      }

      // Fetch results
      const resultsResponse = await fetch('http://localhost:8000/api/student/results/', {
        headers
      });
      if (resultsResponse.ok) {
        const resultsData = await resultsResponse.json();
        setResults(resultsData || []);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (assignmentId: string, file: File) => {
    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      formData.append('assignmentId', assignmentId);
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/api/student/submit-assignment/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Assignment submitted successfully!');
        fetchDashboardData(); // Refresh data
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to submit assignment');
      }
    } catch (error) {
      alert('Error submitting assignment');
    }
  };

  const calculateAttendancePercentage = () => {
    if (attendance.length === 0) return 0;
    const presentCount = attendance.filter(record => record.status === 'present').length;
    return Math.round((presentCount / attendance.length) * 100);
  };

  const getOverallGrade = () => {
    if (results.length === 0) return 'N/A';
    const totalMarks = results.reduce((sum, result) => sum + result.marks, 0);
    const totalMaxMarks = results.reduce((sum, result) => sum + result.max_marks, 0);
    const percentage = (totalMarks / totalMaxMarks) * 100;
    
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C+';
    return 'C';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.first_name} {user?.last_name}!
              </h1>
              <p className="text-emerald-100">
                {user?.enrollment_id} • {user?.department} • {user?.year}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6 text-emerald-100" />
                <span className="text-emerald-100">{user?.enrollment_id}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Attendance</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {calculateAttendancePercentage()}%
                </p>
              </div>
              <Calendar className="h-8 w-8 text-emerald-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Assignments</p>
                <p className="text-2xl font-bold text-orange-600">
                  {assignments.filter(a => !a.submitted).length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Overall Grade</p>
                <p className="text-2xl font-bold text-blue-600">
                  {getOverallGrade()}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">AI Assistant</p>
                <p className="text-sm font-medium text-purple-600">Available 24/7</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Assignments Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Assignments</h2>
              <BookOpen className="h-6 w-6 text-emerald-600" />
            </div>

            <div className="space-y-4">
              {assignments.slice(0, 5).map((assignment: any, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {assignment.subject_name}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        Due: {new Date(assignment.due_date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      {assignment.submitted ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-1" />
                          <span className="text-sm font-medium">Submitted</span>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center text-orange-600">
                            <AlertCircle className="h-5 w-5 mr-1" />
                            <span className="text-sm font-medium">Pending</span>
                          </div>
                          <label className="bg-emerald-600 text-white px-3 py-1 rounded text-sm cursor-pointer hover:bg-emerald-700 transition-colors">
                            <Upload className="h-4 w-4 inline mr-1" />
                            Upload
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(assignment.id, file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Results</h2>
              <BarChart3 className="h-6 w-6 text-emerald-600" />
            </div>

            <div className="space-y-4">
              {results.slice(0, 5).map((result: any, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {result.subject_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {result.exam_type}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">
                        {result.marks}/{result.max_marks}
                      </div>
                      <div className="text-sm text-gray-600">
                        Grade: {result.grade}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI Assistant Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">AI Study Assistant</h3>
              <p className="text-purple-100">
                Get instant help with your studies, assignments, and career guidance
              </p>
            </div>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <MessageSquare className="h-5 w-5 inline mr-2" />
              Start Chat
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;