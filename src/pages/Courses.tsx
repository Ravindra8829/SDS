import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Award, Download } from 'lucide-react';

const Courses = () => {
  const undergraduateCourses = [
    {
      name: 'B.A. (Bachelor of Arts)',
      duration: '3 Years',
      eligibility: '10+2 from recognized board',
      description: 'Comprehensive arts program covering literature, history, political science, and more.',
      subjects: ['English Literature', 'Hindi Literature', 'History', 'Political Science', 'Geography']
    },
    {
      name: 'B.Sc. (Bachelor of Science)',
      duration: '3 Years',
      eligibility: '10+2 with Science subjects',
      description: 'Science program with specializations in various scientific disciplines.',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science']
    },
    {
      name: 'B.Com (Bachelor of Commerce)',
      duration: '3 Years',
      eligibility: '10+2 from recognized board',
      description: 'Commerce program focusing on business, accounting, and economics.',
      subjects: ['Accounting', 'Business Studies', 'Economics', 'Business Law', 'Statistics']
    },
    {
      name: 'B.C.A (Bachelor of Computer Applications)',
      duration: '3 Years',
      eligibility: '10+2 with Mathematics',
      description: 'Computer applications program for aspiring IT professionals.',
      subjects: ['Programming', 'Database Management', 'Web Development', 'Software Engineering', 'Networking']
    },
    {
      name: 'B.B.A (Bachelor of Business Administration)',
      duration: '3 Years',
      eligibility: '10+2 from recognized board',
      description: 'Business administration program for future managers and entrepreneurs.',
      subjects: ['Management', 'Marketing', 'Finance', 'Human Resources', 'Operations Management']
    }
  ];

  const postgraduateCourses = [
    {
      name: 'M.A. in Geography',
      duration: '2 Years',
      eligibility: 'B.A. with Geography or related field',
      description: 'Advanced study of geographical concepts and research methodologies.',
      subjects: ['Physical Geography', 'Human Geography', 'GIS & Remote Sensing', 'Environmental Geography']
    },
    {
      name: 'M.Com in Business Administration',
      duration: '2 Years',
      eligibility: 'B.Com or equivalent degree',
      description: 'Advanced commerce program with business administration focus.',
      subjects: ['Advanced Accounting', 'Business Management', 'Financial Management', 'Marketing Management']
    },
    {
      name: 'M.Com in Accounting',
      duration: '2 Years',
      eligibility: 'B.Com or equivalent degree',
      description: 'Specialized program in advanced accounting and financial management.',
      subjects: ['Advanced Financial Accounting', 'Cost Accounting', 'Auditing', 'Taxation']
    },
    {
      name: 'M.Sc in Chemistry',
      duration: '2 Years',
      eligibility: 'B.Sc. with Chemistry',
      description: 'Advanced chemistry program with research opportunities.',
      subjects: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry']
    },
    {
      name: 'M.Sc in Botany',
      duration: '2 Years',
      eligibility: 'B.Sc. with Biology/Botany',
      description: 'Advanced study of plant sciences and botanical research.',
      subjects: ['Plant Physiology', 'Plant Ecology', 'Plant Taxonomy', 'Plant Biotechnology']
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Academic Programs</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Explore our comprehensive range of undergraduate and postgraduate courses 
              designed to shape your future
            </p>
          </motion.div>
        </div>
      </section>

      {/* Undergraduate Courses */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Undergraduate Courses</h2>
            <p className="text-lg text-gray-600">Bachelor's degree programs for your career foundation</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {undergraduateCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <BookOpen className="h-8 w-8" />
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">UG</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-primary-600" />
                      <span><strong>Duration:</strong> {course.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-primary-600" />
                      <span><strong>Eligibility:</strong> {course.eligibility}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Key Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.subjects.map((subject, idx) => (
                        <span
                          key={idx}
                          className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Syllabus
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Postgraduate Courses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Postgraduate Courses</h2>
            <p className="text-lg text-gray-600">Master's degree programs for advanced specialization</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postgraduateCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-secondary-500 to-purple-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <Award className="h-8 w-8" />
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">PG</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-secondary-600" />
                      <span><strong>Duration:</strong> {course.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-secondary-600" />
                      <span><strong>Eligibility:</strong> {course.eligibility}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Key Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.subjects.map((subject, idx) => (
                        <span
                          key={idx}
                          className="bg-secondary-50 text-secondary-700 px-2 py-1 rounded text-xs"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-secondary-600 text-white py-2 rounded-lg hover:bg-secondary-700 transition-colors duration-300 flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Syllabus
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Admission Information</h2>
            <p className="text-lg text-gray-600">Important details for prospective students</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Admission Process</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Online application submission</li>
                <li>• Document verification</li>
                <li>• Merit-based selection</li>
                <li>• Fee payment and enrollment</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-secondary-50 to-purple-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Required Documents</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 10th & 12th mark sheets</li>
                <li>• Transfer certificate</li>
                <li>• Character certificate</li>
                <li>• Passport size photographs</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-purple-50 to-primary-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Important Dates</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Application starts: June</li>
                <li>• Last date: July</li>
                <li>• Merit list: August</li>
                <li>• Classes begin: August</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;