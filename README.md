# CareSetu (केयरसेतु)
> **"Care Today. A Healthier Tomorrow."**

CareSetu is a calm, human-centered digital healthcare platform connecting patients, verified doctors, accredited hospitals, pharmacies, emergency blood assistance, digital queue tracking, and encrypted health records into one unified, reassuring experience.

---

## 🌟 Brand & Visual Identity

- **Canonical Emblem:** Circular emblem featuring a dynamic blue/teal circular "C" enclosing a human figure, medical plus (+), and healing leaf.
- **Brand Typography:** "Care" in bold deep navy (`#1D4ED8`), "Setu" in healthcare teal (`#0D9488`), with the permanent reassurance tagline *"Care Today. A Healthier Tomorrow."*.
- **Layered Background Visual System:**
  Every page features a layered, atmospheric photographic backdrop:
  ```
  BACKGROUND IMAGE (Softened/Atmospheric) 
    -> SOFT BLUR / COLOR ATMOSPHERE 
    -> TRANSLUCENT OVERLAY 
    -> GLASS UI (backdrop-blur-xl, white/65%) 
    -> FOREGROUND CONTENT
  ```
- **Strict Role Boundaries:**
  - **Patient**: End-user accessing appointments, OPD tokens, Health Vault, and emergency assistance.
  - **Doctor**: Medical practitioner managing clinics, live queues, consultations, and patient history.
  - *Hospitals*: Institutional facilities affiliated with doctors, **never** a login user role.

---

## 🚀 Key Features

### 1. 🏥 Public Portal & Exploration
- **Hero & Reassurance:** High-trust introduction with Jaipur / Metro search, 112 emergency ticker, and verified medical badges.
- **Doctor Directory:** Specialty filters (Cardiology, Neurology, Pediatrics, Orthopedics, General Medicine), hospital affiliations, consultation fees, and instant slot booking.
- **Hospital Directory:** 24/7 emergency facilities, bed availability indicators, NABH accreditations, and direct ambulance contacts.
- **Jan Aushadhi & Pharmacy:** Search generic and branded medicines, view dosage forms, and discover subsidized Jan Aushadhi alternatives.
- **Emergency & Blood Assistance:** Real-time blood bank units by group (A+, B+, O+, AB+, etc.), distance-based search, and 1-tap SOS alert.

### 2. 🔐 Authentication & Onboarding
- **Authentic Role Switcher:** Toggle smoothly between `Patient` and `Doctor`.
- **Quick Demo Access:** 1-tap "Try Demo Patient" and "Try Demo Doctor" buttons for immediate evaluator testing.
- **Doctor Verification Onboarding:** 5-step registration including Medical Council Registration Number (NMC/SMC), Year of Registration, and Primary Hospital Affiliation.

### 3. 👤 Authenticated Patient Portal (Left Sidebar)
- **Dashboard:** Matches the canonical CareSetu Healthcare Dashboard layout:
  - Welcome banner with live OPD queue tracker for the day (e.g. Token `#A-14`).
  - Patient Vitals card (Blood Pressure, Heart Rate, SpO2, Blood Sugar).
  - Upcoming appointments timeline with "Reschedule" and "View Queue" actions.
  - Quick action cards (Book Appointment, Emergency SOS, Order Medicines, Health Vault).
- **Appointments Manager:** Filter by All, Upcoming, and Past visits. Book new appointments with confetti celebration and live token generation.
- **Health Vault (ABHA / ABDM Ready):** Encrypted medical records storage with preview, category filtering (Prescriptions, Lab Reports, Discharge Summaries), and file upload modal.
- **Emergency SOS Modal:** Instant 112 emergency dialing, GPS coordinates beacon, and one-tap emergency contact alerting.

### 4. 🩺 Authenticated Doctor Console (Clinical Left Sidebar)
- **Clinical Dashboard:**
  - Key metrics: Today's Appointments (18), Waiting in Queue (7), Completed (11), Critical Cases (1).
  - **Live OPD Queue Progression System:** Interactive "Call Next Token" control that increments the active OPD token and fires live audio-visual notifications.
  - Today's appointment roster with quick clinical status tags (`In Waiting`, `In Consultation`, `Completed`).
  - Recent patient case notes and quick vitals overview.
- **Doctor Queue Manager:** Full queue dashboard with dual token counter (Current Serving vs Patient Token) and estimated wait time countdown.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, React Router v6, Tailwind CSS
- **Icons & Visuals:** Lucide React icons, Canvas Confetti
- **State Management:** Reactive React Context (`AppContext.jsx`) with persistent local storage and demo mock state
- **Build Tool:** Vite v6

---

## 🏃 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Run

```bash
# Clone or navigate to the repository
cd c:\Users\Prince\Desktop\Caresetuu

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Demo Evaluator Credentials

Use the convenient 1-tap buttons on `/login` or enter credentials manually:

| Role | Email | Password | Pre-loaded Data |
|---|---|---|---|
| **Patient** | `rahul.sharma@example.com` | `patient123` | Token `#A-14`, Dr. Arvind Sharma cardiology appointment, vitals, 4 Health Vault records |
| **Doctor** | `dr.arvind@carewell.org` | `doctor123` | OPD Room 304, CareWell Superspecialty Hospital, 18 patients roster, Live Token `#A-12` |

---

## 📐 Project Structure

```
Caresetuu/
├── GEMINI.md                    # Core branding, logo, and design system rules
├── docs/
│   └── CARESETU_DESIGN_SYSTEM.md # Detailed color tokens, typography & component specs
├── public/
│   ├── assets/
│   │   ├── images/              # Authentic logos, clinic backdrops & generated photographic backgrounds
│   │   └── icons/               # SVG emblems and icons
├── src/
│   ├── components/
│   │   ├── brand/               # Canonical BrandLogo with emblem and tagline
│   │   ├── healthcare/          # BookingModal, EmergencySosModal, QueueTracker, UploadRecord
│   │   ├── layout/              # BackgroundVisual, PublicLayout, PatientLayout, DoctorLayout
│   │   ├── navigation/          # NotificationPanel, MobileDrawer
│   │   └── ui/                  # GlassCard, Toast
│   ├── context/
│   │   └── AppContext.jsx       # Auth, roles, bookings, queue progression & health vault state
│   ├── data/                    # Doctors, hospitals, medicines, blood banks, and records data
│   ├── pages/
│   │   ├── auth/                # LoginPage, Patient/Doctor Register, ForgotPassword
│   │   ├── doctor/              # DoctorDashboard, Queue, Appointments, Patients, Profile
│   │   ├── patient/             # PatientDashboard, Appointments, HealthRecords (Vault), Profile, Settings
│   │   └── public/              # LandingPage, DoctorsPage, HospitalsPage, MedicinesPage, AssistancePage
│   ├── App.jsx                  # Complete routing matrix
│   ├── index.css                # Glassmorphism, custom scrollbars, animations
│   └── main.jsx
├── tailwind.config.js
└── vite.config.js
```

---

## 🛡️ License & Attributions
Built for CareSetu. All rights reserved.
Tagline: *Care Today. A Healthier Tomorrow.*
