import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AuthForm from './components/AuthForm';
import CustomerBookings from './components/CustomerBookings';
import OwnerDashboard from './components/OwnerDashboard';

function AppContent() {
  const { currentUser, loading } = useAuth();
  const [currentView, setCurrentView] = useState('home');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const renderCurrentView = () => {
    if (!currentUser && (currentView === 'bookings' || currentView === 'dashboard')) {
      return <AuthForm type="login" onSuccess={() => setCurrentView('home')} />;
    }

    switch (currentView) {
      case 'login':
        return <AuthForm type="login" onSuccess={() => setCurrentView(currentUser?.role === 'owner' ? 'dashboard' : 'home')} />;
      case 'register':
        return <AuthForm type="register" onSuccess={() => setCurrentView(currentUser?.role === 'owner' ? 'dashboard' : 'home')} />;
      case 'bookings':
        return <CustomerBookings />;
      case 'dashboard':
        return currentUser?.role === 'owner' ? <OwnerDashboard /> : <HomePage />;
      case 'profile':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-lg text-gray-900">{currentUser?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-lg text-gray-900">{currentUser?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Type</label>
                    <p className="mt-1 text-lg text-gray-900 capitalize">{currentUser?.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      {renderCurrentView()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;