import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// UI Modals & Toasts
import Toast from './components/ui/Toast';
import BookingModal from './components/healthcare/BookingModal';
import EmergencySosModal from './components/healthcare/EmergencySosModal';
import QueueTrackerModal from './components/healthcare/QueueTrackerModal';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import DoctorsPage from './pages/public/DoctorsPage';
import DoctorDetailPage from './pages/public/DoctorDetailPage';
import HospitalsPage from './pages/public/HospitalsPage';
import HospitalDetailPage from './pages/public/HospitalDetailPage';
import MedicinesPage from './pages/public/MedicinesPage';
import AssistancePage from './pages/public/AssistancePage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import PatientRegisterPage from './pages/auth/PatientRegisterPage';
import DoctorRegisterPage from './pages/auth/DoctorRegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Patient Authenticated Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import SearchPage from './pages/patient/SearchPage';
import AppointmentsPage from './pages/patient/AppointmentsPage';
import HealthRecordsPage from './pages/patient/HealthRecordsPage';
import PatientProfilePage from './pages/patient/PatientProfilePage';
import PatientSettingsPage from './pages/patient/PatientSettingsPage';

// Doctor Authenticated Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointmentsPage from './pages/doctor/DoctorAppointmentsPage';
import DoctorQueuePage from './pages/doctor/DoctorQueuePage';
import DoctorPatientsPage from './pages/doctor/DoctorPatientsPage';
import DoctorProfilePage from './pages/doctor/DoctorProfilePage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        {/* Global Modals & Notifications Layer */}
        <Toast />
        <BookingModal />
        <EmergencySosModal />
        <QueueTrackerModal />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctors/:id" element={<DoctorDetailPage />} />
          <Route path="/hospitals" element={<HospitalsPage />} />
          <Route path="/hospitals/:id" element={<HospitalDetailPage />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/assistance" element={<AssistancePage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register/patient" element={<PatientRegisterPage />} />
          <Route path="/register/doctor" element={<DoctorRegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Authenticated Patient Routes */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/search" element={<SearchPage />} />
          <Route path="/patient/appointments" element={<AppointmentsPage />} />
          <Route path="/patient/vault" element={<HealthRecordsPage />} />
          <Route path="/patient/profile" element={<PatientProfilePage />} />
          <Route path="/patient/settings" element={<PatientSettingsPage />} />

          {/* Authenticated Doctor Routes */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />
          <Route path="/doctor/queue" element={<DoctorQueuePage />} />
          <Route path="/doctor/patients" element={<DoctorPatientsPage />} />
          <Route path="/doctor/profile" element={<DoctorProfilePage />} />

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
