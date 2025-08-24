import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Trash2, Eye } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { appointmentService } from '../services/appointmentService';
import type { Appointment } from '../types';

const AppointmentsPage: React.FC = () => {
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const allAppointments = appointmentService.getAppointments();
    // Sort by timestamp (newest first)
    allAppointments.sort((a, b) => b.timestamp - a.timestamp);
    setAppointments(allAppointments);
  };

  const handleDeleteAppointment = (id: string) => {
    const updated = appointments.filter(apt => apt.id !== id);
    localStorage.setItem('swasthya-appointments', JSON.stringify(updated));
    setAppointments(updated);
  };

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('navigation.appointments')}
          </h1>
          <p className="text-gray-600">
            View and manage your healthcare appointments
          </p>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Appointments Yet
            </h2>
            <p className="text-gray-600 mb-4">
              You haven't booked any appointments yet. Start by talking to our voice assistant.
            </p>
            <a
              href="/voice"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Book Appointment</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {appointment.name}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    Age: {appointment.age}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {formatDate(appointment.preferredDate)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {formatTime(appointment.preferredTime)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {appointment.phone}
                    </span>
                  </div>
                </div>

                {appointment.symptoms && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      <strong>Symptoms:</strong> {appointment.symptoms}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Booked: {new Date(appointment.timestamp).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(appointment)}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for appointment details */}
        {showModal && selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Appointment Details
              </h3>
              
              <div className="space-y-3">
                <div>
                  <strong className="text-gray-700">Name:</strong>
                  <p className="text-gray-900">{selectedAppointment.name}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Age:</strong>
                  <p className="text-gray-900">{selectedAppointment.age}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Phone:</strong>
                  <p className="text-gray-900">{selectedAppointment.phone}</p>
                </div>
                {selectedAppointment.email && (
                  <div>
                    <strong className="text-gray-700">Email:</strong>
                    <p className="text-gray-900">{selectedAppointment.email}</p>
                  </div>
                )}
                <div>
                  <strong className="text-gray-700">Preferred Date:</strong>
                  <p className="text-gray-900">{formatDate(selectedAppointment.preferredDate)}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Preferred Time:</strong>
                  <p className="text-gray-900">{formatTime(selectedAppointment.preferredTime)}</p>
                </div>
                {selectedAppointment.symptoms && (
                  <div>
                    <strong className="text-gray-700">Symptoms:</strong>
                    <p className="text-gray-900">{selectedAppointment.symptoms}</p>
                  </div>
                )}
                <div>
                  <strong className="text-gray-700">Language:</strong>
                  <p className="text-gray-900">{selectedAppointment.language}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;