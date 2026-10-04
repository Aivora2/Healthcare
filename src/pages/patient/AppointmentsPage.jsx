import React, { useState } from 'react';
import PatientLayout from '../../components/layout/PatientLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export default function AppointmentsPage() {
  const { 
    appointments, 
    cancelAppointment, 
    rescheduleAppointment,
    setQueueModalData,
    setBookingModalDoctor,
    doctors,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('All'); // 'All', 'Upcoming', 'Completed', 'Cancelled'
  const [reschedulingId, setReschedulingId] = useState(null);

  const filtered = appointments.filter(a => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Upcoming') return a.status === 'Confirmed' || a.status === 'Upcoming';
    if (activeTab === 'Completed') return a.status === 'Completed';
    if (activeTab === 'Cancelled') return a.status === 'Cancelled';
    return true;
  });

  const handleRescheduleSubmit = (id) => {
    rescheduleAppointment(id, 'Tomorrow, 14 Oct', '11:30 AM');
    setReschedulingId(null);
  };

  return (
    <PatientLayout>
      <BackgroundVisual type="reception" opacity={0.22} blur="blur-2xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-caresetu-blue-600 uppercase tracking-wider">
                Consultation Timeline
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                My Appointments
              </h1>
              <p className="text-xs text-slate-500">
                Track live OPD tokens, reschedule visits, or consult with doctors via HD video.
              </p>
            </div>

            <button
              onClick={() => setBookingModalDoctor(doctors[0])}
              className="py-2.5 px-4 rounded-2xl bg-caresetu-blue-600 hover:bg-caresetu-blue-700 text-white font-bold text-xs shadow-md shadow-caresetu-blue-500/20 transition-all flex items-center gap-2 self-start"
            >
              <Calendar className="w-4 h-4" />
              <span>Book New Appointment</span>
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
            {['All', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="p-12 text-center rounded-3xl glass-card text-slate-500 text-xs">
                No appointments found under the "{activeTab}" filter.
              </div>
            ) : (
              filtered.map((apt) => (
                <div key={apt.id} className="p-6 rounded-3xl glass-card flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left: Date Badge & Doctor Details */}
                  <div className="flex items-start sm:items-center gap-5">
                    {/* Calendar Badge */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-caresetu-blue-50 to-caresetu-teal-50 border border-caresetu-blue-200/70 flex flex-col items-center justify-center text-center shadow-xs flex-shrink-0">
                      <span className="text-[10px] font-extrabold text-caresetu-blue-600 uppercase">
                        {apt.date.split(' ')[1] || 'OCT'}
                      </span>
                      <span className="text-xl font-black text-slate-900 leading-none">
                        {apt.date.split(' ')[0] || '12'}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400">
                        {apt.dayName || 'Day'}
                      </span>
                    </div>

                    {/* Doctor Info */}
                    <div className="flex items-start sm:items-center gap-3.5">
                      <img
                        src={apt.avatar}
                        alt={apt.doctorName}
                        className="w-12 h-12 rounded-xl object-cover ring-1 ring-caresetu-blue-200 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900">{apt.doctorName}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            apt.status === 'Confirmed' || apt.status === 'Upcoming'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : apt.status === 'Completed'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {apt.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          {apt.specialization} • {apt.qualification}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {apt.hospital}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs">
                          <span className="font-bold text-caresetu-blue-600">
                            {apt.time} ({apt.type})
                          </span>
                          <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                            Token: {apt.tokenNumber}
                          </span>
                        </div>
                        {apt.clinicalNote && (
                          <p className="text-[11px] text-slate-500 mt-1 italic">
                            Note: {apt.clinicalNote}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-wrap items-center gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
                    {(apt.status === 'Confirmed' || apt.status === 'Upcoming') && (
                      <>
                        <button
                          onClick={() => setQueueModalData(apt)}
                          className="py-2.5 px-4 rounded-xl bg-caresetu-blue-600 hover:bg-caresetu-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
                        >
                          Track Live Queue
                        </button>
                        <button
                          onClick={() => setReschedulingId(apt.id)}
                          className="py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="py-2.5 px-3.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {apt.status === 'Completed' && (
                      <span className="text-xs font-semibold text-slate-400 py-1">
                        Consultation Concluded • Record in Vault
                      </span>
                    )}

                    {apt.status === 'Cancelled' && (
                      <span className="text-xs font-semibold text-rose-500 py-1">
                        Cancelled by patient
                      </span>
                    )}
                  </div>

                  {/* In-place Reschedule Confirmation Box */}
                  {reschedulingId === apt.id && (
                    <div className="w-full mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
                      <div className="text-xs text-amber-900 font-medium">
                        Reschedule to <strong>Tomorrow, 14 Oct at 11:30 AM</strong>?
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setReschedulingId(null)}
                          className="py-1.5 px-3 rounded-xl bg-white text-slate-600 font-bold text-xs"
                        >
                          Keep Current
                        </button>
                        <button
                          onClick={() => handleRescheduleSubmit(apt.id)}
                          className="py-1.5 px-3.5 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700"
                        >
                          Confirm Reschedule
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>

        </div>
      </BackgroundVisual>
    </PatientLayout>
  );
}
