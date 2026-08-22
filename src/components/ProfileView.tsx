import React, { useState } from 'react';
import { ScreenView, TravelDoc } from '../types';
import { MOCK_USER_DOCS } from '../data/mockData';
import { 
  User, 
  Mail, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Lock, 
  Globe, 
  Plane, 
  Calendar,
  CheckCircle,
  X,
  Edit2
} from 'lucide-react';

interface ProfileViewProps {
  onNavigate: (view: ScreenView) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onNavigate,
}) => {
  const [docs, setDocs] = useState<TravelDoc[]>(MOCK_USER_DOCS);
  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Vandna Vaja',
    email: 'palakvaghela449@gmail.com',
    homeAirport: 'AMD (Ahmedabad, India)',
    preferredCurrency: 'INR (₹)',
    emergencyContact: '+91 98765 43210 (Family)',
  });

  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return nameStr.substring(0, 2).toUpperCase();
  };

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editAirport, setEditAirport] = useState(userProfile.homeAirport);
  const [editEmergency, setEditEmergency] = useState(userProfile.emergencyContact);

  // New doc fields
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<TravelDoc['type']>('Passport');
  const [newNumber, setNewNumber] = useState('');
  const [newExpiry, setNewExpiry] = useState('2028-12-31');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      name: editName.trim() || 'Vandna Vaja',
      homeAirport: editAirport.trim() || 'AMD (Ahmedabad, India)',
      emergencyContact: editEmergency.trim() || '+91 98765 43210 (Family)',
    });
    setIsEditingProfile(false);
  };

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newNumber.trim()) return;

    const newDocItem: TravelDoc = {
      id: `doc-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      docNumber: newNumber.trim(),
      expiryDate: newExpiry,
      status: 'Valid',
    };

    setDocs([...docs, newDocItem]);
    setNewTitle('');
    setNewNumber('');
    setShowAddDocModal(false);
  };

  const handleDeleteDoc = (id: string) => {
    setDocs(docs.filter(d => d.id !== id));
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Traveler Profile & Documents
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your travel profile, stored credentials, and trip preferences.
        </p>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-sm">
            {getInitials(userProfile.name)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                {userProfile.name}
              </h2>
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                Active Member
              </span>
              <button
                onClick={() => {
                  setEditName(userProfile.name);
                  setEditAirport(userProfile.homeAirport);
                  setEditEmergency(userProfile.emergencyContact);
                  setIsEditingProfile(true);
                }}
                className="text-slate-400 hover:text-blue-600 p-1 rounded-md transition-colors cursor-pointer"
                title="Edit Profile"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {userProfile.email}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Home Base: {userProfile.homeAirport}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => {
              setEditName(userProfile.name);
              setEditAirport(userProfile.homeAirport);
              setEditEmergency(userProfile.emergencyContact);
              setIsEditingProfile(true);
            }}
            className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Info</span>
          </button>

          <button
            onClick={() => onNavigate('create-step-1')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Plan New Voyage
          </button>
        </div>
      </div>

      {/* Grid: Documents & Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Travel Documents (8 cols) */}
        <div className="col-span-1 md:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Saved Travel Documents ({docs.length})
              </h3>
              <p className="text-xs text-slate-500">
                Encrypted and stored securely for offline access
              </p>
            </div>

            <button
              onClick={() => setShowAddDocModal(true)}
              id="add-document-btn"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Document</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {docs.map(doc => (
              <div
                key={doc.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      {doc.type}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 pt-1">
                      {doc.title}
                    </h4>
                    <p className="text-xs font-mono text-slate-600">
                      {doc.docNumber}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteDoc(doc.id)}
                    className="text-slate-300 hover:text-red-600 transition-colors p-1 cursor-pointer"
                    title="Remove Document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Expires: {doc.expiryDate}</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Preferences (4 cols) */}
        <div className="col-span-1 md:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Globe className="w-4 h-4 text-blue-600" />
            Travel Preferences
          </h3>

          <div className="space-y-3.5 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Default Currency</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">{userProfile.preferredCurrency}</span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Frequent Flyer & Pass</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">6E-Indigo Tier Gold</span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Emergency Contact</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">{userProfile.emergencyContact}</span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Dietary Preferences</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">Vegetarian / Local Cuisine</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>All itinerary data is kept securely in your local profile.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Document Modal */}
      {showAddDocModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Add Travel Document
              </h3>
              <button
                onClick={() => setShowAddDocModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDoc} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Document Title *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Schengen Tourist Visa"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                  >
                    <option value="Passport">Passport</option>
                    <option value="Visa">Visa</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Ticket">Ticket / Boarding Pass</option>
                    <option value="ID">National ID / License</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Document Number / Reference *
                </label>
                <input
                  type="text"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  placeholder="e.g. Z9940212 or PNR: 6E-991"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddDocModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-xs cursor-pointer"
                >
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Edit Traveler Profile
              </h3>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Vandna Vaja"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Home Base / Airport
                </label>
                <input
                  type="text"
                  value={editAirport}
                  onChange={(e) => setEditAirport(e.target.value)}
                  placeholder="e.g. AMD (Ahmedabad, India)"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  value={editEmergency}
                  onChange={(e) => setEditEmergency(e.target.value)}
                  placeholder="e.g. +91 98765 43210 (Family)"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-xs cursor-pointer"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
