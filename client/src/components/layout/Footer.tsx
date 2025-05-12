import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">HomeRental</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Find your perfect rental property with our easy-to-use platform. We connect tenants with quality landlords.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Property Management
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Tenant Placement
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Property Maintenance
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Rent Collection
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin size={20} className="text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">
                  123 Rental Street, Apartment City, 10001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={20} className="text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={20} className="text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <a href="mailto:info@homerental.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  info@homerental.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {currentYear} HomeRental. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;