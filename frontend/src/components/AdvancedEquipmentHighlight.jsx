import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { advancedEquipmentList } from '../data/hospitalData';
import { FaMicroscope, FaArrowRight } from 'react-icons/fa';

const AdvancedEquipmentHighlight = () => {
  // Take only the first 3 or 4 for highlight
  const highlightItems = advancedEquipmentList.slice(0, 3);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 text-sm font-bold mb-4">
              <FaMicroscope />
              <span>Modern Technology</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">
              Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Equipment</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
              Equipped with state-of-the-art diagnostic and surgical technology to ensure the highest precision for your eye care.
            </p>
          </div>
          
          <Link 
            to="/advanced-equipment"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-teal-400 font-bold hover:shadow-md hover:border-blue-300 dark:hover:border-slate-700 transition-all group"
          >
            <span>View All Equipment</span>
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {highlightItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-md border border-slate-200/60 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-contain bg-white p-4 transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white font-poppins">{item.name}</h3>
              </div>
              <div className="p-5">
                <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">{item.shortDesc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedEquipmentHighlight;
