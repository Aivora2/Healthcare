import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandLogo from '../../components/brand/BrandLogo';
import { useApp } from '../../context/AppContext';
import { User, Mail, Phone, Lock, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PatientRegisterPage() {
  const navigate = useNavigate();
  const { loginAsPatient, showToast } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    dob: '',
    gender: 'Female',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    loginAsPatient();
    showToast('Account created successfully! Welcome to CareSetu.');
    navigate('/patient/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-slate-50 relative overflow-hidden font-sans">
      {/* Background Photography */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center filter blur-xl opacity-25 scale-105 pointer-events-none"
        style={{ backgroundImage: 'url("/assets/images/CareSetu Hospital Reception Glow.png")' }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-tr from-caresetu-blue-500/10 via-transparent to-caresetu-teal-500/10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/80 shadow-2xl p-6 sm:p-8 space-y-5">
        
        {/* Logo & Header */}
        <div className="text-center space-y-1">
          <div className="inline-block mb-1">
            <BrandLogo size="md" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Patient Account</h2>
          <p className="text-xs text-slate-500">
            Join CareSetu to manage appointments, health records, and medical assistance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Meera Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs font-semibold text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="+91 98290 12345"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs font-semibold text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2.5 rounded-2xl glass-input text-xs font-semibold text-slate-800"
              >
                <option>Female</option>
                <option>Male</option>
                <option>Other / Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min 8 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Repeat password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs font-semibold text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-caresetu-blue-600 to-caresetu-teal-500 text-white font-extrabold text-xs shadow-lg shadow-caresetu-blue-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Create Patient Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="pt-3 border-t border-slate-100 text-center text-xs">
          <span className="text-slate-500">Already registered? </span>
          <Link to="/login" className="font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
