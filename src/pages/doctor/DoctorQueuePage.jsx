import React from 'react';
import DoctorLayout from '../../components/layout/DoctorLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { Clock, Users, CheckCircle2, Play, AlertCircle, ArrowRight, Volume2 } from 'lucide-react';

export default function DoctorQueuePage() {
  const { doctorQueueList, advanceDoctorQueue, activeQueueToken, showToast } = useApp();

  const handleBroadcastChime = () => {
    showToast(`OPD Chime sounded for Token ${activeQueueToken || 'A-11'} at Waiting Lounge B`);
  };

  return (
    <DoctorLayout>
      <BackgroundVisual type="doctor" opacity={0.22} blur="blur-xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                OPD Token Coordinator
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                Live Queue & Waiting Room Cockpit
              </h1>
              <p className="text-xs text-slate-500">
                Manage waiting lists, broadcast tokens to waiting area displays, and progress patients seamlessly.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBroadcastChime}
                className="py-2.5 px-4 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs transition-all flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4 text-caresetu-blue-600" />
                <span>Ring OPD Chime</span>
              </button>
              <button
                onClick={advanceDoctorQueue}
                className="py-2.5 px-5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Call Next Token</span>
              </button>
            </div>
          </div>

          {/* Active Callout Banner */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-teal-500/20 border border-teal-400 text-teal-300 flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold uppercase tracking-wider">Active</span>
                <span className="text-3xl font-black">{activeQueueToken || 'A-11'}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Currently Serving in Chamber
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {doctorQueueList.find(p => p.status === 'In-Consultation')?.patientName || 'Suresh Kumar'}
                </h3>
                <p className="text-xs text-slate-400">
                  CareWell Hospital • OPD Room 204 • Cardiologist Chamber
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-center">
              <div className="px-4 py-2 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Waiting</span>
                <div className="text-xl font-bold text-amber-400">
                  {doctorQueueList.filter(p => p.status === 'Waiting').length} Patients
                </div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Avg Wait</span>
                <div className="text-xl font-bold text-emerald-400">~12 Mins</div>
              </div>
            </div>
          </div>

          {/* Detailed Queue List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Patients Queue Progression (Chronological)
            </h3>

            {doctorQueueList.map((item, idx) => (
              <div
                key={item.token}
                className={`p-4 rounded-3xl border transition-all flex items-center justify-between ${
                  item.status === 'In-Consultation'
                    ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                    : item.status === 'Completed'
                    ? 'bg-slate-50/70 border-slate-200/70 text-slate-400 opacity-80'
                    : 'glass-card'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm ${
                    item.status === 'In-Consultation'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : item.status === 'Completed'
                      ? 'bg-slate-200 text-slate-500'
                      : 'bg-teal-50 text-teal-700 border border-teal-200'
                  }`}>
                    {item.token}
                  </span>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.patientName}</h4>
                    <p className="text-xs text-slate-500">
                      Age {item.age} • Scheduled for {item.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    item.status === 'In-Consultation'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'Completed'
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status}
                  </span>

                  {item.status === 'Waiting' && (
                    <button
                      onClick={advanceDoctorQueue}
                      className="py-1.5 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                    >
                      Call In
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </BackgroundVisual>
    </DoctorLayout>
  );
}
