import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Appointment from './pages/Appointment';
import HospitalInformation from './pages/HospitalInformation';
import AdvancedEquipment from './pages/AdvancedEquipment';
import PatientHealthcare from './pages/PatientHealthcare';
// Dashboards
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminGuidelines from './pages/admin/AdminGuidelines';
import AdminSettings from './pages/admin/AdminSettings';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientDashboard from './pages/patient/PatientDashboard';
import AIScanner from './components/dashboard/AIScanner';

// Dummy wrapper for missing pages (so router works)
const Placeholder = ({ title }) => (
  <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-slate-500">This page is working but UI is under construction.</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 overflow-x-hidden selection:bg-blue-600 selection:text-white">
            <Routes>
              {/* Public Routes with Navbar/Footer */}
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/hospital-information" element={<PublicLayout><HospitalInformation /></PublicLayout>} />
              <Route path="/advanced-equipment" element={<PublicLayout><AdvancedEquipment /></PublicLayout>} />
              <Route path="/patient-healthcare" element={<PublicLayout><PatientHealthcare /></PublicLayout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/appointment" element={<PublicLayout><Appointment /></PublicLayout>} />

              {/* Admin Routes */}
              <Route path="/admin/*" element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="appointments" element={<AdminAppointments />} />
                      <Route path="guidelines" element={<AdminGuidelines />} />
                      <Route path="profile" element={<Placeholder title="Doctor Profile" />} />
                      <Route path="services" element={<Placeholder title="Eye Care / Services" />} />
                      <Route path="advanced-equipment" element={<Placeholder title="Advanced Equipment" />} />
                      <Route path="gallery" element={<Placeholder title="Manage Gallery" />} />
                      <Route path="patient-information" element={<Placeholder title="Patient Information" />} />
                      <Route path="insurance" element={<Placeholder title="Insurance / TPA" />} />
                      <Route path="reviews" element={<Placeholder title="Manage Reviews" />} />
                      <Route path="settings" element={<AdminSettings />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </DashboardLayout>
                </PrivateRoute>
              } />

              {/* Doctor Routes */}
              <Route path="/doctor/*" element={
                <PrivateRoute roles={['DOCTOR']}>
                  <DashboardLayout>
                    <Routes>
                      <Route path="dashboard" element={<DoctorDashboard />} />
                      <Route path="appointments" element={<Placeholder title="My Appointments" />} />
                      <Route path="patients" element={<Placeholder title="My Patients" />} />
                      <Route path="medical-records" element={<Placeholder title="Medical Records" />} />
                      <Route path="ai-scanner" element={<AIScanner />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </DashboardLayout>
                </PrivateRoute>
              } />

              {/* Patient Routes */}
              <Route path="/patient/*" element={
                <PrivateRoute roles={['PATIENT']}>
                  <DashboardLayout>
                    <Routes>
                      <Route path="dashboard" element={<PatientDashboard />} />
                      <Route path="appointments" element={<Placeholder title="My Appointments History" />} />
                      <Route path="profile" element={<Placeholder title="My Profile" />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </DashboardLayout>
                </PrivateRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
