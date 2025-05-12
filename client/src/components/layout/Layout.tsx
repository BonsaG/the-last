import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuthStore } from '../../store/authStore';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const showSidebar = isAuthenticated && ['admin', 'landlord'].includes(user?.role || '');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <div className="flex flex-grow">
        {showSidebar && <Sidebar />}
        <main className={`flex-grow p-4 md:p-8 ${showSidebar ? 'md:ml-64' : ''}`}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;