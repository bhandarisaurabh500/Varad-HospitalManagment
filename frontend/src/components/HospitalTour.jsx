import React from 'react';
import { FaHospital, FaExternalLinkAlt } from 'react-icons/fa';

const HospitalTour = () => {
  return (
    <div className="max-w-5xl mx-auto mt-24 mb-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <FaHospital className="text-emerald-500" />
          <span>Hospital Tour</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-poppins">
          See Our Hospital & Dr. Borude
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          A glimpse of Varad Netralaya — our facilities, consultation rooms, and operation theatres.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 4-Photo hospital grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden group h-52 col-span-2">
            <img src="/photos/Patients/Ophthalmologist Performing Slit Lamp Eye Exam.png" alt="Advanced Patient Care" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3">
              <p className="text-white text-xs font-bold">Advanced Patient Care</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group h-52">
            <img src="/photos/facilities/consultation-room.png" alt="Consultation Office" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3">
              <p className="text-white text-xs font-bold">Consultation Office</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden group h-52">
            <img src="/photos/Machine/3-modular-operation-theaters-with-laminar-airflow.png" alt="Operation Theatre" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3">
              <p className="text-white text-xs font-bold">Modular Operation Theatre</p>
            </div>
          </div>
        </div>

        {/* Native video player with poster */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col">
          <div className="relative w-full" style={{paddingTop: '56.25%'}}>
            <iframe
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="https://www.youtube.com/embed/a38nME-7Ocg?si=nUxtJ2LfHMWOWVsv"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-5">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Patient Experience & Hospital Tour</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Watch Dr. Raosaheb Borude examining patients at Varad Netralaya.</p>
            <div className="mt-4 flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Read our patient reviews on Justdial:</span>
              <a href="https://jsdl.in/RSL-BXC1787681221" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-600 dark:text-teal-400 text-xs font-bold hover:underline">
                <FaExternalLinkAlt className="text-[10px]" /> Review by Patient 1
              </a>
              <a href="https://jsdl.in/RSL-QAV1787681289" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-600 dark:text-teal-400 text-xs font-bold hover:underline">
                <FaExternalLinkAlt className="text-[10px]" /> Review by Patient 2
              </a>
              <a href="https://jsdl.in/RSL-HRZ1787681340" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-600 dark:text-teal-400 text-xs font-bold hover:underline">
                <FaExternalLinkAlt className="text-[10px]" /> Review by Patient 3
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalTour;
