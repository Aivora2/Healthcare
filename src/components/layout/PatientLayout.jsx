import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BrandLogo from '../brand/BrandLogo';
import { useApp } from '../../context/AppContext';
import NotificationPanel from '../navigation/NotificationPanel';
import { 
  LayoutDashboard, 
  Calendar, 
  Building2, 
  HeartHandshake, 
  Pill, 
  ShieldCheck, 
  ShieldAlert, 
  User, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Search, 
  MapPin, 
  ChevronDown, 
  Menu, 
  X,
  Headphones
} from 'lucide-react';

export default function PatientLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    currentUser, 
    logout, 
    notifications, 
    setSosModalOpen, 
    selectedCity, 
    setSelectedCity 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const mainNavItems = [
    { label: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
    { label: 'Book Appointments', path: '/patient/appointments', icon: Calendar },
    { label: 'Explore Hospitals', path: '/hospitals', icon: Building2 },
    { label: 'Assistance Network', path: '/assistance', icon: HeartHandshake },
    { label: 'Medicines', path: '/medicines', icon: Pill },
    { label: 'Health Vault', path: '/patient/vault', icon: ShieldCheck },
  ];

  const secondaryNavItems = [
    { label: 'My Profile', path: '/patient/profile', icon: User },
    { label: 'Notifications', path: '#notifications', icon: Bell, badge: unreadCount, onClick: () => setNotifPanelOpen(!notifPanelOpen) },
    { label: 'Settings', path: '/patient/settings', icon: Settings },
    { label: 'Help & Support', path: '/patient/settings', icon: HelpCircle },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50/70 font-sans">
      
      {/* DESKTOP LEFT SIDEBAR (MANDATORY ARCHITECTURE) */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 h-full glass-sidebar z-30 flex-shrink-0 p-5 overflow-y-auto">
        
        {/* Canonical Logo Top */}
        <div className="pb-6 border-b border-slate-200/60">
          <BrandLogo size="md" />
        </div>

        {/* Main Navigation Section */}
        <div className="py-5 space-y-1">
          <p className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
            Main Menu
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
                    ? 'bg-gradient-to-r from-caresetu-blue-600 to-caresetu-teal-500 text-white shadow-md shadow-caresetu-blue-500/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* SOS & Emergency Fast Trigger */}
          <button
            onClick={() => setSosModalOpen(true)}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all border border-rose-200/50 mt-2"
          >
            <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
            <span>SOS & Emergency</span>
          </button>
        </div>

        {/* Secondary Navigation Section */}
        <div className="py-4 border-t border-slate-200/60 space-y-1">
          <p className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
            Preferences
          </p>
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            if (item.onClick) {
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-caresetu-blue-50 text-caresetu-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-caresetu-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50/60 transition-colors mt-1"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Need Help Card (As present in Dashboard specification design) */}
        <div className="mt-auto pt-4">
          <div className="p-4 rounded-3xl bg-gradient-to-br from-caresetu-blue-50/90 to-caresetu-teal-50/80 border border-caresetu-blue-100 shadow-xs text-center">
            <div className="w-12 h-12 rounded-full bg-white p-1 mx-auto shadow-sm ring-2 ring-caresetu-blue-200 mb-2 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1594824813583-772b0c399b2c?auto=format&fit=crop&q=80&w=200" 
                alt="Support Doctor" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h5 className="text-xs font-bold text-slate-800">Need Help?</h5>
            <p className="text-[11px] text-slate-500 mt-0.5">Contact our support team anytime.</p>
            <Link
              to="/patient/settings"
              className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-white text-caresetu-blue-700 text-xs font-bold shadow-xs hover:bg-caresetu-blue-50 transition-colors border border-caresetu-blue-200/60"
            >
              <Headphones className="w-3.5 h-3.5 text-caresetu-blue-600" />
              <span>Contact Support →</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN APPLICATION AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-20 glass-nav px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 z-20 flex-shrink-0">
          
          {/* Mobile Logo & Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-2xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <BrandLogo size="sm" iconOnly />
          </div>

          {/* Global Search Bar */}
          <div className="flex-1 max-w-xl hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search doctors, hospitals, medicines, emergency..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate('/patient/search');
                }}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl glass-input text-xs font-medium text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3 relative">
            
            {/* Location Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/80 hover:bg-white text-xs font-semibold text-slate-700 transition-colors border border-slate-200/70 shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-caresetu-blue-600" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute top-10 right-0 w-44 rounded-2xl bg-white shadow-xl border border-slate-100 py-1 z-50">
                  {['Jaipur, Rajasthan', 'Delhi NCR', 'Mumbai', 'Bengaluru'].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCity(c);
                        setCityDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-caresetu-blue-50 text-slate-700"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifPanelOpen(!notifPanelOpen)}
                className="relative p-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-600 border border-slate-200/70 shadow-xs transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              <NotificationPanel 
                isOpen={notifPanelOpen} 
                onClose={() => setNotifPanelOpen(false)} 
              />
            </div>

            {/* Patient Profile Dropdown Pill */}
            <Link
              to="/patient/profile"
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/70 shadow-xs transition-all"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'}
                alt="Patient Profile"
                className="w-8 h-8 rounded-xl object-cover ring-1 ring-caresetu-blue-300"
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser?.name || 'Meera Sharma'}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">Patient</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-panel border-b border-slate-200/80 p-4 space-y-2 z-30 animate-fade-in">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-2xl text-xs font-bold text-slate-700 bg-white/80"
              >
                <item.icon className="w-4 h-4 text-caresetu-blue-600" />
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSosModalOpen(true);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-2xl text-xs font-bold text-rose-600 bg-rose-50"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>SOS & Emergency</span>
            </button>
          </div>
        )}

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto w-full relative">
          {children}
        </main>
      </div>
    </div>
  );
}
