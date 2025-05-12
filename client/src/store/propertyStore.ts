import { create } from 'zustand';
import { Property, PropertyStatus } from '../types';

// Mock data for properties
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment with City View',
    description: 'A beautiful modern apartment with panoramic city views. Featuring high-end appliances, hardwood floors, and a spacious balcony.',
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
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg',
    ],
    availabilityCalendar: [],
    landlordId: '2',
    landlordName: 'Jane Smith',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z',
    status: 'available',
    reviews: [
      {
        id: '101',
        propertyId: '1',
        tenantId: '3',
        tenantName: 'Mike Johnson',
        rating: 4,
        comment: 'Great place, very clean and the view is amazing!',
        createdAt: '2023-02-20T14:30:00Z',
      },
      {
        id: '102',
        propertyId: '1',
        tenantId: '4',
        tenantName: 'Sarah Williams',
        rating: 5,
        comment: 'Perfect location and the host was very responsive.',
        createdAt: '2023-03-05T09:15:00Z',
      }
    ],
    averageRating: 4.5,
  },
  {
    id: '2',
    title: 'Cozy Studio in Downtown',
    description: 'A cozy studio apartment in the heart of downtown. Perfect for singles or couples. Walking distance to restaurants, shops, and public transportation.',
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
      'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg',
      'https://images.pexels.com/photos/2986011/pexels-photo-2986011.jpeg',
    ],
    availabilityCalendar: [],
    landlordId: '2',
    landlordName: 'Jane Smith',
    createdAt: '2023-02-10T09:30:00Z',
    updatedAt: '2023-02-10T09:30:00Z',
    status: 'available',
    reviews: [
      {
        id: '103',
        propertyId: '2',
        tenantId: '5',
        tenantName: 'David Brown',
        rating: 3,
        comment: 'Good location but smaller than it appeared in photos.',
        createdAt: '2023-03-15T16:45:00Z',
      }
    ],
    averageRating: 3,
  },
  {
    id: '3',
    title: 'Spacious Family Home with Garden',
    description: 'A beautiful spacious family home with a large garden. Featuring 3 bedrooms, a modern kitchen, and a cozy living room. Perfect for families.',
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
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
      'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg',
    ],
    availabilityCalendar: [],
    landlordId: '6',
    landlordName: 'Robert Taylor',
    createdAt: '2023-01-05T11:45:00Z',
    updatedAt: '2023-01-05T11:45:00Z',
    status: 'available',
    reviews: [
      {
        id: '104',
        propertyId: '3',
        tenantId: '7',
        tenantName: 'Emily Davis',
        rating: 5,
        comment: 'Wonderful house for our family vacation. Very comfortable and well-maintained.',
        createdAt: '2023-02-28T12:00:00Z',
      },
      {
        id: '105',
        propertyId: '3',
        tenantId: '8',
        tenantName: 'James Wilson',
        rating: 4,
        comment: 'Great location and spacious. Minor issues with the heating but otherwise perfect.',
        createdAt: '2023-03-20T10:30:00Z',
      }
    ],
    averageRating: 4.5,
  },
];

interface PropertyState {
  properties: Property[];
  filteredProperties: Property[];
  selectedProperty: Property | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProperties: () => Promise<void>;
  fetchPropertyById: (id: string) => Promise<void>;
  createProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'reviews' | 'averageRating'>) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  
  // Filters
  filterProperties: (filters: PropertyFilters) => void;
  clearFilters: () => void;
}

interface PropertyFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  status?: PropertyStatus;
}

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  filteredProperties: [],
  selectedProperty: null,
  isLoading: false,
  error: null,
  
  fetchProperties: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data for now
      set({ 
        properties: mockProperties, 
        filteredProperties: mockProperties,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch properties' 
      });
    }
  },
  
  fetchPropertyById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const property = mockProperties.find(p => p.id === id);
      
      if (!property) {
        throw new Error('Property not found');
      }
      
      set({ selectedProperty: property, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch property' 
      });
    }
  },
  
  createProperty: async (property) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const newProperty: Property = {
        ...property,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reviews: [],
        averageRating: 0,
      };
      
      set(state => ({ 
        properties: [...state.properties, newProperty],
        filteredProperties: [...state.filteredProperties, newProperty],
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to create property' 
      });
    }
  },
  
  updateProperty: async (id, propertyUpdate) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => {
        const properties = state.properties.map(p => 
          p.id === id 
            ? { ...p, ...propertyUpdate, updatedAt: new Date().toISOString() } 
            : p
        );
        
        return { 
          properties,
          filteredProperties: properties,
          selectedProperty: state.selectedProperty?.id === id 
            ? { ...state.selectedProperty, ...propertyUpdate, updatedAt: new Date().toISOString() }
            : state.selectedProperty,
          isLoading: false 
        };
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to update property' 
      });
    }
  },
  
  deleteProperty: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set(state => ({ 
        properties: state.properties.filter(p => p.id !== id),
        filteredProperties: state.filteredProperties.filter(p => p.id !== id),
        selectedProperty: state.selectedProperty?.id === id ? null : state.selectedProperty,
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to delete property' 
      });
    }
  },
  
  filterProperties: (filters) => {
    const { properties } = get();
    
    let filtered = [...properties];
    
    if (filters.location) {
      const location = filters.location.toLowerCase();
      filtered = filtered.filter(
        p => p.address.city.toLowerCase().includes(location) || 
        p.address.state.toLowerCase().includes(location) ||
        p.address.country.toLowerCase().includes(location) ||
        p.address.zipCode.includes(filters.location!)
      );
    }
    
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }
    
    if (filters.bedrooms !== undefined) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms!);
    }
    
    if (filters.bathrooms !== undefined) {
      filtered = filtered.filter(p => p.bathrooms >= filters.bathrooms!);
    }
    
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(p => 
        filters.amenities!.every(amenity => p.amenities.includes(amenity))
      );
    }
    
    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    
    set({ filteredProperties: filtered });
  },
  
  clearFilters: () => {
    set(state => ({ filteredProperties: state.properties }));
  },
}));