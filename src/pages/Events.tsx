import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Award, BookOpen, Megaphone } from 'lucide-react';

const Events = () => {
  const upcomingEvents = [
    {
      title: 'Annual Science Exhibition',
      date: '2024-12-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Main Auditorium',
      type: 'Academic',
      description: 'Students will showcase their innovative science projects and research work.',
      participants: '200+ Students',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Cultural Fest 2024',
      date: '2024-12-20',
      time: '9:00 AM - 6:00 PM',
      location: 'College Campus',
      type: 'Cultural',
      description: 'Annual cultural festival featuring dance, music, drama, and art competitions.',
      participants: '500+ Students',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Career Guidance Workshop',
      date: '2024-12-25',
      time: '2:00 PM - 5:00 PM',
      location: 'Conference Hall',
      type: 'Workshop',
      description: 'Professional guidance session for final year students on career opportunities.',
      participants: '150+ Students',
      color: 'from-green-500 to-green-600'
    }
  ];

  const recentEvents = [
    {
      title: 'Fire Safety Workshop',
      date: '2024-04-17',
      type: 'Workshop',
      description: 'One-day comprehensive fire safety training program for students and staff.',
      highlights: ['Safety protocols training', 'Emergency evacuation drills', 'Fire extinguisher demonstration'],
      participants: '300+ Attendees'
    },
    {
      title: 'Rangoli Competition',
      date: '2024-10-09',
      type: 'Competition',
      description: 'Traditional art competition celebrating cultural heritage and creativity.',
      highlights: ['50+ participants', 'Traditional themes', 'Cash prizes for winners'],
      participants: '50+ Students'
    },
    {
      title: 'Banking Awareness Program',
      date: '2024-10-09',
      type: 'Seminar',
      description: 'Educational program on modern banking and financial literacy.',
      highlights: ['Digital banking overview', 'Financial planning tips', 'Q&A session'],
      participants: '200+ Students'
    },
    {
      title: 'Gandhi Jayanti Essay Contest',
      date: '2024-09-30',
      type: 'Competition',
      description: 'Essay writing competition on "Promoting Swadeshi Goods" theme.',
      highlights: ['Multiple language options', 'Expert judges panel', 'Publication opportunity'],
      participants: '100+ Students'
    }
  ];

  const notices = [
    {
      title: 'Winter Break Schedule',
      date: '2024-11-20',
      type: 'Notice',
      content: 'College will remain closed from December 25, 2024 to January 5, 2025 for winter break.'
    },
    {
      title: 'Examination Form Submission',
      date: '2024-11-18',
      type: 'Important',
      content: 'Last date for examination form submission is November 30, 2024. Late fees applicable after the deadline.'
    },
    {
      title: 'Library Timing Update',
      date: '2024-11-15',
      type: 'Update',
      content: 'Library will now remain open until 8:00 PM on weekdays and 6:00 PM on weekends.'
    },
    {
      title: 'Scholarship Applications Open',
      date: '2024-11-10',
      type: 'Opportunity',
      content: 'Merit-based scholarship applications are now open for eligible students. Apply before December 15, 2024.'
    }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'Academic': return BookOpen;
      case 'Cultural': return Users;
      case 'Workshop': return Award;
      default: return Calendar;
    }
  };

  const getNoticeColor = (type) => {
    switch (type) {
      case 'Important': return 'border-red-200 bg-red-50';
      case 'Update': return 'border-blue-200 bg-blue-50';
      case 'Opportunity': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Events & Notices</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Stay updated with our latest events, workshops, competitions, and important announcements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
            <p className="text-lg text-gray-600">Don't miss these exciting upcoming activities</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => {
              const IconComponent = getEventIcon(event.type);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`bg-gradient-to-r ${event.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="h-8 w-8" />
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        {event.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-primary-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-primary-600" />
                        <span>{event.participants}</span>
                      </div>
                    </div>

                    <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors duration-300">
                      Register Now
                    </button>
                  </div>
                </motion.div>
              );
            })}
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
            <p className="text-lg text-gray-600">Highlights from our recent activities and achievements</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {recentEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                    {event.type}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Event Highlights:</h4>
                  <ul className="space-y-1">
                    {event.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-primary-600" />
                  <span>{event.participants}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notices & Announcements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Notices & Announcements</h2>
            <p className="text-lg text-gray-600">Important updates and announcements for students</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {notices.map((notice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`border-l-4 p-6 rounded-r-xl ${getNoticeColor(notice.type)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Megaphone className="h-5 w-5 text-primary-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">{notice.title}</h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(notice.date).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-gray-700">{notice.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Registration CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Want to Stay Updated?</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest updates about events, 
              workshops, and important announcements directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events;