import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Calendar, DollarSign, Users, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Farmhouse } from '../types';

const OwnerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { farmhouses, bookings, addFarmhouse, updateFarmhouse, deleteFarmhouse } = useData();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFarmhouse, setEditingFarmhouse] = useState<Farmhouse | null>(null);
  const [farmhouseForm, setFarmhouseForm] = useState({
    name: '',
    description: '',
    location: '',
    price: 0,
    maxGuests: 1,
    bedrooms: 1,
    bathrooms: 1,
    images: [''],
    facilities: ['']
  });

  if (!currentUser || currentUser.role !== 'owner') return null;

  const ownerFarmhouses = farmhouses.filter(f => f.ownerId === currentUser.id);
  const ownerBookings = bookings.filter(b =>
    ownerFarmhouses.some(f => f.id === b.farmhouseId)
  );

  const totalRevenue = ownerBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const averageRating = ownerFarmhouses.reduce((sum, f) => sum + f.rating, 0) / ownerFarmhouses.length;

  const handleSubmitFarmhouse = (e: React.FormEvent) => {
    e.preventDefault();

    const farmhouseData = {
      ...farmhouseForm,
      facilities: farmhouseForm.facilities.filter(f => f.trim() !== ''),
      images: farmhouseForm.images.filter(img => img.trim() !== ''),
      rating: 4.5,
      reviewCount: 0,
      availability: true,
      ownerId: currentUser.id
    };

    if (editingFarmhouse) {
      updateFarmhouse(editingFarmhouse.id, farmhouseData);
    } else {
      addFarmhouse(farmhouseData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFarmhouseForm({
      name: '',
      description: '',
      location: '',
      price: 0,
      maxGuests: 1,
      bedrooms: 1,
      bathrooms: 1,
      images: [''],
      facilities: []
    });
    setShowAddModal(false);
    setEditingFarmhouse(null);
  };

  const handleEditFarmhouse = (farmhouse: Farmhouse) => {
    setFarmhouseForm({
      name: farmhouse.name,
      description: farmhouse.description,
      location: farmhouse.location,
      price: farmhouse.price,
      maxGuests: farmhouse.maxGuests,
      bedrooms: farmhouse.bedrooms,
      bathrooms: farmhouse.bathrooms,
      images: farmhouse.images,
      facilities: farmhouse.facilities
    });
    setEditingFarmhouse(farmhouse);
    setShowAddModal(true);
  };

  const addImageField = () => {
    setFarmhouseForm({
      ...farmhouseForm,
      images: [...farmhouseForm.images, '']
    });
  };

  const updateImageField = (index: number, value: string) => {
    const newImages = [...farmhouseForm.images];
    newImages[index] = value;
    setFarmhouseForm({ ...farmhouseForm, images: newImages });
  };

  const removeImageField = (index: number) => {
    const newImages = farmhouseForm.images.filter((_, i) => i !== index);
    setFarmhouseForm({ ...farmhouseForm, images: newImages });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'farmhouses', label: 'Farmhouses', icon: Plus },
    { id: 'bookings', label: 'Bookings', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your farmhouses and bookings</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-emerald-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-600 text-sm font-medium">Total Farmhouses</p>
                        <p className="text-2xl font-bold text-emerald-900">{ownerFarmhouses.length}</p>
                      </div>
                      <div className="bg-emerald-100 p-3 rounded-full">
                        <Plus className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 text-sm font-medium">Total Bookings</p>
                        <p className="text-2xl font-bold text-blue-900">{ownerBookings.length}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-amber-600 text-sm font-medium">Total Revenue</p>
                        <p className="text-2xl font-bold text-amber-900">₹{totalRevenue}</p>
                      </div>
                      <div className="bg-amber-100 p-3 rounded-full">
                        <DollarSign className="h-6 w-6 text-amber-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-600 text-sm font-medium">Average Rating</p>
                        <p className="text-2xl font-bold text-purple-900">
                          {averageRating ? averageRating.toFixed(1) : 'N/A'}
                        </p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Star className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  {ownerBookings.length === 0 ? (
                    <p className="text-gray-500">No recent bookings</p>
                  ) : (
                    <div className="space-y-3">
                      {ownerBookings.slice(0, 5).map(booking => {
                        const farmhouse = ownerFarmhouses.find(f => f.id === booking.farmhouseId);
                        return (
                          <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                            <div>
                              <p className="font-medium text-gray-900">{farmhouse?.name}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">₹{booking.totalPrice}</p>
                              <p className={`text-sm capitalize ${booking.status === 'confirmed' ? 'text-emerald-600' :
                                booking.status === 'pending' ? 'text-amber-600' : 'text-gray-500'
                                }`}>
                                {booking.status}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'farmhouses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Your Farmhouses</h3>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Farmhouse</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ownerFarmhouses.map(farmhouse => (
                    <div key={farmhouse.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <img
                        src={farmhouse.images[0]}
                        alt={farmhouse.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 mb-2">{farmhouse.name}</h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{farmhouse.description}</p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-emerald-600 font-bold">₹{farmhouse.price}/night</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-amber-500 fill-current" />
                            <span className="text-sm">{farmhouse.rating}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditFarmhouse(farmhouse)}
                            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => deleteFarmhouse(farmhouse.id)}
                            className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors flex items-center justify-center space-x-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Bookings</h3>
                {ownerBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h4>
                    <p className="text-gray-600">Bookings will appear here once customers start reserving your farmhouses.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ownerBookings.map(booking => {
                      const farmhouse = ownerFarmhouses.find(f => f.id === booking.farmhouseId);
                      return (
                        <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-bold text-gray-900">{farmhouse?.name}</h4>
                              <p className="text-gray-600">{farmhouse?.location}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                              booking.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-blue-100 text-blue-800'
                              }`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Check-in</p>
                              <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Check-out</p>
                              <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Guests</p>
                              <p className="font-medium">{booking.guests}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Total</p>
                              <p className="font-medium">₹{booking.totalPrice}</p>
                            </div>
                          </div>
                          {booking.message && (
                            <div className="mt-4 bg-gray-50 rounded-lg p-3">
                              <p className="text-sm text-gray-600">
                                <strong>Special Request:</strong> {booking.message}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Add/Edit Farmhouse Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingFarmhouse ? 'Edit Farmhouse' : 'Add New Farmhouse'}
                </h3>
              </div>
              <form onSubmit={handleSubmitFarmhouse} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={farmhouseForm.name}
                      onChange={(e) => setFarmhouseForm({ ...farmhouseForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      required
                      value={farmhouseForm.location}
                      onChange={(e) => setFarmhouseForm({ ...farmhouseForm, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={farmhouseForm.description}
                    onChange={(e) => setFarmhouseForm({ ...farmhouseForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price/night</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={farmhouseForm.price}
                      onChange={(e) => setFarmhouseForm({ ...farmhouseForm, price: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={farmhouseForm.maxGuests}
                      onChange={(e) => setFarmhouseForm({ ...farmhouseForm, maxGuests: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={farmhouseForm.bedrooms}
                      onChange={(e) => setFarmhouseForm({ ...farmhouseForm, bedrooms: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={farmhouseForm.bathrooms}
                      onChange={(e) => setFarmhouseForm({ ...farmhouseForm, bathrooms: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Images</label>
                    <button
                      type="button"
                      onClick={addImageField}
                      className="text-emerald-600 hover:text-emerald-700 text-sm"
                    >
                      + Add Image
                    </button>
                  </div>
                  <div className="space-y-2">
                    {farmhouseForm.images.map((image, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="url"
                          placeholder="Image URL"
                          value={image}
                          onChange={(e) => updateImageField(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                        {farmhouseForm.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImageField(index)}
                            className="px-3 py-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Facilities (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="WiFi, Kitchen, Pool, etc."
                    value={farmhouseForm.facilities.join(', ')}
                    onChange={(e) => setFarmhouseForm({
                      ...farmhouseForm,
                      facilities: e.target.value.split(',').map(f => f.trim()).filter(f => f !== '')
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    {editingFarmhouse ? 'Update' : 'Add'} Farmhouse
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;