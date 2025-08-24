import { Appointment } from '../types';

export class AppointmentService {
  private static instance: AppointmentService;
  private storageKey = 'swasthya-appointments';

  private constructor() {}

  static getInstance(): AppointmentService {
    if (!AppointmentService.instance) {
      AppointmentService.instance = new AppointmentService();
    }
    return AppointmentService.instance;
  }

  async bookAppointment(appointmentData: Omit<Appointment, 'id' | 'timestamp'>): Promise<string> {
    const appointment: Appointment = {
      ...appointmentData,
      id: this.generateId(),
      timestamp: Date.now()
    };

    const appointments = this.getAppointments();
    appointments.push(appointment);
    
    localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return appointment.id;
  }

  getAppointments(): Appointment[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  getAppointmentById(id: string): Appointment | undefined {
    const appointments = this.getAppointments();
    return appointments.find(apt => apt.id === id);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Get appointment statistics
  getAppointmentStats() {
    const appointments = this.getAppointments();
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    
    return {
      total: appointments.length,
      today: appointments.filter(apt => now - apt.timestamp < oneDay).length,
      thisWeek: appointments.filter(apt => now - apt.timestamp < oneWeek).length,
      byLanguage: appointments.reduce((acc, apt) => {
        acc[apt.language] = (acc[apt.language] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number })
    };
  }
}

export const appointmentService = AppointmentService.getInstance();