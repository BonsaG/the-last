import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePropertyStore } from '../../store/propertyStore';
import { useAuthStore } from '../../store/authStore';
import { Property } from '../../types';
import toast from 'react-hot-toast';
import { Building2, MapPin, DollarSign, Home, Users, Bath, Plus, Loader2 } from 'lucide-react';

// Define the form schema
const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
  bedrooms: z.number().min(0, 'Number of bedrooms must be 0 or greater'),
  bathrooms: z.number().min(0, 'Number of bathrooms must be 0 or greater'),
  area: z.number().min(1, 'Area must be greater than 0'),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'ZIP code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  amenities: z.array(z.string()).min(1, 'Select at least one amenity'),
  images: z.array(z.string()).min(1, 'Add at least one image'),
});

type PropertyFormData = z.infer<typeof propertySchema>;

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const { createProperty } = usePropertyStore();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      amenities: [],
      images: [],
    },
  });

  const amenitiesList = [
    'WiFi',
    'Air Conditioning',
    'Heating',
    'Kitchen',
    'Washer/Dryer',
    'Parking',
    'Gym',
    'Swimming Pool',
    'Balcony',
    'Garden',
    'Fireplace',
    'TV',
    'Dishwasher',
    'Pet Friendly',
  ];

  const onSubmit = async (data: PropertyFormData) => {
    if (!user) {
      toast.error('You must be logged in to add a property');
      return;
    }

    setIsSubmitting(true);

    try {
      const newProperty: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'reviews' | 'averageRating'> = {
        ...data,
        landlordId: user.id,
        landlordName: user.name,
        status: 'available',
        availabilityCalendar: [],
      };

      await createProperty(newProperty);
      toast.success('Property added successfully');
      navigate('/landlord/properties');
    } catch (error) {
      toast.error('Failed to add property');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would handle file uploads to a storage service
    // For now, we'll just use placeholder images
    const placeholderImages = [
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg',
    ];

    setValue('images', placeholderImages);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add New Property
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Basic Information
          </h2>
          
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Property Title
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="title"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Enter property title"
                  {...register('title')}
                />
              </div>
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Describe your property"
                  {...register('description')}
                />
              </div>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Price, Bedrooms, Bathrooms, Area */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Monthly Rent
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="price"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="0"
                    {...register('price', { valueAsNumber: true })}
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bedrooms
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="bedrooms"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="0"
                    {...register('bedrooms', { valueAsNumber: true })}
                  />
                </div>
                {errors.bedrooms && (
                  <p className="mt-1 text-sm text-red-600">{errors.bedrooms.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bathrooms
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Bath className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="bathrooms"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="0"
                    step="0.5"
                    {...register('bathrooms', { valueAsNumber: true })}
                  />
                </div>
                {errors.bathrooms && (
                  <p className="mt-1 text-sm text-red-600">{errors.bathrooms.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Area (sq ft)
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="area"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="0"
                    {...register('area', { valueAsNumber: true })}
                  />
                </div>
                {errors.area && (
                  <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Location
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Street Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="street"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Enter street address"
                  {...register('address.street')}
                />
              </div>
              {errors.address?.street && (
                <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                City
              </label>
              <input
                type="text"
                id="city"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Enter city"
                {...register('address.city')}
              />
              {errors.address?.city && (
                <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                State
              </label>
              <input
                type="text"
                id="state"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Enter state"
                {...register('address.state')}
              />
              {errors.address?.state && (
                <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Enter ZIP code"
                {...register('address.zipCode')}
              />
              {errors.address?.zipCode && (
                <p className="mt-1 text-sm text-red-600">{errors.address.zipCode.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Country
              </label>
              <input
                type="text"
                id="country"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Enter country"
                {...register('address.country')}
              />
              {errors.address?.country && (
                <p className="mt-1 text-sm text-red-600">{errors.address.country.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Amenities
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={amenity}
                  {...register('amenities')}
                  className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
              </label>
            ))}
          </div>
          {errors.amenities && (
            <p className="mt-2 text-sm text-red-600">{errors.amenities.message}</p>
          )}
        </div>

        {/* Images */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Property Images
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Plus className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="images"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload images</span>
                    <input
                      id="images"
                      type="file"
                      className="sr-only"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB each
                </p>
              </div>
            </div>

            {/* Preview Images */}
            {watch('images').length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {watch('images').map((image, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            {errors.images && (
              <p className="mt-2 text-sm text-red-600">{errors.images.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/landlord/properties')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Adding Property...
              </>
            ) : (
              'Add Property'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyPage;