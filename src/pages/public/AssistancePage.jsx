import React, { useState } from 'react';
import PublicLayout from '../../components/layout/PublicLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { EMERGENCY_NUMBERS } from '../../data/bloodBanksData';
import { 
  PhoneCall, 
  ShieldAlert, 
  HeartHandshake, 
  MapPin, 
  Search, 
  CheckCircle2, 
  Heart, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function AssistancePage() {
  const { bloodBanks, setSosModalOpen, showToast } = useApp();
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [search, setSearch] = useState('');

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filtered = bloodBanks.filter(bb => {
    const matchesSearch = bb.name.toLowerCase().includes(search.toLowerCase()) ||
                          bb.hospital.toLowerCase().includes(search.toLowerCase()) ||
                          bb.address.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = selectedGroup === 'All' || (bb.units[selectedGroup] && bb.units[selectedGroup] > 0);
    return matchesSearch && matchesGroup;
  });

  const handleRequestUnits = (bankName) => {
    showToast(`Urgent requisition dispatched to ${bankName}. Blood coordinator on duty alerted.`);
  };

  return (
    <PublicLayout>
      <BackgroundVisual type="emergency" opacity={0.22} blur="blur-xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                Emergency & Critical Care Network
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                Assistance Network & Blood Banks
              </h1>
              <p className="text-xs text-slate-500">
                24/7 Universal emergency hotline 112, real-time blood bank inventories, and organ donation registry support.
              </p>
            </div>

            <button
              onClick={() => setSosModalOpen(true)}
              className="py-3 px-5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-lg shadow-rose-600/25 transition-all flex items-center gap-2 self-start"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Trigger CareSetu SOS Alert</span>
            </button>
          </div>

          {/* SIGNATURE CALL 112 EMERGENCY ACTION BANNER (MANDATED BY SECTION 26) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white shadow-2xl shadow-rose-600/20 flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-500">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center flex-shrink-0 animate-pulse">
                <ShieldAlert className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-rose-200 uppercase tracking-widest">
                  Immediate Life-Saving Assistance
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Universal Emergency: Dial 112 Now
                </h2>
                <p className="text-xs text-rose-100 max-w-xl leading-relaxed">
                  Connect immediately with nearest ambulance, police, and rapid trauma response. Free of cost from any mobile or landline across India.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href="tel:112"
                className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-white hover:bg-rose-50 text-rose-600 font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 112 Directly</span>
              </a>
              <a
                href="tel:108"
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-rose-900/60 hover:bg-rose-900 text-white font-bold text-xs border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Ambulance 108</span>
              </a>
            </div>
          </div>

          {/* NATIONAL EMERGENCY HELPLINES GRID */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Emergency & Healthcare Helplines
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EMERGENCY_NUMBERS.map((item) => (
                <div key={item.title} className="p-4 rounded-3xl glass-card flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    <span className="text-base font-black text-rose-600 mt-1 block">{item.number}</span>
                  </div>
                  <a
                    href={`tel:${item.number.split(' ')[0]}`}
                    className="p-3 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors shadow-xs"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* BLOOD BANKS & UNITS INVENTORY */}
          <div className="space-y-4 pt-4 border-t border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                  Live Inventory Coordinator
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  Blood Banks & Unit Availability
                </h2>
                <p className="text-xs text-slate-500">
                  Search certified transfusion labs and request urgent whole blood, platelets, or fresh frozen plasma.
                </p>
              </div>
            </div>

            {/* Blood Group Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600 mr-1">Filter by Blood Group:</span>
              {bloodGroups.map((grp) => (
                <button
                  key={grp}
                  onClick={() => setSelectedGroup(grp)}
                  className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all ${
                    selectedGroup === grp
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200/70'
                  }`}
                >
                  {grp}
                </button>
              ))}
            </div>

            {/* Blood Banks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((bank) => (
                <div key={bank.id} className="p-6 rounded-3xl glass-card flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{bank.name}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            Verified
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{bank.hospital}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{bank.address} ({bank.distanceKm} km away)</span>
                        </p>
                      </div>

                      <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
                        {bank.timing}
                      </span>
                    </div>

                    {/* Blood Units Matrix */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-600 block mb-2 uppercase tracking-wider">
                        Available Blood Units
                      </span>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-center">
                        {Object.entries(bank.units).map(([g, count]) => {
                          const isMatch = selectedGroup === g;
                          return (
                            <div
                              key={g}
                              className={`p-2 rounded-xl border text-center transition-all ${
                                isMatch 
                                  ? 'bg-rose-600 text-white border-rose-600 shadow-sm' 
                                  : 'bg-white/80 border-slate-100 text-slate-800'
                              }`}
                            >
                              <span className={`text-xs font-bold block ${isMatch ? 'text-white' : 'text-rose-600'}`}>{g}</span>
                              <span className={`text-[11px] font-extrabold ${isMatch ? 'text-rose-100' : 'text-slate-900'}`}>{count} u</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-600 pt-2">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Platelets Available: {bank.plateletsAvailable ? 'Yes' : 'Call'}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        FFP Plasma: {bank.plasmaAvailable ? 'Yes' : 'Call'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={`tel:${bank.phone}`}
                      className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{bank.phone}</span>
                    </a>

                    <button
                      onClick={() => handleRequestUnits(bank.name)}
                      className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      Request Blood Unit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ORGAN DONATION SUPPORT SECTION */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card flex flex-col md:flex-row items-center justify-between gap-6 border-emerald-200/60 bg-emerald-50/40">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                <Heart className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  CareSetu Hope & Life Initiative
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Organ Donation & Donor Registry Support
                </h3>
                <p className="text-xs text-slate-600 max-w-xl leading-relaxed mt-0.5">
                  Pledge to become an organ donor or connect with certified state transplant coordinators through CareSetu. Every pledge can save up to 8 lives.
                </p>
              </div>
            </div>

            <button
              onClick={() => showToast('Pledge form initiated. CareSetu Donor Counselor will coordinate.')}
              className="py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap"
            >
              Pledge as Organ Donor
            </button>
          </div>

        </div>
      </BackgroundVisual>
    </PublicLayout>
  );
}
