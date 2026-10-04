export const MEDICINES = [
  {
    id: 'med-1',
    brandName: 'Dolo 650',
    genericName: 'Paracetamol',
    saltComposition: 'Paracetamol / Acetaminophen (650mg)',
    category: 'Analgesics & Antipyretics',
    type: 'OTC', // 'OTC' or 'Prescription'
    brandPrice: 34.50,
    unit: 'Strip of 15 tablets',
    manufacturer: 'Micro Labs Ltd',
    prescriptionRequired: false,
    description: 'Widely used for mild to moderate pain relief, reducing high body temperature, headaches, muscle aches, and viral fever symptoms.',
    dosageInstruction: 'Take 1 tablet after food as advised. Maximum 3 doses in 24 hours.',
    genericAlternative: {
      name: 'Generic Paracetamol 650 (Jan Aushadhi)',
      salt: 'Paracetamol IP (650mg)',
      price: 11.20,
      savingsPercent: 68,
      source: 'Pradhan Mantri Bhartiya Janaushadhi Pariyojana'
    }
  },
  {
    id: 'med-2',
    brandName: 'Augmentin 625 Duo',
    genericName: 'Amoxicillin and Potassium Clavulanate',
    saltComposition: 'Amoxicillin (500mg) + Clavulanic Acid (125mg)',
    category: 'Antibiotics',
    type: 'Prescription',
    brandPrice: 204.00,
    unit: 'Strip of 10 tablets',
    manufacturer: 'GlaxoSmithKline Pharmaceuticals Ltd',
    prescriptionRequired: true,
    description: 'Broad-spectrum antibiotic prescribed to treat bacterial infections of the lungs, ear, nasal sinus, urinary tract, skin, and soft tissue.',
    dosageInstruction: 'Complete the entire course as prescribed by your physician. Do not skip doses.',
    genericAlternative: {
      name: 'Amoxyclav 625 Generic',
      salt: 'Amoxicillin IP (500mg) + Clavulanate Potassium IP (125mg)',
      price: 68.50,
      savingsPercent: 66,
      source: 'Jan Aushadhi Kendra'
    }
  },
  {
    id: 'med-3',
    brandName: 'Pan 40',
    genericName: 'Pantoprazole',
    saltComposition: 'Pantoprazole Sodium Gastro-resistant (40mg)',
    category: 'Gastroenterology',
    type: 'Prescription',
    brandPrice: 155.00,
    unit: 'Strip of 15 tablets',
    manufacturer: 'Alkem Laboratories Ltd',
    prescriptionRequired: true,
    description: 'Proton pump inhibitor (PPI) that decreases the amount of acid produced in the stomach, treating acid reflux, heartburn, and peptic ulcers.',
    dosageInstruction: 'Take 1 tablet in the morning 30 minutes before breakfast with water.',
    genericAlternative: {
      name: 'Pantoprazole 40mg Generic',
      salt: 'Pantoprazole IP (40mg)',
      price: 32.00,
      savingsPercent: 79,
      source: 'Generic Medical Store'
    }
  },
  {
    id: 'med-4',
    brandName: 'Telma 40',
    genericName: 'Telmisartan',
    saltComposition: 'Telmisartan (40mg)',
    category: 'Cardiovascular',
    type: 'Prescription',
    brandPrice: 220.00,
    unit: 'Strip of 30 tablets',
    manufacturer: 'Glenmark Pharmaceuticals Ltd',
    prescriptionRequired: true,
    description: 'Angiotensin II receptor antagonist used for the management of hypertension (high blood pressure) and prevention of cardiovascular events.',
    dosageInstruction: 'Take once daily at the same time, with or without food.',
    genericAlternative: {
      name: 'Telmisartan 40mg (Jan Aushadhi)',
      salt: 'Telmisartan IP (40mg)',
      price: 45.00,
      savingsPercent: 80,
      source: 'Government Janaushadhi Store'
    }
  },
  {
    id: 'med-5',
    brandName: 'Glycomet 500 SR',
    genericName: 'Metformin',
    saltComposition: 'Metformin Hydrochloride Prolonged Release (500mg)',
    category: 'Diabetology',
    type: 'Prescription',
    brandPrice: 48.00,
    unit: 'Strip of 20 tablets',
    manufacturer: 'USV Ltd',
    prescriptionRequired: true,
    description: 'First-line medication for the treatment of type 2 diabetes mellitus to lower blood sugar levels and improve insulin sensitivity.',
    dosageInstruction: 'Take with or after dinner to minimize stomach upset.',
    genericAlternative: {
      name: 'Metformin SR 500mg Generic',
      salt: 'Metformin HCl IP (500mg SR)',
      price: 14.50,
      savingsPercent: 70,
      source: 'Jan Aushadhi'
    }
  },
  {
    id: 'med-6',
    brandName: 'Shelcal 500',
    genericName: 'Calcium with Vitamin D3',
    saltComposition: 'Elemental Calcium (500mg) + Vitamin D3 (250 IU)',
    category: 'Supplements & Vitamins',
    type: 'OTC',
    brandPrice: 135.00,
    unit: 'Bottle of 15 tablets',
    manufacturer: 'Torrent Pharmaceuticals Ltd',
    prescriptionRequired: false,
    description: 'Nutritional supplement to maintain bone density, prevent osteoporosis, and treat calcium & vitamin D deficiency.',
    dosageInstruction: 'Take 1 tablet daily after food or as advised by your healthcare provider.',
    genericAlternative: {
      name: 'Calcium + Vit D3 Generic',
      salt: 'Calcium Carbonate + Cholecalciferol',
      price: 38.00,
      savingsPercent: 72,
      source: 'Jan Aushadhi'
    }
  }
];

export const MEDICINE_CATEGORIES = [
  'All',
  'Analgesics & Antipyretics',
  'Antibiotics',
  'Gastroenterology',
  'Cardiovascular',
  'Diabetology',
  'Supplements & Vitamins'
];
