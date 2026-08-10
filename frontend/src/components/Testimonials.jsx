import React, { useState } from 'react';
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
  FaExternalLinkAlt
} from 'react-icons/fa';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

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
            Real patient experiences and recovery stories from Varad Multispeciality Hospital, Ahilyanagar.
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
                    <FaCheckCircle /> Verified Google Patient Review
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

      </div>
    </section>
  );
};

export default Testimonials;
