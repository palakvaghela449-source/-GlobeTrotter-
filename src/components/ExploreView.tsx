import React, { useState } from 'react';
import { ScreenView, Destination } from '../types';
import { POPULAR_DESTINATIONS } from '../data/mockData';
import { Search, PlusCircle, ArrowRight, Map, Wallet, FileText, Globe, HelpCircle, MapPin, Calendar, Sparkles } from 'lucide-react';

interface ExploreViewProps {
  onNavigate: (view: ScreenView) => void;
  onSelectDestination?: (dest: Destination) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  const categories = ['All', 'Asia', 'Europe', 'Culture', 'Nature', 'Beaches'];

  const filteredDestinations = POPULAR_DESTINATIONS.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dest.region === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('create-step-1');
    }
  };

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[420px] flex items-center justify-center p-6 md:p-12 shadow-md">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaxBOzQAe4CHuhfgwDRFBrL-P7RtahL76R5RoJBTt80vqfUmSGvIZd-MvoBDHzDw6hlQJS9tJf1911YdPWtL7_sN4iAnFoIYCvCS9msbxSeCZd9HHKtdNez4p7vx2h1Q3csHeqP_4EPyiaqTm1BNeSemKho3m3WI3DzxSuayYCctzyjs8zPl2IpcDX8a5te0YHOICAUozMX6Zqp5jNJoF4WHRyEa5J0Rxzfc3U3qs_nI4fwNITxmUh"
            alt="Tropical travel destination"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center space-y-5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Simple, stress-free trip planning</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Where do you want to go next?
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Build day-by-day itineraries, track your budget, and organize all your travel details in one place.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                id="hero-destination-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search a city, country, or spot..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <button
              type="submit"
              id="hero-search-btn"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-3 rounded-xl transition-colors shadow-sm active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Quick Callout: Plan a Trip */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-xl font-bold text-slate-900">
            Already have a destination in mind?
          </h2>
          <p className="text-slate-600 text-sm">
            Create a custom itinerary in 2 easy steps and start adding activities, hotels, and routes.
          </p>
        </div>

        <button
          onClick={() => onNavigate('create-step-1')}
          id="banner-create-trip-btn"
          className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-6 py-3 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-blue-400" />
          <span>Plan a New Trip</span>
        </button>
      </section>

      {/* Popular Destinations */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Popular Destinations
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Hand-picked ideas and inspiration for your next getaway
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Kyoto */}
          <div
            onClick={() => onNavigate('create-step-1')}
            id="destination-card-kyoto"
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwwQdpLyTBVKnFiO1qzto94FVAPodqFqK64-CWgkNMZtKCJPgrc7VEpu8cinVV0LQYpbC3F7wYDwjFlyCvqcXbOfDo-V2lKie4_5ylrxm8JEF0vJ3mBPl-C8fFc2oOhzeiNuS_dh7jQMGy4c146hllb2bJuswUYgFFZ6YPyIxz2u50dOPjDfidBpwKQWTuXAQGqvg6zZ5lCiDowAS1qWBVifkpVd9QUIv6eu3FloyUbry3BcRBtkfX"
                alt="Kyoto, Japan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-xs">
                Asia
              </span>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Kyoto, Japan
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  Historic wooden temples, serene bamboo groves, and traditional tea houses.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Avg. 5–7 Days</span>
                <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Plan Trip <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Santorini */}
          <div
            onClick={() => onNavigate('create-step-1')}
            id="destination-card-santorini"
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDptcH7M_PuuSgfiPkH-VjcFBXFhr9h0BnW69nGiVL5H5wqBj2tUnEXC2C-KkH3_qTb63AnPJYcoMLGWbjZJ-HP-nK-lq-H21OtaBIbDYMmk2QlhzLJECG2wUovHZBzzp2g9-xuB61dotmWcceCRUHs8Zu614qGGzM3kCnlft850xjJwFym8mlFMy3Jd6UJ6Clh79d_uwjy2cMih7IDYfyZ956Qv5wnw8YxP5MrN2kSRUCU43mNaE4V"
                alt="Santorini, Greece"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-xs">
                Europe
              </span>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Santorini, Greece
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  Whitewashed cliffside towns, Aegean sunset views, and volcanic beaches.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Avg. 4–6 Days</span>
                <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Plan Trip <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Zermatt */}
          <div
            onClick={() => onNavigate('create-step-1')}
            id="destination-card-zermatt"
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp4dtxodc3oGEYtGznBITQ26ZsFKRraB68zlV5QJ2-boTAIgRAEtZSN9PSiKwMoq4KyhZAWyb2P4jUbEpI2Klr3k_NuhGZ_l7DncOpzI9zCCvLro0pZgqIUv54rfQKDAVDsHxQB-Lyg4JAM7LIlhCX2dWUnsvLo105_n1H_P4cuo4nowjwJKuNp02-9Bq8ecCqpu4igcKZSDGUBybk59nydXo8j_3uhDGmVFYu1zu3ulrziB53gojO"
                alt="Zermatt, Switzerland"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-xs">
                Europe
              </span>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Zermatt, Switzerland
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  Majestic Matterhorn mountain views, cozy alpine chalets, and skiing.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Avg. 5–7 Days</span>
                <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Plan Trip <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Features Section */}
      <section className="space-y-6 pt-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <h2 className="text-2xl font-bold text-slate-900">
            Everything you need for your trip
          </h2>
          <p className="text-sm text-slate-500">
            Designed to make planning, budgeting, and enjoying your travels seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div 
            onClick={() => onNavigate('trip-detail')}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Visual Itinerary Builder
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Organize your days with drag-and-drop activities, transit details, and hotel reservations.
            </p>
          </div>

          {/* Feature 2 */}
          <div 
            onClick={() => onNavigate('budget')}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Wallet className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Smart Expense Tracker
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Keep your spending in check with automatic category breakdowns and daily expense limits.
            </p>
          </div>

          {/* Feature 3 */}
          <div 
            onClick={() => onNavigate('profile')}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Travel Documents
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Keep offline copies of your passport numbers, visas, hotel bookings, and flight passes.
            </p>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="pt-8 border-t border-slate-200 text-slate-500 text-xs flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">GlobeTrotter</span>
          <span>© 2026. Made for travelers.</span>
        </div>
        <div className="flex items-center gap-4 text-slate-600">
          <button onClick={() => onNavigate('dashboard')} className="hover:text-slate-900 transition-colors cursor-pointer">
            Dashboard
          </button>
          <button onClick={() => onNavigate('create-step-1')} className="hover:text-slate-900 transition-colors cursor-pointer">
            Plan Trip
          </button>
          <button onClick={() => onNavigate('budget')} className="hover:text-slate-900 transition-colors cursor-pointer">
            Budget
          </button>
          <button onClick={() => onNavigate('profile')} className="hover:text-slate-900 transition-colors cursor-pointer">
            Profile
          </button>
        </div>
      </footer>
    </div>
  );
};
