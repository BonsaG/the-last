import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Building2, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { Booking, BookingStatus } from '../../types';
import { format } from 'date-fns';

const BookingHistoryPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching bookings
    const fetchBookings = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockBookings: Booking[] = [
          {
            id: '1',
            propertyId: '1',
            propertyTitle: 'Modern Apartment with City View',
            propertyImage: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
            tenantId: '3',
            tenantName: 'John Doe',
            landlordId: '2',
            startDate: '2024-03-01',
            endDate: '2024-03-31',
            totalPrice: 1500,
            status: 'confirmed',
            paymentStatus: 'paid',
            createdAt: '2024-02-15T10:00:00Z'
          },
          {
            id: '2',
            propertyId: '2',
            propertyTitle: 'Cozy Studio in Downtown',
            propertyImage: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg',
            tenantId: '3',
            tenantName: 'John Doe',
            landlordId: '2',
            startDate: '2024-04-01',
            endDate: '2024-04-30',
            totalPrice: 1200,
            status: 'pending',
            paymentStatus: 'pending',
            createdAt: '2024-02-20T14:30:00Z'
          }
        ];

        setBookings(mockBookings);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Booking History
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View and manage your property bookings
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4">
                  <img
                    src={booking.propertyImage}
                    alt={booking.propertyTitle}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {booking.propertyTitle}
                      </h3>
                      <div className="mt-2 flex items-center text-gray-600 dark:text-gray-400">
                        <MapPin size={16} className="mr-1" />
                        <span>Location details will be added here</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      {booking.paymentStatus === 'paid' ? (
                        <span className="flex items-center text-green-600 dark:text-green-400">
                          <CheckCircle size={16} className="mr-1" />
                          Paid
                        </span>
                      ) : (
                        <span className="flex items-center text-yellow-600 dark:text-yellow-400">
                          <Clock size={16} className="mr-1" />
                          Payment Pending
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <Calendar size={20} className="text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Check-in</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {format(new Date(booking.startDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={20} className="text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Check-out</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {format(new Date(booking.endDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <DollarSign size={20} className="text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Price</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          ${booking.totalPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {booking.status === 'pending' && (
                      <>
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200">
                          Pay Now
                        </button>
                        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                          Cancel Booking
                        </button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200">
                        View Details
                      </button>
                    )}
                    {booking.status === 'completed' && !booking.reviews?.length && (
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200">
                        Write Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No bookings yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            When you book a property, your reservations will appear here.
          </p>
          <a
            href="/properties"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Browse Properties
          </a>
        </div>
      )}
    </div>
  );
};

export default BookingHistoryPage;