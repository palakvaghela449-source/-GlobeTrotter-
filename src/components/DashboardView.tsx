import React, { useState } from 'react';
import { ScreenView, Trip } from '../types';
import { Plus, Calendar, MapPin, Wallet, ArrowRight, Search, Compass, CheckCircle2, Clock } from 'lucide-react';

interface DashboardViewProps {
  trips: Trip[];
  onNavigate: (view: ScreenView) => void;
  onSelectTrip: (trip: Trip) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  trips,
  onNavigate,
  onSelectTrip,
}) => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trip.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const activeTrip = trips[0] || null;
  const totalBudget = trips.reduce((acc, t) => acc + t.estimatedBudget, 0);
  const totalSpent = trips.reduce((acc, t) => acc + (t.spentBudget || 0), 0);

  const handleOpenTrip = (trip: Trip) => {
    onSelectTrip(trip);
    onNavigate('trip-detail');
  };

  const handleOpenBudget = (trip: Trip) => {
    onSelectTrip(trip);
    onNavigate('budget');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Trips & Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your upcoming voyages, itineraries, and travel budgets.
          </p>
        </div>

        <button
          onClick={() => onNavigate('create-step-1')}
          id="dashboard-new-trip-btn"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Plan a New Trip</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Planned Trips</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">{trips.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Spent</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">
              ₹{totalSpent.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Allocated Budget</p>
            <p className="text-2xl font-bold text-slate-900 mt-0.5">
              ₹{totalBudget.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      {/* Active Featured Trip Banner */}
      {activeTrip && (
        <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Next Upcoming Trip
              </span>
            </div>
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {activeTrip.durationText}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
            <div className="md:col-span-4 h-48 rounded-xl overflow-hidden bg-slate-100 relative">
              <img
                src={activeTrip.coverImage}
                alt={activeTrip.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-xs font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-300" />
                  {activeTrip.formattedDates}
                </p>
              </div>
            </div>

            <div className="md:col-span-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">
                  {activeTrip.name}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeTrip.description}
                </p>

                {/* Stops */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs text-slate-500 font-medium">Destinations:</span>
                  {activeTrip.routeStops?.map(stop => (
                    <span
                      key={stop.id}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700"
                    >
                      {stop.name} ({stop.days}d)
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress & Actions */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600">
                    Budget Spent: ₹{activeTrip.spentBudget.toLocaleString('en-IN')}
                  </span>
                  <span className="text-slate-500">
                    Target: ₹{activeTrip.estimatedBudget.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (activeTrip.spentBudget / activeTrip.estimatedBudget) * 100)}%`,
                    }}
                  ></div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => handleOpenTrip(activeTrip)}
                    id="featured-trip-view-btn"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>View Full Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleOpenBudget(activeTrip)}
                    id="featured-trip-budget-btn"
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-xs px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Wallet className="w-3.5 h-3.5 text-slate-500" />
                    <span>Manage Expenses</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trips Collection Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900">
            All Planned Trips ({filteredTrips.length})
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter trips..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map(trip => {
            const percentSpent = Math.min(100, Math.round((trip.spentBudget / trip.estimatedBudget) * 100));

            return (
              <div
                key={trip.id}
                id={`trip-card-${trip.id}`}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={trip.coverImage}
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-xs font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-300" />
                      {trip.formattedDates}
                    </span>
                  </div>
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {trip.durationText}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {trip.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {trip.description}
                    </p>
                  </div>

                  {/* Budget & Progress */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">
                        Spent: <span className="font-semibold text-slate-800">₹{trip.spentBudget.toLocaleString('en-IN')}</span>
                      </span>
                      <span className="text-slate-400">
                        Budget: ₹{trip.estimatedBudget.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${percentSpent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => handleOpenTrip(trip)}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs py-2 rounded-lg transition-colors cursor-pointer text-center"
                    >
                      View Trip
                    </button>
                    <button
                      onClick={() => handleOpenBudget(trip)}
                      className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium transition-colors cursor-pointer"
                      title="Manage Budget"
                    >
                      Budget
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
