# CARESETU — DESIGN & ENGINEERING SPECIFICATION & RULES

## 1. Product Identity
- **Product Name:** CareSetu
- **Tagline:** Care Today. A Healthier Tomorrow.
- **Core Mission:** A calm, human-centered digital healthcare platform connecting patients, doctors, hospitals, medicines, emergency/blood assistance, queues, and health records into one cohesive experience.
- **Emotional Intent:** Reassuring, safe, hopeful, calm, and trustworthy. Never cold, sterile, or administrative.

## 2. Canonical Logo & Branding (STRICT)
- **Single Canonical Logo:** The circular emblem featuring a dynamic blue/teal circular "C" enclosing a human figure, medical plus (+) in a circle, and healing leaf.
- **Typography in Logo:** "Care" in bold deep navy/blue, "Setu" in healthcare teal, with "Care Today. A Healthier Tomorrow." tagline.
- **Absolute Rule:** Never replace the logo with a plain generic medical cross, do not generate different logos, and keep proportions consistent everywhere.

## 3. Global Visual & Background System (MANDATORY ON EVERY PAGE)
- **Every major page must have an intentional background visual treatment.**
- No page may fall back to plain white canvas, plain gray canvas, or empty flat backgrounds.
- Layering Architecture:
  `BACKGROUND IMAGE (Softened/Atmospheric) -> SOFT BLUR / COLOR ATMOSPHERE -> TRANSLUCENT OVERLAY -> GLASS UI -> FOREGROUND CONTENT`
- Reusable components: `BackgroundVisual`, `AppShell`, `PublicLayout`, `PatientLayout`, `DoctorLayout`, `GlassPanel`, `GlassCard`.

## 4. Glassmorphism & Depth
- Real glassmorphism: `rgba(255,255,255,0.55-0.78)`, `backdrop-filter: blur(16px-24px)`, `border: 1px solid rgba(255,255,255,0.45-0.70)`.
- Controlled corner radii (rounded-2xl, rounded-3xl), soft diffused ambient shadows, zero harsh black outlines.
- Higher opacity for dense data tables, forms, and critical clinical text for 100% accessibility and readability.

## 5. Roles & Navigation Architecture
- **Two User Roles Only:** `Patient` and `Doctor`.
- **Hospitals are NOT user roles:** Hospitals are healthcare institutions/facilities that doctors are affiliated with. Never show "Hospital" in login/signup role selector.
- **Navigation:**
  - Public pages: Glass sticky top navigation.
  - Authenticated Patient: **Left Sidebar** (Dashboard, Search, Appointments, Assistance, Medicines, Health Records / Vault, My Profile, Notifications, Settings, Help & Support).
  - Authenticated Doctor: **Left Sidebar** (Dashboard, Appointments, Queue, Patients, Profile, Notifications, Settings).
  - Mobile: Smooth responsive drawer / bottom navigation strategy.

## 6. Color Language
- **Primary:** CareSetu Blue (`#2563EB` / `#1D4ED8`)
- **Secondary:** Healthcare Teal / Cyan (`#14BBA6` / `#0D9488`)
- **Accent Soft:** Soft Mint/Green (`#10B981` / `#A7F3D0`), Soft Lavender
- **Text:** Deep Navy (`#0F172A` / `#1E293B`)
- **Emergency / SOS:** Restrained Coral Red (`#EF4444` / `#DC2626`)
