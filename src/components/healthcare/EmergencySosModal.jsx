import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, PhoneCall, AlertTriangle, ShieldAlert, HeartPulse, MapPin, CheckCircle2 } from 'lucide-react';

export default function EmergencySosModal() {
  const { sosModalOpen, setSosModalOpen, currentUser, showToast } = useApp();
  const [contactsNotified, setContactsNotified] = useState(false);
  const [ambulanceDispatched, setAmbulanceDispatched] = useState(false);

  if (!sosModalOpen) return null;

  const handleNotifyEmergencyContacts = () => {
    setContactsNotified(true);
    showToast(`SOS SMS and live GPS location sent to ${currentUser?.emergencyContact?.name || 'Sanjay Sharma'}!`, 'error');
  };

  const handleDispatchAmbulance = () => {
    setAmbulanceDispatched(true);
    showToast('Nearest CareSetu Rapid Ambulance (CareWell Hospital) alerted for dispatch!', 'error');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-2xl border border-rose-200/80 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setSosModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SOS Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-rose-100 border-4 border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/20 animate-pulse">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Emergency Healthcare Assistance
            </span>
            <h3 className="text-2xl font-black text-slate-900">Are You Facing an Emergency?</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Do not hesitate. Stay calm. If you or someone around you needs immediate life-saving care, dial 112 directly.
            </p>
          </div>
        </div>

        {/* Big Dial 112 Callout */}
        <div className="mt-6 p-4 rounded-3xl bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-xl shadow-rose-600/30 text-center">
          <span className="text-[11px] font-semibold text-rose-100 uppercase tracking-widest">
            Universal National Emergency
          </span>
          <div className="text-4xl font-extrabold my-1 tracking-tight">DIAL 112 NOW</div>
          <p className="text-xs text-rose-100/90 mb-3">Toll-Free 24x7 Ambulance & First Responders</p>
          <a
            href="tel:112"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl bg-white text-rose-600 font-extrabold text-sm shadow-md hover:bg-rose-50 transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 112 Instantly</span>
          </a>
        </div>

        {/* Rapid Actions */}
        <div className="mt-5 space-y-3">
          {/* Notify Contacts */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Emergency Contacts</p>
                <p className="text-[11px] text-slate-500">
                  {currentUser?.emergencyContact?.name} ({currentUser?.emergencyContact?.phone})
                </p>
              </div>
            </div>

            <button
              onClick={handleNotifyEmergencyContacts}
              disabled={contactsNotified}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all ${
                contactsNotified
                  ? 'bg-emerald-100 text-emerald-700 cursor-default'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {contactsNotified ? (
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Alerted</span>
              ) : (
                'Alert Contacts'
              )}
            </button>
          </div>

          {/* Nearest Hospital Rapid Route */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-caresetu-blue-50 text-caresetu-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Nearest Trauma Hospital</p>
                <p className="text-[11px] text-slate-500">
                  CareWell Hospital (2.1 km away • Level 1 Trauma)
                </p>
              </div>
            </div>

            <button
              onClick={handleDispatchAmbulance}
              disabled={ambulanceDispatched}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all ${
                ambulanceDispatched
                  ? 'bg-emerald-100 text-emerald-700 cursor-default'
                  : 'bg-caresetu-blue-600 text-white hover:bg-caresetu-blue-700'
              }`}
            >
              {ambulanceDispatched ? 'Ambulance En Route' : 'Request Ambulance'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 text-center">
          <button
            onClick={() => setSosModalOpen(false)}
            className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
          >
            I'm safe, close this window
          </button>
        </div>
      </div>
    </div>
  );
}
