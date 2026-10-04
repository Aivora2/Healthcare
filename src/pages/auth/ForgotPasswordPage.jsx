import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../../components/brand/BrandLogo';
import { useApp } from '../../context/AppContext';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(`Password recovery link sent to ${email}`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-slate-50 relative overflow-hidden font-sans">
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center filter blur-xl opacity-20 scale-105 pointer-events-none"
        style={{ backgroundImage: 'url("/assets/images/Caring Consultation in a Modern Clinic (1).png")' }}
      />

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl p-6 sm:p-8 space-y-5">
        
        <div className="text-center space-y-1">
          <div className="inline-block mb-1">
            <BrandLogo size="md" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Reset Password</h2>
          <p className="text-xs text-slate-500">
            Enter your registered email address or mobile number to receive reset instructions.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com or +91 98290XXXXX"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-caresetu-blue-600 to-caresetu-teal-500 text-white font-extrabold text-xs shadow-lg shadow-caresetu-blue-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Send Recovery Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Recovery Email Dispatched</h4>
            <p className="text-xs text-slate-500">
              Please check your inbox at <strong>{email}</strong> for instructions to reset your CareSetu password.
            </p>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
