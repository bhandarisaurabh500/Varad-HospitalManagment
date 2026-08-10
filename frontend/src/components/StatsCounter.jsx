import React from 'react';
import { motion } from 'framer-motion';
import { hospitalInfo } from '../data/hospitalData';
import { FaUserCheck, FaProcedures, FaUserMd, FaAward } from 'react-icons/fa';

const StatsCounter = () => {
  const statsList = [
    {
      id: 1,
      number: hospitalInfo.stats.happyPatients,
      label: "Happy Patients Restored",
      icon: FaUserCheck,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      number: hospitalInfo.stats.successfulSurgeries,
      label: "Successful Surgeries",
      icon: FaProcedures,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 3,
      number: hospitalInfo.stats.experiencedDoctors,
      label: "Experienced Specialists",
      icon: FaUserMd,
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 4,
      number: hospitalInfo.stats.yearsOfExperience,
      label: "Years Ophthalmic Excellence",
      icon: FaAward,
      color: "from-purple-500 to-violet-600"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white">
      {/* Background overlay pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsList.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-center hover:bg-white/10 transition-colors"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-2xl shadow-lg mb-3`}>
                  <Icon />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black font-poppins text-white tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-medium text-teal-300 mt-2 font-sans uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
