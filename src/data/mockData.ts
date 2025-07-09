import { User, Farmhouse, Booking, Review } from '../types';

export const users: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'customer',
    phone: '+1234567890',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'owner@farmhouse.com',
    password: 'owner123',
    name: 'Sarah Wilson',
    role: 'owner',
    phone: '+1987654321',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const farmhouses: Farmhouse[] = [
  {
    id: '1',
    name: 'Sunrise Valley Retreat',
    description: 'A charming farmhouse nestled in the rolling hills with breathtaking sunrise views. Perfect for family getaways and romantic escapes.',
    location: 'Blue Ridge Mountains, Virginia',
    price: 180,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    facilities: ['WiFi', 'Kitchen', 'Fireplace', 'Garden', 'Parking', 'BBQ'],
    availability: true,
    rating: 4.8,
    reviewCount: 24,
    ownerId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Meadowbrook Farm Stay',
    description: 'Experience authentic farm life in this restored 19th-century farmhouse surrounded by peaceful meadows and working gardens.',
    location: 'Lancaster County, Pennsylvania',
    price: 220,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    images: [
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    facilities: ['WiFi', 'Kitchen', 'Hot Tub', 'Farm Animals', 'Parking', 'Laundry'],
    availability: true,
    rating: 4.9,
    reviewCount: 31,
    ownerId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Whispering Pines Lodge',
    description: 'Rustic luxury meets modern comfort in this secluded pine forest retreat with stunning lake views and private dock access.',
    location: 'Adirondack Park, New York',
    price: 300,
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
    images: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    facilities: ['WiFi', 'Kitchen', 'Fireplace', 'Lake Access', 'Dock', 'Kayaks', 'Parking'],
    availability: true,
    rating: 4.7,
    reviewCount: 18,
    ownerId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Golden Wheat Estate',
    description: 'A luxury farmhouse set among golden wheat fields with panoramic countryside views and elegant amenities.',
    location: 'Sonoma County, California',
    price: 350,
    maxGuests: 12,
    bedrooms: 6,
    bathrooms: 5,
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    facilities: ['WiFi', 'Kitchen', 'Pool', 'Wine Cellar', 'Garden', 'Parking', 'Spa'],
    availability: true,
    rating: 4.9,
    reviewCount: 42,
    ownerId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Countryside Haven',
    description: 'A cozy farmhouse retreat perfect for peaceful getaways, featuring traditional architecture and modern amenities.',
    location: 'Hill Country, Texas',
    price: 160,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    images: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    facilities: ['WiFi', 'Kitchen', 'Fireplace', 'Garden', 'Parking', 'Pet Friendly'],
    availability: true,
    rating: 4.6,
    reviewCount: 29,
    ownerId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    name: 'Harvest Moon Farm',
    description: 'Experience the magic of farm life under starlit skies in this beautifully restored farmhouse with organic gardens.',
    location: 'Vermont Green Mountains',
    price: 200,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    images: [
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    facilities: ['WiFi', 'Kitchen', 'Organic Garden', 'Farm Tours', 'Parking', 'Breakfast'],
    availability: true,
    rating: 4.8,
    reviewCount: 36,
    ownerId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    name: 'Riverside Ranch',
    description: 'A spacious ranch-style farmhouse situated along a gentle river, offering fishing, hiking, and ultimate relaxation.',
    location: 'Montana Big Sky Country',
    price: 280,
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    facilities: ['WiFi', 'Kitchen', 'River Access', 'Fishing', 'Hiking Trails', 'Parking', 'BBQ'],
    availability: true,
    rating: 4.7,
    reviewCount: 22,
    ownerId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    name: 'Orchard View Cottage',
    description: 'A quaint cottage surrounded by fruit orchards, offering seasonal picking experiences and farm-to-table dining.',
    location: 'Hood River Valley, Oregon',
    price: 140,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    facilities: ['WiFi', 'Kitchen', 'Orchard Tours', 'Fruit Picking', 'Garden', 'Parking'],
    availability: true,
    rating: 4.5,
    reviewCount: 15,
    ownerId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '9',
    name: 'Prairie Wind Estate',
    description: 'Experience the vast beauty of prairie landscapes in this modern farmhouse with sustainable features and luxury amenities.',
    location: 'Kansas Prairie Lands',
    price: 190,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    images: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    facilities: ['WiFi', 'Kitchen', 'Solar Power', 'Wind Turbine', 'Garden', 'Parking', 'Star Gazing'],
    availability: true,
    rating: 4.6,
    reviewCount: 19,
    ownerId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '10',
    name: 'Sunset Ridge Farmhouse',
    description: 'Watch spectacular sunsets from this elevated farmhouse with panoramic valley views and luxurious outdoor living spaces.',
    location: 'Napa Valley, California',
    price: 380,
    maxGuests: 12,
    bedrooms: 6,
    bathrooms: 5,
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    facilities: ['WiFi', 'Kitchen', 'Pool', 'Hot Tub', 'Vineyard Views', 'Wine Tasting', 'Parking', 'Chef Service'],
    availability: true,
    rating: 4.9,
    reviewCount: 56,
    ownerId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const bookings: Booking[] = [];

export const reviews: Review[] = [];