import React, { useState } from 'react';
import { ScreenView, Trip, TripActivity } from '../types';
import { 
  Calendar as CalendarIcon, 
  Share2, 
  Edit3, 
  Camera, 
  Building, 
  Bus, 
  Utensils, 
  ZoomIn, 
  Plus, 
  Check, 
  MapPin, 
  Clock, 
  X,
  ExternalLink,
  Wallet
} from 'lucide-react';

interface TripDetailViewProps {
  trip: Trip;
  onNavigate: (view: ScreenView) => void;
  onUpdateTrip: (updatedTrip: Trip) => void;
}

export const TripDetailView: React.FC<TripDetailViewProps> = ({
  trip,
  onNavigate,
  onUpdateTrip,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'calendar' | 'timeline'>('list');
  const [copied, setCopied] = useState(false);
  const [showAddActivityModal, setShowAddActivityModal] = useState<number | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showEditTripModal, setShowEditTripModal] = useState(false);

  // New activity state
  const [newType, setNewType] = useState<'transit' | 'lodging' | 'activity' | 'food'>('activity');
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newTime, setNewTime] = useState('06:00 PM');
  const [newCost, setNewCost] = useState<number>(500);

  // Edit trip fields
  const [editName, setEditName] = useState(trip.name);
  const [editBudget, setEditBudget] = useState(trip.estimatedBudget);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddActivity = (dayNumber: number) => {
    if (!newTitle.trim()) return;
    const newAct: TripActivity = {
      id: `act-${Date.now()}`,
      type: newType,
      title: newTitle,
      subtitle: newSubtitle || 'Custom activity',
      time: newTime,
      cost: newCost,
    };

    const updatedDays = trip.days.map(d => {
      if (d.dayNumber === dayNumber) {
        return {
          ...d,
          activities: [...d.activities, newAct],
        };
      }
      return d;
    });

    onUpdateTrip({
      ...trip,
      spentBudget: trip.spentBudget + (newCost || 0),
      days: updatedDays,
    });

    setShowAddActivityModal(null);
    setNewTitle('');
    setNewSubtitle('');
    setNewCost(500);
  };

  const handleSaveTripEdits = () => {
    onUpdateTrip({
      ...trip,
      name: editName,
      estimatedBudget: editBudget,
    });
    setShowEditTripModal(false);
  };

  const percentSpent = Math.min(100, Math.round((trip.spentBudget / trip.estimatedBudget) * 100));

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      {/* Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              {trip.durationText}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
              {trip.formattedDates}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {trip.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            {trip.description}
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleShare}
            id="trip-share-btn"
            className="flex-1 sm:flex-none flex justify-center items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowEditTripModal(true)}
            id="trip-edit-btn"
            className="flex-1 sm:flex-none flex justify-center items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Trip</span>
          </button>
        </div>
      </div>

      {/* Cover Image */}
      <div className="w-full h-56 md:h-72 rounded-2xl overflow-hidden shadow-xs relative border border-slate-200 group">
        <img
          src={trip.coverImage}
          alt={trip.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-lg px-3.5 py-1.5 text-xs font-medium text-slate-800 flex items-center gap-1.5 shadow-sm border border-slate-200/50">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>Taj Lake Palace, Udaipur • Rajasthan Circuit</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2">
        <button
          onClick={() => setActiveTab('list')}
          id="tab-list-view"
          className={`px-4 py-3 font-medium text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
            activeTab === 'list'
              ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Daily Itinerary
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          id="tab-calendar-view"
          className={`px-4 py-3 font-medium text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
            activeTab === 'calendar'
              ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Calendar Overview
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          id="tab-timeline-view"
          className={`px-4 py-3 font-medium text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all ${
            activeTab === 'timeline'
              ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Timeline
        </button>
      </div>

      {/* Main Grid Layout (12 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Itinerary Days (8 cols) */}
        <div className="col-span-1 md:col-span-8 space-y-5">
          {activeTab === 'list' && (
            <>
              {trip.days.map((day) => (
                <div
                  key={day.dayNumber}
                  id={`day-card-${day.dayNumber}`}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4"
                >
                  {/* Day Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center">
                        Day {day.dayNumber}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          {day.city}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {day.dateFormatted}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowAddActivityModal(day.dayNumber)}
                      id={`add-activity-day-${day.dayNumber}`}
                      className="text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Activity</span>
                    </button>
                  </div>

                  {/* Summary */}
                  {day.summary && (
                    <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      "{day.summary}"
                    </p>
                  )}

                  {/* Activities List */}
                  {day.activities.length > 0 && (
                    <div className="space-y-3 pt-1">
                      {day.activities.map((act) => {
                        const isLodging = act.type === 'lodging';
                        const isTransit = act.type === 'transit';
                        const isFood = act.type === 'food';

                        return (
                          <div
                            key={act.id}
                            className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-white"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                isTransit ? 'bg-sky-50 text-sky-600' :
                                isLodging ? 'bg-amber-50 text-amber-600' :
                                isFood ? 'bg-rose-50 text-rose-600' :
                                'bg-emerald-50 text-emerald-600'
                              }`}>
                                {isTransit && <Bus className="w-4 h-4" />}
                                {isLodging && <Building className="w-4 h-4" />}
                                {isFood && <Utensils className="w-4 h-4" />}
                                {!isTransit && !isLodging && !isFood && <Camera className="w-4 h-4" />}
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                    {act.type}
                                  </span>
                                  <h4 className="text-sm font-semibold text-slate-900">
                                    {act.title}
                                  </h4>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">
                                  {act.subtitle}
                                </p>
                              </div>
                            </div>

                            <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-1">
                              <span className="text-xs text-slate-500 font-medium">
                                {act.time}
                              </span>
                              {act.cost !== undefined && (
                                <span className="text-xs font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                                  ₹{act.cost.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {activeTab === 'calendar' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">September 2026</h3>
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 pb-2 border-b border-slate-100">
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {[...Array(30)].map((_, i) => {
                  const dayNum = i + 1;
                  const isTripDay = dayNum >= 5 && dayNum <= 12;
                  return (
                    <div
                      key={dayNum}
                      className={`h-14 p-1.5 rounded-xl border text-left flex flex-col justify-between ${
                        isTripDay
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-slate-50 border-slate-100 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-semibold">{dayNum}</span>
                      {isTripDay && (
                        <span className="text-[10px] bg-blue-600 text-white font-medium px-1.5 py-0.5 rounded-md truncate">
                          {dayNum === 5 ? 'AMD' : dayNum <= 7 ? 'UDR' : 'JAI'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Itinerary Progression</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-center p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Day 1: Ahmedabad</p>
                    <p className="text-xs text-slate-500">Flight Arrival & Sunset Riverfront Walk</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Day 2: Udaipur</p>
                    <p className="text-xs text-slate-500">Scenic Bus to Lake City, Taj Lake Palace & City Palace Tour</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Day 3: Udaipur</p>
                    <p className="text-xs text-slate-500">Lake Pichola Cruise & Bagore Ki Haveli Folk Dance</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Budget & Map (4 cols) */}
        <div className="col-span-1 md:col-span-4 space-y-5">
          {/* Budget Overview Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Trip Budget
              </h3>
              <button
                onClick={() => onNavigate('budget')}
                id="view-full-budget-btn"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Manage</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-500">Total Spent</p>
                <p className="text-2xl font-bold text-slate-900">
                  ₹{trip.spentBudget.toLocaleString('en-IN')}
                </p>
              </div>
              <span className="text-xs text-slate-500 mb-1">
                of ₹{trip.estimatedBudget.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentSpent}%` }}
              ></div>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Accommodation & Hotel</span>
                <span className="font-semibold text-slate-800">₹2,000</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Guided Tours & Activities</span>
                <span className="font-semibold text-slate-800">₹300</span>
              </div>
            </div>
          </div>

          {/* Map Overview Card */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs h-64 relative group">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAXzbR7KSNspEcXb5w_ro6u0rMS5SpQaUEWfx6EpXw7_ejl6BTLGnI48uedjabETDBXqoMgVnRwiPwGDnPIqJ7zCi7FrPzg4Qx-KKCdB5rd0lAjQL6GiZNTC1PB9lxrFIq2BfoiDl_edf1Ul9GQZ97LBGCS1aghIRcq--bu_HjIsVyMfY6fiLpxbbj7Alsrx4we3IOukmBUlOuKUPDoewM_O18jXnzSxsg2TqPxTXMg53-o9FLoAMg"
              alt="Route Map"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-800 shadow-xs border border-slate-200/60">
              Rajasthan Route Map
            </div>
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setShowMapModal(true)}
                id="map-zoom-btn"
                className="flex items-center justify-center w-8 h-8 rounded-md text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
                title="Expand Map"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Activity Modal */}
      {showAddActivityModal !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Add Item to Day {showAddActivityModal}
              </h3>
              <button
                onClick={() => setShowAddActivityModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Category</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['activity', 'lodging', 'transit', 'food'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewType(t)}
                      className={`py-2 px-1 rounded-lg text-xs font-semibold capitalize border transition-all ${
                        newType === t
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Amber Fort Sunset Tour"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Notes & Details</label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="e.g. Guided tour booked online"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="05:00 PM"
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Cost (₹)</label>
                  <input
                    type="number"
                    value={newCost}
                    onChange={(e) => setNewCost(Number(e.target.value))}
                    placeholder="500"
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowAddActivityModal(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddActivity(showAddActivityModal)}
                className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-xs cursor-pointer"
              >
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Zoom Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Route Map</h3>
              <button onClick={() => setShowMapModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAXzbR7KSNspEcXb5w_ro6u0rMS5SpQaUEWfx6EpXw7_ejl6BTLGnI48uedjabETDBXqoMgVnRwiPwGDnPIqJ7zCi7FrPzg4Qx-KKCdB5rd0lAjQL6GiZNTC1PB9lxrFIq2BfoiDl_edf1Ul9GQZ97LBGCS1aghIRcq--bu_HjIsVyMfY6fiLpxbbj7Alsrx4we3IOukmBUlOuKUPDoewM_O18jXnzSxsg2TqPxTXMg53-o9FLoAMg"
              alt="Expanded Route Map"
              className="w-full h-80 object-cover rounded-xl border border-slate-200"
            />
          </div>
        </div>
      )}

      {/* Edit Trip Modal */}
      {showEditTripModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Edit Trip Details</h3>
              <button onClick={() => setShowEditTripModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Trip Title</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Target Budget (₹)</label>
                <input
                  type="number"
                  value={editBudget}
                  onChange={(e) => setEditBudget(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowEditTripModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTripEdits}
                className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-xs cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
