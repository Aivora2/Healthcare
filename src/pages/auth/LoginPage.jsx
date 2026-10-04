import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandLogo from '../../components/brand/BrandLogo';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Stethoscope, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Calendar, 
  Building2, 
  HeartHandshake, 
  Pill, 
  Mail, 
  Lock, 
  Check, 
  Headphones,
  Sparkles
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginAsPatient, loginAsDoctor } = useApp();

  const [role, setRole] = useState('patient'); // 'patient' | 'doctor' (NO HOSPITAL ROLE!)
  const [identifier, setIdentifier] = useState('meera.sharma@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'patient') {
      setIdentifier('meera.sharma@example.com');
    } else {
      setIdentifier('dr.rahul.mehta@carewellhospital.org');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (role === 'doctor') {
        loginAsDoctor();
        navigate('/doctor/dashboard');
      } else {
        loginAsPatient();
        navigate('/patient/dashboard');
      }
      setIsSubmitting(false);
    }, 450);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden font-sans">
      
      {/* BACKGROUND PHOTOGRAPHIC LAYER WITH ATMOSPHERIC GLOW */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105"
          style={{
            backgroundImage: 'url("/assets/images/Caring Consultation in a Modern Clinic (1).png")',
            filter: 'brightness(0.96) saturate(1.15)',
          }}
        />
        {/* Soft Radial Gradient Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/40 via-sky-600/15 to-teal-900/30 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-slate-900/10" />
      </div>

      {/* TOP HEADER: BRAND LOGO & SUPPORT */}
      <header className="relative z-20 w-full px-6 sm:px-12 pt-6 pb-2 flex items-center justify-between">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-md">
          <BrandLogo size="md" />
        </div>

        <Link
          to="/patient/settings"
          className="flex items-center gap-1.5 py-2 px-4 rounded-2xl bg-white/80 hover:bg-white backdrop-blur-md text-xs font-bold text-slate-700 shadow-md border border-white/80 transition-all"
        >
          <Headphones className="w-3.5 h-3.5 text-caresetu-blue-600" />
          <span>Need help? Contact Support →</span>
        </Link>
      </header>

      {/* MAIN VIEWPORT CONTENT */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE: STORYTELLING, FLOATING CARDS & QUOTE */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-md">
                Healthcare <br />
                Made Simple, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-teal-200 to-emerald-200">
                  For Everyone
                </span>
              </h1>
              <p className="text-sm sm:text-base text-sky-100 font-medium max-w-lg leading-relaxed drop-shadow-xs">
                Connecting patients, doctors and hospitals for a healthier, happier tomorrow.
              </p>
            </div>

            {/* 4 Floating Glass Service Highlights */}
            <div className="grid grid-cols-2 gap-3 max-w-lg">
              <div className="p-3.5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/80 shadow-lg flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-caresetu-blue-100 text-caresetu-blue-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Book Appointments</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Find & consult trusted doctors</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/80 shadow-lg flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-teal-100 text-teal-600">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Explore Hospitals</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Discover nearby facilities</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/80 shadow-lg flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Assistance Network</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Blood, organ & emergency</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/85 backdrop-blur-xl border border-white/80 shadow-lg flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Medicines</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Find & compare generics</p>
                </div>
              </div>
            </div>

            {/* Social Trust Cluster */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                <img className="h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" alt="Patient" />
                <img className="h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Patient" />
                <img className="h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" alt="Patient" />
                <div className="h-8 w-8 rounded-full bg-slate-900 text-white font-bold text-[9px] flex items-center justify-center ring-2 ring-white">
                  10K+
                </div>
              </div>
              <span className="text-xs text-white/90 font-medium drop-shadow-xs">
                People trust <strong className="font-bold text-white">CareSetu</strong> for better healthcare
              </span>
            </div>

            {/* Signature Reassurance Quote */}
            <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 text-white/95 max-w-lg">
              <p className="text-xs font-medium italic leading-relaxed">
                “Good healthcare is not a luxury, it's a right — and a bridge to a better tomorrow.”
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: FLOATING GLASS LOGIN CARD */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/90 shadow-2xl p-6 sm:p-8 space-y-5">
              
              {/* Header */}
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Welcome to
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5 mt-0.5">
                  <span>Care</span>
                  <span className="text-caresetu-teal-600">Setu</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Login to continue your healthcare journey
                </p>
              </div>

              {/* ROLE SELECTOR: EXACTLY TWO ROLES (NO HOSPITAL ROLE!) */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/70">
                <button
                  type="button"
                  onClick={() => handleRoleChange('patient')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    role === 'patient'
                      ? 'bg-caresetu-blue-600 text-white shadow-md shadow-caresetu-blue-500/25'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Patient</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange('doctor')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    role === 'doctor'
                      ? 'bg-caresetu-blue-600 text-white shadow-md shadow-caresetu-blue-500/25'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Doctor</span>
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                
                {/* Identifier Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {role === 'doctor' ? 'Professional Email or Mobile' : 'Mobile Number or Email'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={role === 'doctor' ? 'doctor@hospital.org' : 'you@example.com or 98290XXXXX'}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-caresetu-blue-600 hover:text-caresetu-blue-700"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-3 rounded-2xl glass-input text-xs font-semibold text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-caresetu-blue-600 focus:ring-caresetu-blue-500 border-slate-300"
                    />
                    <span className="text-xs font-medium text-slate-600">Remember me</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-caresetu-blue-600 to-caresetu-teal-500 hover:opacity-95 text-white font-extrabold text-sm shadow-lg shadow-caresetu-blue-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Entering CareSetu...</span>
                  ) : (
                    <>
                      <span>Login as {role === 'doctor' ? 'Doctor' : 'Patient'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Social Buttons */}
              <div className="space-y-3">
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 absolute">
                    Or continue with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogin}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.61.71-1.14 1.87-1 2.99 1.07.08 2.15-.51 2.81-1.33z"/>
                    </svg>
                    <span>Apple</span>
                  </button>
                </div>
              </div>

              {/* Bottom Registration CTA Strip */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-800">New to CareSetu?</p>
                  <p className="text-[11px] text-slate-500">Create your account and get started</p>
                </div>

                <Link
                  to={role === 'doctor' ? '/register/doctor' : '/register/patient'}
                  className="py-2 px-3.5 rounded-xl bg-caresetu-blue-50 text-caresetu-blue-700 font-bold hover:bg-caresetu-blue-100 transition-colors"
                >
                  {role === 'doctor' ? 'Register Doctor →' : 'Create Patient Account →'}
                </Link>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 w-full px-6 py-4 text-center text-xs text-white/80 font-medium drop-shadow-xs">
        <p>© 2026 CareSetu — Care Today. A Healthier Tomorrow.</p>
      </footer>
    </div>
  );
}
