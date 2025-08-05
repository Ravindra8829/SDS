import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Calendar, BookOpen, Users, Award, X, User, Mail, Phone } from 'lucide-react';

type Subject = {
  _id: string;
  name: string;
  code?: string;
  department?: string;
  credits?: number;
  description?: string;
};

const Downloads = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/public/subjects');
      if (response.ok) {
        const data = await response.json();
        setSubjects(data);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleDownloadRequest = (subject: any) => {
    setSelectedSubject(subject);
    setShowDownloadForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSubject) {
      alert('No subject selected.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/public/download-syllabus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subjectId: selectedSubject._id
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Trigger download
        const link = document.createElement('a');
        link.href = `http://localhost:5000${data.downloadUrl}`;
        link.download = `${selectedSubject.name}_Syllabus.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset form
        setFormData({ name: '', email: '', phone: '' });
        setShowDownloadForm(false);
        setSelectedSubject(null);
        
        alert('Download started! Thank you for your interest.');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to process download');
      }
    } catch (error) {
      alert('Error processing download. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadCategories = [
    {
      title: 'Prospectus & Forms',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      items: [
        { name: 'College Prospectus 2024-25', size: '2.5 MB', type: 'PDF' },
        { name: 'Admission Form (UG)', size: '1.2 MB', type: 'PDF' },
        { name: 'Admission Form (PG)', size: '1.3 MB', type: 'PDF' },
        { name: 'Anti-Ragging Affidavit', size: '0.8 MB', type: 'PDF' },
        { name: 'Fee Structure 2024-25', size: '0.5 MB', type: 'PDF' }
      ]
    },
    {
      title: 'Academic Calendar',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      items: [
        { name: 'Academic Calendar 2024-25', size: '1.1 MB', type: 'PDF' },
        { name: 'Examination Schedule', size: '0.9 MB', type: 'PDF' },
        { name: 'Holiday List 2024', size: '0.3 MB', type: 'PDF' },
        { name: 'Important Dates', size: '0.4 MB', type: 'PDF' }
      ]
    },
    {
      title: 'Rules & Regulations',
      icon: Users,
      color: 'from-red-500 to-red-600',
      items: [
        { name: 'Student Handbook', size: '1.8 MB', type: 'PDF' },
        { name: 'Examination Rules', size: '1.2 MB', type: 'PDF' },
        { name: 'Hostel Rules', size: '0.9 MB', type: 'PDF' },
        { name: 'Library Rules', size: '0.6 MB', type: 'PDF' },
        { name: 'Code of Conduct', size: '1.1 MB', type: 'PDF' }
      ]
    }
  ];

  const handleDownload = (fileName: string) => {
    // In a real application, this would trigger an actual download
    alert(`Downloading ${fileName}...`);
  };

  const DownloadForm = () => (
    <AnimatePresence>
      {showDownloadForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDownloadForm(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Download Syllabus</h3>
              <button
                onClick={() => setShowDownloadForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6 p-4 bg-emerald-50 rounded-lg">
              <h4 className="font-semibold text-emerald-800">{selectedSubject?.name}</h4>
              <p className="text-sm text-emerald-600">{selectedSubject?.code} - {selectedSubject?.department}</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDownloadForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  {loading ? 'Processing...' : 'Download'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Downloads</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Access important documents, forms, syllabi, and academic resources
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Syllabi Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Course Syllabi</h2>
            <p className="text-lg text-gray-600">Download detailed syllabi for our academic programs</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <BookOpen className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                    <p className="text-sm text-gray-600">{subject.code}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Department:</strong> {subject.department}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Credits:</strong> {subject.credits}
                  </p>
                  {subject.description && (
                    <p className="text-sm text-gray-600">{subject.description}</p>
                  )}
                </div>

                <button
                  onClick={() => handleDownloadRequest(subject)}
                  className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Syllabus
                </button>
                
                {/* Comment placeholder for syllabus upload */}
                {/* 
                  College staff can upload syllabus files here:
                  - Navigate to Admin Dashboard
                  - Go to Subjects section
                  - Click "Upload Syllabus" for each subject
                  - Supported formats: PDF, DOC, DOCX
                */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Download Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Other Documents</h2>
            <p className="text-lg text-gray-600">Essential forms and information documents</p>
          </motion.div>

          <div className="space-y-12">
            {downloadCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                  <div className="flex items-center">
                    <category.icon className="h-8 w-8 mr-3" />
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: itemIndex * 0.05 }}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                              <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                                {item.type}
                              </span>
                              <span>{item.size}</span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleDownload(item.name)}
                          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Quick Access</h2>
            <p className="text-lg text-gray-600">Frequently downloaded documents</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Admission Form', icon: FileText, color: 'bg-blue-500' },
              { name: 'Fee Structure', icon: Award, color: 'bg-green-500' },
              { name: 'Academic Calendar', icon: Calendar, color: 'bg-purple-500' },
              { name: 'Student Handbook', icon: BookOpen, color: 'bg-orange-500' }
            ].map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleDownload(item.name)}
                className={`${item.color} text-white p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <item.icon className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm opacity-90 mt-1">Quick Download</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <DownloadForm />
    </div>
  );
};

export default Downloads;