import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  Home, 
  Building2, 
  Users, 
  BarChart4, 
  FileText, 
  Settings, 
  CreditCard,
  Calendar,
  Plus
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  
  // Only show sidebar for admin or landlord users
  if (!user || !['admin', 'landlord'].includes(user.role)) {
    return null;
  }
  
  // Define navigation items based on user role
  const getNavItems = () => {
    if (user.role === 'admin') {
      return [
        { path: '/admin/dashboard', label: 'Dashboard', icon: <BarChart4 size={20} /> },
        { path: '/admin/users', label: 'Manage Users', icon: <Users size={20} /> },
        { path: '/admin/listings', label: 'Manage Listings', icon: <Building2 size={20} /> },
        { path: '/admin/reports', label: 'Reports', icon: <FileText size={20} /> },
        { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
      ];
    } else if (user.role === 'landlord') {
      return [
        { path: '/landlord/dashboard', label: 'Dashboard', icon: <BarChart4 size={20} /> },
        { path: '/landlord/properties', label: 'My Properties', icon: <Home size={20} /> },
        { path: '/landlord/properties/add', label: 'Add Property', icon: <Plus size={20} /> },
        { path: '/landlord/bookings', label: 'Bookings', icon: <Calendar size={20} /> },
        { path: '/landlord/payments', label: 'Payments', icon: <CreditCard size={20} /> },
      ];
    }
    return [];
  };
  
  const navItems = getNavItems();
  
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 shadow-md z-10 hidden md:block transition-transform duration-300 transform">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {user.role === 'admin' ? 'Admin Panel' : 'Landlord Panel'}
          </div>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
                  isActive 
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;