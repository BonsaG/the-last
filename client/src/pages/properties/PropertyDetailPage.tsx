import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePropertyStore } from '../../store/propertyStore';
import { useAuthStore } from '../../store/authStore';
import { MapPin, Home, Users, Bath, Star, Calendar, DollarSign, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPropertyById, selectedProperty } = usePropertyStore();
  const { isAuthenticated, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDates, setBookingDates] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const loadProperty = async () => {
      if (id) {
        try {
          await fetchPropertyById(id);
          setIsLoading(false);
        } catch (error) {
          toast.error('Failed to load property details');
          navigate('/properties');
        }
      }
    };

    loadProperty();
  }, [id, fetchPropertyById, navigate]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to book a property');
      return;
    }

    if (user?.role !== 'tenant') {
      toast.error('Only tenants can book properties');
      return;
    }

    try {
      // TODO: Implement booking logic
      toast.success('Booking request sent successfully');
      setShowBookingForm(false);
    } catch (error) {
      toast.error('Failed to submit booking request');
    }
  };

  if (isLoading || !selectedProperty) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Images and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src={selectedProperty.images[selectedImage]}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                {selectedImage + 1} / {selectedProperty.images.length}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {selectedProperty.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg overflow-hidden h-24 ${
                    selectedImage === index ? 'ring-2 ring-primary-600' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedProperty.title}
              </h1>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin size={18} className="mr-1" />
                <span>
                  {selectedProperty.address.street}, {selectedProperty.address.city},{' '}
                  {selectedProperty.address.state} {selectedProperty.address.zipCode}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Home size={20} className="text-primary-600 dark:text-primary-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Area</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedProperty.area} sq ft
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Users size={20} className="text-primary-600 dark:text-primary-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Bedrooms</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedProperty.bedrooms}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Bath size={20} className="text-primary-600 dark:text-primary-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Bathrooms</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedProperty.bathrooms}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {selectedProperty.description}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedProperty.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="h-2 w-2 bg-primary-600 dark:bg-primary-400 rounded-full mr-2"></div>
                    <span className="text-gray-700 dark:text-gray-300">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Reviews
              </h2>
              {selectedProperty.reviews.length > 0 ? (
                <div className="space-y-4">
                  {selectedProperty.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                            <span className="text-primary-600 dark:text-primary-400 font-medium">
                              {review.tenantName[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {review.tenantName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star
                            size={16}
                            className="text-yellow-400 fill-yellow-400 mr-1"
                          />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${selectedProperty.price}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </p>
                  {selectedProperty.averageRating > 0 && (
                    <div className="flex items-center mt-1">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-yellow-400 mr-1"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {selectedProperty.averageRating} ({selectedProperty.reviews.length}{' '}
                        reviews)
                      </span>
                    </div>
                  )}
                </div>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.error('Please login to save properties');
                      return;
                    }
                    toast.success('Added to wishlist');
                  }}
                >
                  <Heart
                    size={24}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  />
                </button>
              </div>

              {showBookingForm ? (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Move-in Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      value={bookingDates.startDate}
                      onChange={(e) =>
                        setBookingDates({ ...bookingDates, startDate: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Move-out Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      value={bookingDates.endDate}
                      onChange={(e) =>
                        setBookingDates({ ...bookingDates, endDate: e.target.value })
                      }
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Submit Booking Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-md transition-colors duration-200"
                >
                  <Calendar size={20} />
                  <span>Book Now</span>
                </button>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Landlord
                </h3>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                    <span className="text-xl font-medium text-primary-600 dark:text-primary-400">
                      {selectedProperty.landlordName[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedProperty.landlordName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Member since{' '}
                      {new Date(selectedProperty.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;