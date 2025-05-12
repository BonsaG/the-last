import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser, LoginCredentials, RegisterData } from '../types';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Mock API for development - will be replaced with real API calls
const mockLogin = async (credentials: LoginCredentials): Promise<{ user: AuthUser; token: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock users for development
  const users = [
    { id: '1', email: 'admin@example.com', password: 'password', name: 'Admin User', role: 'admin' as const },
    { id: '2', email: 'landlord@example.com', password: 'password', name: 'Landlord User', role: 'landlord' as const },
    { id: '3', email: 'tenant@example.com', password: 'password', name: 'Tenant User', role: 'tenant' as const },
  ];
  
  const user = users.find(u => u.email === credentials.email);
  
  if (!user || user.password !== credentials.password) {
    throw new Error('Invalid email or password');
  }
  
  const { password, ...userWithoutPassword } = user;
  
  return {
    user: userWithoutPassword,
    token: 'mock_jwt_token_' + userWithoutPassword.role,
  };
};

const mockRegister = async (data: RegisterData): Promise<{ user: AuthUser; token: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate validation
  if (data.password !== data.confirmPassword) {
    throw new Error('Passwords do not match');
  }
  
  // Mock successful registration
  const newUser: AuthUser = {
    id: Math.random().toString(36).substr(2, 9),
    name: data.name,
    email: data.email,
    role: data.role
  };
  
  return {
    user: newUser,
    token: 'mock_jwt_token_' + data.role,
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await mockLogin(credentials);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
      },
      
      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await mockRegister(data);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
      },
      
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      
      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);