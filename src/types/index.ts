export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'owner';
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Farmhouse {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  facilities: string[];
  availability: boolean;
  rating: number;
  reviewCount: number;
  ownerId: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  farmhouseId: string;
  customerId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  message?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  farmhouseId: string;
  customerId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'customer' | 'owner') => Promise<void>;
  logout: () => void;
  loading: boolean;
}