import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonialsData, hospitalInfo } from '../data/hospitalData';
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

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 0, hoverRating: 0, comment: '', submitted: false });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  // Auto-play the testimonials slider
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 4000); // changes every 4 seconds
    return () => clearInterval(timer);
  }, []);

  const activeItem = testimonialsData[currentIndex];

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
            Real patient experiences and recovery stories about Dr. Raosaheb Borude's excellent treatments.
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
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-teal-400 mb-4 bg-slate-100">
                    <img
                      src={activeItem.photo}
                      alt={activeItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-poppins">
                    {activeItem.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeItem.city} • <span className="text-slate-400">{activeItem.timeAgo}</span>
                  </p>

                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-teal-400 font-semibold text-[11px]">
                    {activeItem.treatment}
                  </span>
                </div>

                {/* Patient Quote & Ratings */}
                <div className="md:col-span-8 space-y-4 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 text-lg">
                    {[...Array(activeItem.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    <span className="text-xs font-bold text-slate-500 ml-2">({activeItem.source})</span>
                  </div>

                  <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 italic leading-relaxed">
                    "{activeItem.comment}"
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
        <div className="max-w-5xl mx-auto mt-24 mb-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <FaHospital className="text-emerald-500" />
              <span>Hospital Tour</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-poppins">
              See Our Hospital & Dr. Borude
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              A glimpse of Varad Netralaya — our facilities, consultation rooms, and operation theatres.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 4-Photo hospital grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden group h-52">
                <img src="/photos/doctor/Dr_Borude_1.png" alt="Dr Borude Award Ceremony" className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3">
                  <p className="text-white text-xs font-bold">Dr. Borude – Award Ceremony</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden group h-52">
                <img src="/photos/doctor/Dr_Borude_3.png" alt="Dr Borude Felicitation" className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3">
                  <p className="text-white text-xs font-bold">Dr. Borude – Felicitation</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden group h-52">
                <img src="/photos/facilities/consultation-room.png" alt="Consultation Office" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3">
                  <p className="text-white text-xs font-bold">Consultation Office</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden group h-52">
                <img src="/photos/Machine/3-modular-operation-theaters-with-laminar-airflow.png" alt="Operation Theatre" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3">
                  <p className="text-white text-xs font-bold">Modular Operation Theatre</p>
                </div>
              </div>
            </div>

            {/* Native video player with poster */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col">
              <div className="relative w-full" style={{paddingTop: '56.25%'}}>
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  controls
                  preload="none"
                  poster="/photos/doctor/Dr.BorudeSir.png"
                >
                  <source src="https://stream.jdmagicbox.com/comp/hls/9999px241.x241.160309131642.l6h1_vdsiadd0yhvilb8.m3u8" type="application/x-mpegURL" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-5">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Patient Experience & Hospital Tour</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Dr. Raosaheb Borude examining patients at Varad Netralaya.</p>
                <a
                  href="https://www.justdial.com/Ahmednagar/Varad-NetralayaDr-Smita-Patare-and-Dr-Raosaheb-Borude-Behind-Parichay-Hotelnear-Savedi-Naka-Savedi/9999PX241-X241-160309131642-L6H1_BZDET/reels?vid=4290642"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-blue-600 dark:text-teal-400 text-xs font-bold hover:underline"
                >
                  <FaPlayCircle /> Watch full video on Justdial <FaExternalLinkAlt className="text-[9px]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Full Review Submission Form ===== */}
        <div className="max-w-2xl mx-auto mt-20 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200/80 dark:border-slate-800">
          {reviewForm.submitted ? (
            <div className="text-center py-8">
              <FaCheckCircle className="text-5xl text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Thank You for Your Review!</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Google Maps was opened so you can also post it publicly for all patients to see!</p>
              <button onClick={() => setReviewForm({ name: '', rating: 0, hoverRating: 0, comment: '', submitted: false })} className="mt-6 px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition">Write Another Review</button>
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

              <form onSubmit={(e) => { e.preventDefault(); if (!reviewForm.name || !reviewForm.rating || !reviewForm.comment) { alert('Please fill your name, rating, and review!'); return; } window.open(hospitalInfo.googleMapsLink, '_blank'); setReviewForm(prev => ({ ...prev, submitted: true })); }} className="space-y-5">
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
                  className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-base shadow-lg transition flex items-center justify-center gap-2"
                >
                  <FaGoogle /> Submit Review on Google
                </button>
                <p className="text-center text-xs text-slate-400 dark:text-slate-600">
                  After submitting, Google Maps will open so your review is posted publicly.
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
