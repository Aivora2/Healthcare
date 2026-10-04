import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, Video, Building2, User, Phone, CheckCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal() {
  const { bookingModalDoctor, setBookingModalDoctor, bookAppointment, currentUser } = useApp();
  
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 13 Oct');
  const [selectedSlot, setSelectedSlot] = useState(bookingModalDoctor?.slots[0] || '10:30 AM');
  const [consultMode, setConsultMode] = useState('In-Clinic Consultation');
  const [patientNotes, setPatientNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null);

  if (!bookingModalDoctor) return null;

  const doctor = bookingModalDoctor;

  const dateOptions = [
    { label: 'Tomorrow, 13 Oct', dayName: 'Mon' },
    { label: 'Tue, 14 Oct', dayName: 'Tue' },
    { label: 'Wed, 15 Oct', dayName: 'Wed' },
    { label: 'Thu, 16 Oct', dayName: 'Thu' },
  ];

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const created = bookAppointment({
        doctor,
        date: selectedDate,
        dayName: dateOptions.find(d => d.label === selectedDate)?.dayName || 'Upcoming',
        slot: selectedSlot,
        mode: consultMode,
        notes: patientNotes
      });

      // Trigger celebratory confetti for reassurance & delight
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsSubmitting(false);
      setConfirmedData(created);
    }, 600);
  };

  const closeModal = () => {
    setBookingModalDoctor(null);
    setConfirmedData(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedData ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
              <img 
                src={doctor.avatar} 
                alt={doctor.name} 
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-caresetu-blue-100 shadow-sm"
              />
              <div>
                <span className="text-xs font-semibold text-caresetu-blue-600 uppercase tracking-wider">
                  Book Appointment
                </span>
                <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {doctor.specialization} • {doctor.hospital}
                </p>
                <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                  Consultation Fee: ₹{doctor.consultationFee}
                </p>
              </div>
            </div>

            <form onSubmit={handleConfirm} className="mt-5 space-y-5">
              {/* Consultation Mode */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Consultation Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultMode('In-Clinic Consultation')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-semibold border transition-all ${
                      consultMode === 'In-Clinic Consultation'
                        ? 'bg-caresetu-blue-50 border-caresetu-blue-500 text-caresetu-blue-700 shadow-sm ring-1 ring-caresetu-blue-400'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-caresetu-blue-600" />
                    In-Clinic Visit
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultMode('Video Consult')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-semibold border transition-all ${
                      consultMode === 'Video Consult'
                        ? 'bg-caresetu-teal-50 border-caresetu-teal-500 text-caresetu-teal-700 shadow-sm ring-1 ring-caresetu-teal-400'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Video className="w-4 h-4 text-caresetu-teal-600" />
                    HD Video Call
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Date
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {dateOptions.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setSelectedDate(opt.label)}
                      className={`p-2.5 rounded-2xl text-xs font-medium border text-center transition-all ${
                        selectedDate === opt.label
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Available Slots
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {doctor.slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                        selectedSlot === slot
                          ? 'bg-caresetu-blue-600 text-white border-caresetu-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient Details Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Patient Name:</span>
                  <span className="font-bold text-slate-900">{currentUser?.name || 'Meera Sharma'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Contact Number:</span>
                  <span className="font-bold text-slate-900">{currentUser?.phone || '+91 98290 12345'}</span>
                </div>
              </div>

              {/* Clinical Notes (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Reason for visit or symptoms (Optional)
                </label>
                <textarea
                  rows="2"
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  placeholder="e.g. Follow-up for chest tightness, BP check, or routine consultation"
                  className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-caresetu-blue-500 bg-white"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-caresetu-blue-600 to-caresetu-teal-500 text-white font-bold text-sm shadow-lg shadow-caresetu-blue-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing your slot...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confirm Booking (Pay at Clinic / OPD)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-6 space-y-5 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Booking Confirmed</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">You're All Set!</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Your consultation slot has been reserved. A confirmation SMS with OPD directions has been sent to your mobile.
              </p>
            </div>

            {/* Token Badge */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-caresetu-blue-50 to-caresetu-teal-50 border border-caresetu-blue-100 max-w-xs mx-auto">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Your OPD Queue Token</span>
              <div className="text-3xl font-black text-caresetu-blue-700 tracking-tight my-1">
                {confirmedData.tokenNumber}
              </div>
              <span className="text-[11px] text-slate-600">
                {confirmedData.date} at {confirmedData.time}
              </span>
            </div>

            <div className="text-xs text-slate-600">
              <p className="font-semibold text-slate-800">{confirmedData.doctorName}</p>
              <p className="text-slate-500">{confirmedData.hospital}</p>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
