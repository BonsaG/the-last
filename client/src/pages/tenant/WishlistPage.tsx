import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Building2 } from 'lucide-react';
import { Property } from '../../types';
import PropertyCard from '../../components/properties/PropertyCard';
import { usePropertyStore } from '../../store/propertyStore';

const WishlistPage: React.FC = () => {
  const { properties } = usePropertyStore();
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState<Property[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // For demo purposes, use first 3 properties as wishlist items
        setWishlist(properties.slice(0, 3));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [properties]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-red-500" fill="currentColor" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Wishlist
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {wishlist.length} saved properties
          </p>
        </div>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Save your favorite properties here by clicking the heart icon on any property listing.
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            Browse Properties
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;