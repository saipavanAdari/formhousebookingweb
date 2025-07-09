import React, { createContext, useContext, useState, useEffect } from 'react';
import { Farmhouse, Booking, Review } from '../types';
import { farmhouses as initialFarmhouses, bookings as initialBookings, reviews as initialReviews } from '../data/mockData';

interface DataContextType {
  farmhouses: Farmhouse[];
  bookings: Booking[];
  reviews: Review[];
  addFarmhouse: (farmhouse: Omit<Farmhouse, 'id' | 'createdAt'>) => void;
  updateFarmhouse: (id: string, updates: Partial<Farmhouse>) => void;
  deleteFarmhouse: (id: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farmhouses, setFarmhouses] = useState<Farmhouse[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const savedFarmhouses = localStorage.getItem('farmhouses');
    const savedBookings = localStorage.getItem('bookings');
    const savedReviews = localStorage.getItem('reviews');

    setFarmhouses(savedFarmhouses ? JSON.parse(savedFarmhouses) : initialFarmhouses);
    setBookings(savedBookings ? JSON.parse(savedBookings) : initialBookings);
    setReviews(savedReviews ? JSON.parse(savedReviews) : initialReviews);
  }, []);

  const saveFarmhouses = (newFarmhouses: Farmhouse[]) => {
    setFarmhouses(newFarmhouses);
    localStorage.setItem('farmhouses', JSON.stringify(newFarmhouses));
  };

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('bookings', JSON.stringify(newBookings));
  };

  const saveReviews = (newReviews: Review[]) => {
    setReviews(newReviews);
    localStorage.setItem('reviews', JSON.stringify(newReviews));
  };

  const addFarmhouse = (farmhouseData: Omit<Farmhouse, 'id' | 'createdAt'>) => {
    const newFarmhouse: Farmhouse = {
      ...farmhouseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    saveFarmhouses([...farmhouses, newFarmhouse]);
  };

  const updateFarmhouse = (id: string, updates: Partial<Farmhouse>) => {
    const updatedFarmhouses = farmhouses.map(f => 
      f.id === id ? { ...f, ...updates } : f
    );
    saveFarmhouses(updatedFarmhouses);
  };

  const deleteFarmhouse = (id: string) => {
    const updatedFarmhouses = farmhouses.filter(f => f.id !== id);
    saveFarmhouses(updatedFarmhouses);
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    saveBookings([...bookings, newBooking]);
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    const updatedBookings = bookings.map(b => 
      b.id === id ? { ...b, ...updates } : b
    );
    saveBookings(updatedBookings);
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    saveReviews([...reviews, newReview]);
  };

  const value: DataContextType = {
    farmhouses,
    bookings,
    reviews,
    addFarmhouse,
    updateFarmhouse,
    deleteFarmhouse,
    addBooking,
    updateBooking,
    addReview
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};