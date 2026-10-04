import React, { useState } from 'react';
import PatientLayout from '../../components/layout/PatientLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Heart, 
  ShieldAlert, 
  Calendar, 
  Edit3, 
  Save, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';

export default function PatientProfilePage() {
  const { currentUser, setCurrentUser, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Meera Sharma',
    phone: currentUser?.phone || '+91 98290 12345',
    email: currentUser?.email || 'meera.sharma@example.com',
    dob: '14 May 1978',
    gender: 'Female',
    bloodGroup: 'O+',
    city: 'Jaipur, Rajasthan',
    address: 'Bapu Nagar, Tonk Road, Jaipur',
    emergencyContactName: 'Sanjay Sharma (Husband)',
    emergencyContactPhone: '+91 98290 54321',
    allergies: 'Penicillin (mild sensitivity)',
    chronicConditions: 'Mild Hypertension (controlled)'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({ ...prev, name: profile.name, phone: profile.phone, city: profile.city }));
    setIsEditing(false);
    showToast('Patient profile updated successfully!');
  };

  return (
    <PatientLayout>
      <BackgroundVisual type="reception" opacity={0.20} blur="blur-2xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-caresetu-blue-600 uppercase tracking-wider">
                Personal Health Identity
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                My Health Profile
              </h1>
              <p className="text-xs text-slate-500">
                Manage your demographic data, emergency contacts, and vital medical notes.
              </p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="py-2.5 px-4 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors flex items-center gap-1.5 self-start"
            >
              <Edit3 className="w-3.5 h-3.5 text-caresetu-blue-600" />
              <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Profile Card Header */}
          <div className="p-6 rounded-3xl glass-card flex flex-col sm:flex-row items-center gap-6">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'}
              alt="Meera Sharma"
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-caresetu-blue-100 shadow-md"
            />
            <div className="text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Verified Patient
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                  Blood Group: {profile.bloodGroup}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {profile.city} • Age 48 • {profile.gender}
              </p>
              <p className="text-xs text-slate-600 font-mono mt-1">
                CareSetu Universal Health ID: <strong className="text-caresetu-blue-700">CS-2026-9812-44</strong>
              </p>
            </div>
          </div>

          {/* Form / Details Container */}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Demographics & Contact */}
              <div className="p-6 rounded-3xl glass-card space-y-4">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Contact & Demographics
                </h3>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Residential City</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Emergency & Medical Preferences */}
              <div className="p-6 rounded-3xl glass-card space-y-4">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Emergency Contacts & Clinical Notes
                </h3>

                <div>
                  <label className="block text-[11px] font-bold text-rose-600 uppercase tracking-wider mb-1">Primary Emergency Contact</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.emergencyContactName}
                    onChange={(e) => setProfile({ ...profile, emergencyContactName: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50 border-rose-200/60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-rose-600 uppercase tracking-wider mb-1">Emergency Phone Number</label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={profile.emergencyContactPhone}
                    onChange={(e) => setProfile({ ...profile, emergencyContactPhone: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50 border-rose-200/60"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Known Drug Allergies</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.allergies}
                    onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Chronic Health Conditions</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.chronicConditions}
                    onChange={(e) => setProfile({ ...profile, chronicConditions: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50"
                  />
                </div>
              </div>

            </div>

            {isEditing && (
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-2xl bg-gradient-to-r from-caresetu-blue-600 to-caresetu-teal-500 text-white font-extrabold text-xs shadow-md shadow-caresetu-blue-500/25 hover:opacity-95 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            )}
          </form>

        </div>
      </BackgroundVisual>
    </PatientLayout>
  );
}
