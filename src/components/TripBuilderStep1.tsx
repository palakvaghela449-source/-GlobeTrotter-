import React, { useState } from 'react';
import { ScreenView } from '../types';
import { Calendar, ArrowRight, MapPin, IndianRupee, Sparkles } from 'lucide-react';

interface TripBuilderStep1Props {
  tripData: {
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    estimatedBudget: number;
  };
  onUpdateTripData: (fields: Partial<TripBuilderStep1Props['tripData']>) => void;
  onNavigate: (view: ScreenView) => void;
}

export const TripBuilderStep1: React.FC<TripBuilderStep1Props> = ({
  tripData,
  onUpdateTripData,
  onNavigate,
}) => {
  const [name, setName] = useState(tripData.name || 'My Rajasthan Adventure');
  const [startDate, setStartDate] = useState(tripData.startDate || '2026-09-05');
  const [endDate, setEndDate] = useState(tripData.endDate || '2026-09-12');
  const [description, setDescription] = useState(tripData.description || 'Experiencing the heritage palaces, forts, and markets of Rajasthan.');
  const [budget, setBudget] = useState<number>(tripData.estimatedBudget || 25000);
  const [error, setError] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a trip name');
      return;
    }
    onUpdateTripData({
      name,
      startDate,
      endDate,
      description,
      estimatedBudget: budget,
    });
    onNavigate('create-step-2');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Stepper Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
            1
          </span>
          <span className="text-sm font-semibold text-slate-900">Trip Details</span>
        </div>
        <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-blue-600 rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-500 font-bold text-xs flex items-center justify-center">
            2
          </span>
          <span className="text-sm font-medium">Destinations</span>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Plan Your Next Adventure
        </h1>
        <p className="text-sm text-slate-500">
          Set up your basic trip info, travel dates, and estimated budget.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleContinue} className="space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Trip Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider" htmlFor="tripName">
              Trip Title *
            </label>
            <input
              id="tripName"
              name="tripName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rajasthan Royal Forts & Lakes"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-xs"
              required
            />
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider" htmlFor="startDate">
                Start Date
              </label>
              <div className="relative">
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 shadow-xs"
                  required
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider" htmlFor="endDate">
                End Date
              </label>
              <div className="relative">
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 shadow-xs"
                  required
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider" htmlFor="description">
              Notes & Trip Goals <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What are the key sights, foods, or experiences you'd like to include?"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none shadow-xs"
            ></textarea>
          </div>

          {/* Target Budget */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider" htmlFor="budget">
              Target Budget (₹)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                ₹
              </span>
              <input
                id="budget"
                name="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                placeholder="25000"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-9 shadow-xs"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400">
              You can track actual expenses and adjust this target anytime in the Budget tab.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              id="trip-builder-continue-btn"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-3 px-6 rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
            >
              <span>Next: Add Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
