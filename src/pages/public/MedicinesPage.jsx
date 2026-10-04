import React, { useState } from 'react';
import PublicLayout from '../../components/layout/PublicLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import { MEDICINE_CATEGORIES } from '../../data/medicinesData';
import { Pill, Search, ShieldAlert, Sparkles, ChevronDown, ChevronUp, AlertCircle, CheckCircle } from 'lucide-react';

export default function MedicinesPage() {
  const { medicines, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All'); // 'All', 'OTC', 'Prescription'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = medicines.filter(m => {
    const matchesType = typeFilter === 'All' || m.type === typeFilter;
    const matchesCat = categoryFilter === 'All' || m.category === categoryFilter;
    const matchesSearch = m.brandName.toLowerCase().includes(search.toLowerCase()) ||
                          m.genericName.toLowerCase().includes(search.toLowerCase()) ||
                          m.saltComposition.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesCat && matchesSearch;
  });

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <PublicLayout>
      <BackgroundVisual type="medicines" opacity={0.20} blur="blur-xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-caresetu-teal-600 uppercase tracking-wider">
                Affordable Medicine Transparency
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                Find Medicines & Generic Alternatives
              </h1>
              <p className="text-xs text-slate-500">
                Compare brand-name medications with certified Janaushadhi & generic alternatives to save up to 80%.
              </p>
            </div>
          </div>

          {/* Patient Safety Disclaimer (Strict Requirement Section 27) */}
          <div className="p-4 rounded-3xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-xs flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-amber-900">Patient Safety Disclaimer:</span>
              <p className="text-amber-800/90 text-[11px] leading-relaxed">
                Medicine information is strictly for educational and price comparison purposes. Consult a qualified medical practitioner before starting, altering, or stopping any medication. Do not use this catalog to make self-diagnosis or therapy decisions.
              </p>
            </div>
          </div>

          {/* Search Bar & Filters */}
          <div className="space-y-3">
            <div className="p-2 rounded-2xl glass-panel shadow-xs flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 pl-1" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by brand name (e.g. Dolo 650, Augmentin), generic salt (e.g. Paracetamol), or category..."
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400 py-1"
              />
            </div>

            {/* Type Filters & Categories */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {['All', 'OTC', 'Prescription'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all ${
                      typeFilter === type
                        ? 'bg-caresetu-blue-600 text-white shadow-xs'
                        : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200/60'
                    }`}
                  >
                    {type === 'OTC' ? 'OTC (Over-The-Counter)' : type}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {MEDICINE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      categoryFilter === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Medicines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((med) => {
              const isExpanded = expandedId === med.id;
              return (
                <div key={med.id} className="rounded-3xl glass-card p-6 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-caresetu-blue-600 uppercase tracking-wider">
                          {med.category}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-0.5">{med.brandName}</h3>
                        <p className="text-xs text-slate-500 font-semibold">{med.genericName}</p>
                      </div>

                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        med.prescriptionRequired
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {med.prescriptionRequired ? 'Rx Required' : 'OTC'}
                      </span>
                    </div>

                    <div className="mt-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs">
                      <span className="text-[11px] font-bold text-slate-500 block">Salt Composition:</span>
                      <span className="font-semibold text-slate-800">{med.saltComposition}</span>
                    </div>

                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-xs text-slate-500">{med.unit}</span>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block font-medium">Brand Price</span>
                        <span className="text-lg font-black text-slate-900">₹{med.brandPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Generic Alternative Box (The Killer Feature) */}
                    {med.genericAlternative && (
                      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/90 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Generic Alternative</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] shadow-xs">
                            Save {med.genericAlternative.savingsPercent}%
                          </span>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-slate-900">{med.genericAlternative.name}</p>
                          <p className="text-[11px] text-slate-500">{med.genericAlternative.source}</p>
                        </div>

                        <div className="pt-1 flex items-center justify-between border-t border-emerald-200/60 text-xs">
                          <span className="text-emerald-800 font-semibold">Generic Cost:</span>
                          <span className="text-base font-extrabold text-emerald-700">₹{med.genericAlternative.price.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    {/* Expandable Information */}
                    {isExpanded && (
                      <div className="mt-3 p-3 rounded-2xl bg-white border border-slate-100 text-xs space-y-2 animate-fade-in">
                        <div>
                          <strong className="text-slate-700 block">Usage Instructions:</strong>
                          <span className="text-slate-600">{med.dosageInstruction}</span>
                        </div>
                        <div>
                          <strong className="text-slate-700 block">Indications:</strong>
                          <span className="text-slate-600">{med.description}</span>
                        </div>
                        <div>
                          <strong className="text-slate-700 block">Manufacturer:</strong>
                          <span className="text-slate-500">{med.manufacturer}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => toggleExpand(med.id)}
                      className="text-xs font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700 flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'Less Info' : 'More Details'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => showToast(`Added ${med.brandName} details to your clinical notes`)}
                      className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </BackgroundVisual>
    </PublicLayout>
  );
}
