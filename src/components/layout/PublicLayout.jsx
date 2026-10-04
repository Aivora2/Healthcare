import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrandLogo from '../brand/BrandLogo';
import { useApp } from '../../context/AppContext';
import { 
  PhoneCall, 
  MapPin, 
  Search, 
  User, 
  ShieldAlert, 
  Menu, 
  X, 
  ChevronDown,
  Calendar,
  Building2,
  Pill,
  HeartHandshake,
  Heart
} from 'lucide-react';

export default function PublicLayout({ children }) {
  const location = useLocation();
  const { selectedCity, setSelectedCity, currentUser, setSosModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const cities = ['Jaipur, Rajasthan', 'Delhi NCR', 'Mumbai', 'Bengaluru', 'Pune'];

  const navLinks = [
    { label: 'Find Doctors', path: '/doctors', icon: Calendar },
    { label: 'Hospitals', path: '/hospitals', icon: Building2 },
    { label: 'Medicines', path: '/medicines', icon: Pill },
    { label: 'Assistance', path: '/assistance', icon: HeartHandshake },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Reassurance Emergency Notification Banner */}
      <div className="bg-gradient-to-r from-caresetu-blue-700 via-caresetu-blue-600 to-caresetu-teal-600 text-white text-xs py-2 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-medium text-blue-100 hidden sm:inline">
              CareSetu Emergency Network Live 24/7 across {selectedCity}
            </span>
            <span className="font-medium text-blue-100 sm:hidden">
              Emergency Network 24/7 Live
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSosModalOpen(true)}
              className="flex items-center gap-1.5 font-bold text-amber-300 hover:text-white transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>SOS Emergency</span>
            </button>
            <a
              href="tel:112"
              className="flex items-center gap-1 font-extrabold text-white bg-white/20 hover:bg-white/30 px-2.5 py-0.5 rounded-full transition-all"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Call 112</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <header className="sticky top-0 z-40 glass-nav backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Canonical CareSetu Logo */}
          <div className="flex-shrink-0">
            <BrandLogo size="md" />
          </div>

          {/* Location Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-100/80 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 transition-colors border border-slate-200/60"
            >
              <MapPin className="w-3.5 h-3.5 text-caresetu-blue-600" />
              <span>{selectedCity}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {cityDropdownOpen && (
              <div className="absolute top-10 left-0 w-44 rounded-2xl bg-white shadow-xl border border-slate-100 py-1 z-50">
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setSelectedCity(c);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-caresetu-blue-50 transition-colors ${
                      selectedCity === c ? 'text-caresetu-blue-600 font-bold bg-caresetu-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-caresetu-blue-50 text-caresetu-blue-700 shadow-xs ring-1 ring-caresetu-blue-300'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-caresetu-blue-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <Link
                to={currentUser.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'}
                className="flex items-center gap-2 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-caresetu-blue-600 to-caresetu-teal-600 text-white text-xs font-bold shadow-md shadow-caresetu-blue-500/20 hover:opacity-95 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>
                  {currentUser.role === 'doctor' ? 'Doctor Portal' : 'Patient Dashboard'}
                </span>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2.5 px-4 rounded-2xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/login"
                  className="py-2.5 px-5 rounded-2xl bg-caresetu-blue-600 hover:bg-caresetu-blue-700 text-white text-xs font-bold shadow-md shadow-caresetu-blue-500/20 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center sm:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-2xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden glass-panel border-b border-slate-200/80 px-4 pt-3 pb-6 space-y-3 animate-fade-in">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-2xl bg-white/80 border border-slate-100 text-xs font-bold text-slate-700 hover:bg-caresetu-blue-50 flex items-center gap-2"
                >
                  <link.icon className="w-4 h-4 text-caresetu-blue-600" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to={currentUser?.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-2xl bg-caresetu-blue-600 text-white font-bold text-xs shadow-md"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Login / Switch Account
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Comprehensive Reassuring Footer */}
      <footer className="glass-nav border-t border-slate-200/80 bg-white/90 text-slate-600 text-xs py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-3">
            <BrandLogo size="md" />
            <p className="text-xs text-slate-500 leading-relaxed mt-2">
              CareSetu brings fragmented healthcare services together into one calm, human-centered digital healthcare platform connecting patients, doctors, hospitals, medicines, emergency/blood assistance, and health records.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium pt-1">
              <span>National Emergency Universal:</span>
              <a href="tel:112" className="text-rose-600 font-extrabold hover:underline">112</a>
            </div>
          </div>

          {/* Healthcare Services */}
          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-3">Healthcare Services</h5>
            <ul className="space-y-2 text-slate-500 font-medium">
              <li><Link to="/doctors" className="hover:text-caresetu-blue-600 transition-colors">Find Trusted Doctors</Link></li>
              <li><Link to="/hospitals" className="hover:text-caresetu-blue-600 transition-colors">Explore Hospitals & Clinics</Link></li>
              <li><Link to="/medicines" className="hover:text-caresetu-blue-600 transition-colors">Medicines & Generic Alternatives</Link></li>
              <li><Link to="/assistance" className="hover:text-caresetu-blue-600 transition-colors">24/7 Blood Bank & SOS</Link></li>
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-3">Portals & Access</h5>
            <ul className="space-y-2 text-slate-500 font-medium">
              <li><Link to="/patient/dashboard" className="hover:text-caresetu-blue-600 transition-colors">Patient Health Hub</Link></li>
              <li><Link to="/doctor/dashboard" className="hover:text-caresetu-blue-600 transition-colors">Doctor Clinic Console</Link></li>
              <li><Link to="/patient/appointments" className="hover:text-caresetu-blue-600 transition-colors">My Appointments</Link></li>
              <li><Link to="/patient/vault" className="hover:text-caresetu-blue-600 transition-colors">Protected Health Vault</Link></li>
            </ul>
          </div>

          {/* Patient Reassurance & Disclaimer */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2 text-caresetu-blue-600 font-bold text-xs mb-1">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Care Today. A Healthier Tomorrow.</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Medical information provided is for educational reference. Always consult a qualified medical practitioner for personal diagnosis, therapy, or prescriptions.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 CareSetu. All rights reserved. Designed for humane digital healthcare.</p>
          <div className="flex gap-4">
            <Link to="/settings" className="hover:text-slate-600">Privacy & Terms</Link>
            <Link to="/assistance" className="hover:text-slate-600">Emergency 112</Link>
            <Link to="/settings" className="hover:text-slate-600">Help & Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
