import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaCalendarCheck, FaClock, FaHistory, FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/patients/appointments')
      .then(res => {
        setAppointments(res.data.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading your profile...</div>;

  const upcoming = appointments.filter(a => a.status === 'PENDING' || a.status === 'CONFIRMED' || a.status === 'RESCHEDULED');
  const past = appointments.filter(a => a.status === 'COMPLETED' || a.status === 'CANCELLED');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold">Welcome back, {user?.full_name}!</h2>
        <p className="text-blue-100 text-sm mt-1">Manage your appointments and eye care records.</p>
        <div className="mt-4">
          <Link to="/appointment" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-2.5 rounded-xl shadow-md hover:bg-slate-50 transition">
            <FaPlusCircle /> Book New Appointment
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
            <FaClock className="text-amber-500" /> Upcoming Appointments
          </h3>
          {upcoming.length === 0 ? (
            <p className="text-sm text-slate-500">You have no upcoming appointments.</p>
          ) : (
            <div className="space-y-3">
              {upcoming.map(apt => (
                <div key={apt.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold font-mono text-blue-500">{apt.appointment_no}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      apt.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : 
                      apt.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <p className="font-bold text-slate-800 dark:text-white">{apt.doctor_name}</p>
                  <p className="text-xs text-slate-500">{apt.service_name || 'General Consultation'}</p>
                  <p className="text-sm font-bold text-teal-600 dark:text-teal-400 mt-2">
                    {new Date(apt.appointment_date).toLocaleDateString()} at {apt.appointment_time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
            <FaHistory className="text-blue-500" /> Past Appointments
          </h3>
          {past.length === 0 ? (
            <p className="text-sm text-slate-500">No past history found.</p>
          ) : (
            <div className="space-y-3">
              {past.map(apt => (
                <div key={apt.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 opacity-75">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300">{apt.doctor_name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      apt.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {new Date(apt.appointment_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
