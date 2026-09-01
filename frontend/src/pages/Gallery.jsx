import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCameraRetro, FaTrophy } from 'react-icons/fa';
import HospitalTour from '../components/HospitalTour';
import api from '../services/api';

const galleryPhotos = [
  { src: '/photos/Gallary/Bright Teal Medical Clinic Interior.png', title: 'Clinic Interior' },
  { src: '/photos/Gallary/Modern Waiting Room with TV and Seating.png', title: 'Waiting Area' },
  { src: '/photos/Gallary/Modern Aqua Ophthalmology Exam Room.png', title: 'Exam Room' },
  { src: '/photos/Gallary/Modern Hospital Room Through Wooden Door.png', title: 'Hospital Room' },
  { src: '/photos/Gallary/Modern Mint Eye Exam Room.png', title: 'Eye Exam Room' },
  { src: '/photos/Gallary/Modern Mint Green Examination Room.png', title: 'Examination Room' },
  { src: '/photos/Gallary/Sterile Clinical Procedure Room.png', title: 'Procedure Room' },
  { src: '/photos/Gallary/Colorful Underwater Pediatric Dental Clinic.png', title: 'Pediatric Care' },
];

const awardsPhotos = [
  { src: '/photos/doctor/Doctor 1.png', title: 'Dr. Borude – Award Ceremony' },
  { src: '/photos/doctor/Doctor 2.png', title: 'Dr. Borude – Felicitation' },
  { src: '/photos/Award/Award-2024.png', title: 'Excellence Award 2024' },
];

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeTab, setActiveTab] = useState('hospital'); // 'hospital' or 'awards'
  const [dbPhotos, setDbPhotos] = useState([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const fetchGallery = async () => {
      try {
        const res = await api.get('/gallery');
        if (res.data.success && res.data.data.length > 0) {
          setDbPhotos(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };
    fetchGallery();
  }, []);

  const getActivePhotos = () => {
    // If we have DB photos, use them and filter based on activeTab
    if (dbPhotos.length > 0) {
      if (activeTab === 'awards') {
        return dbPhotos.filter(p => p.category === 'Awards').map(item => ({
          src: item.image_url,
          title: item.title,
          id: item.id
        }));
      } else {
        return dbPhotos.filter(p => p.category !== 'Awards').map(item => ({
          src: item.image_url,
          title: item.title,
          id: item.id
        }));
      }
    }
    
    // Fallback to static
    return activeTab === 'awards' ? awardsPhotos : galleryPhotos;
  };

  const currentPhotos = getActivePhotos();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-blue-950 dark:text-white mb-4"
          >
            Our <span className="text-teal-600 dark:text-teal-400">Gallery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Take a visual tour of our state-of-the-art facilities and explore our recognitions.
          </motion.p>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('hospital')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md ${
              activeTab === 'hospital'
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30'
                : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <FaCameraRetro />
            Hospital Facilities
          </button>
          <button
            onClick={() => setActiveTab('awards')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md ${
              activeTab === 'awards'
                ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/30'
                : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <FaTrophy />
            Awards & Recognitions
          </button>
        </div>

        {/* Photo Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {currentPhotos.map((photo, index) => (
              <motion.div
                key={photo.id || photo.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group cursor-pointer aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-800"
                onClick={() => setSelectedImg(photo.src)}
              >
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${activeTab === 'awards' ? 'object-contain bg-slate-50 dark:bg-slate-900 p-2' : 'object-cover'}`}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <span className="text-white font-medium text-lg text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {photo.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-zoom-out"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <FaTimes size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg}
              alt="Enlarged gallery view"
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HospitalTour />
      </div>
    </div>
  );
};

export default Gallery;
