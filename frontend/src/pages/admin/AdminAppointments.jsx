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
  const [editAppointmentId, setEditAppointmentId] = useState(null);
  const [editApptForm, setEditApptForm] = useState({ date: '', time: '', symptoms: '' });
  const [submittingEdit, setSubmittingEdit] = useState(false);
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
    // Open window synchronously to avoid popup blockers
    let waWindow = null;
    if (appt && appt.patient_phone) {
      waWindow = window.open('', '_blank');
    }

    try {
      await api.put(`/appointments/${id}/status`, { status: newStatus });
      
      // Update local state
      setAppointments(appointments.map(a => 
        a.id === id ? { ...a, status: newStatus } : a
      ));
      setActionMenuId(null);

      // Navigate the opened window to WhatsApp
      if (waWindow) {
        const rawPhone = appt.patient_phone || '';
        let phone = rawPhone.replace(/\D/g, ''); 
        if (phone.length === 10) phone = '91' + phone;
        
        const patientName = appt.patient_name || 'Patient';
        const apptDate = new Date(appt.appointment_date).toLocaleDateString();
        const apptTime = appt.appointment_time;
        
        const msg = newStatus === 'CONFIRMED' 
          ? `Hello ${patientName},\n\nYour appointment at Varad Netralaya has been *APPROVED* for ${apptDate} at ${apptTime}.\nPlease arrive 10 minutes early.\n\nThank you!`
          : newStatus === 'CANCELLED'
          ? `Hello ${patientName},\n\nWe apologize, but your appointment at Varad Netralaya on ${apptDate} at ${apptTime} has been *REJECTED / CANCELLED*.\nPlease contact us for further details.\n\nThank you!`
          : `Hello ${patientName},\n\nYour appointment at Varad Netralaya is *${newStatus}* on ${apptDate} at ${apptTime}.\n\nThank you!`;
          
        waWindow.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      }
    } catch (error) {
      if (waWindow) waWindow.close();
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`); // Assumes this endpoint exists
      setAppointments(appointments.filter(appt => appt.id !== id));
      setActionMenuId(null);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to delete appointment');
    }
  };

  const handleWhatsApp = (appt, specificStatus = null) => {
    const rawPhone = appt.patient_phone || '';
    let phone = rawPhone.replace(/\D/g, ''); // Extract only digits
    if (!phone) return alert('No phone number available.');
    
    // Automatically prepend 91 if it's a 10 digit Indian number
    if (phone.length === 10) phone = '91' + phone;

    const patientName = appt.patient_name || 'Patient';
    const apptDate = new Date(appt.appointment_date).toLocaleDateString();
    const apptTime = appt.appointment_time;
    const status = specificStatus || appt.status;
    
    const msg = status === 'CONFIRMED' 
      ? `Hello ${patientName},\n\nYour appointment at Varad Netralaya has been *APPROVED* for ${apptDate} at ${apptTime}.\nPlease arrive 10 minutes early.\n\nThank you!`
      : status === 'CANCELLED'
      ? `Hello ${patientName},\n\nWe apologize, but your appointment at Varad Netralaya on ${apptDate} at ${apptTime} has been *REJECTED / CANCELLED*.\nPlease contact us for further details.\n\nThank you!`
      : `Hello ${patientName},\n\nYour appointment at Varad Netralaya is *${status}* on ${apptDate} at ${apptTime}.\n\nThank you!`;
      
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleEditClick = (appt) => {
    setEditAppointmentId(appt.id);
    setEditApptForm({
      date: appt.appointment_date ? new Date(appt.appointment_date).toISOString().split('T')[0] : '',
      time: appt.appointment_time || '',
      symptoms: appt.symptoms || ''
    });
  };

  const handleSaveEdit = async () => {
    try {
      setSubmittingEdit(true);
      await api.put(`/appointments/${editAppointmentId}/reschedule`, {
        appointment_date: editApptForm.date,
        appointment_time: editApptForm.time,
        symptoms: editApptForm.symptoms
      });
      // Refresh local state without refetching everything
      setAppointments(appointments.map(a => 
        a.id === editAppointmentId ? { 
          ...a, 
          appointment_date: editApptForm.date, 
          appointment_time: editApptForm.time, 
          symptoms: editApptForm.symptoms 
        } : a
      ));
      setEditAppointmentId(null);
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update appointment details.');
    } finally {
      setSubmittingEdit(false);
    }
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
            {/* Table Code Omitted for Brevity (unchanged) */}
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
                        <div className="flex justify-end gap-2 items-center flex-wrap max-w-[280px] ml-auto">
                          <button 
                            onClick={() => navigate(`/admin/patients/${appt.patient_id}`)}
                            className="h-8 px-3.5 flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all outline-none text-xs font-semibold"
                            title="View Patient Details"
                          ><FaEye /> <span>View</span></button>
                          
                          <button 
                            onClick={() => navigate(`/admin/patients/${appt.patient_id}?tab=medical`)}
                            className="h-8 px-3.5 flex items-center justify-center gap-1.5 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/40 rounded-lg transition-all outline-none text-xs font-semibold"
                            title="Medical & Prescriptions"
                          ><FaStethoscope /> <span>Medical</span></button>

                          {appt.status === 'PENDING' && (
                            <>
                              <button 
                                onClick={() => updateStatus(appt.id, 'CONFIRMED', appt)}
                                className="h-8 px-4 flex items-center justify-center gap-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition-all outline-none text-xs font-bold"
                                title="Approve Appointment"
                              ><FaCheck /> <span>Approve</span></button>

                              <button 
                                onClick={() => updateStatus(appt.id, 'CANCELLED', appt)}
                                className="h-8 px-3 flex items-center justify-center gap-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-all outline-none text-xs font-semibold"
                                title="Reject Appointment"
                              ><FaTimes /> <span>Reject</span></button>
                            </>
                          )}
                          
                          <div className="flex items-center gap-1 ml-1 pl-2 border-l border-slate-200 dark:border-slate-700">
                            <button 
                              onClick={() => handleEditClick(appt)}
                              className="h-8 px-2.5 flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all outline-none text-xs font-semibold"
                              title="Edit Booking"
                            ><FaEdit /> <span>Edit</span></button>
                            
                            <button 
                              onClick={() => deleteAppointment(appt.id)}
                              className="h-8 px-2.5 flex items-center justify-center gap-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all outline-none text-xs font-semibold"
                              title="Delete Booking"
                            ><FaTrash /> <span>Delete</span></button>
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

      {editAppointmentId && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <FaEdit className="text-blue-600" /> Edit Appointment
              </h3>
              <button onClick={() => setEditAppointmentId(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><FaTimes size={18}/></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Appointment Date</label>
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  value={editApptForm.date} 
                  onChange={e => setEditApptForm({...editApptForm, date: e.target.value})} 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Appointment Time</label>
                <select 
                  value={editApptForm.time?.substring(0, 5) || ''} 
                  onChange={e => setEditApptForm({...editApptForm, time: e.target.value})} 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                >
                  <option value="" disabled>Select Time</option>
                  {(() => {
                    const now = new Date();
                    const today = now.toLocaleDateString('en-CA'); // YYYY-MM-DD
                    const isToday = editApptForm.date === today;
                    const currentTimeStr = now.toTimeString().substring(0, 5);

                    const timeSlots = [
                      { label: '🌅 Morning', options: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'] },
                      { label: '☀️ Afternoon', options: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30'] },
                      { label: '🌆 Evening', options: ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'] }
                    ];

                    const formatAMPM = (timeStr) => {
                      let [h, m] = timeStr.split(':');
                      let period = 'AM';
                      if (h >= 12) { period = 'PM'; if (h > 12) h -= 12; }
                      return `${parseInt(h)}:${m} ${period}`;
                    };

                    return timeSlots.map(group => (
                      <optgroup key={group.label} label={group.label}>
                        {group.options.map(time => {
                          const isPast = isToday && time <= currentTimeStr;
                          return (
                            <option key={time} value={time} disabled={isPast}>
                              {formatAMPM(time)} {isPast ? '(Passed)' : ''}
                            </option>
                          );
                        })}
                      </optgroup>
                    ));
                  })()}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Issue / Symptoms</label>
                <textarea 
                  value={editApptForm.symptoms} 
                  onChange={e => setEditApptForm({...editApptForm, symptoms: e.target.value})} 
                  rows="3" 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
            </div>
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setEditAppointmentId(null)}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveEdit}
                disabled={submittingEdit || (
                  (appointments.find(a => a.id === editAppointmentId)?.appointment_date?.split('T')[0] || '') === editApptForm.date &&
                  (appointments.find(a => a.id === editAppointmentId)?.appointment_time || '') === editApptForm.time &&
                  (appointments.find(a => a.id === editAppointmentId)?.symptoms || '') === editApptForm.symptoms
                )}
                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submittingEdit ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
