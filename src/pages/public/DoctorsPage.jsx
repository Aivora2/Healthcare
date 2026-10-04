import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { SPECIALIZATIONS } from '../../data/doctorsData';
import { Star, Clock, MapPin, Search, ArrowRight, Video, Building2 } from 'lucide-react';

export default function DoctorsPage() {
  const { doctors, setBookingModalDoctor } = useApp();
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specializations');
  const [search, setSearch] = useState('');

  const filtered = doctors.filter(doc => {
    const matchesSpec = selectedSpecialty === 'All Specializations' || doc.specialization === selectedSpecialty;
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
                          doc.specialization.toLowerCase().includes(search.toLowerCase()) ||
                          doc.hospital.toLowerCase().includes(search.toLowerCase());
    return matchesSpec && matchesSearch;
  });

  return (
    <PublicLayout>
      <BackgroundVisual type="clinic" opacity={0.20} blur="blur-xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-caresetu-blue-600 uppercase tracking-wider">
                Expert Clinical Directory
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                Find & Consult Doctors
              </h1>
              <p className="text-xs text-slate-500">
                Verified physicians and surgeons across Jaipur's top multi-specialty hospitals.
              </p>
            </div>
          </div>

          {/* Search Bar & Specialty Chips */}
          <div className="space-y-3">
            <div className="p-2 rounded-2xl glass-panel shadow-xs flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 pl-1" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by doctor name, specialty, or hospital..."
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400 py-1"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {SPECIALIZATIONS.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedSpecialty === spec
                      ? 'bg-caresetu-blue-600 text-white shadow-xs'
                      : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200/60'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Doctor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doctor) => (
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
                        <span className="text-slate-400 font-normal">({doctor.reviewsCount} reviews)</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">{doctor.name}</h3>
                      <p className="text-xs font-semibold text-caresetu-blue-600">{doctor.specialization}</p>
                      <p className="text-[11px] text-slate-500 truncate max-w-[190px]">{doctor.hospital}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-4 line-clamp-3 leading-relaxed">
                    {doctor.bio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{doctor.nextSlot}</span>
                    </div>
                    <span className="font-bold text-slate-900">Fee: ₹{doctor.consultationFee}</span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2.5">
                    {doctor.modes.map((m) => (
                      <span key={m} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold flex items-center gap-1">
                        {m === 'Video Consult' ? <Video className="w-3 h-3 text-teal-600" /> : <Building2 className="w-3 h-3 text-caresetu-blue-600" />}
                        {m}
                      </span>
                    ))}
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
                    className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </BackgroundVisual>
    </PublicLayout>
  );
}
