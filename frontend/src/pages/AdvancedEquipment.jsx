import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { advancedEquipmentList } from '../data/hospitalData';

const AdvancedEquipment = () => {
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
            Advanced Eye Care <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Equipment</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            Advanced technology and modern equipment supporting comprehensive eye care.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advancedEquipmentList.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="h-64 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-contain bg-white p-4 transition-transform duration-700 hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white font-poppins">{item.name}</h3>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-slate-700 dark:text-slate-300 font-medium">{item.shortDesc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedEquipment;
