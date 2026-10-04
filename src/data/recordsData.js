export const INITIAL_RECORDS = [
  {
    id: 'rec-1',
    title: 'Cardiology Consultation & ECG Report',
    doctor: 'Dr. Rahul Mehta',
    hospital: 'CareWell Superspecialty Hospital',
    date: '12 Sep 2026',
    category: 'Prescription & Diagnostic',
    type: 'PDF',
    size: '1.8 MB',
    summary: 'Normal sinus rhythm, BP 120/78 mmHg. Follow-up regimen for lipid profile and lifestyle modifications.',
    tags: ['Cardiology', 'ECG', 'Prescription']
  },
  {
    id: 'rec-2',
    title: 'Comprehensive Metabolic Panel & Lipid Profile',
    doctor: 'Dr. Sunita Kothari',
    hospital: 'CareWell Diagnostic Labs (NABL)',
    date: '28 Aug 2026',
    category: 'Lab Report',
    type: 'PDF',
    size: '2.4 MB',
    summary: 'HbA1c 5.6% (Normal), Total Cholesterol 182 mg/dL, Triglycerides 140 mg/dL, Vitamin D 32 ng/mL.',
    tags: ['Blood Test', 'HbA1c', 'Lipid Panel']
  },
  {
    id: 'rec-3',
    title: 'Chest X-Ray Digital Radiograph',
    doctor: 'Dr. Neha Singh',
    hospital: 'City Care Clinic Radiology',
    date: '15 Jul 2026',
    category: 'Radiology',
    type: 'DICOM/PDF',
    size: '4.2 MB',
    summary: 'Clear bilateral lung fields, normal cardiothoracic ratio, no active focal lesions.',
    tags: ['X-Ray', 'Radiology', 'Lungs']
  },
  {
    id: 'rec-4',
    title: 'Seasonal Immunization & Flu Vaccination Certificate',
    doctor: 'Dr. Neha Singh',
    hospital: 'Fortis Escorts Immunization Clinic',
    date: '02 May 2026',
    category: 'Immunization',
    type: 'PDF',
    size: '850 KB',
    summary: 'Quadrivalent Influenza Vaccine administered without adverse reactions.',
    tags: ['Vaccination', 'Preventive']
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-101',
    doctorId: 'doc-1',
    doctorName: 'Dr. Rahul Mehta',
    specialization: 'Cardiologist',
    qualification: 'MBBS, MD, DM',
    hospital: 'CareWell Superspecialty Hospital',
    date: '12 Oct 2026',
    dayName: 'Sun',
    time: '10:30 AM',
    type: 'In-Clinic Consultation',
    tokenNumber: 'A-14',
    currentToken: 'A-11',
    status: 'Confirmed', // 'Confirmed', 'Completed', 'Cancelled'
    clinicalNote: 'Routine quarterly cardiac evaluation and review of blood pressure parameters.',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    estimatedWaitMinutes: 25
  },
  {
    id: 'apt-102',
    doctorId: 'doc-2',
    doctorName: 'Dr. Neha Singh',
    specialization: 'Pediatrician',
    qualification: 'MBBS, DCH, DNB',
    hospital: 'City Care Clinic',
    date: '20 Oct 2026',
    dayName: 'Mon',
    time: '04:00 PM',
    type: 'Video Consult',
    tokenNumber: 'V-06',
    currentToken: 'V-04',
    status: 'Upcoming',
    clinicalNote: 'Child developmental milestone check-up and dietary plan review.',
    avatar: 'https://images.unsplash.com/photo-1594824813583-772b0c399b2c?auto=format&fit=crop&q=80&w=400',
    estimatedWaitMinutes: 15
  },
  {
    id: 'apt-103',
    doctorId: 'doc-6',
    doctorName: 'Dr. Sunita Kothari',
    specialization: 'General Physician',
    qualification: 'MBBS, MD',
    hospital: 'SMS Medical Center',
    date: '15 Sep 2026',
    dayName: 'Tue',
    time: '11:00 AM',
    type: 'In-Clinic Consultation',
    tokenNumber: 'B-09',
    currentToken: 'Completed',
    status: 'Completed',
    clinicalNote: 'Annual wellness check-up, vitals normal.',
    avatar: 'https://images.unsplash.com/photo-1594824813583-772b0c399b2c?auto=format&fit=crop&q=80&w=400',
    estimatedWaitMinutes: 0
  }
];
