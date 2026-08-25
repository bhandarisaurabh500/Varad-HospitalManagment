import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import api from '../../services/api';
import { FaCalendarAlt, FaCheck, FaTimes, FaSearch, FaClock, FaPhoneAlt, FaEnvelope, FaEye, FaEdit, FaTrash, FaWhatsapp, FaEllipsisV, FaStethoscope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, PENDING, CONFIRMED, COMPLETED, CANCELLED
  const [search, setSearch] = useState('');
  const [actionMenuId, setActionMenuId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Use API instead of Supabase directly to get advanced joins like last_visit and patient_uid
      const res = await api.get('/admin/appointments');
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus, appt) => {
    try {
      await api.put(`/appointments/${id}/status`, { status: newStatus });
      
      // Update local state
      setAppointments(appointments.map(a => 
        a.id === id ? { ...a, status: newStatus } : a
      ));
      setActionMenuId(null);

      if (newStatus === 'CONFIRMED' && appt) {
        handleWhatsApp(appt);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this appointment?")) return;
    try {
      await api.delete(`/appointments/${id}`); // Assumes this endpoint exists
      setAppointments(appointments.filter(appt => appt.id !== id));
      setActionMenuId(null);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to delete appointment');
    }
  };

  const handleWhatsApp = (appt) => {
    const rawPhone = appt.patient_phone || '';
    let phone = rawPhone.replace(/\D/g, ''); // Extract only digits
    if (!phone) return alert('No phone number available.');
    
    // Automatically prepend 91 if it's a 10 digit Indian number
    if (phone.length === 10) phone = '91' + phone;

    const patientName = appt.patient_name || 'Patient';
    const apptDate = new Date(appt.appointment_date).toLocaleDateString();
    const apptTime = appt.appointment_time;
    
    const msg = `Hello ${patientName},\n\nYour appointment at Varad Netralaya is *${appt.status}* on ${apptDate} at ${apptTime}.\n\nThank you!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filteredAppointments = appointments.filter(appt => {
    const matchesFilter = filter === 'ALL' || appt.status === filter;
    const searchString = search.toLowerCase();
    const patientName = (appt.patient_name || '').toLowerCase();
    const phone = appt.patient_phone || '';
    const apptNo = (appt.appointment_no || '').toLowerCase();
    const patientUid = (appt.patient_uid || '').toLowerCase();
    
    const matchesSearch = patientName.includes(searchString) || phone.includes(searchString) || apptNo.includes(searchString) || patientUid.includes(searchString);
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
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
              placeholder="Search patient, ID, phone, appt ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-72"
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

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-visible">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-visible">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 font-bold min-w-[150px]">Appointment</th>
                  <th className="px-6 py-4 font-bold min-w-[200px]">Patient</th>
                  <th className="px-6 py-4 font-bold min-w-[150px]">Issue & Last Visit</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right min-w-[300px]">Actions</th>
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
                        <p className="font-bold text-blue-600 dark:text-blue-400">#{appt.appointment_no}</p>
                        <p className="font-semibold text-slate-800 dark:text-white mt-1">
                          {new Date(appt.appointment_date).toLocaleDateString()}
                        </p>
                        <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                          <FaClock className="text-slate-400" /> {appt.appointment_time}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900 dark:text-white cursor-pointer hover:text-blue-600" onClick={() => navigate(`/admin/patients/${appt.patient_id}`)}>
                          {appt.patient_name || 'Patient #' + (appt.patient_id || 'Unknown')}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 font-mono bg-slate-100 dark:bg-slate-800 inline-block px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                          {appt.patient_uid}
                        </p>
                        <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                          <FaPhoneAlt className="text-slate-400 text-[10px]" /> {appt.patient_phone || '-'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-700 dark:text-slate-300 text-sm line-clamp-2 mb-2 font-medium">
                          {appt.symptoms || 'No issue provided'}
                        </p>
                        <p className="text-xs text-slate-500 flex flex-col gap-0.5">
                          <span className="uppercase tracking-wider text-[10px] font-bold text-slate-400">Last Visit:</span> 
                          {appt.last_visit ? (
                            <span className="text-slate-600 dark:text-slate-400">{new Date(appt.last_visit).toLocaleDateString()}</span>
                          ) : (
                            <span className="text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/30 px-1.5 rounded w-max">NEW PATIENT</span>
                          )}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                            appt.status === 'PENDING' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                            appt.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                            appt.status === 'COMPLETED' ? 'bg-teal-100 text-teal-700 border border-teal-200' :
                            appt.status === 'CANCELLED' ? 'bg-slate-100 text-slate-600 border border-slate-200' :
                            'bg-red-100 text-red-700 border border-red-200'
                          }`}>
                            {appt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1.5 items-center relative">
                          <button 
                            onClick={() => navigate(`/admin/patients/${appt.patient_id}`)}
                            className="px-2.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5"
                            title="View Patient"
                          ><FaEye /> View</button>
                          
                          {appt.status === 'PENDING' && (
                            <button 
                              onClick={() => updateStatus(appt.id, 'CONFIRMED', appt)}
                              className="px-2.5 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold hover:bg-blue-200 rounded-md transition-colors flex items-center gap-1.5"
                              title="Approve"
                            ><FaCheck /> Approve</button>
                          )}

                          <button 
                            onClick={() => navigate(`/admin/patients/${appt.patient_id}?tab=medical`)}
                            className="px-2.5 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold hover:bg-teal-100 rounded-md transition-colors flex items-center gap-1.5 border border-teal-200"
                            title="Medical & Prescriptions"
                          ><FaStethoscope /> Medical</button>

                          <div className="relative">
                            <button 
                              onClick={() => setActionMenuId(actionMenuId === appt.id ? null : appt.id)}
                              className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded transition-colors"
                            ><FaEllipsisV /></button>
                            
                            {actionMenuId === appt.id && (
                              <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-50 py-1 text-left">
                                {appt.status !== 'PENDING' && (
                                  <button onClick={() => updateStatus(appt.id, 'PENDING')} className="w-full px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 text-left font-medium">Mark Pending</button>
                                )}
                                {appt.status !== 'CANCELLED' && (
                                  <button onClick={() => updateStatus(appt.id, 'CANCELLED')} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left font-medium">Reject</button>
                                )}
                                <button onClick={() => handleWhatsApp(appt)} className="w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50 text-left font-medium">WhatsApp</button>
                                <hr className="border-slate-100 dark:border-slate-700 my-1"/>
                                <button onClick={() => alert('Edit under construction')} className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 text-left">Edit</button>
                                <button onClick={() => deleteAppointment(appt.id)} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left">Delete</button>
                              </div>
                            )}
                          </div>
                        </div>
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
