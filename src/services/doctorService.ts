import { Doctor, Appointment, AppointmentStatus } from '../types';
import { staffService } from './staffService';

export class DoctorService {
  private static instance: DoctorService;
  private storageKey = 'swasthya-doctor';
  private appointmentsKey = 'swasthya-appointments';

  private constructor() {}

  static getInstance(): DoctorService {
    if (!DoctorService.instance) {
      DoctorService.instance = new DoctorService();
    }
    return DoctorService.instance;
  }

  // Doctor Authentication
  async loginDoctor(email: string, password: string): Promise<Doctor | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo credentials - in production, this would be handled by a real backend
    if (email === 'doctor@swasthyasathi.com' && password === 'doctor123') {
      const doctor: Doctor = {
        id: 'doc_001',
        name: 'Dr. Rajesh Kumar',
        email: 'doctor@swasthyasathi.com',
        specialization: 'General Medicine',
        phone: '+91 98765 43210',
        isAuthenticated: true
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(doctor));
      return doctor;
    }
    
    return null;
  }

  getCurrentDoctor(): Doctor | null {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : null;
  }

  logoutDoctor(): void {
    localStorage.removeItem(this.storageKey);
  }

  // Appointment Management
  getAllAppointments(): Appointment[] {
    const stored = localStorage.getItem(this.appointmentsKey);
    return stored ? JSON.parse(stored) : [];
  }

  getAppointmentsByStatus(status: string): Appointment[] {
    const appointments = this.getAllAppointments();
    return appointments.filter(apt => (apt as any).status === status || (!status && !(apt as any).status));
  }

  updateAppointmentStatus(appointmentId: string, status: AppointmentStatus): boolean {
    const appointments = this.getAllAppointments();
    const appointmentIndex = appointments.findIndex(apt => apt.id === appointmentId);
    
    if (appointmentIndex !== -1) {
      (appointments[appointmentIndex] as any).status = status.status;
      (appointments[appointmentIndex] as any).notes = status.notes;
      (appointments[appointmentIndex] as any).updatedAt = status.updatedAt;
      (appointments[appointmentIndex] as any).updatedBy = status.updatedBy;
      
      localStorage.setItem(this.appointmentsKey, JSON.stringify(appointments));
      
      // Log activity
      staffService.logActivity({
        staffId: 'current_doctor',
        staffName: status.updatedBy,
        action: 'Appointment Status Updated',
        details: `Appointment for ${appointments[appointmentIndex].name} marked as ${status.status}`,
        appointmentId: appointmentId
      });
      
      return true;
    }
    
    return false;
  }

  // Analytics
  getAppointmentAnalytics() {
    const appointments = this.getAllAppointments();
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    const statusCounts = appointments.reduce((acc, apt) => {
      const status = (apt as any).status || 'pending';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const languageCounts = appointments.reduce((acc, apt) => {
      acc[apt.language] = (acc[apt.language] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const severityCounts = appointments.reduce((acc, apt) => {
      // Extract severity from symptoms (this is a simplified approach)
      const severity = this.extractSeverityFromSymptoms(apt.symptoms);
      acc[severity] = (acc[severity] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return {
      total: appointments.length,
      today: appointments.filter(apt => now - apt.timestamp < oneDay).length,
      thisWeek: appointments.filter(apt => now - apt.timestamp < oneWeek).length,
      thisMonth: appointments.filter(apt => now - apt.timestamp < oneMonth).length,
      byStatus: statusCounts,
      byLanguage: languageCounts,
      bySeverity: severityCounts,
      recentAppointments: appointments
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5)
    };
  }

  private extractSeverityFromSymptoms(symptoms: string): string {
    const lowerSymptoms = symptoms.toLowerCase();
    
    // High severity keywords
    if (lowerSymptoms.includes('chest pain') || 
        lowerSymptoms.includes('difficulty breathing') ||
        lowerSymptoms.includes('severe pain') ||
        lowerSymptoms.includes('blood')) {
      return 'high';
    }
    
    // Medium severity keywords
    if (lowerSymptoms.includes('fever') || 
        lowerSymptoms.includes('vomiting') ||
        lowerSymptoms.includes('dizziness')) {
      return 'medium';
    }
    
    return 'low';
  }

  // Search and Filter
  searchAppointments(query: string): Appointment[] {
    const appointments = this.getAllAppointments();
    const lowerQuery = query.toLowerCase();
    
    return appointments.filter(apt => 
      apt.name.toLowerCase().includes(lowerQuery) ||
      apt.phone.includes(query) ||
      apt.symptoms.toLowerCase().includes(lowerQuery) ||
      (apt.email && apt.email.toLowerCase().includes(lowerQuery))
    );
  }

  getAppointmentsByDateRange(startDate: string, endDate: string): Appointment[] {
    const appointments = this.getAllAppointments();
    
    return appointments.filter(apt => {
      const aptDate = apt.preferredDate;
      return aptDate >= startDate && aptDate <= endDate;
    });
  }
}

export const doctorService = DoctorService.getInstance();