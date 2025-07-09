import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Users } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import FarmhouseCard from './FarmhouseCard';
import BookingModal from './BookingModal';
import { Farmhouse } from '../types';

const HomePage: React.FC = () => {
  const { farmhouses } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFarmhouse, setSelectedFarmhouse] = useState<Farmhouse | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState('all');
  const [guestFilter, setGuestFilter] = useState('all');

  const filteredFarmhouses = farmhouses.filter(farmhouse => {
    const matchesSearch = farmhouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmhouse.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'budget' && farmhouse.price <= 200) ||
                        (priceFilter === 'mid' && farmhouse.price > 200 && farmhouse.price <= 300) ||
                        (priceFilter === 'luxury' && farmhouse.price > 300);
    
    const matchesGuests = guestFilter === 'all' ||
                         (guestFilter === 'small' && farmhouse.maxGuests <= 4) ||
                         (guestFilter === 'medium' && farmhouse.maxGuests > 4 && farmhouse.maxGuests <= 8) ||
                         (guestFilter === 'large' && farmhouse.maxGuests > 8);

    return matchesSearch && matchesPrice && matchesGuests;
  });

  const handleBookNow = (farmhouse: Farmhouse) => {
    setSelectedFarmhouse(farmhouse);
    setIsBookingModalOpen(true);
  };

  const averageRating = farmhouses.reduce((sum, f) => sum + f.rating, 0) / farmhouses.length;
  const totalReviews = farmhouses.reduce((sum, f) => sum + f.reviewCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Your Perfect
              <span className="block text-amber-300">Farmhouse Getaway</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Escape to authentic countryside experiences in handpicked farmhouses across beautiful locations
            </p>
            <div className="flex items-center justify-center space-x-8 text-emerald-100">
              <div className="text-center">
                <div className="text-2xl font-bold">{farmhouses.length}</div>
                <div className="text-sm">Farmhouses</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-5 w-5 text-amber-300 fill-current" />
                  <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                </div>
                <div className="text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalReviews}</div>
                <div className="text-sm">Happy Guests</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="budget">Budget (₹0-₹20000)</option>
                <option value="mid">Mid-range (₹20000-₹30000)</option>
                <option value="luxury">Luxury (₹30000+)</option>
              </select>
            </div>
            <div>
              <select
                value={guestFilter}
                onChange={(e) => setGuestFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Sizes</option>
                <option value="small">1-4 Guests</option>
                <option value="medium">5-8 Guests</option>
                <option value="large">9+ Guests</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Farmhouse Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Available Farmhouses
            <span className="text-lg font-normal text-gray-500 ml-2">
              ({filteredFarmhouses.length} found)
            </span>
          </h2>
        </div>

        {filteredFarmhouses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏡</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No farmhouses found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFarmhouses.map(farmhouse => (
              <FarmhouseCard
                key={farmhouse.id}
                farmhouse={farmhouse}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FarmStay?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We connect you with authentic farmhouse experiences that create lasting memories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Prime Locations</h3>
              <p className="text-gray-600">
                Carefully selected farmhouses in the most scenic and peaceful countryside locations
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                Every farmhouse is personally inspected and rated by our team for your peace of mind
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated team is always ready to help make your farmhouse experience perfect
              </p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        farmhouse={selectedFarmhouse}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;