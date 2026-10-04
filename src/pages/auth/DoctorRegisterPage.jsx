import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandLogo from '../../components/brand/BrandLogo';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Stethoscope, 
  Building2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Upload,
  AlertCircle
} from 'lucide-react';

export default function DoctorRegisterPage() {
  const navigate = useNavigate();
  const { loginAsDoctor, showToast } = useApp();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: 'Dr. Rahul Mehta',
    email: 'dr.rahul.mehta@carewellhospital.org',
    mobile: '+91 98290 99887',
    regNumber: 'RMC-48291',
    specialization: 'Cardiologist',
    qualification: 'MBBS, MD (Medicine), DM (Cardiology)',
    experienceYears: '14',
    consultationType: 'Both In-Clinic and Video',
    hospitalName: 'CareWell Superspecialty Hospital',
    hospitalAddress: 'Sector 5, Malviya Nagar, Jaipur, Rajasthan',
    department: 'Cardiology & Cardiac Sciences',
    designation: 'Senior Consultant & HOD',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    timeSlot: '09:30 AM - 02:00 PM',
  });

  const nextStep = (e) => {
    e.preventDefault();
    setStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = () => {
    loginAsDoctor();
    showToast('Doctor Profile registered in review mode. Prototype verification active.');
    navigate('/doctor/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-slate-50 relative overflow-hidden font-sans">
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center filter blur-xl opacity-20 scale-105 pointer-events-none"
        style={{ backgroundImage: 'url("/assets/images/Compassionate Care in a Modern Clinic (2).png")' }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-tr from-teal-500/10 via-transparent to-caresetu-blue-500/10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-block mb-1">
              <BrandLogo size="sm" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Doctor Professional Onboarding
            </h2>
            <p className="text-xs text-slate-500">
              Step {step} of 5 — Join CareSetu verified clinical practice network
            </p>
          </div>

          {/* Stepper Pills */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  step === s
                    ? 'bg-caresetu-blue-600 text-white shadow-sm'
                    : step > s
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: PERSONAL INFORMATION */}
        {step === 1 && (
          <form onSubmit={nextStep} className="space-y-4 animate-fade-in">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Step 1: Personal Contact Details
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full text-xs p-3 rounded-2xl glass-input font-semibold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Professional Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl glass-input font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl glass-input font-semibold text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-2xl bg-caresetu-blue-600 text-white font-bold text-xs shadow-md hover:bg-caresetu-blue-700 flex items-center justify-center gap-2 mt-4"
            >
              <span>Continue to Professional Credentials</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: PROFESSIONAL INFORMATION */}
        {step === 2 && (
          <form onSubmit={nextStep} className="space-y-4 animate-fade-in">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Step 2: Medical Credentials & Qualifications
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State Medical Council Reg. No. *</label>
                <input
                  type="text"
                  required
                  value={formData.regNumber}
                  onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl glass-input font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Specialization *</label>
                <input
                  type="text"
                  required
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl glass-input font-semibold text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Educational Qualifications (Degrees) *</label>
              <input
                type="text"
                required
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full text-xs p-3 rounded-2xl glass-input font-semibold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Years of Clinical Experience *</label>
                <input
                  type="number"
                  required
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl glass-input font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Consultation Mode Offered</label>
                <select
                  value={formData.consultationType}
                  onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl glass-input font-semibold text-slate-800"
                >
                  <option>Both In-Clinic and Video</option>
                  <option>In-Clinic Only</option>
                  <option>Video Consult Only</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={prevStep}
                className="py-3 px-5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-2xl bg-caresetu-blue-600 text-white font-bold text-xs shadow-md hover:bg-caresetu-blue-700 flex items-center justify-center gap-2"
              >
                <span>Continue to Hospital Affiliation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: HOSPITAL / CLINIC AFFILIATION (CRITICAL ARCHITECTURE REQUIREMENT) */}
        {step === 3 && (
          <form onSubmit={nextStep} className="space-y-4 animate-fade-in">
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Step 3: Hospital & Clinic Affiliation
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                CareSetu associates doctors with recognized institutions. Hospitals are facilities, not login accounts.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Affiliated Facility Name *</label>
              <input
                type="text"
                required
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                className="w-full text-xs p-3 rounded-2xl glass-input font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Facility Address *</label>
              <input
                type="text"
                required
                value={formData.hospitalAddress}
                onChange={(e) => setFormData({ ...formData, hospitalAddress: e.target.value })}
                className="w-full text-xs p-3 rounded-2xl glass-input font-semibold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Department</label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl glass-input font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl glass-input font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={prevStep}
                className="py-3 px-5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-2xl bg-caresetu-blue-600 text-white font-bold text-xs shadow-md hover:bg-caresetu-blue-700 flex items-center justify-center gap-2"
              >
                <span>Continue to Availability Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: AVAILABILITY & OPD SLOTS */}
        {step === 4 && (
          <form onSubmit={nextStep} className="space-y-4 animate-fade-in">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Step 4: OPD Availability & Timings
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Consultation Time Window</label>
              <input
                type="text"
                required
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                className="w-full text-xs p-3 rounded-2xl glass-input font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Active Practice Days</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <div key={d} className="p-2.5 rounded-xl bg-caresetu-blue-50 text-caresetu-blue-700 font-bold text-xs text-center border border-caresetu-blue-200">
                    {d}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={prevStep}
                className="py-3 px-5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-2xl bg-caresetu-blue-600 text-white font-bold text-xs shadow-md hover:bg-caresetu-blue-700 flex items-center justify-center gap-2"
              >
                <span>Review & Verification Prototype</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: VERIFICATION PROTOTYPE UI (MANDATORY HONEST DISCLOSURE) */}
        {step === 5 && (
          <div className="space-y-5 animate-fade-in text-center py-2">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Doctor Verification Prototype Flow
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Your medical registration number <strong>{formData.regNumber}</strong> and degree certificates have been recorded for digital registry validation.
              </p>
            </div>

            {/* Prototype Notice Alert as mandated by Section 16 */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900">
                <span className="font-bold">Prototype Demonstration Mode:</span>
                <p className="mt-0.5 text-amber-800">
                  This demo flow simulates the doctor verification pipeline. Live regulatory validation requires statutory medical council API keys. You will enter the doctor console with sample privileges.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Physician:</span>
                <span className="font-bold text-slate-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Specialization:</span>
                <span className="font-bold text-slate-900">{formData.specialization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Affiliated Institution:</span>
                <span className="font-bold text-slate-900">{formData.hospitalName}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={prevStep}
                className="py-3 px-5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-caresetu-blue-600 text-white font-extrabold text-xs shadow-lg shadow-teal-500/25 hover:opacity-95"
              >
                Complete Onboarding & Enter Doctor Portal
              </button>
            </div>
          </div>
        )}

        <div className="pt-2 text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700">
            Sign In to Doctor Console
          </Link>
        </div>
      </div>
    </div>
  );
}
