import React, { useState } from 'react';
import { ScreenView } from '../types';
import { Compass, Bell, LayoutDashboard, Map, PlusCircle, User, Check, X, Plane, Wallet } from 'lucide-react';

interface NavigationProps {
  currentView: ScreenView;
  onNavigate: (view: ScreenView) => void;
  unreadCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onNavigate,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Trip to Himachal Pradesh starts in 51 days', time: '10m ago', unread: true },
    { id: 2, text: 'Budget Alert: Accommodation over budget by ₹2,300', time: '2h ago', unread: true },
    { id: 3, text: 'Flight AMD -> JAI confirmed (PNR: 6E-8801K)', time: 'Yesterday', unread: false },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const isNavActive = (view: ScreenView) => {
    if (view === 'explore' && currentView === 'explore') return true;
    if (view === 'dashboard' && currentView === 'dashboard') return true;
    if (view === 'trip-detail' && currentView === 'trip-detail') return true;
    if (view === 'create-step-1' && (currentView === 'create-step-1' || currentView === 'create-step-2')) return true;
    if (view === 'budget' && currentView === 'budget') return true;
    if (view === 'profile' && currentView === 'profile') return true;
    return false;
  };

  return (
    <>
      {/* Top Header - Desktop */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs hidden md:block">
        <div className="flex justify-between items-center px-6 lg:px-8 h-16 w-full max-w-6xl mx-auto">
          {/* Logo / Brand */}
          <div 
            onClick={() => onNavigate('explore')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            id="brand-logo-desktop"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
              <Compass className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-tight">
                Globe<span className="text-blue-600">Trotter</span>
              </span>
              <span className="text-[11px] text-slate-500 font-normal -mt-0.5">
                Trip Planner
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="flex items-center gap-1">
            <button
              onClick={() => onNavigate('explore')}
              id="nav-explore-btn"
              className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'explore'
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Explore
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              id="nav-dashboard-btn"
              className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'dashboard'
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => onNavigate('trip-detail')}
              id="nav-trips-btn"
              className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'trip-detail'
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              My Trip
            </button>

            <button
              onClick={() => onNavigate('create-step-1')}
              id="nav-create-btn"
              className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'create-step-1' || currentView === 'create-step-2'
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Plan Trip
            </button>

            <button
              onClick={() => onNavigate('budget')}
              id="nav-budget-btn"
              className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'budget'
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Budget
            </button>
          </nav>

          {/* Right Action: Notifications & Avatar */}
          <div className="flex items-center gap-3 relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              id="btn-notifications-desktop"
              className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors relative cursor-pointer active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            <div 
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2.5 cursor-pointer pl-2 py-1 pr-2 rounded-lg hover:bg-slate-100 transition-colors"
              id="user-avatar-desktop"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
                VV
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800">Vandna</span>
                <span className="text-[11px] text-slate-500">Traveler</span>
              </div>
            </div>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-900">Notifications</span>
                  <button 
                    onClick={markAllRead}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" /> Mark all read
                  </button>
                </div>
                <div className="py-2 space-y-2 max-h-72 overflow-y-auto no-scrollbar">
                  {notifications.map(n => (
                    <div 
                      key={n.id}
                      className={`p-2.5 rounded-lg text-xs flex flex-col gap-1 transition-colors ${
                        n.unread 
                          ? 'bg-blue-50/70 border border-blue-100 text-slate-800' 
                          : 'bg-slate-50/50 text-slate-600'
                      }`}
                    >
                      <span className="font-medium text-slate-800 leading-snug">{n.text}</span>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{n.time}</span>
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs md:hidden">
        <div className="flex justify-between items-center px-4 h-14 w-full">
          <div 
            onClick={() => onNavigate('explore')}
            className="flex items-center gap-2 cursor-pointer active:scale-95 duration-150"
            id="brand-logo-mobile"
          >
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white">
              <Compass className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="font-bold text-base text-slate-900">
              Globe<span className="text-blue-600">Trotter</span>
            </span>
          </div>

          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors relative cursor-pointer"
            id="btn-notifications-mobile"
          >
            <Bell className="w-4 h-4" />
            {notifications.some(n => n.unread) && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
            )}
          </button>
        </div>

        {/* Mobile Notifications dropdown */}
        {showNotifications && (
          <div className="mx-4 mb-3 bg-white rounded-xl shadow-lg border border-slate-200 p-4 z-50">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-semibold text-sm text-slate-900">Notifications</span>
              <button 
                onClick={() => setShowNotifications(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-2 space-y-2 max-h-60 overflow-y-auto no-scrollbar">
              {notifications.map(n => (
                <div 
                  key={n.id}
                  className={`p-2.5 rounded-lg text-xs flex flex-col gap-1 ${
                    n.unread ? 'bg-blue-50 border border-blue-100 text-slate-800' : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className="font-medium text-slate-800 leading-snug">{n.text}</span>
                  <span className="text-[10px] text-slate-400">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Persistent Bottom Nav Bar (Mobile Only) */}
      <nav 
        className="fixed bottom-0 left-0 w-full h-16 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg md:hidden flex items-center justify-around px-2 pb-safe"
        id="bottom-nav-mobile"
      >
        {/* Explore */}
        <button
          onClick={() => onNavigate('explore')}
          id="mob-nav-explore"
          className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer transition-colors ${
            isNavActive('explore') ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Explore</span>
        </button>

        {/* Dashboard */}
        <button
          onClick={() => onNavigate('dashboard')}
          id="mob-nav-dashboard"
          className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer transition-colors ${
            isNavActive('dashboard') ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Dashboard</span>
        </button>

        {/* Create */}
        <button
          onClick={() => onNavigate('create-step-1')}
          id="mob-nav-create"
          className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer transition-colors ${
            isNavActive('create-step-1') ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <PlusCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Plan</span>
        </button>

        {/* Trips */}
        <button
          onClick={() => onNavigate('trip-detail')}
          id="mob-nav-trips"
          className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer transition-colors ${
            isNavActive('trip-detail') ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Map className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">My Trip</span>
        </button>

        {/* Budget */}
        <button
          onClick={() => onNavigate('budget')}
          id="mob-nav-budget"
          className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer transition-colors ${
            isNavActive('budget') ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Wallet className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Budget</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onNavigate('profile')}
          id="mob-nav-profile"
          className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer transition-colors ${
            isNavActive('profile') ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Profile</span>
        </button>
      </nav>
    </>
  );
};
