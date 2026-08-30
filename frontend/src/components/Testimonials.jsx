import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hospitalInfo } from '../data/hospitalData';
import api from '../services/api';
import { 
  FaStar, 
  FaQuoteLeft, 
  FaChevronLeft, 
  FaChevronRight, 
  FaCheckCircle,
  FaGoogle,
  FaPen,
  FaExternalLinkAlt,
  FaPlayCircle,
  FaUserCircle,
  FaHospital
} from 'react-icons/fa';
import HospitalTour from './HospitalTour';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 0, hoverRating: 0, comment: '', submitted: false });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/reviews');
        if (res.data.success) {
          setTestimonialsData(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  // Auto-play the testimonials slider
  useEffect(() => {
    if (testimonialsData.length === 0) return;
    const timer = setInterval(() => {
      nextTestimonial();
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonialsData]);

  const activeItem = testimonialsData[currentIndex];

  if (loading) return null;

  return (
    <section id="reviews" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaGoogle className="text-rose-500" />
            <span>Verified Patient Google Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">
            Patient Feedback & Reviews
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-base sm:text-lg">
            Real patient experiences and recovery stories about Dr. Raosaheb K. BORUDE's excellent treatments.
          </p>

          {/* Google Review Badge & Write Review Action */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold text-slate-800 dark:text-white">
              <FaGoogle className="text-rose-500 text-base" />
              <span>Google Rating: <strong className="text-amber-500 font-extrabold text-sm">{hospitalInfo.stats.googleRating}★</strong> ({hospitalInfo.stats.googleReviewCount})</span>
            </div>

            <a
              href={hospitalInfo.googleMapsLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 text-white text-xs font-bold shadow-md transition"
            >
              <FaPen className="text-teal-400" />
              <span>Write a Review on Google</span>
              <FaExternalLinkAlt className="text-[10px]" />
            </a>
          </div>
        </div>

        {/* Testimonial Slider Block */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80 dark:border-slate-800 relative overflow-hidden"
            >
              <FaQuoteLeft className="text-blue-100 dark:text-slate-800 text-6xl absolute top-6 right-8 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                {/* Patient Photo & Info */}
                <div className="md:col-span-4 text-center">
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-teal-400 mb-4 bg-slate-100 flex items-center justify-center">
                    {activeItem.photo_url ? (
                      <img
                        src={activeItem.photo_url}
                        alt={activeItem.reviewer_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="text-6xl text-slate-300" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-poppins">
                    {activeItem.reviewer_name || 'Anonymous'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(activeItem.created_at).toLocaleDateString()}
                  </p>
                </div>

                {/* Patient Quote & Ratings */}
                <div className="md:col-span-8 space-y-4 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 text-lg">
                    {[...Array(activeItem.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span className="text-xs font-bold text-slate-500 ml-2">({activeItem.source || 'Website'})</span>
                  </div>

                  <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 italic leading-relaxed">
                    "{activeItem.review}"
                  </p>

                  <div className="pt-2 flex items-center justify-center md:justify-start gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    <FaCheckCircle /> Verified Patient Review
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              aria-label="Previous Review"
              className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-md hover:bg-blue-600 hover:text-white transition"
            >
              <FaChevronLeft />
            </button>
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === idx
                      ? 'bg-blue-600 w-8'
                      : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              aria-label="Next Review"
              className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-md hover:bg-blue-600 hover:text-white transition"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Hospital Tour Section */}
        <HospitalTour />

        {/* ===== Full Review Submission Form ===== */}
        <div className="max-w-2xl mx-auto mt-20 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200/80 dark:border-slate-800">
          {reviewForm.submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-5xl text-emerald-500" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 font-poppins">Thank you for sharing your experience!</h3>
              <p className="text-slate-600 dark:text-slate-300 text-base">Your review has been submitted successfully and is awaiting approval.</p>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mt-6 border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-lg">Would you like to share your experience on Google too?</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Your Google review helps other patients find the best eye care.</p>
                <a 
                  href={hospitalInfo.googleMapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white font-bold text-base shadow-lg transition-all"
                >
                  <FaGoogle className="text-rose-500" />
                  <span>⭐ Post Review on Google</span>
                </a>
              </div>

              <button onClick={() => {
                setReviewForm({ name: '', rating: 0, hoverRating: 0, comment: '', submitted: false });
                setSubmitError('');
              }} className="mt-6 text-slate-500 hover:text-blue-600 dark:hover:text-teal-400 text-sm font-semibold underline transition">
                Write Another Review
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  <FaUserCircle />
                  <span>Share Your Experience</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-poppins">Rate Dr. Borude's Treatment</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Your review helps other patients. Fill in the form below!</p>
              </div>

              {submitError && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-sm font-medium text-center">
                  {submitError}
                </div>
              )}

              <form onSubmit={async (e) => { 
                e.preventDefault(); 
                setSubmitError('');
                if (!reviewForm.name.trim()) return setSubmitError('Please enter your name.');
                if (!reviewForm.rating) return setSubmitError('Please select a rating (1-5 stars).');
                if (!reviewForm.comment.trim() || reviewForm.comment.length < 10) return setSubmitError('Please write a reasonable review (at least 10 characters).');
                
                setLoadingSubmit(true);
                try {
                  await api.post('/reviews', {
                    reviewer_name: reviewForm.name,
                    rating: reviewForm.rating,
                    review: reviewForm.comment
                  });
                  setReviewForm(prev => ({ ...prev, submitted: true })); 
                } catch (error) {
                  setSubmitError('Failed to submit review. Please try again.');
                } finally {
                  setLoadingSubmit(false);
                }
              }} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Your Rating *</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`text-4xl cursor-pointer transition-all duration-150 hover:scale-110 ${
                          star <= (reviewForm.hoverRating || reviewForm.rating) ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'
                        }`}
                        onMouseEnter={() => setReviewForm(prev => ({ ...prev, hoverRating: star }))}
                        onMouseLeave={() => setReviewForm(prev => ({ ...prev, hoverRating: 0 }))}
                        onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                      />
                    ))}
                    {reviewForm.rating > 0 && (
                      <span className="ml-2 text-sm font-bold text-amber-500">
                        {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent!'][reviewForm.rating]}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Review *</label>
                  <textarea
                    rows={4}
                    placeholder="Tell others about your experience with Dr. Borude's treatment..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingSubmit}
                  className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-base shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loadingSubmit ? 'Submitting...' : <><FaStar /> Submit Review</>}
                </button>
                <p className="text-center text-xs text-slate-400 dark:text-slate-600">
                  Your review will be published after approval by the clinic.
                </p>
              </form>
            </>
          )}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
