import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  ShieldCheck, 
  PhoneCall, 
  ArrowLeft, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

export default function HospitalDetailPage() {
  const { id } = useParams();
  const { hospitals, doctors, setBookingModalDoctor } = useApp();

  const hospital = hospitals.find(h => h.id === id) || hospitals[0];
  const affiliatedDocs = doctors.filter(d => hospital.affiliatedDoctorIds?.includes(d.id) || d.hospital === hospital.name);

  return (
    <PublicLayout>
      <BackgroundVisual type="hospitals" opacity={0.20} blur="blur-xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
          
          <Link
            to="/hospitals"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-caresetu-blue-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Hospital Network</span>
          </Link>

          {/* Hospital Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden glass-card shadow-xl border border-white/80">
            <div className="h-64 sm:h-80 w-full relative">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md">
                    24/7 Emergency & Trauma Active
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 font-bold text-xs flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-300" /> {hospital.rating} ({hospital.reviewsCount} reviews)
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black">{hospital.name}</h1>
                <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-caresetu-blue-400" />
                  <span>{hospital.address}</span>
                </p>
              </div>
            </div>

            <div className="p-6 bg-white/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block font-medium">Total Beds</span>
                  <span className="text-sm font-bold text-slate-900">{hospital.totalBeds} Beds</span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <span className="text-slate-400 block font-medium">Critical ICU Beds</span>
                  <span className="text-sm font-bold text-slate-900">{hospital.icuBeds} Modular ICUs</span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <span className="text-slate-400 block font-medium">Emergency Desk</span>
                  <span className="text-sm font-bold text-rose-600">{hospital.emergencyPhone}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`tel:${hospital.phone}`}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Reception Desk</span>
                </a>
              </div>
            </div>
          </div>

          {/* Departments & Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-3xl glass-card space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Clinical Departments & Centers of Excellence
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {hospital.departments.map((dept) => (
                  <div key={dept} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-caresetu-teal-600 flex-shrink-0" />
                    <span className="truncate">{dept}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl glass-card space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Key Facilities & Accreditations
              </h3>
              <div className="space-y-2">
                {hospital.facilities.map((fac) => (
                  <div key={fac} className="p-2.5 rounded-xl bg-white border border-slate-100 text-xs font-medium text-slate-700 flex items-center gap-2 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Affiliated Doctors Section */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Affiliated Doctors & Consultants at {hospital.name}
              </h3>
              <p className="text-xs text-slate-500">
                Book immediate consultations or OPD tokens with physicians practicing at this facility.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {affiliatedDocs.map((doc) => (
                <div key={doc.id} className="p-4 rounded-2xl bg-white/80 border border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-xl object-cover ring-1 ring-caresetu-blue-200" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                      <p className="text-[11px] text-caresetu-blue-600 font-semibold">{doc.specialization}</p>
                      <p className="text-[10px] text-slate-400">Next Slot: {doc.nextSlot}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingModalDoctor(doc)}
                    className="py-2 px-3 rounded-xl bg-caresetu-blue-600 text-white font-bold text-xs hover:bg-caresetu-blue-700 shadow-xs"
                  >
                    Book Slot
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </BackgroundVisual>
    </PublicLayout>
  );
}
