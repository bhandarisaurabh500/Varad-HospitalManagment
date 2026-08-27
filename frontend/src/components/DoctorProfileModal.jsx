import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGraduationCap, FaAward, FaStethoscope, FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const DoctorProfileModal = ({ isOpen, onClose }) => {
  const { openAppointmentModal } = useTheme();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-auto border border-slate-200 dark:border-slate-700 max-h-[90vh]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-900/50 dark:hover:text-rose-400 text-slate-500 rounded-full flex items-center justify-center transition-colors shadow-sm"
          >
            <FaTimes size={20} />
          </button>

          {/* Left Column - Visuals & Profile */}
          <div className="w-full md:w-5/12 bg-gradient-to-b from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 p-8 flex flex-col items-center border-r border-slate-100 dark:border-slate-800 overflow-y-auto">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl mb-6 bg-blue-100">
              <img 
                src="/photos/doctor/Dr.BorudeSir.png" 
                alt="Dr. Raosaheb Borude" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h2 className="text-3xl font-black text-blue-950 dark:text-white text-center mb-2">Dr. Raosaheb Borude</h2>
            <p className="text-teal-600 dark:text-teal-400 font-bold text-center mb-6 px-4 py-1.5 bg-teal-50 dark:bg-teal-900/30 rounded-full text-sm">
              Cataract, Glaucoma & Refractive Surgeon
            </p>

          </div>

          {/* Right Column - Details */}
          <div className="w-full md:w-7/12 p-8 md:p-10 overflow-y-auto">
            
            {/* Qualifications */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                <FaGraduationCap className="text-blue-500" /> Qualifications
              </h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">•</span> M.B.B.S., D.O.M.S., F.I.G.O.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">•</span> Ophthalmology – Pune University
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">•</span> Fellowship in General Ophthalmology & Phacosurgery
                </li>
              </ul>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                <FaAward className="text-amber-500" /> Professional Experience
              </h3>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 text-sm border-l-2 border-slate-200 dark:border-slate-700 ml-2 pl-4">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-white dark:bg-slate-900 border-2 border-amber-500 rounded-full" />
                  <p className="font-bold text-slate-800 dark:text-slate-200">2002 – 2004</p>
                  <p>Tulsi Eye Hospital, Nashik</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-white dark:bg-slate-900 border-2 border-amber-500 rounded-full" />
                  <p className="font-bold text-slate-800 dark:text-slate-200">2004 – 2006</p>
                  <p>Anand Rushiji Hospital</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-white dark:bg-slate-900 border-2 border-amber-500 rounded-full" />
                  <p className="font-bold text-slate-800 dark:text-slate-200">2006 – 2024</p>
                  <p>Serving in the field of Eye Care through Bhairavnath Eye Hospital</p>
                </div>
              </div>
            </div>

            {/* Areas of Expertise */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                <FaStethoscope className="text-emerald-500" /> Areas of Expertise
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg"><span className="text-teal-500">✓</span> Phaco Surgery</div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg"><span className="text-teal-500">✓</span> Cataract Surgery</div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg"><span className="text-teal-500">✓</span> Glaucoma Treatment</div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg"><span className="text-teal-500">✓</span> Squint Treatment</div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg"><span className="text-teal-500">✓</span> Eye Care</div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg"><span className="text-teal-500">✓</span> LASIK / Refractive Surgery</div>
              </div>
            </div>

            {/* Schedule & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">OPD Days</p>
                <p className="text-slate-800 dark:text-slate-200 font-medium">Tuesday, Thursday, Saturday</p>
              </div>
              <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl border border-teal-100 dark:border-teal-800/30">
                <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">Operation Days</p>
                <p className="text-slate-800 dark:text-slate-200 font-medium">Monday, Wednesday, Friday</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => { onClose(); openAppointmentModal(); }}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
              >
                <FaCalendarCheck /> Book Appointment
              </button>
              <a
                href="tel:9822315840"
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold py-3.5 px-6 rounded-xl transition-all"
              >
                <FaPhoneAlt className="text-teal-500" /> 9822315840
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DoctorProfileModal;
