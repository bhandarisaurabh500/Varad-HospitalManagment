import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminNotices = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    notice_text: ''
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/notices/all');
      if (res.data.success) setItems(res.data.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ notice_text: '' });
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setFormData({ notice_text: item.notice_text });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notices/${id}`);
      toast.success('Notice deleted successfully');
      fetchNotices();
    } catch (error) {
      console.error('Error deleting notice:', error);
      toast.error('Failed to delete item');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.notice_text) {
      toast.error('Notice text is required.');
      return;
    }
    try {
      if (editingId) {
        await api.put(`/notices/${editingId}`, formData);
      } else {
        await api.post('/notices', formData);
        toast.success('Notice added successfully');
      }
      resetForm();
      fetchNotices();
    } catch (error) {
      console.error('Error saving notice:', error);
      toast.error('Failed to save notice');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Patient Notices</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage important notices displayed in the Patient Guidelines section.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {editingId ? 'Edit Notice' : 'Add New Notice'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notice Text</label>
                <textarea 
                  value={formData.notice_text}
                  onChange={e => setFormData({...formData, notice_text: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                  <FaSave /> {editingId ? 'Update' : 'Save'}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="text-center py-10 text-slate-500">Loading notices...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {items.map(item => (
                <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm relative flex justify-between items-center">
                  <p className="text-sm text-slate-700 dark:text-slate-300 flex-1 pr-4">{item.notice_text}</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 bg-blue-50 rounded transition-colors"><FaEdit /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 bg-red-50 rounded transition-colors"><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNotices;
