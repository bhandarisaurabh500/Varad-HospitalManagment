import React from 'react';
import { infrastructureData } from '../data/hospitalData';
import { FaStethoscope, FaHospital, FaStar, FaEye } from 'react-icons/fa';

const getIcon = (type) => {
  if (type === 'Equipment') return <FaStethoscope className="text-blue-500 text-3xl" />;
  if (type === 'Lasik Surgery') return <FaStar className="text-purple-500 text-3xl" />;
  if (type === 'Cataract Surgery') return <FaEye className="text-emerald-500 text-3xl" />;
  return <FaHospital className="text-amber-500 text-3xl" />;
};

const Infrastructure = () => {
  return (
    <section id="infrastructure" className="py-20 relative bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Advanced Infrastructure
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Equipped with state-of-the-art diagnostic and surgical technology to ensure the best care for your eyes.
          </p>
        </div>

        {/* Infrastructure Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infrastructureData.map((item, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-6 shadow-sm hover:shadow-soft transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(item.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.type}
                  </p>
                  {item.desc && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;
