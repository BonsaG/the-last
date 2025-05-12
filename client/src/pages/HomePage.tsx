import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, Users, Bath, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { usePropertyStore } from '../store/propertyStore';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { fetchProperties } = usePropertyStore();
  const [searchLocation, setSearchLocation] = useState('');
  
  // Fetch properties when component mounts
  React.useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Navigate to properties page with search parameter
    navigate(`/properties?location=${encodeURIComponent(searchLocation)}`);
  };
  
  // Mock featured properties (in a real app, these would come from the API)
  const featuredProperties: Property[] = [
    {
      id: '1',
      title: 'Modern Apartment with City View',
      description: 'A beautiful modern apartment with panoramic city views.',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
      price: 1500,
      bedrooms: 2,
      bathrooms: 1,
      area: 850,
      amenities: ['WiFi', 'Air Conditioning', 'Gym', 'Parking', 'Swimming Pool'],
      images: [
        'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      ],
      availabilityCalendar: [],
      landlordId: '2',
      landlordName: 'Jane Smith',
      createdAt: '2023-01-15T10:00:00Z',
      updatedAt: '2023-01-15T10:00:00Z',
      status: 'available',
      reviews: [],
      averageRating: 4.5,
    },
    {
      id: '2',
      title: 'Cozy Studio in Downtown',
      description: 'A cozy studio apartment in the heart of downtown.',
      address: {
        street: '456 Park Ave',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'USA',
      },
      price: 1200,
      bedrooms: 0,
      bathrooms: 1,
      area: 500,
      amenities: ['WiFi', 'Heating', 'Washer/Dryer', 'Kitchen'],
      images: [
        'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg',
      ],
      availabilityCalendar: [],
      landlordId: '2',
      landlordName: 'Jane Smith',
      createdAt: '2023-02-10T09:30:00Z',
      updatedAt: '2023-02-10T09:30:00Z',
      status: 'available',
      reviews: [],
      averageRating: 3,
    },
    {
      id: '3',
      title: 'Spacious Family Home with Garden',
      description: 'A beautiful spacious family home with a large garden.',
      address: {
        street: '789 Oak St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA',
      },
      price: 2500,
      bedrooms: 3,
      bathrooms: 2.5,
      area: 1800,
      amenities: ['Garden', 'Garage', 'Fireplace', 'WiFi', 'Washer/Dryer', 'Heating'],
      images: [
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      ],
      availabilityCalendar: [],
      landlordId: '6',
      landlordName: 'Robert Taylor',
      createdAt: '2023-01-05T11:45:00Z',
      updatedAt: '2023-01-05T11:45:00Z',
      status: 'available',
      reviews: [],
      averageRating: 4.5,
    },
  ];
  
  // Features section content
  const features = [
    {
      title: 'Find Your Dream Rental',
      description: 'Browse thousands of rental properties with detailed filters to find your perfect match.',
      icon: <Home className="w-12 h-12 text-primary-600 dark:text-primary-400" />,
    },
    {
      title: 'Easy Booking Process',
      description: 'Our streamlined booking process makes it simple to reserve your new home with just a few clicks.',
      icon: <Calendar className="w-12 h-12 text-primary-600 dark:text-primary-400" />,
    },
    {
      title: 'Verified Landlords',
      description: 'All our landlords are verified to ensure you have a safe and reliable renting experience.',
      icon: <Shield className="w-12 h-12 text-primary-600 dark:text-primary-400" />,
    },
  ];
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-24 px-4 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-screen-xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Rental Home</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover thousands of rental properties in your area. Easy booking, verified landlords, and a seamless experience.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
              <div className="flex items-center flex-grow bg-gray-50 dark:bg-gray-700 rounded-md p-2 mb-2 md:mb-0 md:mr-2">
                <MapPin className="text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Search by city, state, or zip..."
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800 dark:text-gray-200"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
              >
                <Search size={20} className="mr-2" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section className="py-16 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Featured Properties</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our handpicked selection of the best rental properties available now.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div key={property.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={property.images[0]} 
                    alt={property.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 bg-primary-600 text-white px-3 py-1 rounded-tr-md">
                    ${property.price}/month
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span>
                      {property.address.city}, {property.address.state}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Home size={16} className="mr-1" />
                      <span>{property.area} sq ft</span>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-1" />
                      <span>{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath size={16} className="mr-1" />
                      <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/properties/${property.id}`)}
                    className="w-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 py-2 rounded-md flex items-center justify-center transition-colors duration-200 hover:bg-primary-100 dark:hover:bg-primary-900/30"
                  >
                    <span>View Details</span>
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button
              onClick={() => navigate('/properties')}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md transition-colors duration-200 inline-flex items-center"
            >
              <span>View All Properties</span>
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose HomeRental</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We make finding and booking your next home simple, secure, and stress-free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <div className="mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-screen-lg mx-auto bg-gradient-to-r from-accent-500 to-amber-600 rounded-lg overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between p-8">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Are You a Property Owner?</h2>
              <p className="text-white text-opacity-90 max-w-md">
                List your properties on our platform and reach thousands of potential tenants. It's free and easy to get started.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-accent-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors duration-200 flex items-center"
              >
                <span>List Your Property</span>
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Add these components
const Calendar = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

const Shield = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default HomePage;