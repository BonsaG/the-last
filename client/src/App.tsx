import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/user/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Tenant Pages
import PropertyListingPage from './pages/properties/PropertyListingPage';
import PropertyDetailPage from './pages/properties/PropertyDetailPage';
import BookingHistoryPage from './pages/tenant/BookingHistoryPage';
import WishlistPage from './pages/tenant/WishlistPage';

// Landlord Pages
import LandlordDashboardPage from './pages/landlord/LandlordDashboardPage';
import ManagePropertiesPage from './pages/landlord/ManagePropertiesPage';
import AddPropertyPage from './pages/landlord/AddPropertyPage';
import EditPropertyPage from './pages/landlord/EditPropertyPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageListingsPage from './pages/admin/ManageListingsPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="properties" element={<PropertyListingPage />} />
            <Route path="properties/:id" element={<PropertyDetailPage />} />
            
            {/* Auth Routes */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            
            {/* Tenant Routes */}
            <Route 
              path="bookings" 
              element={
                <ProtectedRoute allowedRoles={['tenant', 'admin']}>
                  <BookingHistoryPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="wishlist" 
              element={
                <ProtectedRoute allowedRoles={['tenant', 'admin']}>
                  <WishlistPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Landlord Routes */}
            <Route 
              path="landlord/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['landlord', 'admin']}>
                  <LandlordDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="landlord/properties" 
              element={
                <ProtectedRoute allowedRoles={['landlord', 'admin']}>
                  <ManagePropertiesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="landlord/properties/add" 
              element={
                <ProtectedRoute allowedRoles={['landlord', 'admin']}>
                  <AddPropertyPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="landlord/properties/edit/:id" 
              element={
                <ProtectedRoute allowedRoles={['landlord', 'admin']}>
                  <EditPropertyPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="admin/users" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageUsersPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="admin/listings" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageListingsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* User Routes */}
            <Route 
              path="profile" 
              element={
                <ProtectedRoute allowedRoles={['tenant', 'landlord', 'admin']}>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;