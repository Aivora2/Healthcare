import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Clock, Users, Stethoscope, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function QueueTrackerModal() {
  const { queueModalData, setQueueModalData, activeQueueToken, showToast } = useApp();

  if (!queueModalData) return null;

  const currentServing = activeQueueToken || 'A-11';
  const myToken = queueModalData.tokenNumber || 'A-14';

  const handleRefresh = () => {
    showToast('Queue status refreshed with OPD reception!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setQueueModalData(null)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 pr-8">
          <div>
            <span className="text-[11px] font-bold text-caresetu-blue-600 uppercase tracking-wider">
              Live OPD Queue Tracker
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              {queueModalData.doctorName}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {queueModalData.hospital} • Room 204
            </p>
          </div>

          <button
            onClick={handleRefresh}
            title="Refresh status"
            className="p-2.5 rounded-2xl bg-slate-100 text-slate-600 hover:bg-caresetu-blue-50 hover:text-caresetu-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Dual Token Status Display */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {/* Current Serving */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center shadow-lg">
            <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
              Now Serving
            </span>
            <div className="text-4xl font-black text-emerald-400 my-1 tracking-tight">
              {currentServing}
            </div>
            <span className="text-[11px] text-slate-300 flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              In Consultation
            </span>
          </div>

          {/* User's Token */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-caresetu-blue-50 to-caresetu-teal-50 border border-caresetu-blue-200 text-center shadow-sm">
            <span className="text-[11px] font-semibold text-caresetu-blue-600 uppercase tracking-wider">
              Your Token
            </span>
            <div className="text-4xl font-black text-caresetu-blue-700 my-1 tracking-tight">
              {myToken}
            </div>
            <span className="text-[11px] text-slate-600 font-medium">
              3 Patients Ahead
            </span>
          </div>
        </div>

        {/* Estimated Wait Details */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Estimated Waiting Time</p>
              <p className="text-[11px] text-slate-500">Based on avg 10 mins / patient</p>
            </div>
          </div>
          <span className="text-base font-extrabold text-amber-700">~25 mins</span>
        </div>

        {/* Queue Progression Timeline */}
        <div className="mt-6 space-y-2">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Queue Progression
          </p>
          {[
            { token: 'A-11', name: 'Suresh Kumar', status: 'In Consultation', isCurrent: true },
            { token: 'A-12', name: 'Priyanka Verma', status: 'Next Patient', isCurrent: false },
            { token: 'A-13', name: 'Harish Chandra', status: 'Waiting', isCurrent: false },
            { token: 'A-14', name: 'Meera Sharma (You)', status: 'Your Turn Soon', isMe: true },
          ].map((item) => (
            <div
              key={item.token}
              className={`flex items-center justify-between p-3 rounded-2xl text-xs border transition-all ${
                item.isCurrent
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                  : item.isMe
                  ? 'bg-caresetu-blue-50 border-caresetu-blue-300 text-caresetu-blue-900 font-bold'
                  : 'bg-white border-slate-100 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                  item.isCurrent
                    ? 'bg-emerald-600 text-white'
                    : item.isMe
                    ? 'bg-caresetu-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {item.token}
                </span>
                <span>{item.name}</span>
              </div>
              <span className={`text-[11px] font-semibold ${
                item.isCurrent ? 'text-emerald-700' : item.isMe ? 'text-caresetu-blue-700' : 'text-slate-400'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* Reassurance Disclaimer */}
        <div className="mt-5 text-center">
          <p className="text-[11px] text-slate-400">
            *OPD token positions update in real-time. Please remain near Waiting Lounge B.
          </p>
          <button
            onClick={() => setQueueModalData(null)}
            className="mt-3 w-full py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
}
