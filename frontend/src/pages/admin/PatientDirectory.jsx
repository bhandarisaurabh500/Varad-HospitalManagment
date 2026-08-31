import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FaSearch, FaUser, FaPhoneAlt, FaCalendarAlt, FaStethoscope, FaEye, FaTrash } from 'react-icons/fa';

const PatientDirectory = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/patients');
      if (res.data.success) {
        setPatients(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePatient = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this patient and all associated records? This cannot be undone.")) return;
    try {
      await api.delete(`/admin/patients/${id}`);
      setPatients(patients.filter(p => p.patient_id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Failed to delete patient');
    }
  };

  // Optional: implement debounced search through API if data gets large, 
  // but client-side filtering works for now as fallback.
  const filteredPatients = patients.filter(p => {
    const s = search.toLowerCase();
    const name = (p.full_name || '').toLowerCase();
    const phone = p.phone || '';
    const uid = (p.patient_uid || '').toLowerCase();
    return name.includes(s) || phone.includes(s) || uid.includes(s);
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Patient Directory</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage and search all registered patients.</p>
        </div>
        
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Name, UHID, Phone..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full"
          />
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
                  <th className="px-6 py-4 font-bold">Patient ID</th>
                  <th className="px-6 py-4 font-bold">Name & Details</th>
                  <th className="px-6 py-4 font-bold">Last Visit</th>
                  <th className="px-6 py-4 font-bold text-center">Visits</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                      <FaUser className="mx-auto text-4xl mb-3 text-slate-300 dark:text-slate-700" />
                      <p>No patients found.</p>
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient.patient_id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded inline-block">
                          {patient.patient_uid || '-'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline" onClick={() => navigate(`/admin/patients/${patient.patient_id}`)}>
                          {patient.full_name}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <FaPhoneAlt className="text-[10px] text-slate-400" /> {patient.phone || 'No Phone'}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 font-medium bg-slate-100 dark:bg-slate-800 inline-block px-2 py-0.5 rounded">
                          {patient.age ? `${patient.age} yrs` : 'Age N/A'} • {patient.gender || 'N/A'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <FaCalendarAlt className="text-slate-400" /> 
                          {patient.last_visit ? new Date(patient.last_visit).toLocaleDateString() : <span className="text-slate-400 italic text-xs">No visits</span>}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                          {patient.total_visits || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 items-center">
                          <button 
                            onClick={() => navigate(`/admin/patients/${patient.patient_id}`)}
                            className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 rounded-md transition-colors flex items-center gap-1.5"
                          ><FaEye /> Profile</button>
                          
                          <button 
                            onClick={() => deletePatient(patient.patient_id)}
                            className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 rounded-md transition-colors flex items-center gap-1.5"
                          ><FaTrash /> Delete</button>
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

export default PatientDirectory;
