import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  Search, 
  Filter,
  LogOut,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Phone,
  Mail,
  User,
  UserCheck,
  Activity
} from 'lucide-react';
import { doctorService } from '../services/doctorService';
import { staffService } from '../services/staffService';
import { Appointment, Doctor } from '../types';
import StaffManagement from './StaffManagement';

const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [staffCount, setStaffCount] = useState(0);

  useEffect(() => {
    const currentDoctor = doctorService.getCurrentDoctor();
    if (!currentDoctor) {
      navigate('/doctor/login');
      return;
    }
    
    setDoctor(currentDoctor);
    loadData();
    loadStaffData();
  }, [navigate]);

  useEffect(() => {
    filterAppointments();
  }, [appointments, searchQuery, statusFilter]);

  const loadData = () => {
    const allAppointments = doctorService.getAllAppointments();
    const analyticsData = doctorService.getAppointmentAnalytics();
    
    setAppointments(allAppointments);
    setAnalytics(analyticsData);
  };

  const loadStaffData = () => {
    const activeStaff = staffService.getActiveStaff();
    setStaffCount(activeStaff.length);
  };

  const filterAppointments = () => {
    let filtered = appointments;

    // Filter by search query
    if (searchQuery) {
      filtered = doctorService.searchAppointments(searchQuery);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(apt => {
        const status = (apt as any).status || 'pending';
        return status === statusFilter;
      });
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => b.timestamp - a.timestamp);
    
    setFilteredAppointments(filtered);
  };

  const handleStatusUpdate = (appointmentId: string, status: string, notes?: string) => {
    const success = doctorService.updateAppointmentStatus(appointmentId, {
      status: status as any,
      notes,
      updatedAt: Date.now(),
      updatedBy: doctor?.name || 'Doctor'
    });

    if (success) {
      loadData();
      setShowModal(false);
    }
  };

  const handleLogout = () => {
    doctorService.logoutDoctor();
    navigate('/doctor/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-full">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Doctor Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome, {doctor.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'analytics', label: 'Analytics', icon: Users },
              { id: 'staff', label: 'Staff Management', icon: UserCheck },
              { id: 'activities', label: 'Activities', icon: Activity }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && analytics && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.total}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Today</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.today}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.thisWeek}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.thisMonth}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <UserCheck className="h-8 w-8 text-indigo-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Staff</p>
                    <p className="text-2xl font-bold text-gray-900">{staffCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Appointments</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {analytics.recentAppointments.slice(0, 5).map((appointment: Appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{appointment.name}</p>
                          <p className="text-sm text-gray-600">
                            {formatDate(appointment.preferredDate)} at {formatTime(appointment.preferredTime)}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor((appointment as any).status || 'pending')}`}>
                        {(appointment as any).status || 'pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, phone, or symptoms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Appointments List */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Appointments ({filteredAppointments.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{appointment.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(appointment.preferredDate)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {formatTime(appointment.preferredTime)}
                            </span>
                            <span className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {appointment.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor((appointment as any).status || 'pending')}`}>
                          {(appointment as any).status || 'pending'}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    {appointment.symptoms && (
                      <div className="mt-3 ml-16">
                        <p className="text-sm text-gray-600">
                          <strong>Symptoms:</strong> {appointment.symptoms}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                
                {filteredAppointments.length === 0 && (
                  <div className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No appointments found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Status Distribution */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Status</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.byStatus).map(([status, count]) => (
                    <div key={status} className="flex justify-between items-center">
                      <span className="capitalize text-gray-600">{status}</span>
                      <span className="font-medium">{count as number}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Language Distribution */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Languages</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.byLanguage).map(([lang, count]) => (
                    <div key={lang} className="flex justify-between items-center">
                      <span className="text-gray-600">{lang.toUpperCase()}</span>
                      <span className="font-medium">{count as number}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Severity Distribution */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Severity Levels</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.bySeverity).map(([severity, count]) => (
                    <div key={severity} className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(severity)}`}>
                        {severity.toUpperCase()}
                      </span>
                      <span className="font-medium">{count as number}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Staff Management Tab */}
        {activeTab === 'staff' && (
          <StaffManagement />
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">System Activities</h2>
            
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Staff Activities</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {staffService.getStaffActivities(10).map((activity) => (
                  <div key={activity.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Activity className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-gray-900">{activity.action}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(activity.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{activity.details}</p>
                        <p className="text-sm text-gray-500 mt-2">By: {activity.staffName}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {staffService.getStaffActivities().length === 0 && (
                  <div className="p-8 text-center">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No recent activities</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Appointment Details Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Appointment Details
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong className="text-gray-700">Patient Name:</strong>
                  <p className="text-gray-900">{selectedAppointment.name}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Age:</strong>
                  <p className="text-gray-900">{selectedAppointment.age} years</p>
                </div>
                <div>
                  <strong className="text-gray-700">Phone:</strong>
                  <p className="text-gray-900">{selectedAppointment.phone}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Email:</strong>
                  <p className="text-gray-900">{selectedAppointment.email || 'Not provided'}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Preferred Date:</strong>
                  <p className="text-gray-900">{formatDate(selectedAppointment.preferredDate)}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Preferred Time:</strong>
                  <p className="text-gray-900">{formatTime(selectedAppointment.preferredTime)}</p>
                </div>
              </div>
              
              {selectedAppointment.symptoms && (
                <div>
                  <strong className="text-gray-700">Symptoms:</strong>
                  <p className="text-gray-900 mt-1">{selectedAppointment.symptoms}</p>
                </div>
              )}
              
              <div>
                <strong className="text-gray-700">Language:</strong>
                <p className="text-gray-900">{selectedAppointment.language.toUpperCase()}</p>
              </div>
              
              <div>
                <strong className="text-gray-700">Booked On:</strong>
                <p className="text-gray-900">{new Date(selectedAppointment.timestamp).toLocaleString()}</p>
              </div>
              
              <div>
                <strong className="text-gray-700">Current Status:</strong>
                <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor((selectedAppointment as any).status || 'pending')}`}>
                  {(selectedAppointment as any).status || 'pending'}
                </span>
              </div>
              
              {(selectedAppointment as any).notes && (
                <div>
                  <strong className="text-gray-700">Notes:</strong>
                  <p className="text-gray-900 mt-1">{(selectedAppointment as any).notes}</p>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => handleStatusUpdate(selectedAppointment.id, 'confirmed')}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Confirm</span>
              </button>
              
              <button
                onClick={() => handleStatusUpdate(selectedAppointment.id, 'completed')}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Mark Complete</span>
              </button>
              
              <button
                onClick={() => handleStatusUpdate(selectedAppointment.id, 'cancelled')}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <XCircle className="h-4 w-4" />
                <span>Cancel</span>
              </button>
              
              <a
                href={`tel:${selectedAppointment.phone}`}
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Phone className="h-4 w-4" />
                <span>Call Patient</span>
              </a>
              
              {selectedAppointment.email && (
                <a
                  href={`mailto:${selectedAppointment.email}`}
                  className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Patient</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;