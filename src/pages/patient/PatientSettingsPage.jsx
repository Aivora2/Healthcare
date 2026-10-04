import React, { useState } from 'react';
import PatientLayout from '../../components/layout/PatientLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  Moon, 
  Sun, 
  Lock, 
  ShieldCheck, 
  HelpCircle, 
  Headphones, 
  Globe, 
  CheckCircle2 
} from 'lucide-react';

export default function PatientSettingsPage() {
  const { showToast } = useApp();

  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [queueSound, setQueueSound] = useState(true);
  const [language, setLanguage] = useState('English');

  const toggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      showToast('Switched to Dark Glass aesthetic');
    } else {
      document.documentElement.classList.remove('dark');
      showToast('Switched to Light Atmospheric aesthetic');
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    showToast('Security password updated successfully!');
  };

  return (
    <PatientLayout>
      <BackgroundVisual type="reception" opacity={0.20} blur="blur-2xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-6">
          
          <div>
            <span className="text-xs font-bold text-caresetu-blue-600 uppercase tracking-wider">
              Account Preferences
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
              Settings & Support
            </h1>
            <p className="text-xs text-slate-500">
              Customize appearance, notifications, security credentials, and contact 24/7 patient support.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Appearance / Theme */}
            <div className="p-6 rounded-3xl glass-card flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Application Appearance</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Toggle between soft atmospheric light mode and nocturnal dark glass.
                </p>
              </div>

              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 py-2 px-4 rounded-2xl bg-white border border-slate-200/80 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-caresetu-blue-600" />}
                <span>{darkMode ? 'Light Atmosphere' : 'Dark Glass'}</span>
              </button>
            </div>

            {/* Notification Controls */}
            <div className="p-6 rounded-3xl glass-card space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                Notification Preferences
              </h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-2xl bg-white/70 border border-slate-100 cursor-pointer">
                  <div>
                    <p className="text-xs font-bold text-slate-800">OPD Queue & Token SMS Updates</p>
                    <p className="text-[11px] text-slate-500">Receive live alerts when your turn is 2 patients away.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => {
                      setSmsAlerts(e.target.checked);
                      showToast('Notification preference saved');
                    }}
                    className="w-4 h-4 rounded text-caresetu-blue-600 focus:ring-caresetu-blue-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl bg-white/70 border border-slate-100 cursor-pointer">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Prescription Refill Reminders</p>
                    <p className="text-[11px] text-slate-500">Daily dose notifications for morning and evening regimens.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => {
                      setEmailAlerts(e.target.checked);
                      showToast('Notification preference saved');
                    }}
                    className="w-4 h-4 rounded text-caresetu-blue-600 focus:ring-caresetu-blue-500"
                  />
                </label>
              </div>
            </div>

            {/* Password Update */}
            <div className="p-6 rounded-3xl glass-card space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                Security & Password Change
              </h3>

              <form onSubmit={handlePasswordUpdate} className="space-y-3 max-w-md">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    className="w-full text-xs p-2.5 rounded-xl glass-input font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="At least 8 characters"
                    className="w-full text-xs p-2.5 rounded-xl glass-input font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Update Password
                </button>
              </form>
            </div>

            {/* Help & Support Contact Card */}
            <div className="p-6 rounded-3xl glass-card space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                CareSetu Patient Support Desk
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Need help with hospital appointment scheduling, generic medicine availability, or health record downloads?
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="tel:1800-227-3738"
                  className="py-2.5 px-4 rounded-xl bg-caresetu-blue-50 hover:bg-caresetu-blue-100 text-caresetu-blue-700 font-bold text-xs transition-colors flex items-center gap-2"
                >
                  <Headphones className="w-4 h-4" />
                  <span>Call Toll-Free: 1800-CARE-SETU</span>
                </a>
                <a
                  href="mailto:support@caresetu.org"
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  Email: support@caresetu.org
                </a>
              </div>
            </div>

          </div>

        </div>
      </BackgroundVisual>
    </PatientLayout>
  );
}
