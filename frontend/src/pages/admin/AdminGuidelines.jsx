import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const AdminGuidelines = () => {
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    icon: '',
    points: [''],
    sort_order: 0
  });

  useEffect(() => {
    fetchGuidelines();
  }, []);

  const fetchGuidelines = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('healthcare_guidelines')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('id', { ascending: true });

      if (error) throw error;
      setGuidelines(data || []);
    } catch (error) {
      console.error('Error fetching guidelines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePointChange = (index, value) => {
    const newPoints = [...formData.points];
    newPoints[index] = value;
    setFormData({ ...formData, points: newPoints });
  };

  const addPoint = () => {
    setFormData({ ...formData, points: [...formData.points, ''] });
  };

  const removePoint = (index) => {
    const newPoints = formData.points.filter((_, i) => i !== index);
    setFormData({ ...formData, points: newPoints });
  };

  const resetForm = () => {
    setFormData({ title: '', icon: '', points: [''], sort_order: 0 });
    setEditingId(null);
  };

  const handleEdit = (guideline) => {
    setFormData({
      title: guideline.title,
      icon: guideline.icon || '',
      points: guideline.points || [''],
      sort_order: guideline.sort_order || 0
    });
    setEditingId(guideline.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this guideline?')) return;
    
    try {
      const { error } = await supabase
        .from('healthcare_guidelines')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchGuidelines();
    } catch (error) {
      console.error('Error deleting guideline:', error);
      alert('Failed to delete guideline');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out empty points
    const filteredPoints = formData.points.filter(p => p.trim() !== '');
    
    if (!formData.title || filteredPoints.length === 0) {
      alert('Title and at least one point are required.');
      return;
    }

    try {
      const payload = {
        title: formData.title,
        icon: formData.icon,
        points: filteredPoints,
        sort_order: formData.sort_order
      };

      if (editingId) {
        const { error } = await supabase
          .from('healthcare_guidelines')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('healthcare_guidelines')
          .insert([payload]);
        if (error) throw error;
      }

      resetForm();
      fetchGuidelines();
    } catch (error) {
      console.error('Error saving guideline:', error);
      alert('Failed to save guideline');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Patient Guidelines</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage patient healthcare instructions and guidelines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {editingId ? 'Edit Guideline' : 'Add New Guideline'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Before Eye Surgery"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Icon Name (Optional)</label>
                <input 
                  type="text" 
                  value={formData.icon}
                  onChange={e => setFormData({...formData, icon: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. FaUserShield"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sort Order</label>
                <input 
                  type="number" 
                  value={formData.sort_order}
                  onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Instructions (Points)</label>
                <div className="space-y-2">
                  {formData.points.map((point, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text" 
                        value={point}
                        onChange={e => handlePointChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder={`Point ${index + 1}`}
                        required={index === 0}
                      />
                      {formData.points.length > 1 && (
                        <button type="button" onClick={() => removePoint(index)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button type="button" onClick={addPoint} className="mt-2 text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
                  <FaPlus className="text-xs" /> Add Another Point
                </button>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                  <FaSave /> {editingId ? 'Update' : 'Save'}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="text-center py-10 text-slate-500">Loading guidelines...</div>
          ) : guidelines.length === 0 ? (
            <div className="text-center py-10 text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              No guidelines found. Add one to get started.
            </div>
          ) : (
            guidelines.map(guideline => (
              <div key={guideline.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    {guideline.title}
                  </h4>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(guideline)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400 rounded-lg transition-colors">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(guideline.id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 rounded-lg transition-colors">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <ul className="space-y-2 list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                  {guideline.points?.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminGuidelines;
