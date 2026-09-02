import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import insuranceService from '../../services/insuranceService';
import { supabase } from '../../lib/supabase';
import { FaTrash } from 'react-icons/fa';

function AdminInsurance() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('claims'); // claims, policies, providers
  
  const [claims, setClaims] = useState([]);
  const [providers, setProviders] = useState([]);
  const [patients, setPatients] = useState([]);
  
  const [loading, setLoading] = useState(true);

  // Forms state
  const [newProvider, setNewProvider] = useState({ provider_name: '', contact_email: '', contact_phone: '' });
  const [newClaim, setNewClaim] = useState({ patient_id: '', provider_id: '', appointment_id: null, amount_claimed: '', claim_date: new Date().toISOString().split('T')[0], notes: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [claimsRes, providersRes, { data: patientsData }] = await Promise.all([
        insuranceService.getAllClaims(),
        insuranceService.getProviders(),
        supabase.from('patients').select('id, users(full_name)')
      ]);
      setClaims(claimsRes.claims || []);
      setProviders(providersRes.providers || []);
      
      const formattedPatients = (patientsData || []).map(p => ({
        id: p.id,
        full_name: p.users?.full_name || `Patient #${p.id}`
      }));
      setPatients(formattedPatients);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProvider = async (e) => {
    e.preventDefault();
    try {
      await insuranceService.addProvider(newProvider);
      setNewProvider({ provider_name: '', contact_email: '', contact_phone: '' });
      fetchData();
      alert('Provider added successfully');
    } catch (error) {
      alert('Failed to add provider');
    }
  };

  const handleUpdateClaim = async (id, status, currentAmount) => {
    const amount = status === 'APPROVED' ? prompt("Enter approved amount:", currentAmount) : 0;
    if (status === 'APPROVED' && amount === null) return; // cancelled
    
    try {
      await insuranceService.updateClaimStatus(id, { status, amount_approved: amount });
      fetchData();
    } catch (error) {
      alert('Failed to update claim');
    }
  };

  const handleDeleteClaim = async (id) => {
    if (!window.confirm('Are you sure you want to delete this claim?')) return;
    try {
      await insuranceService.deleteClaim(id);
      fetchData();
    } catch (error) {
      alert('Failed to delete claim');
    }
  };

  const handleDeleteProvider = async (id) => {
    if (!window.confirm('Are you sure you want to delete this provider? This might fail if there are claims associated with it.')) return;
    try {
      await insuranceService.deleteProvider(id);
      fetchData();
    } catch (error) {
      alert('Failed to delete provider. (Claims might be using this provider)');
    }
  };

  const handleAddClaim = async (e) => {
    e.preventDefault();
    try {
      await insuranceService.submitClaim(newClaim);
      setNewClaim({ patient_id: '', provider_id: '', appointment_id: null, amount_claimed: '', claim_date: new Date().toISOString().split('T')[0], notes: '' });
      fetchData();
      alert('Claim submitted successfully');
    } catch (error) {
      alert('Failed to submit claim');
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-outfit text-slate-900 dark:text-white">Insurance / TPA Management</h1>
      </div>

      <div className="flex space-x-4 border-b border-slate-200 dark:border-slate-800">
        {['claims', 'providers'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold capitalize ${
              activeTab === tab
                ? 'border-b-2 border-teal-500 text-teal-600 dark:text-teal-400'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'claims' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Submit New Claim</h2>
            <form onSubmit={handleAddClaim} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select required className="p-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700" value={newClaim.patient_id} onChange={e => setNewClaim({...newClaim, patient_id: e.target.value})}>
                <option value="">Select Patient</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.full_name}</option>)}
              </select>
              <select required className="p-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700" value={newClaim.provider_id} onChange={e => setNewClaim({...newClaim, provider_id: e.target.value})}>
                <option value="">Select Provider</option>
                {providers.map(p => <option key={p.id} value={p.id}>{p.provider_name}</option>)}
              </select>
              <input required type="number" placeholder="Amount Claimed (₹)" className="p-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700" value={newClaim.amount_claimed} onChange={e => setNewClaim({...newClaim, amount_claimed: e.target.value})} />
              <button type="submit" className="bg-teal-600 text-white p-2 rounded-xl font-bold hover:bg-teal-700">Submit Claim</button>
            </form>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                <tr>
                  <th className="p-4">Claim ID</th>
                  <th className="p-4">Patient</th>
                  <th className="p-4">Provider</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim.id} className="border-t border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-300">
                    <td className="p-4">{claim.claim_uid}</td>
                    <td className="p-4">{claim.patient_name}</td>
                    <td className="p-4">{claim.provider_name}</td>
                    <td className="p-4">₹{claim.amount_claimed}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        claim.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                        claim.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="p-4 space-x-2 flex items-center">
                      {claim.status === 'PENDING' && (
                        <>
                          <button onClick={() => handleUpdateClaim(claim.id, 'APPROVED', claim.amount_claimed)} className="text-green-600 hover:underline text-sm font-medium">Mark Approved</button>
                          <span className="text-slate-300 dark:text-slate-700">|</span>
                          <button onClick={() => handleUpdateClaim(claim.id, 'REJECTED', 0)} className="text-red-600 hover:underline text-sm font-medium">Mark Rejected</button>
                          <span className="text-slate-300 dark:text-slate-700">|</span>
                        </>
                      )}
                      <button onClick={() => handleDeleteClaim(claim.id)} className="text-slate-400 hover:text-red-500" title="Delete Claim"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
                {claims.length === 0 && (
                  <tr><td colSpan="6" className="p-4 text-center text-slate-500">No claims found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'providers' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Add New Provider</h2>
            <form onSubmit={handleAddProvider} className="flex space-x-4">
              <input required type="text" placeholder="Provider Name" className="flex-1 p-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700" value={newProvider.provider_name} onChange={e => setNewProvider({...newProvider, provider_name: e.target.value})} />
              <input type="email" placeholder="Email" className="flex-1 p-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700" value={newProvider.contact_email} onChange={e => setNewProvider({...newProvider, contact_email: e.target.value})} />
              <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-teal-700">Add</button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {providers.map(p => (
              <div key={p.id} className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 group">
                <button onClick={() => handleDeleteProvider(p.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" title="Delete Provider"><FaTrash /></button>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white pr-6">{p.provider_name}</h3>
                <p className="text-slate-500 text-sm mt-2">{p.contact_email || 'No email provided'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminInsurance;
