import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat } from 'react-icons/fa';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white p-4"
        >
          {/* Animated HD Logo Container */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Outer Glowing Pulsing Rings */}
            <motion.div
              animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -inset-6 rounded-full bg-gradient-to-tr from-blue-600 via-amber-400 to-teal-400 opacity-50 blur-xl"
            />
            
            {/* Circular HD Emblem Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white p-4 shadow-2xl border-4 border-amber-400 flex items-center justify-center relative z-10"
            >
              <FaHeartbeat className="text-6xl text-amber-500 animate-pulse" />
            </motion.div>

            {/* Rotating dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute -inset-4 border-2 border-dashed border-amber-400/80 rounded-full"
            />
          </div>

          {/* Slogan & Title */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center space-y-2"
          >
            <h1 className="text-3xl sm:text-4xl font-black tracking-wide text-white font-poppins">
              Dr. Rohidas K. <span className="text-teal-400">BORUDE</span>
            </h1>
            
            <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-xs sm:text-sm tracking-wider uppercase bg-slate-900/90 px-5 py-1.5 rounded-full border border-amber-500/40 shadow-md">
              <span>Cataract, Glaucoma & Refractive Surgeon</span>
            </div>

            <p className="text-xs text-slate-400 tracking-wider flex items-center justify-center gap-1.5 mt-2">
              <FaHeartbeat className="text-rose-500 animate-pulse" /> Ahilyanagar, Maharashtra
            </p>
          </motion.div>

          {/* Loading bar */}
          <div className="w-56 h-1.5 bg-slate-800 rounded-full mt-8 overflow-hidden border border-slate-700">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-blue-600 via-amber-400 to-teal-400"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
