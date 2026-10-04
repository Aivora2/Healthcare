import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { Star, Clock, MapPin, Building2, Video, Award, ShieldCheck, ArrowLeft, Calendar } from 'lucide-react';

export default function DoctorDetailPage() {
  const { id } = useParams();
  const { doctors, setBookingModalDoctor } = useApp();

  const doctor = doctors.find(d => d.id === id) || doctors[0];

  return (
    <PublicLayout>
      <BackgroundVisual type="clinic" opacity={0.20} blur="blur-xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
          
          <Link
            to="/doctors"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-caresetu-blue-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Doctors Directory</span>
          </Link>

          {/* Profile Hero Header */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-24 sm:w-28 h-24 sm:h-28 rounded-3xl object-cover ring-4 ring-caresetu-blue-100 shadow-md flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900">{doctor.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    Council Reg: {doctor.registrationNumber}
                  </span>
                </div>
                <p className="text-sm font-bold text-caresetu-blue-600">{doctor.specialization}</p>
                <p className="text-xs text-slate-500 font-medium">
                  {doctor.qualification} • {doctor.experienceYears} Years Clinical Practice
                </p>
                <div className="flex items-center gap-3 pt-1 text-xs">
                  <span className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {doctor.rating} ({doctor.reviewsCount} patient reviews)
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-caresetu-blue-600" /> {doctor.city}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Consultation Fee</span>
              <div className="text-2xl font-black text-slate-900">₹{doctor.consultationFee}</div>
              <button
                onClick={() => setBookingModalDoctor(doctor)}
                className="w-full py-2.5 px-6 rounded-xl bg-caresetu-blue-600 hover:bg-caresetu-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>

          {/* Details Tabs & Body */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="md:col-span-2 space-y-6">
              {/* Biography */}
              <div className="p-6 rounded-3xl glass-card space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Clinical Background & Specializations
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {doctor.bio}
                </p>
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-700 block mb-1">Languages Spoken:</span>
                  <div className="flex gap-2">
                    {doctor.languages.map(l => (
                      <span key={l} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Affiliated Facility */}
              <div className="p-6 rounded-3xl glass-card space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Hospital & Chamber Location
                </h3>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-caresetu-blue-50 text-caresetu-blue-600">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{doctor.hospital}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{doctor.address}</p>
                    <p className="text-xs text-caresetu-blue-600 font-semibold mt-1">
                      OPD Hours: Monday to Saturday, 09:30 AM - 02:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Available Today Slots */}
            <div className="p-6 rounded-3xl glass-card space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Available Time Slots
              </h3>
              <div className="space-y-2">
                {doctor.slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setBookingModalDoctor(doctor)}
                    className="w-full p-2.5 rounded-xl bg-white hover:bg-caresetu-blue-50 border border-slate-200/80 text-xs font-bold text-slate-800 hover:text-caresetu-blue-700 flex items-center justify-between transition-colors shadow-xs"
                  >
                    <span>{slot}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Available</span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                ⚡ Instant token generation with CareSetu OPD queue tracking.
              </div>
            </div>

          </div>

        </div>
      </BackgroundVisual>
    </PublicLayout>
  );
}
