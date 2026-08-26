import React, { useState, useEffect } from 'react';
import { FaSave, FaUserMd } from 'react-icons/fa';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminProfile = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    qualification: '',
    specialization: '',
    experience_years: 0,
    about: '',
    expertise: [],
    consultation_fee: 0,
    is_available: 1
  });
  const [expertiseInput, setExpertiseInput] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await api.get('/doctors');
        if (res.data.success && res.data.data.length > 0) {
          const doc = res.data.data[0]; // Assuming single doctor for this clinic
          setDoctorId(doc.id);
          setFormData({
            qualification: doc.qualification || '',
            specialization: doc.specialization || '',
            experience_years: doc.experience_years || 0,
            about: doc.about || '',
            expertise: doc.expertise || [],
            consultation_fee: doc.consultation_fee || 0,
            is_available: doc.is_available
          });
        }
      } catch (error) {
        toast.error('Failed to load doctor profile');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    });
  };

  const handleAddExpertise = () => {
    if (expertiseInput.trim()) {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, expertiseInput.trim()]
      });
      setExpertiseInput('');
    }
  };

  const handleRemoveExpertise = (index) => {
    const newExpertise = [...formData.expertise];
    newExpertise.splice(index, 1);
    setFormData({ ...formData, expertise: newExpertise });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId) return toast.error('No doctor profile found to update');

    try {
      await api.put(`/doctors/${doctorId}`, formData);
      toast.success('Doctor profile updated successfully');
    } catch (error) {
      toast.error('Failed to update doctor profile');
    }
  };

  if (loading) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
          <FaUserMd className="text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Doctor Profile</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your public information displayed on the website</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Qualification</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="e.g. MBBS, MS (Ophthalmology)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="e.g. Retina & Refractive Specialist"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Years of Experience</label>
              <input
                type="number"
                name="experience_years"
                value={formData.experience_years}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Consultation Fee (₹)</label>
              <input
                type="number"
                name="consultation_fee"
                value={formData.consultation_fee}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="Detailed biography..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Expertise (Press Add)</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddExpertise())}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="e.g. Cataract Surgery"
              />
              <button
                type="button"
                onClick={handleAddExpertise}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.expertise.map((item, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  {item}
                  <button type="button" onClick={() => handleRemoveExpertise(index)} className="text-blue-400 hover:text-blue-600 font-bold ml-1">&times;</button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              name="is_available"
              id="is_available"
              checked={formData.is_available === 1}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="is_available" className="text-sm font-medium text-slate-700 dark:text-slate-300">Currently taking appointments</label>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
            >
              <FaSave /> Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
