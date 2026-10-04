import React, { useState } from 'react';
import DoctorLayout from '../../components/layout/DoctorLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { Stethoscope, Building2, Award, Clock, Phone, Mail, Edit3, Save } from 'lucide-react';

export default function DoctorProfilePage() {
  const { currentUser, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Dr. Rahul Mehta',
    specialization: 'Cardiologist',
    qualification: 'MBBS, MD (Medicine), DM (Cardiology)',
    experienceYears: 14,
    registrationNumber: 'RMC-48291',
    hospital: 'CareWell Superspecialty Hospital',
    department: 'Cardiology & Cardiac Sciences',
    designation: 'Senior Consultant & HOD',
    consultationFee: 800,
    opdHours: 'Mon - Sat: 09:30 AM - 02:00 PM',
    phone: '+91 98290 99887',
    email: 'dr.rahul.mehta@carewellhospital.org'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    showToast('Doctor credentials & consultation parameters saved!');
  };

  return (
    <DoctorLayout>
      <BackgroundVisual type="doctor" opacity={0.20} blur="blur-xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Clinical Practitioner Identity
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                Doctor Profile & Credentials
              </h1>
              <p className="text-xs text-slate-500">
                Official medical credentials, affiliated hospital, OPD chambers, and consultation timings.
              </p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="py-2 px-4 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs flex items-center gap-1.5 self-start"
            >
              <Edit3 className="w-3.5 h-3.5 text-teal-600" />
              <span>{isEditing ? 'Cancel' : 'Edit Credentials'}</span>
            </button>
          </div>

          <div className="p-6 rounded-3xl glass-card flex flex-col sm:flex-row items-center gap-6">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'}
              alt={profile.name}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-teal-200 shadow-md"
            />
            <div className="text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
                  {profile.specialization}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  {profile.registrationNumber}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">
                {profile.qualification} • {profile.experienceYears} Years Clinical Experience
              </p>
              <p className="text-xs text-slate-500">
                {profile.designation}, {profile.department}
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-3xl glass-card space-y-4">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Institutional Affiliation
                </h3>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Affiliated Hospital</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.hospital}
                    onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Department</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">OPD Hours</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profile.opdHours}
                    onChange={(e) => setProfile({ ...profile, opdHours: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="p-6 rounded-3xl glass-card space-y-4">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Practice & Consultation Parameters
                </h3>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Consultation Fee (INR)</label>
                  <input
                    type="number"
                    disabled={!isEditing}
                    value={profile.consultationFee}
                    onChange={(e) => setProfile({ ...profile, consultationFee: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Professional Email</label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Emergency Cell</label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl glass-input font-semibold disabled:bg-slate-50/50"
                  />
                </div>
              </div>

            </div>

            {isEditing && (
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Practitioner Profile</span>
                </button>
              </div>
            )}
          </form>

        </div>
      </BackgroundVisual>
    </DoctorLayout>
  );
}
