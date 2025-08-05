import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowRight, GraduationCap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'credentials' | 'role'>('credentials');
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.userId && formData.password) {
      setStep('role');
      setError('');
    } else {
      setError('Please enter both User ID and Password');
    }
  };

  const handleRoleSelection = async (selectedRole: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: formData.userId,
          password: formData.password,
          role: selectedRole
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store tokens
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('user_data', JSON.stringify(data.user));

        onLogin(data.user);

        // Redirect based on role
        if (selectedRole === 'student') {
          navigate('/student-dashboard');
        } else {
          navigate('/admin-dashboard');
        }
      } else {
        setError(data.message || 'Login failed');
        setStep('credentials'); // Go back to credentials step
      }
    } catch (error) {
      setError('Network error. Please try again.');
      setStep('credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep('credentials');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <GraduationCap className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">SDS Badamia College</h1>
            <p className="text-emerald-100">Student Portal Login</p>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === 'credentials' && (
                <motion.div
                  key="credentials"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleCredentialsSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        User ID
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.userId}
                          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your Enrollment ID or Email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 'role' && (
                <motion.div
                  key="role"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Select Your Role
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Choose how you want to access the portal
                    </p>
                  </div>

                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRoleSelection('student')}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                    >
                      <GraduationCap className="mr-3 h-6 w-6" />
                      I'm a Student
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRoleSelection('admin')}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                    >
                      <Users className="mr-3 h-6 w-6" />
                      I'm College Staff / Admin
                    </motion.button>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mt-4"
                    >
                      {error}
                    </motion.div>
                  )}

                  <button
                    onClick={handleBack}
                    className="w-full mt-4 text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors duration-200"
                  >
                    ← Back to login
                  </button>

                  {loading && (
                    <div className="flex items-center justify-center mt-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                      <span className="ml-2 text-sm text-gray-600">Logging in...</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 text-center">
            <p className="text-xs text-gray-500">
              Need help? Contact{' '}
              <a href="mailto:admin@sdsbadamiacollege.com" className="text-emerald-600 hover:underline">
                admin@sdsbadamiacollege.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;