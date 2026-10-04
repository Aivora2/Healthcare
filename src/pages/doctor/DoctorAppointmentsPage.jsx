import React, { useState } from 'react';
import DoctorLayout from '../../components/layout/DoctorLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, Video, Building2, CheckCircle2, User, Play, AlertCircle } from 'lucide-react';

export default function DoctorAppointmentsPage() {
  const { doctorQueueList, advanceDoctorQueue, showToast } = useApp();
  const [activeTab, setActiveTab] = useState("Today's Schedule");

  const handleStartConsult = (patient) => {
    showToast(`Starting consultation with ${patient.patientName} (Token ${patient.token})`);
  };

  return (
    <DoctorLayout>
      <BackgroundVisual type="doctor" opacity={0.20} blur="blur-xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Clinical Schedule
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                Doctor Appointments & Schedule
              </h1>
              <p className="text-xs text-slate-500">
                CareWell Hospital • OPD Chamber 204 • Monday to Saturday: 09:30 AM - 02:00 PM
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700">
                Total Booked: {doctorQueueList.length} Patients
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
            {["Today's Schedule", "Upcoming", "Completed Records"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {doctorQueueList.map((p) => (
              <div key={p.token} className="p-5 rounded-3xl glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex flex-col items-center justify-center font-black">
                    <span className="text-[10px] uppercase font-bold text-teal-500">Token</span>
                    <span className="text-xl leading-none">{p.token}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{p.patientName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'In-Consultation'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : p.status === 'Completed'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      Age: {p.age} Y • Slot: {p.time} • In-Clinic Consultation
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Cardiology Checkup & BP Review
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {p.status === 'Waiting' && (
                    <button
                      onClick={() => handleStartConsult(p)}
                      className="py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      Call Patient
                    </button>
                  )}
                  {p.status === 'In-Consultation' && (
                    <button
                      onClick={advanceDoctorQueue}
                      className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      Conclude Visit
                    </button>
                  )}
                  <button
                    onClick={() => showToast(`Opening electronic health records for ${p.patientName}`)}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    View EMR
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
