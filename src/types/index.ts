export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface HealthResponse {
  advice: string;
  severity: 'low' | 'medium' | 'high';
  shouldSeeDoctor: boolean;
  recommendations: string[];
}

export interface Appointment {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  symptoms: string;
  preferredDate: string;
  preferredTime: string;
  language: string;
  timestamp: number;
}

export interface VoiceSettings {
  language: string;
  voice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
}

export interface HealthData {
  [key: string]: {
    advice: string;
    severity: 'low' | 'medium' | 'high';
    shouldSeeDoctor: boolean;
    recommendations: string[];
  };
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  phone: string;
  isAuthenticated: boolean;
}

export interface AppointmentStatus {
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  updatedAt: number;
  updatedBy: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'nurse' | 'receptionist' | 'admin';
  specialization?: string;
  phone: string;
  isActive: boolean;
  joinedAt: number;
  permissions: StaffPermissions;
}

export interface StaffPermissions {
  canViewAppointments: boolean;
  canEditAppointments: boolean;
  canDeleteAppointments: boolean;
  canManageStaff: boolean;
  canViewAnalytics: boolean;
  canContactPatients: boolean;
}

export interface StaffActivity {
  id: string;
  staffId: string;
  staffName: string;
  action: string;
  details: string;
  timestamp: number;
  appointmentId?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  emergencyContact?: string;
  address?: string;
  registeredAt: number;
  isActive: boolean;
}

export interface MedicalReport {
  id: string;
  patientId: string;
  appointmentId: string;
  doctorName: string;
  diagnosis: string;
  symptoms: string;
  prescription: string[];
  recommendations: string[];
  followUpDate?: string;
  reportDate: number;
  severity: 'low' | 'medium' | 'high';
  status: 'draft' | 'completed' | 'reviewed';
}

export interface PatientAppointment extends Appointment {
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  doctorName?: string;
  notes?: string;
  medicalReportId?: string;
}