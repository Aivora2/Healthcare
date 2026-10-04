export const BLOOD_BANKS = [
  {
    id: 'bb-1',
    name: 'CareWell Regional Blood Center & Component Lab',
    hospital: 'CareWell Superspecialty Hospital',
    city: 'Jaipur, Rajasthan',
    address: 'Sector 5, Malviya Nagar, Jaipur',
    phone: '+91 141 278 9100',
    timing: '24 Hours Open',
    verified: true,
    units: {
      'A+': 18,
      'A-': 4,
      'B+': 24,
      'B-': 7,
      'AB+': 12,
      'AB-': 3,
      'O+': 32,
      'O-': 6
    },
    plateletsAvailable: true,
    plasmaAvailable: true,
    distanceKm: 2.1
  },
  {
    id: 'bb-2',
    name: 'SMS Hospital Blood Bank & Transfusion Medicine',
    hospital: 'SMS Medical College & Hospital',
    city: 'Jaipur, Rajasthan',
    address: 'JLN Marg, Ashok Nagar, Jaipur',
    phone: '+91 141 256 0291',
    timing: '24 Hours Open',
    verified: true,
    units: {
      'A+': 45,
      'A-': 9,
      'B+': 52,
      'B-': 14,
      'AB+': 20,
      'AB-': 5,
      'O+': 68,
      'O-': 12
    },
    plateletsAvailable: true,
    plasmaAvailable: true,
    distanceKm: 4.8
  },
  {
    id: 'bb-3',
    name: 'Fortis Escorts Blood Bank',
    hospital: 'Fortis Escorts Hospital',
    city: 'Jaipur, Rajasthan',
    address: 'Jawaharlal Nehru Marg, Malviya Nagar, Jaipur',
    phone: '+91 141 254 7015',
    timing: '24 Hours Open',
    verified: true,
    units: {
      'A+': 14,
      'A-': 2,
      'B+': 19,
      'B-': 5,
      'AB+': 8,
      'AB-': 1,
      'O+': 25,
      'O-': 4
    },
    plateletsAvailable: true,
    plasmaAvailable: true,
    distanceKm: 3.4
  },
  {
    id: 'bb-4',
    name: 'Rotary Blood Bank Jaipur',
    hospital: 'Rotary Service Trust',
    city: 'Jaipur, Rajasthan',
    address: 'Gandhi Nagar, Jaipur',
    phone: '+91 141 270 4589',
    timing: '08:00 AM - 10:00 PM',
    verified: true,
    units: {
      'A+': 22,
      'A-': 6,
      'B+': 30,
      'B-': 8,
      'AB+': 11,
      'AB-': 2,
      'O+': 38,
      'O-': 5
    },
    plateletsAvailable: false,
    plasmaAvailable: true,
    distanceKm: 5.6
  }
];

export const EMERGENCY_NUMBERS = [
  { title: 'National Emergency Hotline', number: '112', desc: 'Police, Fire, Ambulance 24x7 Universal Help' },
  { title: 'National Ambulance Service', number: '108', desc: 'Emergency medical response and transport' },
  { title: 'CareSetu Priority SOS Dispatch', number: '1800-CARE-SETU', desc: 'CareSetu expedited hospital admission coordination' },
  { title: 'National Poison Control Center', number: '1800-116-117', desc: 'Immediate toxicology guidance' },
  { title: 'Women & Senior Citizen Helpline', number: '1091 / 14567', desc: 'Senior care and welfare crisis support' }
];
