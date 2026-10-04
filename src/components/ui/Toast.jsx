import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';
  const isError = toastMessage.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300 ${
        isSuccess 
          ? 'bg-emerald-500/90 text-white border-emerald-400/50 shadow-emerald-500/20' 
          : isError
          ? 'bg-rose-500/90 text-white border-rose-400/50 shadow-rose-500/20'
          : 'bg-slate-900/90 text-white border-slate-700/50 shadow-slate-900/30'
      }`}>
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-white flex-shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-300 flex-shrink-0" />}
        <span className="text-sm font-semibold tracking-wide pr-2">{toastMessage.message}</span>
      </div>
    </div>
  );
}
