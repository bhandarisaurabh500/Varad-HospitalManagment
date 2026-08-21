import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { patientHealthcareData } from '../data/hospitalData';
import * as Icons from 'react-icons/fa';

const PatientHealthcare = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 font-poppins"
          >
            Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Healthcare</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            Guidelines and essential information for your eye care journey before, during, and after treatment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {patientHealthcareData.map((section, index) => {
            const IconComponent = Icons[section.icon] || Icons.FaBriefcaseMedical;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-200/50 dark:border-slate-800 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-2xl text-blue-600 dark:text-blue-400">
                    <IconComponent />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white font-poppins">{section.title}</h2>
                </div>
                
                {section.note && (
                  <p className="text-red-500 font-bold mb-4">{section.note}</p>
                )}
                
                <ul className="space-y-4">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <Icons.FaCheckCircle className="text-teal-500" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatientHealthcare;
