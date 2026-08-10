import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white dark:bg-slate-800 text-blue-600 dark:text-teal-400 flex items-center justify-center shadow-2xl border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white dark:hover:bg-teal-500 dark:hover:text-slate-950 transition-all duration-300 group"
        >
          {/* Circular Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1">
            <circle
              cx="20"
              cy="20"
              r="16"
              className="stroke-slate-200 dark:stroke-slate-700"
              strokeWidth="2.5"
              fill="transparent"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              className="stroke-blue-600 dark:stroke-teal-400 transition-all duration-150"
              strokeWidth="2.5"
              strokeDasharray="100"
              strokeDashoffset={100 - scrollProgress}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <FaArrowUp className="text-sm group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
