import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FaCalendarCheck, FaUserInjured, FaCheckCircle, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/doctor/dashboard')
      .then(res => {
        setStats(res.data.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading doctor stats...</div>;

  const statCards = [
    { label: "Today's Appointments", value: stats?.today_appt || 0, icon: FaClock, color: 'bg-amber-500', link: '/doctor/appointments' },
    { label: 'Upcoming Appointments', value: stats?.upcoming_appt || 0, icon: FaCalendarCheck, color: 'bg-blue-500', link: '/doctor/appointments' },
    { label: 'Total Unique Patients', value: stats?.total_patients || 0, icon: FaUserInjured, color: 'bg-teal-500', link: '/doctor/patients' },
    { label: 'Completed Consultations', value: stats?.completed || 0, icon: FaCheckCircle, color: 'bg-emerald-500', link: '/doctor/medical-records' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Doctor Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <Link key={idx} to={card.link} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl text-white flex items-center justify-center text-2xl ${card.color}`}>
              <card.icon />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">{card.label}</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">{card.value}</h3>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/50">
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">Quick Actions</h3>
        <div className="flex flex-wrap gap-4 mt-4">
          <Link to="/doctor/ai-scanner" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700">Open AI Document Scanner</Link>
          <Link to="/doctor/appointments" className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl shadow-sm border border-blue-200 hover:bg-blue-50">View Today's Schedule</Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
