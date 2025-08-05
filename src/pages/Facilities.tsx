import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Home, 
  Monitor, 
  Trophy, 
  Bus, 
  Coffee,
  Microscope,
  Users,
  Wifi,
  Shield
} from 'lucide-react';

const Facilities = () => {
  const facilities = [
    {
      icon: BookOpen,
      title: 'Library',
      description: 'Well-stocked library with over 10,000 books, journals, and digital resources.',
      features: ['Academic Books', 'Reference Materials', 'Digital Library', 'Reading Rooms', 'Internet Access'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Home,
      title: 'Hostel',
      description: 'Comfortable accommodation facilities for outstation students.',
      features: ['Separate Boys & Girls Hostels', '24/7 Security', 'Mess Facilities', 'Wi-Fi Connectivity', 'Recreation Room'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Monitor,
      title: 'Computer Lab',
      description: 'Modern computer laboratory with latest hardware and software.',
      features: ['50+ Computers', 'High-Speed Internet', 'Latest Software', 'Printing Facilities', 'Technical Support'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Trophy,
      title: 'Sports & Games',
      description: 'Comprehensive sports facilities for physical fitness and recreation.',
      features: ['Cricket Ground', 'Basketball Court', 'Volleyball Court', 'Indoor Games', 'Sports Equipment'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Bus,
      title: 'Transportation',
      description: 'Reliable transport service connecting various parts of the city.',
      features: ['Multiple Routes', 'Safe & Comfortable', 'Experienced Drivers', 'Regular Maintenance', 'Affordable Fees'],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Coffee,
      title: 'Canteen',
      description: 'Hygienic canteen serving nutritious and affordable meals.',
      features: ['Healthy Food', 'Affordable Prices', 'Hygienic Environment', 'Variety of Options', 'Seating Area'],
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Microscope,
      title: 'Modern Laboratories',
      description: 'Well-equipped laboratories for practical learning and research.',
      features: ['Chemistry Lab', 'Physics Lab', 'Biology Lab', 'Geography Lab', 'Safety Equipment'],
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Users,
      title: 'Experienced Faculty',
      description: 'Qualified and experienced faculty members dedicated to student success.',
      features: ['PhD Holders', 'Industry Experience', 'Research Publications', 'Student Mentoring', 'Continuous Training'],
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const additionalFacilities = [
    {
      icon: Wifi,
      title: 'Wi-Fi Campus',
      description: 'High-speed internet connectivity throughout the campus'
    },
    {
      icon: Shield,
      title: 'Security',
      description: '24/7 security with CCTV surveillance for student safety'
    },
    {
      icon: Users,
      title: 'Anti-Ragging Committee',
      description: 'Active committee ensuring a safe and harassment-free environment'
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Campus Facilities</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Discover our world-class facilities designed to enhance your learning experience 
              and campus life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Facilities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Facilities</h2>
            <p className="text-lg text-gray-600">Everything you need for a complete educational experience</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-r ${facility.color} p-6 text-white`}>
                  <div className="flex items-center mb-4">
                    <facility.icon className="h-8 w-8 mr-3" />
                    <h3 className="text-2xl font-bold">{facility.title}</h3>
                  </div>
                  <p className="text-white/90">{facility.description}</p>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {facility.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Facilities */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Additional Amenities</h2>
            <p className="text-lg text-gray-600">Extra facilities that make our campus special</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalFacilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <facility.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{facility.title}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Our Campus?</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our campus is designed to provide a holistic educational experience. From state-of-the-art 
                laboratories to comfortable living spaces, every facility is crafted with student needs in mind.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that a conducive learning environment is essential for academic success. 
                Our facilities support both curricular and extracurricular activities, ensuring 
                comprehensive development of our students.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                  <p className="text-gray-600">Security & Support</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
                  <p className="text-gray-600">Wi-Fi Coverage</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                  <p className="text-gray-600">Computer Systems</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
                  <p className="text-gray-600">Library Books</p>
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
                <h3 className="text-2xl font-bold mb-6">Campus Highlights</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <span>Modern Learning Spaces</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Monitor className="h-4 w-4" />
                    </div>
                    <span>Technology-Enabled Classrooms</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Trophy className="h-4 w-4" />
                    </div>
                    <span>Sports & Recreation Areas</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Home className="h-4 w-4" />
                    </div>
                    <span>Comfortable Accommodation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4" />
                    </div>
                    <span>Safe & Secure Environment</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facilities;