import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCameraRetro, FaTrophy, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
  const [selectedIndex, setSelectedIndex] = useState(null);
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
          desc: item.description,
          id: item.id
        }));
      } else if (activeTab === 'patients') {
        return dbPhotos.filter(p => p.category === 'Patients').map(item => ({
          src: item.image_url,
          title: item.title,
          desc: item.description,
          id: item.id
        }));
      } else {
        return dbPhotos.filter(p => p.category !== 'Awards' && p.category !== 'Patients').map(item => ({
          src: item.image_url,
          title: item.title,
          desc: item.description,
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
            onClick={() => setActiveTab('patients')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md ${
              activeTab === 'patients'
                ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-teal-500/30'
                : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path></svg>
            Patient Education
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
                className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 ${activeTab === 'patients' ? 'aspect-auto' : 'aspect-square'}`}
                onClick={() => setSelectedIndex(index)}
              >
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  className={`w-full h-full transition-transform duration-700 ${(activeTab === 'awards' || activeTab === 'patients') ? 'object-contain bg-slate-50 dark:bg-slate-900 p-2' : 'object-cover'}`}
                />
                
                {/* Premium Glassmorphism Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-white/20 dark:bg-black/40 backdrop-blur-md border-t border-white/30 dark:border-white/10 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-between">
                  <span className="text-white font-semibold text-[1.1rem] drop-shadow-md truncate pr-2 font-poppins">
                    {photo.title}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/30 dark:bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-zoom-out"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[60]"
              onClick={() => setSelectedIndex(null)}
            >
              <FaTimes size={32} />
            </button>

            <button 
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-[60]"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length); }}
            >
              <FaChevronLeft size={32} />
            </button>

            <button 
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-[60]"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev + 1) % currentPhotos.length); }}
            >
              <FaChevronRight size={32} />
            </button>

            <div className="relative max-w-5xl w-full flex flex-col items-center cursor-default" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={currentPhotos[selectedIndex].src}
                alt={currentPhotos[selectedIndex].title}
                className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl bg-white p-1 md:p-3"
              />
              <motion.div 
                key={`text-${selectedIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-6 text-center text-white"
              >
                <h3 className="text-2xl md:text-3xl font-bold font-poppins">{currentPhotos[selectedIndex].title}</h3>
                {currentPhotos[selectedIndex].desc && (
                  <p className="mt-2 text-slate-300 max-w-2xl text-center mx-auto text-sm md:text-base leading-relaxed">
                    {currentPhotos[selectedIndex].desc}
                  </p>
                )}
              </motion.div>
            </div>
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
