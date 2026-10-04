import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DoctorLayout from '../../components/layout/DoctorLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Play, 
  ArrowRight, 
  Building2, 
  Stethoscope, 
  FileText,
  Activity,
  UserCheck
} from 'lucide-react';

export default function DoctorDashboard() {
  const { 
    currentUser, 
    activeQueueToken, 
    doctorQueueList, 
    advanceDoctorQueue, 
    showToast 
  } = useApp();

  const [activeConsultationModal, setActiveConsultationModal] = useState(null);

  const currentPatient = doctorQueueList.find(p => p.status === 'In-Consultation');
  const nextPatient = doctorQueueList.find(p => p.status === 'Waiting');

  const handleStartConsultation = (patient) => {
    setActiveConsultationModal(patient);
  };

  const handleCompleteConsultation = () => {
    advanceDoctorQueue();
    setActiveConsultationModal(null);
    showToast('Consultation marked completed. Next token notified.');
  };

  return (
    <DoctorLayout>
      <BackgroundVisual type="doctor" opacity={0.22} blur="blur-xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Cockpit Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Clinical Workstation
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                Welcome back, {currentUser?.name || 'Dr. Rahul Mehta'}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Senior Consultant Interventional Cardiologist • CareWell Superspecialty Hospital (OPD Room 204)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>OPD Clinic Active</span>
              </span>
            </div>
          </div>

          {/* 4 Clinical Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl glass-card flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-teal-50 text-teal-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">18</div>
                <p className="text-xs font-semibold text-slate-500 mt-1">Today's Patients</p>
              </div>
            </div>

            <div className="p-5 rounded-3xl glass-card flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-caresetu-blue-50 text-caresetu-blue-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">4</div>
                <p className="text-xs font-semibold text-slate-500 mt-1">Waiting in Queue</p>
              </div>
            </div>

            <div className="p-5 rounded-3xl glass-card flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">13</div>
                <p className="text-xs font-semibold text-slate-500 mt-1">Completed Consults</p>
              </div>
            </div>

            <div className="p-5 rounded-3xl glass-card flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 leading-none">9.4 min</div>
                <p className="text-xs font-semibold text-slate-500 mt-1">Avg Duration</p>
              </div>
            </div>
          </div>

          {/* ACTIVE QUEUE CONTROLLER HERO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Current In-Consultation Patient Cockpit */}
            <div className="lg:col-span-7 rounded-3xl glass-card p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  Currently Inside Consultation Room
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">Token #{currentPatient?.token || 'A-11'}</span>
              </div>

              {currentPatient ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{currentPatient.patientName}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Age: {currentPatient.age} Years • Gender: Male • Follow-up Consultation
                      </p>
                      <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <strong>Clinical Chief Complaint:</strong> Post-angioplasty 6-month check-up, mild exertional dyspnea, review of statin dosage.
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-center">
                      <span className="text-[10px] font-bold uppercase block">Token</span>
                      <span className="text-2xl font-black">{currentPatient.token}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => handleStartConsultation(currentPatient)}
                      className="py-2.5 px-5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
                    >
                      <Stethoscope className="w-4 h-4" />
                      <span>Open Clinical Record & Prescribe</span>
                    </button>

                    <button
                      onClick={advanceDoctorQueue}
                      className="py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Conclude & Call Next Token</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-500">
                  No active consultation right now. Click "Call Next Patient" to start.
                </div>
              )}
            </div>

            {/* Next Waiting Patient */}
            <div className="lg:col-span-5 rounded-3xl glass-card p-6 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-caresetu-blue-600 uppercase tracking-wider">
                  Next Patient in Queue
                </span>
                
                {nextPatient ? (
                  <div className="mt-3 p-4 rounded-2xl bg-caresetu-blue-50/70 border border-caresetu-blue-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-slate-900">{nextPatient.patientName}</h4>
                      <span className="text-xs font-black text-caresetu-blue-700 bg-white px-2.5 py-1 rounded-xl shadow-xs">
                        Token {nextPatient.token}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Age: {nextPatient.age} • Scheduled at {nextPatient.time}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Present in Waiting Lounge B. Ready for consultation.
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 mt-4">Queue is currently clear.</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <Link
                  to="/doctor/queue"
                  className="text-xs font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700 flex items-center gap-1"
                >
                  <span>Manage Full Queue ({doctorQueueList.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={advanceDoctorQueue}
                  className="py-2 px-3.5 rounded-xl bg-caresetu-blue-600 text-white font-bold text-xs hover:bg-caresetu-blue-700"
                >
                  Call Next Now
                </button>
              </div>
            </div>

          </div>

          {/* Today's Queue Table */}
          <div className="rounded-3xl glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Live Queue Tracker
              </h3>
              <Link to="/doctor/queue" className="text-xs font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700">
                Full Queue View →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3 pl-2">Token</th>
                    <th className="pb-3">Patient Name</th>
                    <th className="pb-3">Age</th>
                    <th className="pb-3">Scheduled Time</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {doctorQueueList.map((p) => (
                    <tr key={p.token} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 pl-2 font-black text-slate-900">{p.token}</td>
                      <td className="py-3.5 font-bold text-slate-800">{p.patientName}</td>
                      <td className="py-3.5 text-slate-600">{p.age} Y</td>
                      <td className="py-3.5 text-slate-500 font-medium">{p.time}</td>
                      <td className="py-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'In-Consultation'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : p.status === 'Completed'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right pr-2">
                        <button
                          onClick={() => handleStartConsultation(p)}
                          className="py-1 px-3 rounded-lg bg-slate-100 hover:bg-caresetu-blue-50 text-caresetu-blue-700 font-bold text-[11px]"
                        >
                          View File
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Prescription & Consultation Modal */}
          {activeConsultationModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
              <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-teal-600 uppercase">Consultation Console</span>
                    <h3 className="text-lg font-bold text-slate-900">{activeConsultationModal.patientName}</h3>
                  </div>
                  <button onClick={() => setActiveConsultationModal(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xs">
                    Cancel
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Clinical Findings & Vitals</label>
                    <textarea rows="2" placeholder="BP: 120/80 mmHg, PR: 72 bpm, Chest clear, S1/S2 heard" className="w-full p-2.5 rounded-xl border border-slate-200" />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Rx / Prescribed Medication</label>
                    <textarea rows="3" placeholder="1. Tab Telmisartan 40mg (1-0-0) x 30 days&#10;2. Tab Atorvastatin 10mg (0-0-1) x 30 days" className="w-full p-2.5 rounded-xl border border-slate-200 font-mono" />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleCompleteConsultation}
                    className="flex-1 py-3 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 shadow-md"
                  >
                    Save Prescription & Complete Consult
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </BackgroundVisual>
    </DoctorLayout>
  );
}
