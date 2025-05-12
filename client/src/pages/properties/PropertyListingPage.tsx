import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, SlidersHorizontal, Home, MapPin, DollarSign, Users, Bath, X } from 'lucide-react';
import { usePropertyStore } from '../../store/propertyStore';
import { Property } from '../../types';
import PropertyCard from '../../components/properties/PropertyCard';

const PropertyListingPage: React.FC = () => {
  const location = useLocation();
  const { properties, filteredProperties, fetchProperties, filterProperties, clearFilters } = usePropertyStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  // Filter states
  const [searchLocation, setSearchLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  // Common amenities
  const amenitiesList = [
    'WiFi', 'Air Conditioning', 'Heating', 'Kitchen', 'Washer/Dryer', 
    'Parking', 'Gym', 'Swimming Pool', 'Balcony', 'Garden',
    'Fireplace', 'TV', 'Dishwasher', 'Pet Friendly'
  ];
  
  // Load properties on component mount
  useEffect(() => {
    const loadProperties = async () => {
      await fetchProperties();
      setIsLoading(false);
    };
    
    loadProperties();
  }, [fetchProperties]);
  
  // Parse query params for initial search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const locationParam = params.get('location');
    
    if (locationParam) {
      setSearchLocation(locationParam);
      
      filterProperties({
        location: locationParam
      });
    }
  }, [location.search, filterProperties]);
  
  // Toggle filter panel for mobile
  const toggleFilterPanel = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  
  // Handle amenity selection
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };
  
  // Apply filters
  const applyFilters = () => {
    filterProperties({
      location: searchLocation,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
      bathrooms: bathrooms ? parseFloat(bathrooms) : undefined,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
    });
    
    // Close filter panel on mobile after applying
    if (window.innerWidth < 768) {
      setIsFilterVisible(false);
    }
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchLocation('');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('');
    setBathrooms('');
    setSelectedAmenities([]);
    clearFilters();
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Rental Properties</h1>
        <p className="text-gray-600 dark:text-gray-300">
          {filteredProperties.length} properties found
        </p>
      </div>
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleFilterPanel}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-700 dark:text-gray-200"
        >
          <SlidersHorizontal size={16} />
          <span>Filters</span>
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Panel */}
        <aside 
          className={`
            ${isFilterVisible ? 'fixed inset-0 z-40 bg-white dark:bg-gray-900 overflow-auto' : 'hidden'} 
            md:sticky md:block md:top-24 md:h-[calc(100vh-10rem)] md:overflow-auto
            w-full md:w-64 md:flex-shrink-0 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md
          `}
        >
          {/* Mobile Filter Header */}
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
            <button 
              onClick={toggleFilterPanel}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Location Search */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="location"
                  type="text"
                  placeholder="City, state, or zip"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
            </div>
            
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <span className="text-gray-500 dark:text-gray-400">-</span>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Bedrooms */}
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bedrooms
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="bedrooms"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white appearance-none"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Bathrooms */}
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bathrooms
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Bath className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="bathrooms"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white appearance-none"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="1.5">1.5+</option>
                  <option value="2">2+</option>
                  <option value="2.5">2.5+</option>
                  <option value="3">3+</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amenities
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {amenitiesList.map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      id={`amenity-${amenity}`}
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                    />
                    <label
                      htmlFor={`amenity-${amenity}`}
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Filter Actions */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <button
                onClick={applyFilters}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </aside>
        
        {/* Property Grid */}
        <div className="flex-grow">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
              <Home className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No properties found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Try adjusting your filters to find properties that match your criteria.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add these components
const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default PropertyListingPage;