import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserMd, FaHospital, FaNotesMedical, FaShieldAlt } from 'react-icons/fa';
import { doctorsData, infrastructureData, patientGuidelinesData, insurancePartnersData } from '../data/hospitalData';

const DoctorProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const doctor = doctorsData.find(d => d.id === 2); // Dr. Borude

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FaUserMd /> },
    { id: 'facilities', label: 'Facilities & Services', icon: <FaHospital /> },
    { id: 'guidelines', label: 'Patient Guidelines', icon: <FaNotesMedical /> },
    { id: 'insurance', label: 'Cashless Facilities', icon: <FaShieldAlt /> }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900" id="doctor-profile">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Comprehensive Care Information
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-slate-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 md:p-10 shadow-xl min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row gap-8 items-center md:items-start"
              >
                <div className="w-full md:w-1/3">
                  <img src={doctor.photo} alt={doctor.name} className="rounded-2xl shadow-lg w-full object-cover aspect-square" />
                </div>
                <div className="w-full md:w-2/3 space-y-4 text-slate-700 dark:text-slate-300">
                  <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-400">{doctor.name}</h3>
                  <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">{doctor.marathiName}</p>
                  <p className="font-bold">{doctor.title}</p>
                  <p className="text-blue-600 dark:text-blue-400">{doctor.specialization}</p>
                  <p>{doctor.qualification}</p>
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl mt-4 border-l-4 border-blue-500">
                    <h4 className="font-bold mb-2">Timings:</h4>
                    <p>{doctor.available}</p>
                  </div>
                  <p className="mt-4">{doctor.bio}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'facilities' && (
              <motion.div
                key="facilities"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-400 mb-6 border-b pb-2">Available Facilities & Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {infrastructureData.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">{item.name}</h4>
                      {item.desc && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>}
                      <span className="inline-block px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-md mt-2">{item.type}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'guidelines' && (
              <motion.div
                key="guidelines"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-4 flex items-center gap-2">
                      <FaNotesMedical className="text-blue-500" /> ऑपरेशन नंतर घ्यावयाची काळजी
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-4">
                      {patientGuidelinesData.postOpCare.slice(0, 7).map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">औषधांविषयी (Medicines)</h3>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-4 mb-6">
                      {patientGuidelinesData.medicines.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>

                    <h3 className="text-xl font-bold text-orange-500 dark:text-orange-400 mb-4">जेवणाविषयी (Diet)</h3>
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-4">
                      {patientGuidelinesData.diet.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-blue-100 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-4">फेको सर्जरीचे फायदे (Phaco Surgery Benefits)</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300">
                    {patientGuidelinesData.phacoBenefits.map((item, idx) => (
                      <li key={idx} className="flex gap-2"><span className="text-blue-500">•</span> {item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'insurance' && (
              <motion.div
                key="insurance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-400">सर्व नामांकित कंपन्यांच्या कॅशलेस सुविधा उपलब्ध</h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">Cashless facilities available for all major insurance companies</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {insurancePartnersData.map((partner) => (
                    <div key={partner.id} className="bg-white dark:bg-slate-900 flex items-center gap-3 p-3 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{partner.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfileTabs;
