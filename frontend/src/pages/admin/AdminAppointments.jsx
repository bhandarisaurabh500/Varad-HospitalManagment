import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaCalendarAlt, FaCheck, FaTimes, FaSearch, FaClock, FaPhoneAlt, FaEnvelope, FaEye, FaEdit, FaTrash, FaWhatsapp, FaEllipsisV } from 'react-icons/fa';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, PENDING, CONFIRMED, COMPLETED, CANCELLED
  const [search, setSearch] = useState('');
  const [openActionId, setOpenActionId] = useState(null);

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
          patients ( id, users ( full_name, phone, email ) )
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
      setOpenActionId(null);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this appointment?")) return;
    try {
      const { error } = await supabase.from('appointments').delete().eq('id', id);
      if (error) throw error;
      setAppointments(appointments.filter(appt => appt.id !== id));
      setOpenActionId(null);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to delete appointment');
    }
  };

  const handleWhatsApp = (appt) => {
    const rawPhone = appt.patients?.users?.phone || '';
    let phone = rawPhone.replace(/\D/g, ''); // Extract only digits
    if (!phone) return alert('No phone number available.');
    
    // Automatically prepend 91 if it's a 10 digit Indian number
    if (phone.length === 10) phone = '91' + phone;

    const patientName = appt.patients?.users?.full_name || 'Patient';
    const apptDate = new Date(appt.appointment_date).toLocaleDateString();
    const apptTime = appt.appointment_time;
    
    const msg = `Hello ${patientName},\n\nYour appointment at Varad Netralaya is *${appt.status}* on ${apptDate} at ${apptTime}.\n\nThank you!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleEmail = (appt) => {
    const email = appt.patients?.users?.email || '';
    if (!email || email.includes('noemail')) return alert('No valid email address available.');
    
    const patientName = appt.patients?.users?.full_name || 'Patient';
    const apptDate = new Date(appt.appointment_date).toLocaleDateString();
    const apptTime = appt.appointment_time;
    
    const subject = `Varad Netralaya - Appointment ${appt.status}`;
    const body = `Hello ${patientName},\n\nYour appointment at Varad Netralaya is ${appt.status} on ${apptDate} at ${apptTime}.\n\nThank you,\nVarad Netralaya`;
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
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
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <FaPhoneAlt className="text-slate-400 text-[10px]" /> {appt.patients?.users?.phone || '-'}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <FaEnvelope className="text-slate-400 text-[10px]" /> {appt.patients?.users?.email || '-'}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 font-medium bg-slate-100 dark:bg-slate-800 inline-block px-2 py-0.5 rounded">
                          {appt.age ? `${appt.age} yrs` : '-'} • {appt.gender || '-'}
                        </p>
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
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block text-left">
                          <button 
                            onClick={() => setOpenActionId(openActionId === appt.id ? null : appt.id)}
                            className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                          >
                            Actions <FaEllipsisV className="text-xs" />
                          </button>
                          
                          {openActionId === appt.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 py-2">
                              {/* View */}
                              <button 
                                onClick={() => { setOpenActionId(null); alert(`View details for ${appt.appointment_no}\nPatient: ${appt.patients?.users?.full_name}\nSymptoms: ${appt.symptoms}`); }}
                                className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-3"
                              ><FaEye className="text-slate-400" /> View Details</button>
                              
                              <div className="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>

                              {/* Status Updates */}
                              {appt.status !== 'CONFIRMED' && (
                                <button 
                                  onClick={() => updateStatus(appt.id, 'CONFIRMED')}
                                  className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-3"
                                ><FaCheck /> Approve</button>
                              )}
                              {appt.status !== 'CANCELLED' && (
                                <button 
                                  onClick={() => updateStatus(appt.id, 'CANCELLED')}
                                  className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-3"
                                ><FaTimes /> Reject</button>
                              )}
                              {appt.status !== 'PENDING' && (
                                <button 
                                  onClick={() => updateStatus(appt.id, 'PENDING')}
                                  className="w-full px-4 py-2 text-left text-sm text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 flex items-center gap-3"
                                ><FaClock /> Mark Pending</button>
                              )}

                              <div className="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>

                              {/* Comms */}
                              <button 
                                onClick={() => { setOpenActionId(null); handleWhatsApp(appt); }}
                                className="w-full px-4 py-2 text-left text-sm text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 flex items-center gap-3"
                              ><FaWhatsapp /> Send WhatsApp</button>
                              <button 
                                onClick={() => { setOpenActionId(null); handleEmail(appt); }}
                                className="w-full px-4 py-2 text-left text-sm text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 flex items-center gap-3"
                              ><FaEnvelope /> Send Email</button>
                              
                              <div className="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>

                              {/* Edit / Delete */}
                              <button 
                                onClick={() => { setOpenActionId(null); alert('Edit feature is under construction.'); }}
                                className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-3"
                              ><FaEdit className="text-amber-500" /> Edit</button>
                              <button 
                                onClick={() => deleteAppointment(appt.id)}
                                className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-3"
                              ><FaTrash /> Delete</button>
                            </div>
                          )}
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
