import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaCheck, FaTrash, FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await api.get('/leads');
      setLeads(res.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'contacted' : 'pending';
    try {
      await api.put(`/leads/${id}`, { status: newStatus });
      toast.success(`Lead marked as ${newStatus}`);
      fetchLeads();
    } catch (error) {
      toast.error('Failed to update lead status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/leads/${id}`);
      toast.success('Lead deleted');
      fetchLeads();
    } catch (error) {
      toast.error('Failed to delete lead');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Incomplete Bookings (Leads)</h1>
          <p className="text-slate-500 dark:text-slate-400">Patients who started booking but didn't finish</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Details Captured</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500 flex justify-center items-center gap-2">
                    <FaSpinner className="animate-spin text-blue-500" /> Loading leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No leads found</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={lead.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">
                      {lead.patient_name || 'Unknown'}
                      <div className="text-xs text-slate-400">{new Date(lead.updated_at).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-blue-600 dark:text-teal-400 hover:underline">
                        <FaPhoneAlt className="text-xs" /> {lead.phone}
                      </a>
                      {lead.email && <div className="text-xs text-slate-500 mt-1">{lead.email}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs space-y-1">
                        {lead.form_data?.doctor && <div><span className="font-semibold">Doc:</span> {lead.form_data.doctor}</div>}
                        {lead.form_data?.preferredDate && <div><span className="font-semibold">Date:</span> {lead.form_data.preferredDate}</div>}
                        {lead.form_data?.treatment && <div><span className="font-semibold">Treat:</span> {lead.form_data.treatment}</div>}
                        {lead.form_data?.symptoms && <div><span className="font-semibold">Symp:</span> {lead.form_data.symptoms}</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        lead.status === 'contacted' 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {lead.status === 'contacted' ? 'Contacted' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleUpdateStatus(lead.id, lead.status)}
                          className={`p-2 rounded-lg transition-colors ${
                            lead.status === 'contacted' 
                              ? 'text-amber-600 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 dark:text-amber-400'
                              : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 dark:text-emerald-400'
                          }`}
                          title={lead.status === 'contacted' ? "Mark as Pending" : "Mark as Contacted"}
                        >
                          {lead.status === 'contacted' ? 'Undo' : <FaCheck />}
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 dark:text-rose-400 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLeads;
