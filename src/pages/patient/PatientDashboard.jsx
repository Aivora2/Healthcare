import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PatientLayout from '../../components/layout/PatientLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Pill, 
  FileText, 
  Users, 
  Building2, 
  HeartHandshake, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Heart, 
  Activity, 
  Download, 
  PhoneCall,
  ChevronRight,
  Sparkles,
  Check
} from 'lucide-react';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { 
    currentUser, 
    appointments, 
    records, 
    setSosModalOpen, 
    setQueueModalData,
    showToast 
  } = useApp();

  // Interactive medicine dose state
  const [doses, setDoses] = useState([
    { id: 1, name: 'Paracetamol 500mg', note: 'For fever', time: '08:00 AM', taken: true },
    { id: 2, name: 'Vitamin D3', note: '1 tablet after food', time: '01:00 PM', taken: true },
    { id: 3, name: 'Calcium Supplement', note: '1 tablet after dinner', time: '08:00 PM', taken: false },
  ]);

  const toggleDose = (id) => {
    setDoses(prev => prev.map(d => {
      if (d.id === id) {
        const nextState = !d.taken;
        showToast(nextState ? `Marked ${d.name} as taken!` : `Marked ${d.name} as pending`);
        return { ...d, taken: nextState };
      }
      return d;
    }));
  };

  const handleDownloadPrescription = (filename) => {
    showToast(`Downloading ${filename}... Simulated protected PDF generated.`);
  };

  const upcomingAppointment = appointments.find(a => a.status === 'Confirmed') || appointments[0];

  return (
    <PatientLayout>
      <BackgroundVisual type="reception" opacity={0.24} blur="blur-xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          
          {/* WELCOME SECTION (DIRECTLY AS SPECIFIED IN REFERENCE IMAGE) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-caresetu-blue-600 uppercase tracking-wider">
                Good Evening,
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2 mt-0.5">
                <span>{currentUser?.name || 'Meera Sharma'}</span>
                <span className="inline-block animate-bounce-short">👋</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-2xl leading-relaxed">
                Take charge of your health journey with CareSetu. Book appointments, manage prescriptions, and stay connected with trusted healthcare services — all in one place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSosModalOpen(true)}
                className="py-2.5 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 shadow-xs transition-all flex items-center gap-1.5"
              >
                <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
                <span>Instant SOS Alert</span>
              </button>
              <Link
                to="/patient/appointments"
                className="py-2.5 px-4 rounded-2xl bg-caresetu-blue-600 hover:bg-caresetu-blue-700 text-white font-bold text-xs shadow-md shadow-caresetu-blue-500/20 transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Doctor</span>
              </Link>
            </div>
          </div>

          {/* 4 SUMMARY STAT CARDS (Matches Image Reference Exactly) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Appointments */}
            <div className="p-4 rounded-3xl glass-card flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-caresetu-blue-50 text-caresetu-blue-600 shadow-xs">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">
                  {appointments.filter(a => a.status === 'Confirmed' || a.status === 'Upcoming').length}
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-1">Upcoming Appointments</p>
              </div>
            </div>

            {/* Prescriptions */}
            <div className="p-4 rounded-3xl glass-card flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-teal-50 text-teal-600 shadow-xs">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">5</div>
                <p className="text-xs font-semibold text-slate-500 mt-1">Active Prescriptions</p>
              </div>
            </div>

            {/* Health Records */}
            <div className="p-4 rounded-3xl glass-card flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-rose-50 text-rose-600 shadow-xs">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">{records.length}</div>
                <p className="text-xs font-semibold text-slate-500 mt-1">Health Records</p>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="p-4 rounded-3xl glass-card flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  {currentUser?.emergencyContact?.name?.split(' ')[0] || 'Sanjay'}
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-1">Emergency Contacts</p>
              </div>
            </div>
          </div>

          {/* 6 QUICK SERVICES ACTION CARDS (Matches Image Reference Exactly) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Link
              to="/patient/appointments"
              className="p-4 rounded-3xl glass-card-interactive flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-caresetu-blue-100 text-caresetu-blue-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-caresetu-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-900">Book Appointments</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Find & consult trusted doctors</p>
              </div>
            </Link>

            <Link
              to="/hospitals"
              className="p-4 rounded-3xl glass-card-interactive flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-teal-100 text-teal-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-900">Explore Hospitals</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Discover nearby facilities</p>
              </div>
            </Link>

            <Link
              to="/assistance"
              className="p-4 rounded-3xl glass-card-interactive flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-rose-100 text-rose-600">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-900">Assistance Network</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Blood, organ & support</p>
              </div>
            </Link>

            <Link
              to="/medicines"
              className="p-4 rounded-3xl glass-card-interactive flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-600">
                  <Pill className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-900">Medicines</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Find and compare medicines</p>
              </div>
            </Link>

            <Link
              to="/patient/vault"
              className="p-4 rounded-3xl glass-card-interactive flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-sky-100 text-sky-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-900">Health Vault</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Access records & reports</p>
              </div>
            </Link>

            <button
              onClick={() => setSosModalOpen(true)}
              className="p-4 rounded-3xl glass-card-interactive flex flex-col justify-between group text-left border-rose-200/60 hover:border-rose-300"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-rose-500 text-white shadow-xs">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-rose-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="mt-4">
                <h4 className="text-xs font-bold text-rose-600">SOS</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Get emergency help instantly</p>
              </div>
            </button>
          </div>

          {/* MAIN TWO-COLUMN DASHBOARD GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT / CENTER COLUMN: APPOINTMENTS & SCHEDULE */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Upcoming Appointment Card (Matches Image Reference) */}
              <div className="rounded-3xl glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Upcoming Appointment
                  </h3>
                  <Link
                    to="/patient/appointments"
                    className="text-xs font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700 flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {upcomingAppointment ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-4 rounded-2xl bg-white/70 border border-slate-100">
                    <div className="flex items-center gap-4">
                      {/* Date Badge */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-caresetu-blue-50 to-caresetu-teal-50 border border-caresetu-blue-200/70 flex flex-col items-center justify-center text-center shadow-xs">
                        <span className="text-[10px] font-extrabold text-caresetu-blue-600 uppercase">
                          {upcomingAppointment.date.split(' ')[1] || 'OCT'}
                        </span>
                        <span className="text-xl font-black text-slate-900 leading-none">
                          {upcomingAppointment.date.split(' ')[0] || '12'}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400">
                          {upcomingAppointment.dayName || 'Sun'}
                        </span>
                      </div>

                      {/* Doctor Details */}
                      <div className="flex items-center gap-3">
                        <img
                          src={upcomingAppointment.avatar}
                          alt={upcomingAppointment.doctorName}
                          className="w-12 h-12 rounded-xl object-cover ring-1 ring-caresetu-blue-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{upcomingAppointment.doctorName}</h4>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                              Confirmed
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium">
                            {upcomingAppointment.specialization} • {upcomingAppointment.qualification}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {upcomingAppointment.hospital}
                          </p>
                          <div className="text-xs font-bold text-caresetu-blue-600 mt-0.5">
                            {upcomingAppointment.time} (Token: {upcomingAppointment.tokenNumber})
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2">
                      <button
                        onClick={() => setQueueModalData(upcomingAppointment)}
                        className="flex-1 py-2 px-4 rounded-xl bg-caresetu-blue-600 hover:bg-caresetu-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
                      >
                        Track Queue
                      </button>
                      <button
                        onClick={() => navigate('/patient/appointments')}
                        className="flex-1 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-4 text-center">No upcoming appointments scheduled.</p>
                )}
              </div>

              {/* Today's Medicine Schedule & Recent Prescriptions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Medicine Schedule (With interactive dose checkboxes) */}
                <div className="rounded-3xl glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Today's Medicine Schedule
                    </h3>
                    <Link to="/medicines" className="text-xs font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700">
                      View All →
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {doses.map((dose) => (
                      <div
                        key={dose.id}
                        onClick={() => toggleDose(dose.id)}
                        className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                          dose.taken 
                            ? 'bg-emerald-50/60 border-emerald-200/80 text-slate-800' 
                            : 'bg-white/80 border-slate-100 hover:bg-white text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${dose.taken ? 'bg-emerald-100 text-emerald-600' : 'bg-caresetu-blue-50 text-caresetu-blue-600'}`}>
                            <Pill className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{dose.name}</p>
                            <p className="text-[11px] text-slate-500">{dose.note}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-slate-400">{dose.time}</span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            dose.taken 
                              ? 'bg-emerald-500 border-emerald-500 text-white' 
                              : 'border-slate-300 bg-white'
                          }`}>
                            {dose.taken && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Prescriptions (Matches image with Download PDF) */}
                <div className="rounded-3xl glass-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Recent Prescriptions
                      </h3>
                      <Link to="/patient/vault" className="text-xs font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700">
                        View All →
                      </Link>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">Prescription - 12 Sep 2026</p>
                            <p className="text-[11px] text-slate-500">Dr. Rahul Mehta • CareWell Hospital</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownloadPrescription('Prescription-12Sep2026.pdf')}
                          className="py-1.5 px-3 rounded-xl bg-caresetu-blue-50 text-caresetu-blue-700 hover:bg-caresetu-blue-100 text-[11px] font-bold transition-colors"
                        >
                          Download PDF
                        </button>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">Prescription - 28 Aug 2026</p>
                            <p className="text-[11px] text-slate-500">Dr. Neha Singh • City Care Clinic</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownloadPrescription('Prescription-28Aug2026.pdf')}
                          className="py-1.5 px-3 rounded-xl bg-caresetu-blue-50 text-caresetu-blue-700 hover:bg-caresetu-blue-100 text-[11px] font-bold transition-colors"
                        >
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Health Vault CTA Box */}
                  <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-caresetu-blue-50 to-sky-50 border border-caresetu-blue-100 flex items-center justify-between gap-3">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Your Health Vault</h5>
                      <p className="text-[10px] text-slate-500 mt-0.5">Access records, test results & scans</p>
                    </div>
                    <Link
                      to="/patient/vault"
                      className="py-1.5 px-3 rounded-xl bg-caresetu-blue-600 text-white font-bold text-xs shadow-xs hover:bg-caresetu-blue-700"
                    >
                      View Vault →
                    </Link>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: HEALTH OVERVIEW VITALS & IMMEDIATE SOS */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Health Overview (Matches Reference Image with 4 Vitals) */}
              <div className="rounded-3xl glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Health Overview
                  </h3>
                  <Link to="/patient/vault" className="text-xs font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700">
                    View Reports →
                  </Link>
                </div>

                <div className="space-y-3">
                  {/* Heart Rate */}
                  <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                        <Heart className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600">Heart Rate</p>
                        <p className="text-base font-extrabold text-slate-900">72 <span className="text-xs font-normal text-slate-500">bpm</span></p>
                      </div>
                    </div>
                    {/* SVG Sparkline */}
                    <svg className="w-16 h-6 text-emerald-500 stroke-current fill-none stroke-2" viewBox="0 0 60 20">
                      <path d="M0 10 Q15 0, 30 10 T60 10" />
                    </svg>
                  </div>

                  {/* Blood Pressure */}
                  <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-caresetu-blue-50 text-caresetu-blue-600">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600">Blood Pressure</p>
                        <p className="text-base font-extrabold text-slate-900">118/76 <span className="text-xs font-normal text-slate-500">mmHg</span></p>
                      </div>
                    </div>
                    <svg className="w-16 h-6 text-caresetu-blue-500 stroke-current fill-none stroke-2" viewBox="0 0 60 20">
                      <path d="M0 12 Q20 18, 35 6 T60 12" />
                    </svg>
                  </div>

                  {/* Oxygen Level */}
                  <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600">Oxygen Level</p>
                        <p className="text-base font-extrabold text-slate-900">98 <span className="text-xs font-normal text-slate-500">%</span></p>
                      </div>
                    </div>
                    <svg className="w-16 h-6 text-purple-500 stroke-current fill-none stroke-2" viewBox="0 0 60 20">
                      <path d="M0 8 Q15 14, 30 8 T60 8" />
                    </svg>
                  </div>

                  {/* Weight */}
                  <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600">Weight</p>
                        <p className="text-base font-extrabold text-slate-900">56 <span className="text-xs font-normal text-slate-500">kg</span></p>
                      </div>
                    </div>
                    <svg className="w-16 h-6 text-amber-500 stroke-current fill-none stroke-2" viewBox="0 0 60 20">
                      <path d="M0 14 Q25 4, 45 10 T60 6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Immediate SOS Alert Box (Matches image exactly with Send SOS Alert button) */}
              <div className="rounded-3xl p-6 bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200/80 shadow-md space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-500 text-white shadow-md shadow-rose-500/25">
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Need Immediate Help?</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Contact emergency services or your saved contacts instantly.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSosModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Send SOS Alert →</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </BackgroundVisual>
    </PatientLayout>
  );
}
