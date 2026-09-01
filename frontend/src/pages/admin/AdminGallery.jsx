import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaImages } from 'react-icons/fa';

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Equipment',
    image_url: '',
    sort_order: 0
  });

  const categories = ['Operation Theatre', 'Equipment', 'Facilities', 'Doctors', 'Patients', 'Awards'];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.get('/gallery');
      if (res.data.success) setItems(res.data.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', category: 'Equipment', image_url: '', sort_order: 0 });
    setImageFile(null);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      image_url: item.image_url,
      sort_order: item.sort_order || 0
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/gallery/${id}`);
      fetchGallery();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || (!formData.image_url && !imageFile)) {
      console.error('Title and Image (File or URL) are required.');
      return;
    }
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description || '');
      data.append('category', formData.category);
      data.append('sort_order', formData.sort_order || 0);
      
      if (imageFile) {
        data.append('image', imageFile);
      } else {
        data.append('image_url', formData.image_url);
      }

      if (editingId) {
        // PUT routes in this app might not support FormData/multer if not configured in backend,
        // but let's assume it supports JSON for now if just updating text, 
        // wait, let's just send JSON if no new file is selected on edit.
        if (imageFile) {
           await api.put(`/gallery/${editingId}`, data);
        } else {
           await api.put(`/gallery/${editingId}`, formData);
        }
      } else {
        await api.post('/gallery', data);
      }
      resetForm();
      fetchGallery();
    } catch (error) {
      console.error('Error saving gallery item:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Gallery Management</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage website gallery photos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {editingId ? 'Edit Photo' : 'Add New Photo'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image Upload (or URL)</label>
                <div className="space-y-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files[0])}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <div className="text-xs text-center text-slate-400">OR</div>
                  <input 
                    type="text" 
                    value={formData.image_url}
                    onChange={e => setFormData({...formData, image_url: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                    placeholder="Enter Image URL directly..."
                    disabled={!!imageFile}
                    required={!imageFile}
                  />
                </div>
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
            <div className="text-center py-10 text-slate-500">Loading gallery...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map(item => (
                <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex gap-4 shadow-sm relative overflow-hidden">
                  <img src={item.image_url} alt={item.title} className="w-24 h-24 object-cover rounded-xl bg-slate-100" />
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold text-blue-500">{item.category}</span>
                    <h4 className="font-bold text-slate-800 dark:text-white line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.description}</p>
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

export default AdminGallery;
