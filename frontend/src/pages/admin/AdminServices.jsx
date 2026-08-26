import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaBriefcaseMedical } from 'react-icons/fa';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    short_desc: '',
    description: '',
    icon: 'FaBriefcaseMedical',
    sort_order: 0,
    is_active: 1
  });

  const fetchServices = async () => {
    try {
      const res = await api.get('/services'); // For admin we can rely on this, but we'll see if it filters
      setServices(res.data.data || []);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch services');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    });
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      slug: service.slug,
      short_desc: service.short_desc || '',
      description: service.description || '',
      icon: service.icon || 'FaBriefcaseMedical',
      sort_order: service.sort_order || 0,
      is_active: service.is_active !== undefined ? service.is_active : 1
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      short_desc: '',
      description: '',
      icon: 'FaBriefcaseMedical',
      sort_order: 0,
      is_active: 1
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/services/${editingId}`, formData);
        toast.success('Service updated successfully');
      } else {
        await api.post('/services', formData);
        toast.success('Service created successfully');
      }
      handleCancel();
      fetchServices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save service');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to disable/delete this service?')) {
      try {
        await api.delete(`/services/${id}`);
        toast.success('Service disabled successfully');
        fetchServices();
      } catch (error) {
        toast.error('Failed to delete service');
      }
    }
  };

  const generateSlug = () => {
    if (!formData.name) return;
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, slug });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Manage Services</h1>
          <p className="text-slate-500 dark:text-slate-400">Add, edit, or remove eye care services</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft p-6 mb-8">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
          {editingId ? 'Edit Service' : 'Add New Service'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Service Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={!editingId ? generateSlug : undefined}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Slug (URL friendly)</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Short Description (Tagline)</label>
              <input
                type="text"
                name="short_desc"
                value={formData.short_desc}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Detailed Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Icon (React Icon Name)</label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                placeholder="e.g. FaEye, FaMicroscope"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="flex items-center space-x-4 mt-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active === 1}
                  onChange={handleInputChange}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Is Active</span>
              </label>
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              {editingId ? <><FaCheck /> Update</> : <><FaPlus /> Add</>}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Short Desc</th>
                <th className="px-6 py-4">Icon</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading...</td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No services found</td>
                </tr>
              ) : (
                services.map((service) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={service.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">
                      {service.name}
                      <div className="text-xs text-slate-400">{service.slug}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">{service.short_desc}</td>
                    <td className="px-6 py-4">{service.icon}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        service.is_active 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                      }`}>
                        {service.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 dark:text-blue-400 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 dark:text-rose-400 rounded-lg transition-colors"
                          title="Disable"
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

export default AdminServices;
