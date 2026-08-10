import React from 'react';
import { motion } from 'framer-motion';
import { quickFeatures } from '../data/hospitalData';
import { FaAmbulance, FaUserMd, FaMicroscope, FaFileInvoiceDollar } from 'react-icons/fa';

const iconMap = {
  FaAmbulance: FaAmbulance,
  FaUserMd: FaUserMd,
  FaMicroscope: FaMicroscope,
  FaFileInvoiceDollar: FaFileInvoiceDollar,
};

const QuickFeatures = () => {
  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickFeatures.map((feature, index) => {
          const IconComponent = iconMap[feature.icon] || FaUserMd;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative p-6 rounded-2xl glass-card shadow-soft hover:shadow-xl transition-all duration-300 border border-slate-200/80 dark:border-slate-800 group"
            >
              {/* Top Pill Badge */}
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feature.color} text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent />
                </div>
                <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-teal-300 border border-slate-200 dark:border-slate-700">
                  {feature.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-poppins group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {feature.desc}
              </p>

              {/* Bottom decorative bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-blue-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                <span>Learn More</span>
                <span className="ml-1">→</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default QuickFeatures;
