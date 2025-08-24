import { Patient, MedicalReport, PatientAppointment } from '../types';

export class PatientService {
  private static instance: PatientService;
  private patientsKey = 'swasthya-patients';
  private reportsKey = 'swasthya-medical-reports';
  private currentPatientKey = 'swasthya-current-patient';

  private constructor() {
    this.initializeDemoData();
  }

  static getInstance(): PatientService {
    if (!PatientService.instance) {
      PatientService.instance = new PatientService();
    }
    return PatientService.instance;
  }

  private initializeDemoData() {
    const existingPatients = this.getAllPatients();
    const existingReports = this.getAllReports();
    
    if (existingPatients.length === 0) {
      const demoPatients: Patient[] = [
        {
          id: 'patient_001',
          name: 'Rahul Sharma',
          email: 'rahul.sharma@gmail.com',
          phone: '+91 9876543210',
          age: 32,
          gender: 'male',
          bloodGroup: 'B+',
          emergencyContact: '+91 98765 43211',
          address: 'Mumbai, Maharashtra',
          registeredAt: Date.now() - (30 * 24 * 60 * 60 * 1000),
          isActive: true
        },
        {
          id: 'patient_002',
          name: 'Priya Patel',
          email: 'priya.patel@email.com',
          phone: '+91 98765 43212',
          age: 28,
          gender: 'female',
          bloodGroup: 'A+',
          emergencyContact: '+91 98765 43213',
          address: 'Pune, Maharashtra',
          registeredAt: Date.now() - (20 * 24 * 60 * 60 * 1000),
          isActive: true
        }
      ];
      
      localStorage.setItem(this.patientsKey, JSON.stringify(demoPatients));
    }

    if (existingReports.length === 0) {
      const demoReports: MedicalReport[] = [
        {
          id: 'report_001',
          patientId: 'patient_001',
          appointmentId: 'apt_001',
          doctorName: 'Dr. Rajesh Kumar',
          diagnosis: 'Common Cold with mild fever',
          symptoms: 'Runny nose, mild fever, body ache',
          prescription: ['Paracetamol 500mg - 2 times daily', 'Rest and hydration'],
          recommendations: ['Take adequate rest', 'Drink warm fluids', 'Avoid cold foods'],
          followUpDate: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
          reportDate: Date.now() - (5 * 24 * 60 * 60 * 1000),
          severity: 'low',
          status: 'completed'
        },
        {
          id: 'report_002',
          patientId: 'patient_001',
          appointmentId: 'apt_002',
          doctorName: 'Dr. Sunita Reddy',
          diagnosis: 'Hypertension - Stage 1',
          symptoms: 'Headache, dizziness, fatigue',
          prescription: ['Amlodipine 5mg - Once daily', 'Low sodium diet'],
          recommendations: ['Regular exercise', 'Monitor blood pressure daily', 'Reduce salt intake'],
          followUpDate: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
          reportDate: Date.now() - (15 * 24 * 60 * 60 * 1000),
          severity: 'medium',
          status: 'completed'
        },
        {
          id: 'report_003',
          patientId: 'patient_002',
          appointmentId: 'apt_003',
          doctorName: 'Dr. Rajesh Kumar',
          diagnosis: 'Gastritis',
          symptoms: 'Stomach pain, acidity, nausea',
          prescription: ['Omeprazole 20mg - Before breakfast', 'Antacid syrup - After meals'],
          recommendations: ['Avoid spicy foods', 'Eat small frequent meals', 'Avoid stress'],
          followUpDate: new Date(Date.now() + (14 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
          reportDate: Date.now() - (10 * 24 * 60 * 60 * 1000),
          severity: 'medium',
          status: 'completed'
        }
      ];
      
      localStorage.setItem(this.reportsKey, JSON.stringify(demoReports));
    }
  }

  // Patient Authentication (Demo)
  async loginPatient(email: string, phone: string): Promise<Patient | null> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const patients = this.getAllPatients();
    const patient = patients.find(p => p.email === email && p.phone === phone);
    
    if (patient) {
      localStorage.setItem(this.currentPatientKey, JSON.stringify(patient));
      return patient;
    }
    
    return null;
  }

  getCurrentPatient(): Patient | null {
    const stored = localStorage.getItem(this.currentPatientKey);
    return stored ? JSON.parse(stored) : null;
  }

  logoutPatient(): void {
    localStorage.removeItem(this.currentPatientKey);
  }

  // Patient Management
  getAllPatients(): Patient[] {
    const stored = localStorage.getItem(this.patientsKey);
    return stored ? JSON.parse(stored) : [];
  }

  getPatientById(id: string): Patient | null {
    const patients = this.getAllPatients();
    return patients.find(p => p.id === id) || null;
  }

  updatePatient(id: string, updates: Partial<Patient>): boolean {
    const patients = this.getAllPatients();
    const patientIndex = patients.findIndex(p => p.id === id);
    
    if (patientIndex !== -1) {
      patients[patientIndex] = { ...patients[patientIndex], ...updates };
      localStorage.setItem(this.patientsKey, JSON.stringify(patients));
      
      // Update current patient if it's the same
      const currentPatient = this.getCurrentPatient();
      if (currentPatient && currentPatient.id === id) {
        localStorage.setItem(this.currentPatientKey, JSON.stringify(patients[patientIndex]));
      }
      
      return true;
    }
    
    return false;
  }

  // Medical Reports
  getAllReports(): MedicalReport[] {
    const stored = localStorage.getItem(this.reportsKey);
    return stored ? JSON.parse(stored) : [];
  }

  getPatientReports(patientId: string): MedicalReport[] {
    const reports = this.getAllReports();
    return reports.filter(r => r.patientId === patientId)
                  .sort((a, b) => b.reportDate - a.reportDate);
  }

  getReportById(id: string): MedicalReport | null {
    const reports = this.getAllReports();
    return reports.find(r => r.id === id) || null;
  }

  addMedicalReport(report: Omit<MedicalReport, 'id'>): string {
    const newReport: MedicalReport = {
      ...report,
      id: this.generateId()
    };
    
    const reports = this.getAllReports();
    reports.push(newReport);
    localStorage.setItem(this.reportsKey, JSON.stringify(reports));
    
    return newReport.id;
  }

  // Patient Appointments
  getPatientAppointments(patientId: string): PatientAppointment[] {
    const patient = this.getPatientById(patientId);
    if (!patient) return [];
    
    const appointments = JSON.parse(localStorage.getItem('swasthya-appointments') || '[]');
    return appointments.filter((apt: any) => 
      apt.phone === patient.phone || apt.email === patient.email
    ).sort((a: any, b: any) => b.timestamp - a.timestamp);
  }

  // Analytics
  getPatientAnalytics(patientId: string) {
    const reports = this.getPatientReports(patientId);
    const appointments = this.getPatientAppointments(patientId);
    
    const severityCount = reports.reduce((acc, report) => {
      acc[report.severity] = (acc[report.severity] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
    
    const statusCount = appointments.reduce((acc, apt) => {
      const status = apt.status || 'pending';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
    
    const recentReports = reports.slice(0, 3);
    const upcomingAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.preferredDate);
      return aptDate >= new Date() && (apt.status === 'confirmed' || apt.status === 'pending');
    });
    
    return {
      totalReports: reports.length,
      totalAppointments: appointments.length,
      upcomingAppointments: upcomingAppointments.length,
      severityDistribution: severityCount,
      appointmentStatus: statusCount,
      recentReports,
      upcomingAppointments: upcomingAppointments.slice(0, 3)
    };
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Search functionality
  searchReports(patientId: string, query: string): MedicalReport[] {
    const reports = this.getPatientReports(patientId);
    const lowerQuery = query.toLowerCase();
    
    return reports.filter(report =>
      report.diagnosis.toLowerCase().includes(lowerQuery) ||
      report.symptoms.toLowerCase().includes(lowerQuery) ||
      report.doctorName.toLowerCase().includes(lowerQuery)
    );
  }
}

export const patientService = PatientService.getInstance();