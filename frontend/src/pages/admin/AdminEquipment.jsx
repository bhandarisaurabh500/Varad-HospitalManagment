import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaSave } from 'react-icons/fa';

const AdminEquipment = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    short_desc: '',
    image_url: ''
  });

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const res = await api.get('/equipment/all');
      if (res.data.success) setItems(res.data.data);
    } catch (error) {
      console.error('Error fetching equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', short_desc: '', image_url: '' });
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      short_desc: item.short_desc || '',
      image_url: item.image_url || ''
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this equipment?')) return;
    try {
      await api.delete(`/equipment/${id}`);
      fetchEquipment();
    } catch (error) {
      console.error('Error deleting equipment:', error);
      alert('Failed to delete item');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Name is required.');
      return;
    }
    try {
      if (editingId) {
        await api.put(`/equipment/${editingId}`, formData);
      } else {
        await api.post('/equipment', formData);
      }
      resetForm();
      fetchEquipment();
    } catch (error) {
      console.error('Error saving equipment:', error);
      alert('Failed to save item');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Advanced Equipment Management</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage equipment displayed on the website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {editingId ? 'Edit Equipment' : 'Add New Equipment'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Equipment Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Short Description</label>
                <textarea 
                  value={formData.short_desc}
                  onChange={e => setFormData({...formData, short_desc: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
                <input 
                  type="text" 
                  value={formData.image_url}
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  placeholder="/photos/Machine/example.jpg"
                />
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
            <div className="text-center py-10 text-slate-500">Loading equipment...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map(item => (
                <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex gap-4 shadow-sm relative overflow-hidden">
                  {item.image_url && <img src={item.image_url} alt={item.name} className="w-20 h-20 object-contain rounded bg-slate-100 p-1" />}
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 dark:text-white line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.short_desc}</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 bg-blue-50 rounded transition-colors"><FaEdit /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 bg-red-50 rounded transition-colors"><FaTrash /></button>
                    </div>
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

export default AdminEquipment;
