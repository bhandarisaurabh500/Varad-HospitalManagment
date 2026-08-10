import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryData } from '../data/hospitalData';
import { FaImages, FaSearchPlus, FaTimes } from 'react-icons/fa';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', 'Operation Theatre', 'Equipment', 'Facilities', 'Doctors', 'Patients'];

  const filteredImages = selectedCategory === 'All'
    ? galleryData
    : galleryData.filter(img => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaImages />
            <span>Hospital Infrastructure & Facilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">
            Hospital Photo Gallery
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-base sm:text-lg">
            Take a virtual tour of our state-of-the-art modular operation theatres, diagnostic suites, and patient care lounges.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedImage(item)}
              className="relative rounded-3xl overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-300 cursor-pointer h-64 group border border-slate-200/80 dark:border-slate-800"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-base font-bold font-poppins">{item.title}</h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">{item.desc}</p>

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-sm">
                  <FaSearchPlus />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Image View Modal */}
        <AnimatePresence>
          {selectedImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 p-3 rounded-full bg-slate-800/80 text-white hover:bg-rose-600 transition"
                >
                  <FaTimes />
                </button>

                <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className="max-h-[70vh] w-auto object-contain"
                  />
                </div>

                <div className="p-6 text-white bg-slate-900">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-xl font-bold font-poppins mt-1">
                    {selectedImage.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2">
                    {selectedImage.desc}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Gallery;
