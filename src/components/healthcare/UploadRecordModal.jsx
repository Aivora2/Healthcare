import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UploadCloud, FileText, CheckCircle2 } from 'lucide-react';

export default function UploadRecordModal({ isOpen, onClose }) {
  const { uploadRecord } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Prescription & Diagnostic');
  const [doctor, setDoctor] = useState('Dr. Rahul Mehta');
  const [hospital, setHospital] = useState('CareWell Superspecialty Hospital');
  const [summary, setSummary] = useState('');
  const [fileName, setFileName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    uploadRecord({
      title,
      category,
      doctor,
      hospital,
      summary: summary || 'Medical document recorded in Health Vault',
      type: 'PDF',
      size: '2.1 MB',
      tags: [category.split(' ')[0], 'Vault']
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl p-6 sm:p-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-left pb-4 border-b border-slate-100">
          <span className="text-[11px] font-bold text-caresetu-blue-600 uppercase tracking-wider">
            Protected Health Vault
          </span>
          <h3 className="text-xl font-bold text-slate-900">Add Medical Document</h3>
          <p className="text-xs text-slate-500">
            Securely save prescriptions, lab reports, or discharge summaries to your vault.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Document Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Thyroid Panel & Blood Chemistry"
              className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-caresetu-blue-500 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-caresetu-blue-500 bg-white"
              >
                <option>Prescription & Diagnostic</option>
                <option>Lab Report</option>
                <option>Radiology & Scans</option>
                <option>Immunization</option>
                <option>Discharge Summary</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Prescribing Doctor
              </label>
              <input
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-caresetu-blue-500 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Hospital or Clinic Name
            </label>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-caresetu-blue-500 bg-white"
            />
          </div>

          {/* Upload Area */}
          <div className="p-5 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <UploadCloud className="w-8 h-8 text-caresetu-blue-500 mx-auto mb-1" />
            <p className="text-xs font-bold text-slate-700">
              {fileName ? fileName : 'Drag & drop your report or prescription here'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Supports PDF, PNG, JPG up to 15MB</p>
            <input
              type="file"
              onChange={(e) => setFileName(e.target.files[0]?.name || '')}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block mt-2 text-xs font-bold text-caresetu-blue-600 hover:text-caresetu-blue-700 cursor-pointer"
            >
              Browse Files
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-caresetu-blue-600 to-caresetu-teal-500 text-white font-bold text-xs shadow-lg shadow-caresetu-blue-500/20 hover:opacity-95 transition-all"
          >
            Save to Protected Health Vault
          </button>
        </form>
      </div>
    </div>
  );
}
