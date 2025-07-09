import React from 'react';
import { MapPin, Users, Bed, Bath, Star, Wifi, Car } from 'lucide-react';
import { Farmhouse } from '../types';

interface FarmhouseCardProps {
  farmhouse: Farmhouse;
  onBookNow: (farmhouse: Farmhouse) => void;
}

const FarmhouseCard: React.FC<FarmhouseCardProps> = ({ farmhouse, onBookNow }) => {
  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={farmhouse.images[0]}
          alt={farmhouse.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Star className="h-4 w-4 text-amber-500 fill-current" />
          <span className="text-sm font-medium">{farmhouse.rating}</span>
          <span className="text-xs text-gray-500">({farmhouse.reviewCount})</span>
        </div>
        <div className="absolute top-4 left-4 bg-emerald-600 text-white rounded-full px-3 py-1">
          <span className="text-sm font-bold">₹{farmhouse.price}/night</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
            {farmhouse.name}
          </h3>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 text-emerald-600" />
          <span className="text-sm">{farmhouse.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {farmhouse.description}
        </p>

        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-emerald-600" />
            <span>{farmhouse.maxGuests} guests</span>
          </div>
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1 text-emerald-600" />
            <span>{farmhouse.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-emerald-600" />
            <span>{farmhouse.bathrooms} baths</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {farmhouse.facilities.slice(0, 4).map((facility, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-600"
            >
              {getFacilityIcon(facility)}
              <span>{facility}</span>
            </div>
          ))}
          {farmhouse.facilities.length > 4 && (
            <div className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-600">
              +{farmhouse.facilities.length - 4} more
            </div>
          )}
        </div>

        <button
          onClick={() => onBookNow(farmhouse)}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FarmhouseCard;