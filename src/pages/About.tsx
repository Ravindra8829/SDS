import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Target, Eye, Users, Award, MapPin } from 'lucide-react';

const About = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our College</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Discover the rich history and commitment to excellence that defines 
              SDS Badamia College of Professional Studies
            </p>
          </motion.div>
        </div>
      </section>

      {/* College Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Institution</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Shri Dhanraj ji Shree Chand ji Badamia College of Professional Studies was established 
                in 2007 with a vision to provide quality higher education in the heart of Rajasthan. 
                Located in Varkana, our college has been serving the educational needs of the region 
                for over 17 years.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We are proudly affiliated with Jay Narayan Vyas University (JNVU), Jodhpur, and operate 
                under the guidelines of UGC (Government of India) and the Directorate of College Education, 
                Rajasthan. Our institution is managed by SPJV Varkana and supported by dedicated 
                professionals and the Jain community.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-primary-600" />
                  <span className="text-gray-700">Varkana, Rajasthan</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-6 w-6 text-primary-600" />
                  <span className="text-gray-700">JNVU Affiliated</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Key Highlights</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Award className="h-6 w-6" />
                    <span>UGC Recognized Institution</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6" />
                    <span>2000+ Students Enrolled</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="h-6 w-6" />
                    <span>10+ Academic Programs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="h-6 w-6" />
                    <span>17+ Years of Excellence</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Vision & Mission</h2>
            <p className="text-lg text-gray-600">Our guiding principles and aspirations</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Eye className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be a leading institution of higher education that empowers students with knowledge, 
                skills, and values necessary for personal growth and societal contribution. We aspire 
                to create global citizens who are academically excellent, ethically grounded, and 
                socially responsible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="bg-secondary-100 p-3 rounded-full mr-4">
                  <Target className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To provide quality education through innovative teaching methodologies, comprehensive 
                curriculum, and holistic development programs. We are committed to fostering an 
                environment of academic excellence, research, and community service while preserving 
                our cultural heritage and values.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Principal's Message</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Dr. [Principal Name]</h3>
                <p className="text-gray-600">Principal</p>
              </div>
              
              <blockquote className="text-lg text-gray-700 leading-relaxed italic text-center">
                "Welcome to SDS Badamia College of Professional Studies. As we continue our journey 
                of educational excellence, we remain committed to nurturing young minds and preparing 
                them for the challenges of tomorrow. Our institution stands as a beacon of quality 
                education, where tradition meets innovation, and where every student is encouraged 
                to reach their full potential. Together, we build not just careers, but character."
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Accreditations & Affiliations</h2>
            <p className="text-lg text-gray-600">Our institutional recognitions and partnerships</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">JNVU Affiliation</h3>
              <p className="text-gray-600">
                Affiliated with Jay Narayan Vyas University, Jodhpur for all academic programs
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">UGC Recognition</h3>
              <p className="text-gray-600">
                Recognized by University Grants Commission, Government of India
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">State Approval</h3>
              <p className="text-gray-600">
                Approved by Directorate of College Education, Government of Rajasthan
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;