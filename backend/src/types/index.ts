import type { Request } from 'express';


// User and Authentication Types
export interface User {
  _id: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor' | 'admin' | 'staff';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  _id: string;
  userId: string;
  name: string;
  phone: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  bloodGroup?: string;
  emergencyContact?: string;
  address?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: User;
  userId?: string;
}

// Healthcare Types
export interface HealthResponse {
  advice: string;
  severity: 'low' | 'medium' | 'high';
  shouldSeeDoctor: boolean;
  recommendations: string[];
  symptoms: string;
  language: string;
  createdAt: Date;
}

export interface Appointment {
  _id: string;
  patientId: string;
  doctorId?: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  symptoms: string;
  preferredDate: string;
  preferredTime: string;
  language: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  medicalReportId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Doctor {
  _id: string;
  userId: string;
  name: string;
  email: string;
  specialization: string;
  phone: string;
  isAuthenticated: boolean;
  isAvailable: boolean;
  consultationFee: number;
  experience: number;
  qualifications: string[];
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Staff {
  _id: string;
  userId: string;
  name: string;
  email: string;
  role: 'doctor' | 'nurse' | 'receptionist' | 'admin';
  specialization?: string;
  phone: string;
  isActive: boolean;
  permissions: StaffPermissions;
  joinedAt: Date;
  updatedAt: Date;
}

export interface StaffPermissions {
  canViewAppointments: boolean;
  canEditAppointments: boolean;
  canDeleteAppointments: boolean;
  canManageStaff: boolean;
  canViewAnalytics: boolean;
  canContactPatients: boolean;
}

export interface Patient {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  emergencyContact?: string;
  address?: string;
  medicalHistory?: string[];
  allergies?: string[];
  profileImage?: string;
  isActive: boolean;
  registeredAt: Date;
  updatedAt: Date;
}

export interface MedicalReport {
  _id: string;
  patientId: string;
  appointmentId: string;
  doctorId: string;
  doctorName: string;
  diagnosis: string;
  symptoms: string;
  prescription: string[];
  recommendations: string[];
  followUpDate?: Date;
  reportDate: Date;
  severity: 'low' | 'medium' | 'high';
  status: 'draft' | 'completed' | 'reviewed';
  createdAt: Date;
  updatedAt: Date;
}

// Analytics and Tracking Types
export interface SymptomTrend {
  _id: string;
  symptom: string;
  count: number;
  date: Date;
  language: string;
}

export interface StaffActivity {
  _id: string;
  staffId: string;
  staffName: string;
  action: string;
  details: string;
  timestamp: Date;
  appointmentId?: string;
  ipAddress?: string;
  userAgent?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Notification Types
export interface Notification {
  _id: string;
  userId: string;
  type: 'appointment' | 'reminder' | 'report' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  data?: any;
  createdAt: Date;
  updatedAt: Date;
}

// File Upload Types
export interface FileUpload {
  _id: string;
  originalName: string;
  filename: string;
  path: string;
  size: number;
  mimetype: string;
  uploadedBy: string;
  createdAt: Date;
}

// Voice Assistant Types
export interface VoiceSession {
  _id: string;
  userId?: string;
  sessionId: string;
  symptoms: string;
  language: string;
  response: HealthResponse;
  duration: number;
  createdAt: Date;
}

// Settings Types
export interface SystemSettings {
  _id: string;
  key: string;
  value: any;
  description?: string;
  updatedAt: Date;
}

// Error Types
export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: string;
}

// Database Types
export interface DatabaseConfig {
  uri: string;
  options: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    maxPoolSize: number;
    serverSelectionTimeoutMS: number;
    socketTimeoutMS: number;
  };
}

// Email Types
export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
  }>;
}

// SMS Types
export interface SMSData {
  to: string;
  message: string;
  from?: string;
}

// Logging Types
export interface LogEntry {
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  timestamp: Date;
  userId?: string;
  ip?: string;
  userAgent?: string;
  error?: Error;
  metadata?: any;
} 