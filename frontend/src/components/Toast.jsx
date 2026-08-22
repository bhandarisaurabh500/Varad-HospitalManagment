import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const Toast = () => {
  const { toastMessage } = useTheme();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-20 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900 text-white shadow-2xl border border-teal-500/40 text-xs sm:text-sm font-semibold font-poppins"
        >
          <FaCheckCircle className="text-teal-400 text-lg flex-shrink-0" />
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
