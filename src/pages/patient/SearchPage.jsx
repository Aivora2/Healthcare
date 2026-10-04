import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PatientLayout from '../../components/layout/PatientLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Calendar, 
  Building2, 
  Pill, 
  HeartHandshake, 
  Star, 
  MapPin, 
  Clock, 
  ArrowRight,
  Filter
} from 'lucide-react';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const { doctors, hospitals, medicines, bloodBanks, setBookingModalDoctor } = useApp();

  const [activeTab, setActiveTab] = useState('doctors'); // 'doctors', 'hospitals', 'medicines', 'blood'
  const [query, setQuery] = useState(initialQuery);

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.specialization.toLowerCase().includes(query.toLowerCase()) ||
    d.hospital.toLowerCase().includes(query.toLowerCase())
  );

  const filteredHospitals = hospitals.filter(h => 
    h.name.toLowerCase().includes(query.toLowerCase()) ||
    h.type.toLowerCase().includes(query.toLowerCase()) ||
    h.departments.some(dep => dep.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredMedicines = medicines.filter(m => 
    m.brandName.toLowerCase().includes(query.toLowerCase()) ||
    m.genericName.toLowerCase().includes(query.toLowerCase()) ||
    m.saltComposition.toLowerCase().includes(query.toLowerCase()) ||
    m.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredBlood = bloodBanks.filter(b => 
    b.name.toLowerCase().includes(query.toLowerCase()) ||
    b.hospital.toLowerCase().includes(query.toLowerCase()) ||
    b.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PatientLayout>
      <BackgroundVisual type="reception" opacity={0.22} blur="blur-2xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">
          
          {/* Header */}
          <div>
            <span className="text-xs font-bold text-caresetu-blue-600 uppercase tracking-wider">
              Unified Discovery
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
              Search Healthcare Services
            </h1>
            <p className="text-xs text-slate-500">
              Find doctors, accredited hospitals, affordable generic medicines, and 24/7 blood units across Jaipur.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="p-2 rounded-3xl glass-panel shadow-glass flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 pl-4">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by doctor name, specialization, hospital, medicine salt, or blood group..."
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400 py-2.5"
              />
            </div>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold px-3 py-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Tabs: Doctors, Hospitals, Medicines, Blood */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'doctors', label: `Doctors (${filteredDoctors.length})`, icon: Calendar },
              { id: 'hospitals', label: `Hospitals (${filteredHospitals.length})`, icon: Building2 },
              { id: 'medicines', label: `Medicines (${filteredMedicines.length})`, icon: Pill },
              { id: 'blood', label: `Blood Banks (${filteredBlood.length})`, icon: HeartHandshake },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2.5 px-4 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-caresetu-blue-600 text-white shadow-md shadow-caresetu-blue-500/25'
                      : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* RESULTS DISPLAY */}
          <div className="space-y-4">
            
            {/* DOCTORS TAB */}
            {activeTab === 'doctors' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDoctors.map((doc) => (
                  <div key={doc.id} className="p-5 rounded-3xl glass-card flex flex-col justify-between">
                    <div className="flex items-start gap-4">
                      <img src={doc.avatar} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-caresetu-blue-100" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-slate-900">{doc.name}</h3>
                          <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400" /> {doc.rating}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-caresetu-blue-600">{doc.specialization}</p>
                        <p className="text-[11px] text-slate-500">{doc.hospital}</p>
                        <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-emerald-500" /> {doc.nextSlot}</span>
                          <span className="font-bold text-slate-800">₹{doc.consultationFee}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                      <button
                        onClick={() => setBookingModalDoctor(doc)}
                        className="flex-1 py-2 rounded-xl bg-caresetu-blue-600 text-white font-bold text-xs hover:bg-caresetu-blue-700"
                      >
                        Book Slot
                      </button>
                      <Link
                        to={`/doctors/${doc.id}`}
                        className="py-2 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                      >
                        Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* HOSPITALS TAB */}
            {activeTab === 'hospitals' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredHospitals.map((hosp) => (
                  <div key={hosp.id} className="p-5 rounded-3xl glass-card flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          24/7 Trauma Emergency
                        </span>
                        <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> {hosp.rating}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-1">{hosp.name}</h3>
                      <p className="text-xs text-slate-500">{hosp.type}</p>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">{hosp.overview}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">{hosp.totalBeds} Beds • {hosp.city}</span>
                      <Link
                        to={`/hospitals/${hosp.id}`}
                        className="text-xs font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700 flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MEDICINES TAB */}
            {activeTab === 'medicines' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMedicines.map((med) => (
                  <div key={med.id} className="p-5 rounded-3xl glass-card space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {med.category}
                        </span>
                        <h4 className="text-base font-bold text-slate-900">{med.brandName}</h4>
                        <p className="text-xs text-slate-500 font-medium">{med.saltComposition}</p>
                      </div>
                      <span className="text-sm font-extrabold text-slate-900">₹{med.brandPrice.toFixed(2)}</span>
                    </div>

                    {/* Generic Alternative Box */}
                    {med.genericAlternative && (
                      <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-emerald-800">Generic Alternative:</span>
                          <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Save {med.genericAlternative.savingsPercent}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1 text-xs">
                          <span className="font-semibold text-slate-800">{med.genericAlternative.name}</span>
                          <span className="font-extrabold text-emerald-700">₹{med.genericAlternative.price.toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* BLOOD TAB */}
            {activeTab === 'blood' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBlood.map((bb) => (
                  <div key={bb.id} className="p-5 rounded-3xl glass-card space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">{bb.name}</h4>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          {bb.timing}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{bb.address}</p>
                    </div>

                    {/* Blood Units Matrix */}
                    <div className="grid grid-cols-4 gap-2 pt-1">
                      {Object.entries(bb.units).map(([grp, units]) => (
                        <div key={grp} className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-center">
                          <span className="text-xs font-bold text-rose-600 block">{grp}</span>
                          <span className="text-[11px] text-slate-600 font-semibold">{units} units</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">{bb.distanceKm} km away</span>
                      <a
                        href={`tel:${bb.phone}`}
                        className="py-1.5 px-3 rounded-xl bg-caresetu-blue-600 text-white font-bold text-xs hover:bg-caresetu-blue-700"
                      >
                        Call Blood Bank
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </BackgroundVisual>
    </PatientLayout>
  );
}
