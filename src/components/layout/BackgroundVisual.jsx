import React from 'react';

/**
 * Reusable Global Background System for CareSetu
 * Mandated layer order:
 * BACKGROUND IMAGE -> SOFT BLUR / COLOR ATMOSPHERE -> TRANSLUCENT OVERLAY -> GLASS UI -> FOREGROUND CONTENT
 */
export default function BackgroundVisual({
  type = 'reception', // 'reception', 'clinic', 'login', 'medicines', 'emergency', 'vault', 'hospitals'
  opacity = 0.28,
  blur = 'blur-2xl', // blur-xl, blur-2xl, blur-3xl
  overlayColor = 'bg-slate-50/80',
  className = '',
  children
}) {
  const backgrounds = {
    reception: '/assets/images/CareSetu Hospital Reception Glow.png',
    clinic: '/assets/images/Caring Consultation in a Modern Clinic (1).png',
    doctor: '/assets/images/Compassionate Care in a Modern Clinic (2).png',
    login: '/assets/images/Caring Consultation in a Modern Clinic (1).png',
    medicines: '/assets/images/medicines-bg.jpg',
    emergency: '/assets/images/emergency-bg.jpg',
    vault: '/assets/images/vault-bg.jpg',
    hospitals: '/assets/images/hospitals-bg.jpg',
  };

  const imageSrc = backgrounds[type] || backgrounds.reception;

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden ${className}`}>
      {/* Fixed Background Environment Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Layer 1: Background Photographic Base */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105 ${blur}`}
          style={{
            backgroundImage: `url("${imageSrc}")`,
            opacity: opacity,
            filter: 'saturate(1.2) contrast(0.95)',
          }}
        />

        {/* Layer 2: Soft Color Atmosphere / Radial Ambient Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-caresetu-blue-500/10 via-transparent to-caresetu-teal-500/10 mix-blend-multiply" />
        
        {/* Layer 3: Translucent Veil Overlay to guarantee 100% WCAG typography contrast */}
        <div className={`absolute inset-0 ${overlayColor}`} />

        {/* Subtle Decorative Ambient Lighting Spheres */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-caresetu-blue-400/15 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-caresetu-teal-400/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-sky-300/15 blur-3xl" />
      </div>

      {/* Layer 4 & 5: Glass UI and Foreground Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
