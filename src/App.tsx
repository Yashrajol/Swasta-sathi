import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import VoiceAssistant from './pages/VoiceAssistant';
import AppointmentPage from './pages/AppointmentPage';
import AppointmentsPage from './pages/AppointmentsPage';
import AboutPage from './pages/AboutPage';
import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientLogin from './pages/PatientLogin';
import PatientDashboard from './pages/PatientDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/voice" element={<VoiceAssistant />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/doctor/login" element={<DoctorLogin />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/patient/login" element={<PatientLogin />} />
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;