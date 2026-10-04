import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Building2, 
  HeartHandshake, 
  Pill, 
  ShieldAlert, 
  Search, 
  ArrowRight, 
  Star, 
  Clock, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  ChevronRight,
  PhoneCall
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { doctors, hospitals, medicines, setBookingModalDoctor, setSosModalOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/patient/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <PublicLayout>
      <BackgroundVisual type="clinic" opacity={0.22} blur="blur-xl">
        
        {/* HERO SECTION */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-14 lg:pb-24 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headline, Description & Floating Highlights */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-caresetu-blue-200/80 text-caresetu-blue-700 text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-caresetu-teal-500 animate-pulse" />
                <span>Next-Gen Humane Digital Healthcare</span>
              </div>

              {/* Main Headline (Directly from canonical design) */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Healthcare Made Simple, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-caresetu-blue-600 via-caresetu-blue-700 to-caresetu-teal-500">
                  For Everyone.
                </span>
              </h1>

              {/* Supporting tagline */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                Connecting patients, doctors, and hospitals for a healthier, happier tomorrow. One calm, reliable bridge for appointments, generic medicines, queues, and emergency care.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="max-w-xl flex items-center p-1.5 rounded-2xl glass-panel shadow-glass border-white/80">
                <div className="flex-1 flex items-center gap-3 pl-3">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search doctor, hospital, generic medicine..."
                    className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="py-3 px-5 rounded-xl bg-caresetu-blue-600 hover:bg-caresetu-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* 4 Floating Service Cards (Mandated by Section 18) */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2 max-w-xl">
                <Link
                  to="/doctors"
                  className="p-4 rounded-2xl glass-card-interactive flex items-start gap-3 group"
                >
                  <div className="p-2.5 rounded-xl bg-caresetu-blue-50 text-caresetu-blue-600 group-hover:bg-caresetu-blue-600 group-hover:text-white transition-colors">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-caresetu-blue-600 transition-colors">
                      Book Appointments
                    </h4>
                    <p className="text-[11px] text-slate-500">Find & consult trusted doctors</p>
                  </div>
                </Link>

                <Link
                  to="/hospitals"
                  className="p-4 rounded-2xl glass-card-interactive flex items-start gap-3 group"
                >
                  <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                      Explore Hospitals
                    </h4>
                    <p className="text-[11px] text-slate-500">Discover nearby facilities</p>
                  </div>
                </Link>

                <Link
                  to="/assistance"
                  className="p-4 rounded-2xl glass-card-interactive flex items-start gap-3 group"
                >
                  <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      Assistance Network
                    </h4>
                    <p className="text-[11px] text-slate-500">Blood, organ & SOS support</p>
                  </div>
                </Link>

                <Link
                  to="/medicines"
                  className="p-4 rounded-2xl glass-card-interactive flex items-start gap-3 group"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      Medicines & Generics
                    </h4>
                    <p className="text-[11px] text-slate-500">Save up to 80% on alternatives</p>
                  </div>
                </Link>
              </div>

              {/* Social Trust Proof & Canonical Quote */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-3 border-t border-slate-200/60 max-w-xl">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" alt="Patient" />
                  <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Patient" />
                  <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" alt="Patient" />
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-[10px] ring-2 ring-white">
                    10K+
                  </div>
                </div>
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-slate-900">10,000+ Families trust CareSetu</span>
                  <p className="text-slate-500">Verified doctor consultations & OPD queue tracking</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Moment Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 group">
                <img
                  src="/assets/images/Caring Consultation in a Modern Clinic (1).png"
                  alt="Doctor and Patient Consultation in Modern Clinic"
                  className="w-full h-[460px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Glass Floating Overlay Card */}
                <div className="absolute bottom-5 inset-x-5 p-5 rounded-2xl glass-panel shadow-2xl border border-white/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span className="text-[11px] font-bold text-caresetu-blue-700 uppercase tracking-wider">
                      Care Today. A Healthier Tomorrow.
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 italic leading-snug">
                    "Good healthcare is not a luxury, it's a right — and a bridge to a better tomorrow."
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 font-medium">CareSetu Digital Health Bridge</span>
                    <Link
                      to="/login"
                      className="text-xs font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700 flex items-center gap-1"
                    >
                      <span>Join Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* QUICK EMERGENCY DIAL BANNER */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-12">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-caresetu-blue-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-600/30 animate-pulse">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                  24/7 Rapid Emergency Response
                </span>
                <h3 className="text-xl font-black text-white">Need Urgent Medical Help or Blood Units?</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Universal emergency hotline 112, emergency ambulance dispatch, and live blood bank inventory.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setSosModalOpen(true)}
                className="flex-1 md:flex-none py-3 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Trigger SOS Alert</span>
              </button>
              <a
                href="tel:112"
                className="flex-1 md:flex-none py-3 px-6 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-caresetu-blue-600" />
                <span>Dial 112</span>
              </a>
            </div>
          </div>
        </section>

        {/* FEATURED DOCTORS SECTION */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-caresetu-blue-600 uppercase tracking-wider">
                Qualified Specialists
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Consult with Trusted Doctors
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Verified physicians and surgeons across top Jaipur medical institutions
              </p>
            </div>

            <Link
              to="/doctors"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700"
            >
              <span>View All 20+ Doctors</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.slice(0, 3).map((doctor) => (
              <div key={doctor.id} className="rounded-3xl glass-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-4">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-caresetu-blue-100 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{doctor.rating}</span>
                        <span className="text-slate-400 font-normal">({doctor.reviewsCount})</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">{doctor.name}</h3>
                      <p className="text-xs font-semibold text-caresetu-blue-600">{doctor.specialization}</p>
                      <p className="text-[11px] text-slate-500 truncate max-w-[180px]">{doctor.hospital}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-4 line-clamp-2 leading-relaxed">
                    {doctor.bio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{doctor.nextSlot}</span>
                    </div>
                    <span className="font-bold text-slate-900">₹{doctor.consultationFee}</span>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => setBookingModalDoctor(doctor)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-caresetu-blue-600 hover:bg-caresetu-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    Book Slot
                  </button>
                  <Link
                    to={`/doctors/${doctor.id}`}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOSPITALS & CLINICS DISCOVERY HIGHLIGHT */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-caresetu-teal-600 uppercase tracking-wider">
                Healthcare Facilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Explore Accredited Hospitals
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                World-class multi-specialty facilities with emergency 24/7 care
              </p>
            </div>

            <Link
              to="/hospitals"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-caresetu-teal-600 hover:text-caresetu-teal-700"
            >
              <span>Explore All Hospitals</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hospitals.slice(0, 2).map((hosp) => (
              <div key={hosp.id} className="rounded-3xl glass-card overflow-hidden flex flex-col sm:flex-row">
                <img
                  src={hosp.image}
                  alt={hosp.name}
                  className="w-full sm:w-48 h-48 sm:h-auto object-cover"
                />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                        24/7 Emergency
                      </span>
                      <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {hosp.rating}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{hosp.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{hosp.type}</p>
                    <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {hosp.overview}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">{hosp.totalBeds} Total Beds</span>
                    <Link
                      to={`/hospitals/${hosp.id}`}
                      className="text-xs font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700 flex items-center gap-1"
                    >
                      <span>View Hospital</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </BackgroundVisual>
    </PublicLayout>
  );
}
