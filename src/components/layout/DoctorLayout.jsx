import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BrandLogo from '../brand/BrandLogo';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Clock, 
  UserCheck, 
  Bell, 
  Settings, 
  LogOut, 
  Stethoscope, 
  Menu, 
  X,
  Activity
} from 'lucide-react';

export default function DoctorLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, activeQueueToken } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { label: 'OPD Cockpit', path: '/doctor/dashboard', icon: LayoutDashboard },
    { label: "Today's Schedule", path: '/doctor/appointments', icon: Calendar },
    { label: 'Live Queue Manager', path: '/doctor/queue', icon: Clock },
    { label: 'Patient Records', path: '/doctor/patients', icon: Users },
    { label: 'Doctor Profile', path: '/doctor/profile', icon: UserCheck },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50/70 font-sans">
      
      {/* DOCTOR LEFT SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 h-full glass-sidebar z-30 flex-shrink-0 p-5 overflow-y-auto">
        
        {/* Canonical Logo Top */}
        <div className="pb-6 border-b border-slate-200/60">
          <BrandLogo size="md" />
          <div className="mt-2 flex items-center gap-2 px-2 py-1 rounded-xl bg-teal-50 border border-teal-200/70 text-teal-800 text-[11px] font-bold">
            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
            <span>Doctor Practice Portal</span>
          </div>
        </div>

        {/* Main Navigation Section */}
        <div className="py-5 space-y-1">
          <p className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
            Clinical Console
          </p>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-600 to-caresetu-blue-600 text-white shadow-md shadow-teal-500/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Live Token Status Pill */}
        <div className="p-4 rounded-3xl bg-slate-900 text-white mt-auto mb-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Active OPD Token</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="text-3xl font-black text-emerald-400 my-1">{activeQueueToken || 'A-11'}</div>
          <p className="text-[11px] text-slate-300">CareWell Hospital • OPD Room 204</p>
        </div>

        {/* Secondary Navigation */}
        <div className="pt-2 border-t border-slate-200/60 space-y-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50/60 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Portal</span>
          </button>
        </div>
      </aside>

      {/* DOCTOR WORKSTATION RIGHT BODY */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 glass-nav px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 z-20 flex-shrink-0">
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-2xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <BrandLogo size="sm" iconOnly />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">Affiliated Facility:</span>
            <span className="text-xs font-bold text-slate-900 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200/70 shadow-xs">
              CareWell Superspecialty Hospital (Cardiology)
            </span>
          </div>

          {/* Doctor Profile Pill */}
          <div className="flex items-center gap-3">
            <Link
              to="/doctor/profile"
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/70 shadow-xs"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'}
                alt="Doctor Profile"
                className="w-8 h-8 rounded-xl object-cover ring-1 ring-teal-400"
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser?.name || 'Dr. Rahul Mehta'}
                </p>
                <p className="text-[10px] text-teal-600 font-semibold">Consultant Cardiologist</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto w-full relative">
          {children}
        </main>
      </div>
    </div>
  );
}
