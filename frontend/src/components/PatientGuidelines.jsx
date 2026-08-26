import React, { useState, useEffect } from 'react';
import { patientGuidelinesData } from '../data/hospitalData';
import { FaHeartbeat, FaPills, FaAppleAlt, FaExclamationCircle, FaStar } from 'react-icons/fa';
import api from '../services/api';

const PatientGuidelines = () => {
  const [activeTab, setActiveTab] = useState('postOpCare');
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get('/notices');
        if (res.data.success) {
          setNotices(res.data.data.map(n => n.notice_text));
        }
      } catch (err) {
        console.error('Failed to fetch notices:', err);
      }
    };
    fetchNotices();
  }, []);

  const tabs = [
    { id: 'postOpCare', label: 'Post-Op Care', icon: <FaHeartbeat /> },
    { id: 'medicines', label: 'Medicines', icon: <FaPills /> },
    { id: 'diet', label: 'Diet', icon: <FaAppleAlt /> },
    { id: 'notices', label: 'Important Notices', icon: <FaExclamationCircle /> },
    { id: 'phacoBenefits', label: 'Phaco Surgery Benefits', icon: <FaStar /> }
  ];

  const getActiveContent = () => {
    switch (activeTab) {
      case 'postOpCare': return patientGuidelinesData.postOpCare;
      case 'medicines': return patientGuidelinesData.medicines;
      case 'diet': return patientGuidelinesData.diet;
      case 'notices': return notices.length > 0 ? notices : patientGuidelinesData.notices;
      case 'phacoBenefits': return patientGuidelinesData.phacoBenefits;
      default: return [];
    }
  };

  return (
    <section id="guidelines" className="py-20 relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Patient Guidelines & Information
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Essential instructions for pre-operation and post-operation care (ऑपरेशन नंतर घ्यावयाची काळजी).
          </p>
        </div>

        {/* Tabs Container */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap border-b border-slate-200 dark:border-slate-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[150px] flex items-center justify-center space-x-2 py-4 px-4 font-medium transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 hover:text-blue-600 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8">
            <ul className="space-y-4">
              {getActiveContent().map((item, index) => (
                <li key={index} className="flex items-start space-x-3 text-slate-700 dark:text-slate-300 text-lg">
                  <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientGuidelines;
