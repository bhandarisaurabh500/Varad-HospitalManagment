import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaSave, FaPhoneAlt } from 'react-icons/fa';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    appointment_mobile: '',
    clinic_phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clinic_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // ignore no rows error initially
      
      if (data) {
        setSettings({
          appointment_mobile: data.appointment_mobile || '',
          clinic_phone: data.clinic_phone || ''
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const { error } = await supabase
        .from('clinic_settings')
        .upsert({ 
          id: 1, 
          appointment_mobile: settings.appointment_mobile,
          clinic_phone: settings.clinic_phone
        });

      if (error) throw error;
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Clinic Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage global clinic contact information.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 mb-6">
          Appointment / Clinic Information
        </h3>

        {loading ? (
          <div className="py-10 text-center text-slate-500">Loading settings...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Appointment Mobile
              </label>
              <div className="relative">
                <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={settings.appointment_mobile}
                  onChange={(e) => setSettings({...settings, appointment_mobile: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. +91 9923890890"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">Used for Book Appointment CTAs and Navbar links.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Clinic Phone (Landline)
              </label>
              <div className="relative">
                <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={settings.clinic_phone}
                  onChange={(e) => setSettings({...settings, clinic_phone: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. (0241) 2324680 / 2415600"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">Used for Footer and General Clinic Information.</p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button 
                type="submit" 
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition disabled:opacity-50"
              >
                <FaSave /> {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
