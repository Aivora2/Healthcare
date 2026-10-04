import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, Calendar, FileText, Pill, ShieldAlert } from 'lucide-react';

export default function NotificationPanel({ isOpen, onClose }) {
  const { notifications, markAllNotificationsRead } = useApp();

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4 text-caresetu-blue-600" />;
      case 'report':
        return <FileText className="w-4 h-4 text-caresetu-teal-600" />;
      case 'medicine':
        return <Pill className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-caresetu-blue-600" />;
    }
  };

  return (
    <div className="absolute right-0 top-14 w-80 sm:w-96 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/80 shadow-2xl z-50 overflow-hidden animate-scale-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-slate-700" />
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Notifications ({notifications.filter(n => !n.read).length})
          </h4>
        </div>
        <button
          onClick={markAllNotificationsRead}
          className="text-[11px] font-semibold text-caresetu-blue-600 hover:text-caresetu-blue-700 flex items-center gap-1"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          Mark all read
        </button>
      </div>

      {/* Notification List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No notifications at the moment
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 hover:bg-slate-50 transition-colors flex items-start gap-3 ${
                !notif.read ? 'bg-caresetu-blue-50/40' : ''
              }`}
            >
              <div className="p-2 rounded-xl bg-white shadow-xs border border-slate-100 flex-shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-xs font-bold text-slate-800 truncate">{notif.title}</p>
                  <span className="text-[10px] text-slate-400 flex-shrink-0">{notif.time}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{notif.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <button
          onClick={onClose}
          className="text-xs font-bold text-slate-500 hover:text-slate-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}
