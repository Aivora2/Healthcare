import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { Building2, Star, MapPin, Phone, ShieldAlert, ArrowRight, Search, CheckCircle } from 'lucide-react';

export default function HospitalsPage() {
  const { hospitals } = useApp();
  const [search, setSearch] = useState('');

  const filtered = hospitals.filter(h => 
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.departments.some(d => d.toLowerCase().includes(search.toLowerCase())) ||
    h.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PublicLayout>
      <BackgroundVisual type="hospitals" opacity={0.20} blur="blur-xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-caresetu-teal-600 uppercase tracking-wider">
                Healthcare Infrastructure
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                Accredited Hospitals & Medical Centers
              </h1>
              <p className="text-xs text-slate-500">
                Explore premier multi-specialty tertiary care institutions, trauma centers, and clinical facilities.
              </p>
            </div>
          </div>

          <div className="p-2 rounded-2xl glass-panel shadow-xs flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400 pl-1" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hospitals by name, clinical department, or address..."
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400 py-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((hospital) => (
              <div key={hospital.id} className="rounded-3xl glass-card overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-md">
                        24/7 Level-1 Trauma
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-amber-500 font-extrabold text-xs flex items-center gap-1 shadow-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{hospital.rating}</span>
                      <span className="text-slate-400 font-normal">({hospital.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{hospital.name}</h3>
                      <p className="text-xs font-semibold text-caresetu-teal-600">{hospital.type}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{hospital.address}</span>
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {hospital.overview}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hospital.departments.slice(0, 3).map((dep) => (
                        <span key={dep} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                          {dep}
                        </span>
                      ))}
                      {hospital.departments.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-400 text-[10px] font-semibold">
                          +{hospital.departments.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-medium">
                    <strong className="text-slate-900 font-bold">{hospital.totalBeds}</strong> Beds ({hospital.icuBeds} ICU)
                  </div>

                  <Link
                    to={`/hospitals/${hospital.id}`}
                    className="py-2 px-4 rounded-xl bg-caresetu-blue-600 hover:bg-caresetu-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Hospital Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
