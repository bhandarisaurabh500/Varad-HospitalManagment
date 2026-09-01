import React, { useState } from 'react';
import { FaHospital, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const HospitalTour = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="max-w-5xl mx-auto mt-24 mb-10 relative">
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
        {/* Patient Care Photo */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col group cursor-pointer" onClick={() => setSelectedImg('/photos/Patients/Ophthalmologist Performing Slit Lamp Eye Exam.png')}>
          <div className="relative w-full overflow-hidden" style={{paddingTop: '56.25%'}}>
            <img 
              src="/photos/Patients/Ophthalmologist Performing Slit Lamp Eye Exam.png" 
              alt="Advanced Patient Care" 
              className="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col flex-grow">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Advanced Patient Care</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Dr. Raosaheb K. BORUDE examining a patient using state-of-the-art diagnostic equipment. We prioritize accuracy and patient comfort in every step of the treatment process.
            </p>
          </div>
        </div>

        {/* Native video player with poster */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col">
          <div className="relative w-full" style={{paddingTop: '56.25%'}}>
            <iframe
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="https://www.youtube.com/embed/a38nME-7Ocg?si=nUxtJ2LfHMWOWVsv"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-6 md:p-8 flex flex-col flex-grow">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Patient Experience & Hospital Tour</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">Watch Dr. Raosaheb K. BORUDE examining patients at Varad Netralaya.</p>
            <div className="mt-auto flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wide uppercase">Read our patient reviews on Justdial:</span>
              <div className="flex flex-wrap gap-3">
                <a href="https://jsdl.in/RSL-BXC1787681221" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-teal-400 text-xs font-bold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  <FaExternalLinkAlt className="text-[10px]" /> Review 1
                </a>
                <a href="https://jsdl.in/RSL-QAV1787681289" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-teal-400 text-xs font-bold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  <FaExternalLinkAlt className="text-[10px]" /> Review 2
                </a>
                <a href="https://jsdl.in/RSL-HRZ1787681340" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-teal-400 text-xs font-bold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  <FaExternalLinkAlt className="text-[10px]" /> Review 3
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-md"
            >
              <FaTimes size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImg}
              alt="Preview"
              className="w-11/12 md:w-3/4 lg:w-2/3 h-[70vh] md:h-[85vh] object-contain rounded-2xl shadow-2xl bg-white p-2"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HospitalTour;
