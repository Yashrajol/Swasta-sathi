import { Staff, StaffPermissions, StaffActivity } from '../types';

export class StaffService {
  private static instance: StaffService;
  private staffKey = 'swasthya-staff';
  private activityKey = 'swasthya-staff-activity';

  private constructor() {
    this.initializeDefaultStaff();
  }

  static getInstance(): StaffService {
    if (!StaffService.instance) {
      StaffService.instance = new StaffService();
    }
    return StaffService.instance;
  }

  private initializeDefaultStaff() {
    const existingStaff = this.getAllStaff();
    if (existingStaff.length === 0) {
      const defaultStaff: Staff[] = [
        {
          id: 'staff_001',
          name: 'Dr. Rajesh Kumar',
          email: 'doctor@swasthyasathi.com',
          role: 'doctor',
          specialization: 'General Medicine',
          phone: '+91 98765 43210',
          isActive: true,
          joinedAt: Date.now() - (30 * 24 * 60 * 60 * 1000), // 30 days ago
          permissions: {
            canViewAppointments: true,
            canEditAppointments: true,
            canDeleteAppointments: true,
            canManageStaff: true,
            canViewAnalytics: true,
            canContactPatients: true
          }
        },
        {
          id: 'staff_002',
          name: 'Nurse Priya Sharma',
          email: 'nurse.priya@swasthyasathi.com',
          role: 'nurse',
          phone: '+91 98765 43211',
          isActive: true,
          joinedAt: Date.now() - (20 * 24 * 60 * 60 * 1000), // 20 days ago
          permissions: {
            canViewAppointments: true,
            canEditAppointments: true,
            canDeleteAppointments: false,
            canManageStaff: false,
            canViewAnalytics: true,
            canContactPatients: true
          }
        },
        {
          id: 'staff_003',
          name: 'Receptionist Amit Patel',
          email: 'reception@swasthyasathi.com',
          role: 'receptionist',
          phone: '+91 98765 43212',
          isActive: true,
          joinedAt: Date.now() - (15 * 24 * 60 * 60 * 1000), // 15 days ago
          permissions: {
            canViewAppointments: true,
            canEditAppointments: true,
            canDeleteAppointments: false,
            canManageStaff: false,
            canViewAnalytics: false,
            canContactPatients: true
          }
        },
        {
          id: 'staff_004',
          name: 'Dr. Sunita Reddy',
          email: 'dr.sunita@swasthyasathi.com',
          role: 'doctor',
          specialization: 'Pediatrics',
          phone: '+91 98765 43213',
          isActive: true,
          joinedAt: Date.now() - (10 * 24 * 60 * 60 * 1000), // 10 days ago
          permissions: {
            canViewAppointments: true,
            canEditAppointments: true,
            canDeleteAppointments: true,
            canManageStaff: false,
            canViewAnalytics: true,
            canContactPatients: true
          }
        },
        {
          id: 'staff_005',
          name: 'Admin Sarah Johnson',
          email: 'admin@swasthyasathi.com',
          role: 'admin',
          phone: '+91 98765 43214',
          isActive: true,
          joinedAt: Date.now() - (5 * 24 * 60 * 60 * 1000), // 5 days ago
          permissions: {
            canViewAppointments: true,
            canEditAppointments: true,
            canDeleteAppointments: true,
            canManageStaff: true,
            canViewAnalytics: true,
            canContactPatients: true
          }
        }
      ];
      
      localStorage.setItem(this.staffKey, JSON.stringify(defaultStaff));
    }
  }

  // Staff Management
  getAllStaff(): Staff[] {
    const stored = localStorage.getItem(this.staffKey);
    return stored ? JSON.parse(stored) : [];
  }

  getActiveStaff(): Staff[] {
    return this.getAllStaff().filter(staff => staff.isActive);
  }

  getStaffByRole(role: Staff['role']): Staff[] {
    return this.getAllStaff().filter(staff => staff.role === role && staff.isActive);
  }

  getStaffById(id: string): Staff | null {
    const staff = this.getAllStaff().find(s => s.id === id);
    return staff || null;
  }

  addStaff(staffData: Omit<Staff, 'id' | 'joinedAt'>): string {
    const staff: Staff = {
      ...staffData,
      id: this.generateId(),
      joinedAt: Date.now()
    };

    const allStaff = this.getAllStaff();
    allStaff.push(staff);
    localStorage.setItem(this.staffKey, JSON.stringify(allStaff));

    this.logActivity({
      staffId: 'system',
      staffName: 'System',
      action: 'Staff Added',
      details: `New ${staff.role} ${staff.name} added to the team`
    });

    return staff.id;
  }

  updateStaff(id: string, updates: Partial<Staff>): boolean {
    const allStaff = this.getAllStaff();
    const staffIndex = allStaff.findIndex(s => s.id === id);

    if (staffIndex !== -1) {
      allStaff[staffIndex] = { ...allStaff[staffIndex], ...updates };
      localStorage.setItem(this.staffKey, JSON.stringify(allStaff));

      this.logActivity({
        staffId: 'system',
        staffName: 'System',
        action: 'Staff Updated',
        details: `Staff member ${allStaff[staffIndex].name} information updated`
      });

      return true;
    }
    return false;
  }

  deactivateStaff(id: string): boolean {
    return this.updateStaff(id, { isActive: false });
  }

  activateStaff(id: string): boolean {
    return this.updateStaff(id, { isActive: true });
  }

  // Activity Logging
  logActivity(activity: Omit<StaffActivity, 'id' | 'timestamp'>): void {
    const newActivity: StaffActivity = {
      ...activity,
      id: this.generateId(),
      timestamp: Date.now()
    };

    const activities = this.getStaffActivities();
    activities.unshift(newActivity); // Add to beginning
    
    // Keep only last 100 activities
    const trimmedActivities = activities.slice(0, 100);
    localStorage.setItem(this.activityKey, JSON.stringify(trimmedActivities));
  }

  getStaffActivities(limit?: number): StaffActivity[] {
    const stored = localStorage.getItem(this.activityKey);
    const activities = stored ? JSON.parse(stored) : [];
    return limit ? activities.slice(0, limit) : activities;
  }

  getStaffActivityById(staffId: string, limit?: number): StaffActivity[] {
    const activities = this.getStaffActivities();
    const staffActivities = activities.filter(activity => activity.staffId === staffId);
    return limit ? staffActivities.slice(0, limit) : staffActivities;
  }

  // Analytics
  getStaffAnalytics() {
    const staff = this.getAllStaff();
    const activities = this.getStaffActivities();
    
    const roleDistribution = staff.reduce((acc, s) => {
      acc[s.role] = (acc[s.role] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const activeStaffCount = staff.filter(s => s.isActive).length;
    const inactiveStaffCount = staff.filter(s => !s.isActive).length;

    const recentActivities = activities.slice(0, 10);

    const staffWorkload = staff.map(s => ({
      id: s.id,
      name: s.name,
      role: s.role,
      activityCount: activities.filter(a => a.staffId === s.id).length
    }));

    return {
      totalStaff: staff.length,
      activeStaff: activeStaffCount,
      inactiveStaff: inactiveStaffCount,
      roleDistribution,
      recentActivities,
      staffWorkload: staffWorkload.sort((a, b) => b.activityCount - a.activityCount)
    };
  }

  // Permissions
  hasPermission(staffId: string, permission: keyof StaffPermissions): boolean {
    const staff = this.getStaffById(staffId);
    return staff ? staff.permissions[permission] : false;
  }

  updatePermissions(staffId: string, permissions: Partial<StaffPermissions>): boolean {
    const staff = this.getStaffById(staffId);
    if (staff) {
      const updatedPermissions = { ...staff.permissions, ...permissions };
      return this.updateStaff(staffId, { permissions: updatedPermissions });
    }
    return false;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Search and Filter
  searchStaff(query: string): Staff[] {
    const staff = this.getAllStaff();
    const lowerQuery = query.toLowerCase();
    
    return staff.filter(s => 
      s.name.toLowerCase().includes(lowerQuery) ||
      s.email.toLowerCase().includes(lowerQuery) ||
      s.role.toLowerCase().includes(lowerQuery) ||
      (s.specialization && s.specialization.toLowerCase().includes(lowerQuery))
    );
  }
}

export const staffService = StaffService.getInstance();