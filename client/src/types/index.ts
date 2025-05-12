// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
  isActive: boolean;
}

export type UserRole = 'admin' | 'landlord' | 'tenant';

// Property Types
export interface Property {
  id: string;
  title: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  availabilityCalendar: AvailabilityDate[];
  landlordId: string;
  landlordName: string;
  createdAt: string;
  updatedAt: string;
  status: PropertyStatus;
  reviews: Review[];
  averageRating: number;
}

export type PropertyStatus = 'available' | 'booked' | 'maintenance' | 'pending' | 'rejected';

export interface AvailabilityDate {
  date: string;
  isAvailable: boolean;
}

// Booking Types
export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  tenantId: string;
  tenantName: string;
  landlordId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

// Review Types
export interface Review {
  id: string;
  propertyId: string;
  tenantId: string;
  tenantName: string;
  tenantAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Payment Types
export interface Payment {
  id: string;
  bookingId: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  receipt?: string;
  createdAt: string;
}

export type PaymentMethod = 'chapa' | 'telebirr' | 'card' | 'bank';

// Dashboard Types
export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalProperties: number;
  activeListings: number;
  pendingBookings: number;
  completedBookings: number;
  recentBookings: Booking[];
  recentReviews: Review[];
  bookingsByMonth: { month: string; count: number }[];
  revenueByMonth: { month: string; amount: number }[];
}

// Auth Types
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  phone?: string;
}