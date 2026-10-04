import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_APPOINTMENTS, INITIAL_RECORDS } from '../data/recordsData';
import { DOCTORS } from '../data/doctorsData';
import { HOSPITALS } from '../data/hospitalsData';
import { MEDICINES } from '../data/medicinesData';
import { BLOOD_BANKS } from '../data/bloodBanksData';

const AppContext = createContext();

export const DEFAULT_PATIENT = {
  id: 'patient-1',
  name: 'Meera Sharma',
  role: 'patient',
  email: 'meera.sharma@example.com',
  phone: '+91 98290 12345',
  city: 'Jaipur, Rajasthan',
  bloodGroup: 'O+',
  gender: 'Female',
  age: 48,
  emergencyContact: {
    name: 'Sanjay Sharma (Spouse)',
    phone: '+91 98290 54321',
    relation: 'Husband'
  },
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
};

export const DEFAULT_DOCTOR = {
  id: 'doc-1',
  name: 'Dr. Rahul Mehta',
  role: 'doctor',
  email: 'dr.rahul.mehta@carewellhospital.org',
  phone: '+91 98290 99887',
  specialization: 'Cardiologist',
  qualification: 'MBBS, MD (Medicine), DM (Cardiology)',
  hospital: 'CareWell Superspecialty Hospital',
  department: 'Cardiology & Cardiac Sciences',
  designation: 'Senior Consultant & HOD',
  city: 'Jaipur, Rajasthan',
  opdHours: 'Mon - Sat: 09:30 AM - 02:00 PM',
  registrationNumber: 'RMC-48291',
  avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'
};

export function AppProvider({ children }) {
  // Current logged in user (defaults to patient for instant rich dashboard demo, can switch anytime)
  const [currentUser, setCurrentUser] = useState(DEFAULT_PATIENT);
  const [activeRole, setActiveRole] = useState('patient'); // 'patient' or 'doctor'
  const [selectedCity, setSelectedCity] = useState('Jaipur, Rajasthan');
  
  // Data State
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [activeQueueToken, setActiveQueueToken] = useState('A-11');
  const [doctorQueueList, setDoctorQueueList] = useState([
    { token: 'A-11', patientName: 'Suresh Kumar', age: 54, status: 'In-Consultation', time: '10:15 AM' },
    { token: 'A-12', patientName: 'Priyanka Verma', age: 32, status: 'Waiting', time: '10:30 AM' },
    { token: 'A-13', patientName: 'Harish Chandra', age: 67, status: 'Waiting', time: '10:45 AM' },
    { token: 'A-14', patientName: 'Meera Sharma (You)', age: 48, status: 'Waiting', time: '11:00 AM' },
    { token: 'A-15', patientName: 'Anita Gupta', age: 41, status: 'Waiting', time: '11:15 AM' },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Upcoming Appointment Reminder',
      message: 'Consultation with Dr. Rahul Mehta scheduled for OCT 12 at 10:30 AM (Token: A-14).',
      time: '10 mins ago',
      read: false,
      type: 'appointment'
    },
    {
      id: 'notif-2',
      title: 'Diagnostic Lab Report Ready',
      message: 'Your Comprehensive Metabolic Panel report is now available in your Health Vault.',
      time: '2 hours ago',
      read: false,
      type: 'report'
    },
    {
      id: 'notif-3',
      title: 'Prescription Refill Alert',
      message: 'Time for today’s evening dose: Calcium Supplement 500mg after dinner.',
      time: '5 hours ago',
      read: false,
      type: 'medicine'
    }
  ]);

  // Active Modals & Global States
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [bookingModalDoctor, setBookingModalDoctor] = useState(null);
  const [queueModalData, setQueueModalData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const loginAsPatient = () => {
    setCurrentUser(DEFAULT_PATIENT);
    setActiveRole('patient');
    showToast('Logged in as Patient: Meera Sharma');
  };

  const loginAsDoctor = () => {
    setCurrentUser(DEFAULT_DOCTOR);
    setActiveRole('doctor');
    showToast('Logged in as Doctor: Dr. Rahul Mehta');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out of CareSetu session', 'info');
  };

  const bookAppointment = (booking) => {
    const newApt = {
      id: `apt-${Date.now()}`,
      doctorId: booking.doctor.id,
      doctorName: booking.doctor.name,
      specialization: booking.doctor.specialization,
      qualification: booking.doctor.qualification,
      hospital: booking.doctor.hospital,
      date: booking.date,
      dayName: booking.dayName || 'Upcoming',
      time: booking.slot,
      type: booking.mode,
      tokenNumber: `T-${Math.floor(Math.random() * 20) + 10}`,
      currentToken: `T-0${Math.floor(Math.random() * 5) + 1}`,
      status: 'Confirmed',
      clinicalNote: booking.notes || 'Routine consultation',
      avatar: booking.doctor.avatar,
      estimatedWaitMinutes: 20
    };

    setAppointments(prev => [newApt, ...prev]);
    
    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Appointment Confirmed! 🎉',
      message: `Your appointment with ${booking.doctor.name} on ${booking.date} at ${booking.slot} is confirmed. Token: ${newApt.tokenNumber}`,
      time: 'Just now',
      read: false,
      type: 'appointment'
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(`Appointment booked successfully with ${booking.doctor.name}!`);
    return newApt;
  };

  const rescheduleAppointment = (id, newDate, newSlot) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, date: newDate, time: newSlot, status: 'Confirmed' };
      }
      return a;
    }));
    showToast('Appointment rescheduled successfully!');
  };

  const cancelAppointment = (id) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: 'Cancelled' };
      }
      return a;
    }));
    showToast('Appointment cancelled', 'info');
  };

  const uploadRecord = (record) => {
    const newRec = {
      id: `rec-${Date.now()}`,
      ...record,
      date: record.date || 'Today, 2026'
    };
    setRecords(prev => [newRec, ...prev]);
    showToast(`Record "${record.title}" added to your Health Vault!`);
  };

  const advanceDoctorQueue = () => {
    setDoctorQueueList(prev => {
      const activeIdx = prev.findIndex(p => p.status === 'In-Consultation');
      if (activeIdx !== -1 && activeIdx + 1 < prev.length) {
        const nextList = [...prev];
        nextList[activeIdx].status = 'Completed';
        nextList[activeIdx + 1].status = 'In-Consultation';
        setActiveQueueToken(nextList[activeIdx + 1].token);
        showToast(`Token ${nextList[activeIdx + 1].token} (${nextList[activeIdx + 1].patientName}) called in`);
        return nextList;
      }
      return prev;
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      activeRole,
      setActiveRole,
      selectedCity,
      setSelectedCity,
      appointments,
      records,
      doctors: DOCTORS,
      hospitals: HOSPITALS,
      medicines: MEDICINES,
      bloodBanks: BLOOD_BANKS,
      activeQueueToken,
      doctorQueueList,
      notifications,
      sosModalOpen,
      setSosModalOpen,
      bookingModalDoctor,
      setBookingModalDoctor,
      queueModalData,
      setQueueModalData,
      toastMessage,
      showToast,
      loginAsPatient,
      loginAsDoctor,
      logout,
      bookAppointment,
      rescheduleAppointment,
      cancelAppointment,
      uploadRecord,
      advanceDoctorQueue,
      markAllNotificationsRead
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
