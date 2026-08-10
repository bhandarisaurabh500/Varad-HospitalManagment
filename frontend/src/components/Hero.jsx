import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { hospitalInfo } from '../data/hospitalData';
import { 
  FaCalendarCheck, 
  FaPhoneAlt, 
  FaCheckCircle, 
  FaShieldAlt,
  FaMapMarkerAlt,
  FaStar,
  FaUserMd,
  FaPlay,
  FaTimes,
  FaYoutube
} from 'react-icons/fa';

const Hero = () => {
  const { openAppointmentModal } = useTheme();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
                <span>4.9★ Rated (439+ Google Reviews)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100/90 dark:bg-blue-950/90 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-teal-300 text-xs font-bold shadow-sm">
                <FaMapMarkerAlt className="text-rose-500 animate-bounce" />
                <span>सावेडी, अहिल्यानगर (Balikashram Road, Savedi)</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.15] font-poppins">
              वरद नेत्रालय <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-amber-500 to-teal-500 bg-clip-text text-transparent">
                नेत्रसेवेचा आधुनिक दृष्टिकोन
              </span>
            </h1>

            {/* Consulting Doctors Highlight Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                <FaUserMd className="text-teal-500" /> Senior Consulting Ophthalmologists:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-poppins">Dr. Smita Prashant Patare</h4>
                  <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">DOS, AIOS, MOS</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-300">Senior Eye Surgeon & Cataract Specialist</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-poppins">Dr. Raosaheb Kundlik Borude</h4>
                  <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">MOS, AIOS</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-300">Retina, Perimetry & Refractive Specialist</p>
                </div>
              </div>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Offering computerized eye testing, stitchless phaco cataract surgery, automated perimetry, retina exams, diabetic eye care, and 100% cashless hospitalization options.
            </p>

            {/* Feature Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                <span>Computerized Eye Test</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                <span>Stitchless Cataract Phaco</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                <span>Automated Perimetry</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                <span>Diabetic Retina Care</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                <span>Pediatric & Squint Care</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                <span>Cashless Insurance</span>
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
                onClick={() => setIsVideoOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                <FaPlay className="text-sm group-hover:scale-110 transition-transform" />
                <span>Watch Official Video</span>
              </button>

              <a
                href={hospitalInfo.youtubeChannel}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-red-600/10 dark:bg-red-950/40 border border-red-500/40 hover:bg-red-600 hover:text-white text-red-600 dark:text-red-400 font-bold text-sm shadow-sm hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <FaYoutube className="text-xl text-red-600 dark:text-red-400 group-hover:text-white" />
                <span>YouTube Channel @VaradNetrayala</span>
              </a>
            </div>

          </motion.div>

          {/* Right Visual HD Logo & Direct Embedded Video Feature Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glowing Ambient Halo */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-600 via-amber-400 to-teal-400 opacity-30 blur-2xl"></div>
              
              {/* Direct Embedded Video Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 flex flex-col items-center justify-center text-center">
                
                {/* Directly Embedded YouTube Video Player */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl border-2 border-red-500/60 relative mb-4 bg-slate-950">
                  <iframe
                    className="w-full h-full border-0"
                    src="https://www.youtube.com/embed/a38nME-7Ocg?si=o-sudvOcUnn_1tbb"
                    title="Varad Netralaya Official YouTube Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="space-y-1.5 w-full">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-xl font-black text-blue-950 dark:text-white font-poppins">
                      वरद नेत्रालय Official Video
                    </h3>
                    <a
                      href={hospitalInfo.youtubeChannel}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold hover:bg-red-700 transition"
                    >
                      <FaYoutube /> Subscribe
                    </a>
                  </div>
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                    — नेत्रसेवेचा आधुनिक दृष्टिकोन —
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                    Near Anita Medical, Behind Hotel Parichay, Balikashram Road, Savedi, Ahilyanagar
                  </p>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl glass-panel shadow-soft text-slate-800 dark:text-white max-w-xs border border-white/40"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center text-xl shadow-md font-extrabold font-poppins">
                  4.9★
                </div>
                <div>
                  <h4 className="text-xs font-bold font-poppins">439+ Google Reviews</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">Top Rated Eye Clinic in Savedi</p>
                </div>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl glass-panel shadow-soft text-slate-800 dark:text-white border border-white/40"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-xl shadow-md">
                  <FaShieldAlt />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-poppins">100% Cashless Available</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">Zurich Kotak, Star Health, HDFC ERGO</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Official YouTube Video Tour Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 p-3 sm:p-5"
            >
              <div className="flex items-center justify-between p-3 border-b border-slate-800 text-white">
                <div>
                  <h3 className="text-lg font-bold font-poppins">Varad Netralaya - Official YouTube Video</h3>
                  <p className="text-xs text-slate-400">Balikashram Road, Savedi, Ahilyanagar</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={hospitalInfo.youtubeChannel}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <FaYoutube /> Visit Channel
                  </a>
                  <button
                    onClick={() => setIsVideoOpen(false)}
                    className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
              </div>

              {/* YouTube Video Player Iframe */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black mt-3 border border-slate-800">
                <iframe
                  className="w-full h-full border-0"
                  src="https://www.youtube.com/embed/a38nME-7Ocg?si=o-sudvOcUnn_1tbb&autoplay=1"
                  title="Varad Netralaya Official YouTube Video Player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Hero;
