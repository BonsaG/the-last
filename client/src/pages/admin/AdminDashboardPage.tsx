import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { usePropertyStore } from '../../store/propertyStore';
import { Building2, Users, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { properties } = usePropertyStore();
  const [isLoading, setIsLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    totalUsers: 0,
    activeUsers: 0,
    totalProperties: 0,
    totalRevenue: 0,
    recentUsers: [],
    recentProperties: [],
  });

  React.useEffect(() => {
    // Simulate fetching dashboard data
    const fetchDashboardData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalUsers: 156,
          activeUsers: 89,
          totalProperties: properties.length,
          totalRevenue: 75600,
          recentUsers: [],
          recentProperties: properties.slice(0, 5),
        });
        
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back, {user?.name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <h3 className="text-2xl font-semibold mt-2 text-gray-900 dark:text-white">
                {stats.totalUsers}
              </h3>
              <div className="flex items-center mt-2 text-green-600">
                <ArrowUpRight size={16} />
                <span className="text-sm ml-1">12%</span>
              </div>
            </div>
            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
              <h3 className="text-2xl font-semibold mt-2 text-gray-900 dark:text-white">
                {stats.activeUsers}
              </h3>
              <div className="flex items-center mt-2 text-green-600">
                <ArrowUpRight size={16} />
                <span className="text-sm ml-1">8%</span>
              </div>
            </div>
            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <Users className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Properties</p>
              <h3 className="text-2xl font-semibold mt-2 text-gray-900 dark:text-white">
                {stats.totalProperties}
              </h3>
              <div className="flex items-center mt-2 text-green-600">
                <ArrowUpRight size={16} />
                <span className="text-sm ml-1">15%</span>
              </div>
            </div>
            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <Building2 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <h3 className="text-2xl font-semibold mt-2 text-gray-900 dark:text-white">
                ${stats.totalRevenue.toLocaleString()}
              </h3>
              <div className="flex items-center mt-2 text-red-600">
                <ArrowDownRight size={16} />
                <span className="text-sm ml-1">3%</span>
              </div>
            </div>
            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <CreditCard className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Properties
            </h2>
            <Link
              to="/admin/listings"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {stats.recentProperties.map((property) => (
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

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    New property listed by <span className="font-medium">John Doe</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;