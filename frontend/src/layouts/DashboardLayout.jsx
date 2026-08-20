import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaTachometerAlt, FaCalendarCheck, FaUserInjured, FaUserMd,
  FaConciergeBell, FaNotesMedical, FaRobot, FaImages,
  FaStar, FaEnvelope, FaCog, FaSignOutAlt, FaBars, FaTimes,
  FaEye, FaHospital
} from 'react-icons/fa';

const adminLinks = [
  { to: '/admin/dashboard',        label: 'Dashboard',        icon: FaTachometerAlt },
  { to: '/admin/doctors',          label: 'Doctors',          icon: FaUserMd },
  { to: '/admin/patients',         label: 'Patients',         icon: FaUserInjured },
  { to: '/admin/appointments',     label: 'Appointments',     icon: FaCalendarCheck },
  { to: '/admin/services',         label: 'Services',         icon: FaConciergeBell },
  { to: '/admin/medical-records',  label: 'Medical Records',  icon: FaNotesMedical },
  { to: '/admin/ai-scanner',       label: 'AI Scanner',       icon: FaRobot },
  { to: '/admin/gallery',          label: 'Gallery',          icon: FaImages },
  { to: '/admin/reviews',          label: 'Reviews',          icon: FaStar },
  { to: '/admin/messages',         label: 'Contact Messages', icon: FaEnvelope },
];

const doctorLinks = [
  { to: '/doctor/dashboard',       label: 'Dashboard',        icon: FaTachometerAlt },
  { to: '/doctor/appointments',    label: 'Appointments',     icon: FaCalendarCheck },
  { to: '/doctor/patients',        label: 'Patients',         icon: FaUserInjured },
  { to: '/doctor/medical-records', label: 'Medical Records',  icon: FaNotesMedical },
  { to: '/doctor/ai-scanner',      label: 'AI Scanner',       icon: FaRobot },
];

const patientLinks = [
  { to: '/patient/dashboard',      label: 'Dashboard',        icon: FaTachometerAlt },
  { to: '/patient/appointments',   label: 'My Appointments',  icon: FaCalendarCheck },
  { to: '/patient/profile',        label: 'My Profile',       icon: FaUserInjured },
];

const DashboardLayout = ({ children }) => {
  const { user, logout, isAdmin, isDoctor } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = isAdmin() ? adminLinks : isDoctor() ? doctorLinks : patientLinks;
  const roleLabel = isAdmin() ? 'Admin Panel' : isDoctor() ? 'Doctor Portal' : 'Patient Portal';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Brand */}
        <div className="flex items-center gap-3 p-5 border-b border-slate-700">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
            <FaEye className="text-white text-lg" />
          </div>
          <div>
            <p className="font-bold text-sm text-white leading-none">Varad Netralaya</p>
            <p className="text-xs text-teal-400">{roleLabel}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
              >
                <Icon className="text-base flex-shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom: User + Logout */}
        <div className="p-4 border-t border-slate-700 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {user?.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.full_name}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.role}</p>
            </div>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition"
          >
            <FaHospital /> View Website
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-rose-400 hover:text-white hover:bg-rose-600 text-xs transition font-medium"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FaBars />
          </button>
          <h1 className="text-slate-800 dark:text-white font-bold text-lg flex-1">
            {links.find(l => l.to === location.pathname)?.label || roleLabel}
          </h1>
          <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {user?.role}
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
