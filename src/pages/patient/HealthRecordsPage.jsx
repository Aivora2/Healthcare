import React, { useState } from 'react';
import PatientLayout from '../../components/layout/PatientLayout';
import BackgroundVisual from '../../components/layout/BackgroundVisual';
import { useApp } from '../../context/AppContext';
import UploadRecordModal from '../../components/healthcare/UploadRecordModal';
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Eye, 
  Lock, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function HealthRecordsPage() {
  const { records, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [viewingRecord, setViewingRecord] = useState(null);

  const categories = ['All', 'Prescription & Diagnostic', 'Lab Report', 'Radiology', 'Immunization'];

  const filtered = records.filter(r => {
    const matchesCat = selectedCategory === 'All' || r.category.includes(selectedCategory);
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
                          r.doctor.toLowerCase().includes(search.toLowerCase()) ||
                          r.hospital.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDownload = (rec) => {
    showToast(`Downloading "${rec.title}.pdf" • Protected document generated.`);
  };

  return (
    <PatientLayout>
      <BackgroundVisual type="vault" opacity={0.20} blur="blur-2xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold mb-1">
                <Lock className="w-3.5 h-3.5 text-sky-600" />
                <span>Protected Health Vault Concept</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Medical Records & Health Vault
              </h1>
              <p className="text-xs text-slate-500">
                Centralized storage for official prescriptions, diagnostic lab panels, radiology DICOMs, and immunizations.
              </p>
            </div>

            <button
              onClick={() => setUploadModalOpen(true)}
              className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-caresetu-blue-600 to-caresetu-teal-500 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-caresetu-blue-500/20 transition-all flex items-center gap-2 self-start"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          </div>

          {/* Prototype Disclosure Notice (Mandated by Section 28) */}
          <div className="p-4 rounded-2xl bg-slate-900/90 text-white text-xs flex items-start gap-3 backdrop-blur-md border border-slate-700/60 shadow-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-400">Prototype Health Vault Security Notice:</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                This is a secure-by-design conceptual vault experience. CareSetu prototype architecture separates patient telemetry from public routes. Full statutory compliance (ABDM / MHR certification) activates during regulatory production integration.
              </p>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 p-2 rounded-2xl glass-panel shadow-xs flex items-center gap-3">
              <Search className="w-4 h-4 text-slate-400 pl-1" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by test name, doctor, or hospital..."
                className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === c
                      ? 'bg-caresetu-blue-600 text-white shadow-xs'
                      : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200/60'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Records Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((rec) => (
              <div key={rec.id} className="p-5 rounded-3xl glass-card flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-2xl bg-sky-50 text-sky-600">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-caresetu-blue-600 uppercase tracking-wider">
                          {rec.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">{rec.title}</h3>
                        <p className="text-xs text-slate-500 font-medium">{rec.doctor}</p>
                        <p className="text-[11px] text-slate-400">{rec.hospital}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {rec.size}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100 leading-relaxed">
                    {rec.summary}
                  </p>

                  <div className="flex items-center gap-1.5 mt-3">
                    {rec.tags.map((t) => (
                      <span key={t} className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-100">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Recorded on {rec.date}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewingRecord(rec)}
                      className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleDownload(rec)}
                      className="py-1.5 px-3 rounded-xl bg-caresetu-blue-50 hover:bg-caresetu-blue-100 text-caresetu-blue-700 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Upload Record Modal Component */}
          <UploadRecordModal
            isOpen={uploadModalOpen}
            onClose={() => setUploadModalOpen(false)}
          />

          {/* Viewing Record Modal */}
          {viewingRecord && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
              <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900">{viewingRecord.title}</h3>
                  <button onClick={() => setViewingRecord(null)} className="text-slate-400 hover:text-slate-700 font-bold text-xs">
                    Close
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <p><strong>Doctor:</strong> {viewingRecord.doctor}</p>
                  <p><strong>Facility:</strong> {viewingRecord.hospital}</p>
                  <p><strong>Category:</strong> {viewingRecord.category}</p>
                  <p><strong>Clinical Summary:</strong> {viewingRecord.summary}</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
                  📄 Digital Medical Document Preview (NABL Accredited Verification Stamp Applied)
                </div>
                <button
                  onClick={() => {
                    handleDownload(viewingRecord);
                    setViewingRecord(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-caresetu-blue-600 text-white font-bold text-xs"
                >
                  Download Official Copy
                </button>
              </div>
            </div>
          )}

        </div>
      </BackgroundVisual>
    </PatientLayout>
  );
}
