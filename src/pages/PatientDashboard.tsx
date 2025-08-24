import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  FileText, 
  Calendar, 
  TrendingUp, 
  LogOut,
  Bell,
  Search,
  Filter,
  Eye,
  Download,
  Phone,
  Mail,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Activity,
  Heart,
  Pill,
  Stethoscope
} from 'lucide-react';
import { patientService } from '../services/patientService';
import { Patient, MedicalReport, PatientAppointment } from '../types';

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    const currentPatient = patientService.getCurrentPatient();
    if (!currentPatient) {
      navigate('/patient/login');
      return;
    }
    
    setPatient(currentPatient);
    loadPatientData(currentPatient.id);
  }, [navigate]);

  const loadPatientData = (patientId: string) => {
    const patientReports = patientService.getPatientReports(patientId);
    const patientAppointments = patientService.getPatientAppointments(patientId);
    const patientAnalytics = patientService.getPatientAnalytics(patientId);
    
    setReports(patientReports);
    setAppointments(patientAppointments);
    setAnalytics(patientAnalytics);
  };

  const handleLogout = () => {
    patientService.logoutPatient();
    navigate('/patient/login');
  };

  const handleSearch = () => {
    if (!patient || !searchQuery.trim()) {
      loadPatientData(patient!.id);
      return;
    }
    
    const searchResults = patientService.searchReports(patient.id, searchQuery);
    setReports(searchResults);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 p-2 rounded-full">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Patient Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome, {patient.name}</p>
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
              { id: 'reports', label: 'Medical Reports', icon: FileText },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'profile', label: 'Profile', icon: User }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
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
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Reports</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalReports}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalAppointments}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.upcomingAppointments}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Heart className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Health Score</p>
                    <p className="text-2xl font-bold text-gray-900">Good</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Reports and Upcoming Appointments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Reports */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Medical Reports</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {analytics.recentReports.map((report: MedicalReport) => (
                      <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{report.diagnosis}</p>
                            <p className="text-sm text-gray-600">
                              Dr. {report.doctorName} • {formatDate(report.reportDate)}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(report.severity)}`}>
                          {report.severity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {analytics.upcomingAppointments.map((appointment: PatientAppointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {new Date(appointment.preferredDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              {appointment.preferredTime} • {appointment.doctorName || 'Doctor TBD'}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                    ))}
                    
                    {analytics.upcomingAppointments.length === 0 && (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No upcoming appointments</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medical Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search reports by diagnosis, symptoms, or doctor..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Reports List */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Medical Reports ({reports.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {reports.map((report) => (
                  <div key={report.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Stethoscope className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900">{report.diagnosis}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>Dr. {report.doctorName}</span>
                            <span>{formatDate(report.reportDate)}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(report.severity)}`}>
                              {report.severity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Symptoms:</strong> {report.symptoms}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setShowReportModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {reports.length === 0 && (
                  <div className="p-8 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No medical reports found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  My Appointments ({appointments.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            {new Date(appointment.preferredDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {appointment.preferredTime}
                            </span>
                            <span>{appointment.doctorName || 'Doctor TBD'}</span>
                          </div>
                          {appointment.symptoms && (
                            <p className="text-sm text-gray-600 mt-2">
                              <strong>Symptoms:</strong> {appointment.symptoms}
                            </p>
                          )}
                          {appointment.notes && (
                            <p className="text-sm text-gray-600 mt-1">
                              <strong>Notes:</strong> {appointment.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {appointments.length === 0 && (
                  <div className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No appointments found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{patient.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{patient.age} years</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg capitalize">{patient.gender}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{patient.bloodGroup || 'Not specified'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{patient.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{patient.phone}</p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{patient.address || 'Not specified'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{patient.emergencyContact || 'Not specified'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registered Since</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{formatDate(patient.registeredAt)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Medical Report Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Medical Report Details</h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <strong className="text-gray-700">Diagnosis:</strong>
                  <p className="text-gray-900 mt-1">{selectedReport.diagnosis}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Doctor:</strong>
                  <p className="text-gray-900 mt-1">Dr. {selectedReport.doctorName}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Report Date:</strong>
                  <p className="text-gray-900 mt-1">{formatDate(selectedReport.reportDate)}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Severity:</strong>
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(selectedReport.severity)}`}>
                    {selectedReport.severity}
                  </span>
                </div>
              </div>
              
              <div>
                <strong className="text-gray-700">Symptoms:</strong>
                <p className="text-gray-900 mt-1">{selectedReport.symptoms}</p>
              </div>
              
              <div>
                <strong className="text-gray-700">Prescription:</strong>
                <ul className="mt-1 space-y-1">
                  {selectedReport.prescription.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-900">
                      <Pill className="h-4 w-4 text-blue-600 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <strong className="text-gray-700">Recommendations:</strong>
                <ul className="mt-1 space-y-1">
                  {selectedReport.recommendations.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-900">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {selectedReport.followUpDate && (
                <div>
                  <strong className="text-gray-700">Follow-up Date:</strong>
                  <p className="text-gray-900 mt-1">
                    {new Date(selectedReport.followUpDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowReportModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
              >
                Close
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;