import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Building2, LogOut, User, Home, Heart, Calendar } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">HomeRental</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              Home
            </Link>
            <Link to="/properties" className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              Properties
            </Link>
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated && user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  <span>{user.name}</span>
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                <div className="absolute right-0 w-48 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden z-10 origin-top-right scale-0 group-hover:scale-100 transition-transform duration-200">
                  <div className="py-1">
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                    
                    {user.role === 'tenant' && (
                      <>
                        <Link to="/bookings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                          <Calendar size={16} />
                          <span>My Bookings</span>
                        </Link>
                        <Link to="/wishlist" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                          <Heart size={16} />
                          <span>Wishlist</span>
                        </Link>
                      </>
                    )}
                    
                    {user.role === 'landlord' && (
                      <Link to="/landlord/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                        <Home size={16} />
                        <span>My Properties</span>
                      </Link>
                    )}
                    
                    {user.role === 'admin' && (
                      <Link to="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                        <Building2 size={16} />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-200">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 shadow-md">
            <Link to="/" className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              Home
            </Link>
            <Link to="/properties" className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              Properties
            </Link>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            
            {isAuthenticated && user ? (
              <>
                <div className="px-3 py-2 text-gray-700 dark:text-gray-200 font-medium">
                  {user.name}
                </div>
                
                <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <User size={16} />
                  <span>Profile</span>
                </Link>
                
                {user.role === 'tenant' && (
                  <>
                    <Link to="/bookings" className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      <Calendar size={16} />
                      <span>My Bookings</span>
                    </Link>
                    <Link to="/wishlist" className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                      <Heart size={16} />
                      <span>Wishlist</span>
                    </Link>
                  </>
                )}
                
                {user.role === 'landlord' && (
                  <Link to="/landlord/dashboard" className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                    <Home size={16} />
                    <span>My Properties</span>
                  </Link>
                )}
                
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                    <Building2 size={16} />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-200">
                  Register
                </Link>
              </>
            )}
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-2 w-full px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;