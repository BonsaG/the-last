import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { usePropertyStore } from '../../store/propertyStore';
import { Building2, Users, CreditCard, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Property, DashboardStats } from '../../types';

const LandlordDashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { properties } = usePropertyStore();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalRevenue: 0,
    totalProperties: 0,
    activeListings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    recentReviews: [],
    bookingsByMonth: [],
    revenueByMonth: [],
  });

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data for demonstration
        const mockStats: DashboardStats = {
          totalBookings: 24,
          totalRevenue: 45600,
          totalProperties: properties.length,
          activeListings: properties.filter(p => p.status === 'available').length,
          pendingBookings: 3,
          completedBookings: 21,
          recentBookings: [],
          recentReviews: [],
          bookingsByMonth: [
            { month: 'Jan', count: 2 },
            { month: 'Feb', count: 4 },
            { month: 'Mar', count: 3 },
            { month: 'Apr', count: 5 },
            { month: 'May', count: 4 },
            { month: 'Jun', count: 6 },
          ],
          revenueByMonth: [
            { month: 'Jan', amount: 4000 },
            { month: 'Feb', amount: 6000 },
            { month: 'Mar', amount: 5500 },
            { month: 'Apr', amount: 7500 },
            { month: 'May', amount: 9000 },
            { month: 'Jun', amount: 13600 },
          ],
        };

        setStats(mockStats);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [properties]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, trend }: { title: string; value: string | number; icon: any; trend?: { value: number; isPositive: boolean } }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-semibold mt-2 text-gray-900 dark:text-white">{value}</h3>
          {trend && (
            <div className={`flex items-center mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span className="text-sm ml-1">{trend.value}%</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
          <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your properties
          </p>
        </div>
        <Link
          to="/landlord/properties/add"
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Add New Property
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Properties"
          value={stats.totalProperties}
          icon={Building2}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Active Tenants"
          value={stats.totalBookings - stats.pendingBookings}
          icon={Users}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={CreditCard}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Properties</h2>
            <Link
              to="/landlord/properties"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {properties.slice(0, 3).map((property: Property) => (
              <div key={property.id} className="flex items-center space-x-4">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {property.address.city}, {property.address.state}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ${property.price}
                  </p>
                  <p className={`text-sm ${
                    property.status === 'available' ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Reviews</h2>
          </div>
          <div className="space-y-4">
            {properties.flatMap(p => p.reviews).slice(0, 3).map((review) => (
              <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {review.tenantName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {review.comment}
                    </p>
                  </div>
                  <div className="flex items-center bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded">
                    <TrendingUp size={12} className="text-primary-600 dark:text-primary-400 mr-1" />
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {review.rating}/5
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboardPage;