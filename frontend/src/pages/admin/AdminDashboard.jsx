import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FaUserMd, FaUserInjured, FaCalendarCheck, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(res => {
        setStats(res.data.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading admin stats...</div>;

  const statCards = [
    { label: 'Total Doctors', value: stats?.total_doctors || 0, icon: FaUserMd, color: 'bg-blue-500', link: '/admin/doctors' },
    { label: 'Total Patients', value: stats?.total_patients || 0, icon: FaUserInjured, color: 'bg-teal-500', link: '/admin/patients' },
    { label: "Today's Appts", value: stats?.today_appt || 0, icon: FaCalendarCheck, color: 'bg-amber-500', link: '/admin/appointments?date=today' },
    { label: 'Unread Messages', value: stats?.unread_msgs || 0, icon: FaEnvelope, color: 'bg-rose-500', link: '/admin/messages' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Admin Overview</h2>
      
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
           <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Appointment Status</h3>
           <div className="space-y-3 text-sm">
             <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
               <span className="text-slate-600 dark:text-slate-300">Pending</span>
               <span className="font-bold text-amber-500">{stats?.pending_appt || 0}</span>
             </div>
             <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
               <span className="text-slate-600 dark:text-slate-300">Confirmed</span>
               <span className="font-bold text-blue-500">{stats?.confirmed_appt || 0}</span>
             </div>
             <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
               <span className="text-slate-600 dark:text-slate-300">Completed</span>
               <span className="font-bold text-emerald-500">{stats?.completed_appt || 0}</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
