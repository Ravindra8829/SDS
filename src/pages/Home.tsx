import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  Calendar, 
  Bell,
  ArrowRight,
  MapPin,
  Clock,
  Star
} from 'lucide-react';

const Home = () => {
  const stats = [
    { icon: GraduationCap, label: 'Years of Excellence', value: '17+' },
    { icon: Users, label: 'Students Enrolled', value: '2000+' },
    { icon: BookOpen, label: 'Academic Programs', value: '10+' },
    { icon: Award, label: 'Experienced Faculty', value: '50+' },
  ];

  const quickLinks = [
    { title: 'Apply Now', description: 'Start your admission process', link: '/contact', color: 'bg-primary-500' },
    { title: 'Academic Calendar', description: 'View important dates', link: '/downloads', color: 'bg-secondary-500' },
    { title: 'Examination Portal', description: 'Access exam information', link: '/downloads', color: 'bg-green-500' },
    { title: 'Notice Board', description: 'Latest announcements', link: '/events', color: 'bg-purple-500' },
  ];

  const recentEvents = [
    {
      title: 'Fire Safety Workshop',
      date: 'April 17, 2025',
      description: 'One-day comprehensive fire safety training program for students and staff.',
      type: 'Workshop'
    },
    {
      title: 'Rangoli Competition',
      date: 'October 9, 2024',
      description: 'Traditional art competition celebrating cultural heritage.',
      type: 'Competition'
    },
    {
      title: 'Banking Awareness Program',
      date: 'October 9, 2024',
      description: 'Educational program on modern banking and financial literacy.',
      type: 'Seminar'
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-secondary-600 to-purple-700"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Welcome to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                SDS Badamia College
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Shri Dhanraj ji Shree Chand ji Badamia College of Professional Studies
            </p>
            <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto">
              Established in 2007 • Affiliated with Jay Narayan Vyas University, Jodhpur • 
              Empowering students with quality education in Varkana, Rajasthan
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/courses"
              className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Courses
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
            >
              Apply Now
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                About Our Institution
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                SDS Badamia College of Professional Studies has been a beacon of quality education 
                since 2007. Located in Varkana, Rajasthan, we are affiliated with Jay Narayan Vyas 
                University, Jodhpur, and operate under UGC guidelines.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our institution is governed by SPJV Varkana and supported by dedicated professionals 
                and the Jain community, ensuring a nurturing environment for academic excellence.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-sm opacity-90">Varkana, Rajasthan</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2" />
                    <h4 className="font-semibold">Established</h4>
                    <p className="text-sm opacity-90">2007</p>
                  </div>
                  <div className="text-center">
                    <GraduationCap className="h-8 w-8 mx-auto mb-2" />
                    <h4 className="font-semibold">Affiliation</h4>
                    <p className="text-sm opacity-90">JNVU, Jodhpur</p>
                  </div>
                  <div className="text-center">
                    <Star className="h-8 w-8 mx-auto mb-2" />
                    <h4 className="font-semibold">Recognition</h4>
                    <p className="text-sm opacity-90">UGC Approved</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Quick Access</h2>
            <p className="text-lg text-gray-600">Essential links for students and parents</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={link.link}
                  className={`block ${link.color} text-white p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                  <p className="text-sm opacity-90">{link.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Events */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Recent Events</h2>
            <p className="text-lg text-gray-600">Stay updated with our latest activities</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {event.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/events"
              className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300"
            >
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;