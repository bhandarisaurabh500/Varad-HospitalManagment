import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaTrash, FaStar } from 'react-icons/fa';
import api from '../../services/api';
import toast from 'react-hot-toast';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await api.get('/reviews/all');
      setReviews(res.data.data || []);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch reviews');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id, currentStatus) => {
    try {
      await api.put(`/reviews/${id}`, { is_approved: !currentStatus });
      toast.success(`Review ${!currentStatus ? 'approved' : 'hidden'} successfully`);
      fetchReviews();
    } catch (error) {
      toast.error('Failed to update review status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/reviews/${id}`);
      toast.success('Review deleted successfully');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex text-amber-400 text-sm">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'} />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Manage Reviews</h1>
          <p className="text-slate-500 dark:text-slate-400">Approve, hide, or delete patient testimonials</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Reviewer</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4 w-1/2">Review</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading...</td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No reviews found</td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={review.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">
                      {review.reviewer_name || 'Anonymous'}
                      <div className="text-xs text-slate-400">{new Date(review.created_at).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      {renderStars(review.rating)}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm line-clamp-2">{review.review}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        review.is_approved 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {review.is_approved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleApprove(review.id, review.is_approved)}
                          className={`p-2 rounded-lg transition-colors ${
                            review.is_approved 
                              ? 'text-amber-600 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 dark:text-amber-400'
                              : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 dark:text-emerald-400'
                          }`}
                          title={review.is_approved ? "Hide from website" : "Approve for website"}
                        >
                          {review.is_approved ? <FaTimes /> : <FaCheck />}
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
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

export default AdminReviews;
