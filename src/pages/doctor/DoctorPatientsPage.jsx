import React, { useState } from 'react';
import DoctorLayout from '../../components/layout/DoctorLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { Users, Search, FileText, Phone, Calendar, Heart, ShieldCheck } from 'lucide-react';

export default function DoctorPatientsPage() {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');

  const patients = [
    { id: 'pat-1', name: 'Meera Sharma', age: 48, gender: 'Female', phone: '+91 98290 12345', lastVisit: '12 Sep 2026', diagnosis: 'Essential Hypertension (Controlled)', nextAppt: '12 Oct 2026' },
    { id: 'pat-2', name: 'Suresh Kumar', age: 54, gender: 'Male', phone: '+91 98291 55432', lastVisit: 'Today', diagnosis: 'Post-PTCA Follow-up', nextAppt: 'In Consultation' },
    { id: 'pat-3', name: 'Priyanka Verma', age: 32, gender: 'Female', phone: '+91 98292 88761', lastVisit: 'Today', diagnosis: 'Palpitations & Sinus Tachycardia', nextAppt: 'Waiting' },
    { id: 'pat-4', name: 'Harish Chandra', age: 67, gender: 'Male', phone: '+91 98293 44109', lastVisit: '24 Jul 2026', diagnosis: 'Ischemic Heart Disease, Dyslipidemia', nextAppt: '13 Oct 2026' },
  ];

  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.diagnosis.toLowerCase().includes(search.toLowerCase()));

  return (
    <DoctorLayout>
      <BackgroundVisual type="doctor" opacity={0.20} blur="blur-xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Clinical Directory
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                Doctor Patients & EMR
              </h1>
              <p className="text-xs text-slate-500">
                Search comprehensive patient longitudinal records and clinical treatment history.
              </p>
            </div>
          </div>

          <div className="p-2 rounded-2xl glass-panel shadow-xs flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400 pl-1" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patient name, contact, or diagnosis..."
              className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <div key={p.id} className="p-5 rounded-3xl glass-card flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                      {p.gender}, {p.age} Y
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {p.phone}
                  </p>
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-bold text-slate-700 block">Clinical Diagnosis:</span>
                    <span className="text-slate-600">{p.diagnosis}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Last visit: {p.lastVisit}</span>
                  <button
                    onClick={() => showToast(`Opening electronic medical summary for ${p.name}`)}
                    className="py-1.5 px-3 rounded-xl bg-caresetu-blue-600 text-white font-bold hover:bg-caresetu-blue-700 transition-colors"
                  >
                    View EMR File
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </BackgroundVisual>
    </DoctorLayout>
  );
}
