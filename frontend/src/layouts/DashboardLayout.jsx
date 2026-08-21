import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaTachometerAlt, FaCalendarCheck, FaUserMd,
  FaConciergeBell, FaMicroscope, FaImages,
  FaInfoCircle, FaShieldAlt, FaStar, FaCog, FaSignOutAlt, 
  FaBars, FaEye, FaHospital, FaHeartbeat
} from 'react-icons/fa';

const adminLinks = [
  { to: '/admin/dashboard',          label: 'Dashboard',           icon: FaTachometerAlt },
  { to: '/admin/appointments',       label: 'Appointments',        icon: FaCalendarCheck },
  { to: '/admin/profile',            label: 'Doctor Profile',      icon: FaUserMd },
  { to: '/admin/services',           label: 'Eye Care / Services', icon: FaConciergeBell },
  { to: '/admin/advanced-equipment', label: 'Advanced Equipment',  icon: FaMicroscope },
  { to: '/admin/gallery',            label: 'Gallery',             icon: FaImages },
  { to: '/admin/patient-information',label: 'Patient Information', icon: FaInfoCircle },
  { to: '/admin/guidelines',         label: 'Guidelines',          icon: FaHeartbeat },
  { to: '/admin/insurance',          label: 'Insurance / TPA',     icon: FaShieldAlt },
  { to: '/admin/reviews',            label: 'Reviews',             icon: FaStar },
  { to: '/admin/settings',           label: 'Settings',            icon: FaCog },
];

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // We are treating all authenticated users as the Admin/Doctor
  const roleLabel = 'Doctor Administration';

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
            <p className="font-bold text-sm text-white leading-none">Dr. R.K. Borude</p>
            <p className="text-xs text-teal-400 mt-1">{roleLabel}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {adminLinks.map(({ to, label, icon: Icon }) => {
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
              D
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.email || 'Dr. R.K. Borude'}</p>
              <p className="text-[10px] text-teal-400 truncate">Administrator</p>
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
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full overflow-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FaBars />
          </button>
          <h1 className="text-slate-800 dark:text-white font-bold text-lg flex-1 truncate">
            {adminLinks.find(l => l.to === location.pathname)?.label || 'Dashboard'}
          </h1>
          <span className="text-xs font-bold text-teal-600 bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
            Secure Mode
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
