import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">SDS Badamia College</h3>
                <p className="text-sm text-gray-400">Professional Studies</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Shri Dhanraj ji Shree Chand ji Badamia College of Professional Studies, established in 2007, 
              affiliated with Jay Narayan Vyas University, Jodhpur.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="text-gray-300 hover:text-primary-400 transition-colors">Courses</Link></li>
              <li><Link to="/facilities" className="text-gray-300 hover:text-primary-400 transition-colors">Facilities</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-primary-400 transition-colors">Events</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-primary-400 transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Academic Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Academic Programs</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">B.A. (Bachelor of Arts)</li>
              <li className="text-gray-300">B.Sc. (Bachelor of Science)</li>
              <li className="text-gray-300">B.Com (Bachelor of Commerce)</li>
              <li className="text-gray-300">B.C.A (Computer Applications)</li>
              <li className="text-gray-300">B.B.A (Business Administration)</li>
              <li className="text-gray-300">M.A. in Geography</li>
              <li className="text-gray-300">M.Com & M.Sc Programs</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Varkana, Rajasthan<br />
                  India
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">+91 XXXXX XXXXX</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">info@sdsbadamiacollege.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 SDS Badamia College of Professional Studies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;