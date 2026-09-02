import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { hospitalInfo, doctorsData } from '../data/hospitalData';
import { 
  FaCalendarCheck, 
  FaStar,
  FaUserMd,
  FaEye,
  FaCheckCircle,
  FaAward
} from 'react-icons/fa';
import DoctorProfileModal from './DoctorProfileModal';

const Hero = () => {
  const { openAppointmentModal } = useTheme();
  const doctor = doctorsData.find(d => d.id === 2); // Dr. Borude
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-400/20 dark:bg-teal-600/10 rounded-full blur-3xl pointer-events-none translate-x-1/3"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Location & Rating Pill Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300 text-xs font-bold shadow-sm">
                <FaStar className="text-amber-500" />
                <span>{hospitalInfo.stats.googleRating}★ Rated (Top Eye Specialist)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100/90 dark:bg-blue-950/90 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-teal-300 text-xs font-bold shadow-sm">
                <FaAward className="text-blue-500" />
                <span>22+ Years of Excellence</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.15] font-poppins">
              {hospitalInfo.marathiName} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-500 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl block mt-2 drop-shadow-sm">
                {hospitalInfo.tagline}
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Dr. Raosaheb K. BORUDE is a highly experienced Cataract, Glaucoma & Refractive Surgeon dedicated to providing modern, compassionate eye care.
            </p>

            {/* Feature Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                <span>Stitchless Phaco</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                <span>Retina Care</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                <span>Automated Perimetry</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                <span>Lasik Surgery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                <span>Glaucoma Treatment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                <span>Cashless Facility</span>
              </div>
            </div>

            {/* Buttons Group */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => openAppointmentModal()}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <FaCalendarCheck className="text-lg" />
                <span>Book Appointment</span>
              </button>
              
              <button
                onClick={() => setIsProfileOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 text-slate-700 dark:text-slate-300 font-bold text-base shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <FaUserMd className="text-lg text-blue-500" />
                <span>View Profile</span>
              </button>
            </div>
          </motion.div>

          {/* Right Visual Doctor Photo */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative mt-10 lg:mt-0"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glowing Ambient Halo */}
              <motion.div 
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-teal-400 opacity-50 blur-3xl"
              ></motion.div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-900">
                <img src={doctor.photo} alt={doctor.name} className="w-full h-auto object-cover" />
                <div className="p-4 bg-gradient-to-t from-slate-900/90 to-slate-900/40 absolute bottom-0 w-full text-center">
                   <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
                   <p className="text-sm text-blue-300">{doctor.qualification}</p>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl glass-panel shadow-soft text-slate-800 dark:text-white max-w-xs border border-white/40 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-teal-400 text-white flex items-center justify-center text-xl shadow-md font-extrabold font-poppins">
                  <FaEye />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-poppins">Experienced Eye Surgeon</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">Cataract, Glaucoma & Refractive Surgery</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      <DoctorProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </section>
  );
};

export default Hero;
