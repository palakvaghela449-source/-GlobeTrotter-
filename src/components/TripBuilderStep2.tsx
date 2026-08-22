import React, { useState } from 'react';
import { ScreenView, RouteStop, Trip } from '../types';
import { SUGGESTED_CITIES } from '../data/mockData';
import { Search, Plus, Trash2, ArrowRight, ArrowLeft, GripVertical, Clock, MapPin, Check } from 'lucide-react';

interface TripBuilderStep2Props {
  tripData: {
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    estimatedBudget: number;
  };
  onSaveTrip: (newTrip: Partial<Trip>) => void;
  onNavigate: (view: ScreenView) => void;
}

export const TripBuilderStep2: React.FC<TripBuilderStep2Props> = ({
  tripData,
  onSaveTrip,
  onNavigate,
}) => {
  const [searchCity, setSearchCity] = useState('');
  const [routeStops, setRouteStops] = useState<RouteStop[]>([
    { id: '1', name: 'Ahmedabad', days: 1 },
    { id: '2', name: 'Udaipur', days: 2 },
    { id: '3', name: 'Jaipur', days: 4 },
  ]);

  const addCity = (cityName: string) => {
    if (!cityName.trim()) return;
    const exists = routeStops.some(s => s.name.toLowerCase() === cityName.toLowerCase());
    if (exists) return;
    const newStop: RouteStop = {
      id: String(Date.now()),
      name: cityName.trim(),
      days: 2,
    };
    setRouteStops([...routeStops, newStop]);
    setSearchCity('');
  };

  const removeCity = (id: string) => {
    setRouteStops(routeStops.filter(s => s.id !== id));
  };

  const updateDays = (id: string, delta: number) => {
    setRouteStops(routeStops.map(s => {
      if (s.id === id) {
        const updatedDays = Math.max(1, s.days + delta);
        return { ...s, days: updatedDays };
      }
      return s;
    }));
  };

  const moveStop = (index: number, direction: 'up' | 'down') => {
    const newStops = [...routeStops];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newStops.length) return;
    const temp = newStops[index];
    newStops[index] = newStops[targetIndex];
    newStops[targetIndex] = temp;
    setRouteStops(newStops);
  };

  const handleFinish = () => {
    const totalDays = routeStops.reduce((acc, s) => acc + s.days, 0);
    onSaveTrip({
      name: tripData.name,
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      formattedDates: '05 Sep - 12 Sep',
      durationText: `${totalDays || 7} Days`,
      description: tripData.description,
      estimatedBudget: tripData.estimatedBudget,
      spentBudget: 2300,
      locationsCount: routeStops.length,
      routeStops,
    });
    onNavigate('trip-detail');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Stepper Indicator */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('create-step-1')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 cursor-pointer"
        >
          <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
            ✓
          </span>
          <span className="text-sm font-medium">Trip Details</span>
        </button>

        <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="w-full h-full bg-blue-600 rounded-full"></div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
            2
          </span>
          <span className="text-sm font-semibold text-slate-900">Destinations</span>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Where will you be staying?
        </h1>
        <p className="text-sm text-slate-500">
          Add cities or stops to your itinerary and set how many days you'll spend at each.
        </p>
      </div>

      {/* Add City Input */}
      <div className="relative">
        <div className="relative bg-white rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 shadow-xs flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            id="city-search-input"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addCity(searchCity);
              }
            }}
            placeholder="Type a city name (e.g. Udaipur, Jodhpur, Manali)..."
            className="w-full h-12 pl-10 pr-24 bg-transparent focus:outline-none text-sm text-slate-900 placeholder:text-slate-400"
          />
          {searchCity && (
            <button
              onClick={() => addCity(searchCity)}
              className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Add Stop
            </button>
          )}
        </div>
      </div>

      {/* Popular City Suggestions */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Suggested Stops in Rajasthan & India
        </p>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_CITIES.slice(0, 7).map((city) => {
            const isAdded = routeStops.some(s => s.name.toLowerCase() === city.toLowerCase());
            return (
              <button
                key={city}
                id={`suggested-city-${city}`}
                onClick={() => addCity(city)}
                disabled={isAdded}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isAdded
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
                }`}
              >
                <span>{city}</span>
                {!isAdded && <Plus className="w-3 h-3 text-slate-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Planned Stops List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            Route Stops ({routeStops.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Total Duration: {routeStops.reduce((sum, s) => sum + s.days, 0)} Days
          </span>
        </div>

        {routeStops.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">
            No stops added yet. Search or click a suggestion above.
          </p>
        ) : (
          <div className="space-y-3">
            {routeStops.map((stop, index) => (
              <div
                key={stop.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {stop.name}
                    </h4>
                    <span className="text-xs text-slate-500">
                      {stop.days} {stop.days === 1 ? 'Day' : 'Days'} stay
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Duration stepper buttons */}
                  <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
                    <button
                      onClick={() => updateDays(stop.id, -1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                      title="Decrease days"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-semibold text-slate-800">
                      {stop.days}d
                    </span>
                    <button
                      onClick={() => updateDays(stop.id, 1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                      title="Increase days"
                    >
                      +
                    </button>
                  </div>

                  {/* Move Up/Down */}
                  <div className="flex items-center">
                    {index > 0 && (
                      <button
                        onClick={() => moveStop(index, 'up')}
                        className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
                        title="Move Up"
                      >
                        ↑
                      </button>
                    )}
                    {index < routeStops.length - 1 && (
                      <button
                        onClick={() => moveStop(index, 'down')}
                        className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
                        title="Move Down"
                      >
                        ↓
                      </button>
                    )}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeCity(stop.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remove Stop"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => onNavigate('create-step-1')}
          className="text-slate-600 hover:text-slate-900 font-medium text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 1</span>
        </button>

        <button
          onClick={handleFinish}
          id="trip-builder-finish-btn"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-3 px-6 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <span>Create & View Itinerary</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
