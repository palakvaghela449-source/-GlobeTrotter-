import React, { useState } from 'react';
import { ScreenView, Trip, Expense } from './types';
import { INITIAL_TRIPS } from './data/mockData';
import { Navigation } from './components/Navigation';
import { ExploreView } from './components/ExploreView';
import { DashboardView } from './components/DashboardView';
import { TripBuilderStep1 } from './components/TripBuilderStep1';
import { TripBuilderStep2 } from './components/TripBuilderStep2';
import { TripDetailView } from './components/TripDetailView';
import { BudgetView } from './components/BudgetView';
import { ProfileView } from './components/ProfileView';

export default function App() {
  const [currentView, setCurrentView] = useState<ScreenView>('explore');
  const [trips, setTrips] = useState<Trip[]>(INITIAL_TRIPS);
  const [selectedTrip, setSelectedTrip] = useState<Trip>(INITIAL_TRIPS[0]);
  
  // Trip Draft State for 2-step Builder
  const [tripDraft, setTripDraft] = useState({
    name: 'My Rajasthan Trip',
    startDate: '2026-09-05',
    endDate: '2026-09-12',
    description: 'Exploring the heritage palaces, forts, and markets of Rajasthan.',
    estimatedBudget: 25000,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateTripData = (fields: Partial<typeof tripDraft>) => {
    setTripDraft(prev => ({ ...prev, ...fields }));
  };

  const handleSaveNewTrip = (newTripData: Partial<Trip>) => {
    const createdTrip: Trip = {
      id: `trip-${Date.now()}`,
      name: newTripData.name || tripDraft.name || 'My New Trip',
      startDate: newTripData.startDate || tripDraft.startDate,
      endDate: newTripData.endDate || tripDraft.endDate,
      formattedDates: newTripData.formattedDates || '05 Sep - 12 Sep',
      durationText: newTripData.durationText || '7 Days',
      description: newTripData.description || tripDraft.description,
      estimatedBudget: newTripData.estimatedBudget || tripDraft.estimatedBudget || 25000,
      spentBudget: 2300,
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKoAqn8ZHjMW-P36yjMpC8Oca8rSbKRpJwmr4VaR0aFWHh-Q14LC2uWx1vR8MmS9oTQ9N204OtuLhgWlkot_63qLC0ybhkXipYGNN5XR-GDuNKEXi9oizLxZiznLCN-2vFvzEDE4JRwUwM0-rBMnHDjDC7s5QYlcaJTK_aT7kKFymy5T_vLpm5btR7d0mVL1zWLbi6IQDk8LBvjyrkh7o3BD6L5bgKl1_D-DRZRB6719xlwkCxdQPo',
      locationsCount: newTripData.routeStops?.length || 3,
      routeStops: newTripData.routeStops || [],
      days: INITIAL_TRIPS[0].days,
      expenses: INITIAL_TRIPS[0].expenses,
    };

    setTrips([createdTrip, ...trips]);
    setSelectedTrip(createdTrip);
    triggerToast(`Trip "${createdTrip.name}" created successfully!`);
  };

  const handleUpdateSelectedTrip = (updatedTrip: Trip) => {
    setSelectedTrip(updatedTrip);
    setTrips(trips.map(t => (t.id === updatedTrip.id ? updatedTrip : t)));
    triggerToast('Trip changes saved!');
  };

  const handleUpdateTripExpenses = (updatedExpenses: Expense[]) => {
    const newSpent = updatedExpenses.reduce((sum, e) => sum + e.amount, 0);
    const updated = {
      ...selectedTrip,
      expenses: updatedExpenses,
      spentBudget: newSpent,
    };
    setSelectedTrip(updated);
    setTrips(trips.map(t => (t.id === updated.id ? updated : t)));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium animate-in fade-in slide-in-from-top-3 flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top and Bottom Nav */}
      <Navigation 
        currentView={currentView} 
        onNavigate={(view) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentView(view);
        }} 
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-24 md:pb-16">
        {currentView === 'explore' && (
          <ExploreView 
            onNavigate={(view) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentView(view);
            }} 
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView 
            trips={trips}
            onNavigate={(view) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentView(view);
            }}
            onSelectTrip={(t) => setSelectedTrip(t)}
          />
        )}

        {currentView === 'create-step-1' && (
          <TripBuilderStep1 
            tripData={tripDraft}
            onUpdateTripData={handleUpdateTripData}
            onNavigate={(view) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentView(view);
            }}
          />
        )}

        {currentView === 'create-step-2' && (
          <TripBuilderStep2 
            tripData={tripDraft}
            onSaveTrip={handleSaveNewTrip}
            onNavigate={(view) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentView(view);
            }}
          />
        )}

        {currentView === 'trip-detail' && (
          <TripDetailView 
            trip={selectedTrip}
            onNavigate={(view) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentView(view);
            }}
            onUpdateTrip={handleUpdateSelectedTrip}
          />
        )}

        {currentView === 'budget' && (
          <BudgetView 
            trip={selectedTrip}
            onNavigate={(view) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentView(view);
            }}
            onUpdateTripExpenses={handleUpdateTripExpenses}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView 
            onNavigate={(view) => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentView(view);
            }}
          />
        )}
      </main>
    </div>
  );
}
