import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, Users, Bath, Star, Heart } from 'lucide-react';
import { Property } from '../../types';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [isFavorite, setIsFavorite] = React.useState(false);
  
  const handleViewDetails = () => {
    navigate(`/properties/${property.id}`);
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to save properties to your wishlist');
      return;
    }
    
    if (user?.role !== 'tenant') {
      toast.error('Only tenants can add properties to wishlist');
      return;
    }
    
    setIsFavorite(!isFavorite);
    toast.success(isFavorite 
      ? 'Removed from your wishlist' 
      : 'Added to your wishlist'
    );
  };
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white'
            } transition-colors duration-200`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 bg-primary-600 text-white px-3 py-1 rounded-tr-md">
          ${property.price}/month
        </div>
        {property.averageRating > 0 && (
          <div className="absolute bottom-0 right-0 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-tl-md flex items-center">
            <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
            <span>{property.averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
          <MapPin size={16} className="mr-1 flex-shrink-0" />
          <span className="truncate">
            {property.address.city}, {property.address.state}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
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
      </div>
    </div>
  );
};

export default PropertyCard;