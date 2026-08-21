import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaCalendarAlt, FaCheck, FaTimes, FaSearch, FaClock } from 'react-icons/fa';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, PENDING, CONFIRMED, COMPLETED, CANCELLED
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id, appointment_no, appointment_date, appointment_time, status, symptoms, age, gender,
          patients ( id, users ( full_name, phone ) )
        `)
        .order('appointment_date', { ascending: false })
        .order('appointment_time', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setAppointments(appointments.map(appt => 
        appt.id === id ? { ...appt, status: newStatus } : appt
      ));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const filteredAppointments = appointments.filter(appt => {
    const matchesFilter = filter === 'ALL' || appt.status === filter;
    const searchString = search.toLowerCase();
    const patientName = appt.patients?.users?.full_name?.toLowerCase() || '';
    const phone = appt.patients?.users?.phone || '';
    const apptNo = appt.appointment_no?.toLowerCase() || '';
    
    const matchesSearch = patientName.includes(searchString) || phone.includes(searchString) || apptNo.includes(searchString);
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Appointments</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage and track all patient appointments.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search patient, phone, ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-64"
            />
          </div>
          
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 font-bold">Appointment Info</th>
                  <th className="px-6 py-4 font-bold">Patient Details</th>
                  <th className="px-6 py-4 font-bold">Issue / Symptoms</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                      <FaCalendarAlt className="mx-auto text-4xl mb-3 text-slate-300 dark:text-slate-700" />
                      <p>No appointments found matching your criteria.</p>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800 dark:text-white">#{appt.appointment_no}</p>
                        <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
                          <FaCalendarAlt className="text-slate-400" /> {new Date(appt.appointment_date).toLocaleDateString()}
                        </p>
                        <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
                          <FaClock className="text-slate-400" /> {appt.appointment_time}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900 dark:text-white">{appt.patients?.users?.full_name || 'Patient #' + (appt.patients?.id || 'Unknown')}</p>
                        <p className="text-xs text-slate-500 mt-1">{appt.patients?.users?.phone || '-'}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{appt.age ? `${appt.age} yrs` : '-'} • {appt.gender || '-'}</p>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">{appt.symptoms || 'No details provided'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                          appt.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                          appt.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' :
                          appt.status === 'COMPLETED' ? 'bg-teal-100 text-teal-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {appt.status === 'PENDING' && (
                          <>
                            <button 
                              onClick={() => updateStatus(appt.id, 'CONFIRMED')}
                              className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors"
                              title="Confirm"
                            >
                              <FaCheck />
                            </button>
                            <button 
                              onClick={() => updateStatus(appt.id, 'CANCELLED')}
                              className="p-2 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-lg transition-colors"
                              title="Cancel"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                        {appt.status === 'CONFIRMED' && (
                          <button 
                            onClick={() => updateStatus(appt.id, 'COMPLETED')}
                            className="p-2 bg-teal-100 text-teal-600 hover:bg-teal-200 rounded-lg transition-colors font-bold text-xs"
                            title="Mark Completed"
                          >
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;
