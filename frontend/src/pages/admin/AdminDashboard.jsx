import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import api from '../../services/api';
import { FaCalendarCheck, FaClock, FaCheckCircle, FaCheckDouble, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    today: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats from backend API
      const statsRes = await api.get('/admin/dashboard');
      if (statsRes.data.success) {
        setStats({
          today: statsRes.data.data.today_appt || 0,
          pending: statsRes.data.data.pending_appt || 0,
          confirmed: statsRes.data.data.confirmed_appt || 0,
          completed: statsRes.data.data.completed_appt || 0,
          cancelled: statsRes.data.data.cancelled_appt || 0,
        });
      }

      // Fetch recent appointments using admin API
      const apptRes = await api.get('/admin/appointments');
      if (apptRes.data.success) {
        // Take the top 5 most recent appointments
        const allAppts = apptRes.data.data;
        setRecentAppointments(allAppts.slice(0, 5));
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  const statCards = [
    { label: "Today's Appointments", value: stats.today, icon: FaCalendarCheck, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400', link: '/admin/appointments?filter=today' },
    { label: "Pending", value: stats.pending, icon: FaClock, color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400', link: '/admin/appointments?filter=pending' },
    { label: "Confirmed", value: stats.confirmed, icon: FaCheckCircle, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400', link: '/admin/appointments?filter=confirmed' },
    { label: "Completed", value: stats.completed, icon: FaCheckDouble, color: 'text-teal-600 bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400', link: '/admin/appointments?filter=completed' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Overview</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Here is the latest status of your hospital appointments.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <Link key={idx} to={card.link}>
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-5 cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${card.color}`}>
                <card.icon />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{card.label}</p>
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">{card.value}</h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Appointments</h3>
          <Link to="/admin/appointments" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Patient</th>
                <th className="px-6 py-4 font-bold">Date & Time</th>
                <th className="px-6 py-4 font-bold">Issue</th>
                <th className="px-6 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              {recentAppointments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                    No recent appointments found.
                  </td>
                </tr>
              ) : (
                recentAppointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 dark:text-white">{appt.patient_name || 'Patient #' + (appt.patient_id || 'Unknown')}</p>
                      <p className="text-xs text-slate-500">{appt.patient_phone || '-'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-700 dark:text-slate-300">{new Date(appt.appointment_date).toLocaleDateString()}</p>
                      <p className="text-xs text-slate-500">{appt.appointment_time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600 dark:text-slate-400 line-clamp-1">{appt.symptoms || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        appt.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                        appt.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' :
                        appt.status === 'COMPLETED' ? 'bg-teal-100 text-teal-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
