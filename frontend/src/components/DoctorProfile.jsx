import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUserMd, FaAward, FaStethoscope, FaClock, FaPhoneAlt,
  FaStar, FaCheckCircle, FaHospital, FaNotesMedical,
  FaShieldAlt, FaTools, FaEye, FaFlask, FaChevronDown
} from 'react-icons/fa';
import { doctorsData, infrastructureData, patientGuidelinesData, insurancePartnersData } from '../data/hospitalData';

// ─── Section IDs mapped to tabs ────────────────────────────────────────────
const tabs = [
  { id: 'doctor',     label: 'Our Doctors',       icon: <FaUserMd />,      href: 'doctors' },
  { id: 'equipment',  label: 'Equipment',          icon: <FaTools />,       href: 'equipment' },
  { id: 'services',   label: 'Services',           icon: <FaEye />,         href: 'services' },
  { id: 'facilities', label: 'Facilities',         icon: <FaHospital />,    href: 'facilities' },
  { id: 'insurance',  label: 'Cashless Insurance', icon: <FaShieldAlt />,   href: 'insurance' },
  { id: 'guidelines', label: 'Patient Guidelines', icon: <FaNotesMedical />,href: 'guidelines' },
];

const equipmentList = [
  { name: 'IOL Master 700', category: 'Diagnostics', img: '/photos/Machine/images.jpg' },
  { name: 'Corneal Topography Machine', category: 'Diagnostics', img: '/photos/Machine/Corneal Topography Mashine.jpg' },
  { name: 'ZEISS Lumera I Microscope', category: 'Surgical', img: '/photos/Machine/ZEISS Iumera I Microscope.jpg' },
  { name: 'OCT + Angiography', category: 'Diagnostics', img: '/photos/Machine/OCT + Angiography.jpg' },
  { name: 'Vitrectomy Machine', category: 'Surgical', img: '/photos/Machine/Vitrectomy Machine.jpg' },
  { name: 'Green Laser', category: 'Therapeutic', img: '/photos/Machine/Green Laser.jpg' },
  { name: 'ZEISS Perimeter', category: 'Diagnostics', img: '/photos/Machine/ZEISS Perimeter.jpg' },
  { name: 'ND Yag Laser', category: 'Therapeutic', img: '/photos/Machine/ND YAG Laser.jpg' },
  { name: 'Ophthalmic Ultrasound Scanner', category: 'Diagnostics', img: '/photos/Machine/Ophthalmic Ultrasound Scanner.jpg' },
  { name: 'Cryotherapy Machine', category: 'Surgical', img: '/photos/Machine/Cryotherapy Machine.jpg' },
  { name: 'Zeiss Callisto', category: 'Cataract Surgery', img: '/photos/Machine/Zeiss Callisto.png' },
  { name: 'Schwind Amaris 750S', category: 'LASIK', img: '/photos/Machine/Schwind Amaris 750S.png' },
];

const servicesList = [
  { name: 'Phaco Cataract Surgery', desc: 'Stitchless micro-incision (Monofocal, Trifocal, Multifocal, EDOF, Toric)', icon: '👁️' },
  { name: 'LASIK Laser Surgery', desc: 'Bladeless LASIK using Schwind Amaris 750S German Technology', icon: '⚡' },
  { name: 'Glaucoma Treatment', desc: 'Diagnosis & treatment via OCT, Perimetry machines', icon: '🔬' },
  { name: 'Retina Services', desc: 'Advanced Medical & Surgical Retina care', icon: '🩺' },
  { name: 'Pediatric Eye Care', desc: 'Myopia Clinic, Squint diagnosis & treatment', icon: '👶' },
  { name: 'Varad Eye Bank', desc: 'PKP | TPK | DMEK | DSEK corneal transplants', icon: '❤️' },
  { name: 'Dry Eye Clinic', desc: 'Complete diagnosis & management of dry eye disease', icon: '💧' },
  { name: 'Oculoplasty', desc: 'Ptosis, eyelid tumor, orbital fracture treatment', icon: '🏥' },
  { name: 'Contact Lens Clinic', desc: 'Scleral lenses, specialty fitting', icon: '🔵' },
  { name: 'Neuro-Ophthalmology', desc: 'Complete neuro-eye care services', icon: '🧠' },
  { name: 'Keratoconus Care', desc: 'TREK, C3R, Scleral Contact Lenses', icon: '🔷' },
  { name: 'ROP Treatment', desc: 'Retinopathy of Prematurity screening & laser', icon: '🔦' },
];

const facilitiesList = [
  { name: '3 Modular Operation Theatres', desc: 'With Laminar Airflow — zero infection protocol', img: '/photos/facilities/operation-theatre.png' },
  { name: 'Super Deluxe & Deluxe Rooms', desc: 'Premium AC patient rooms with all amenities', img: '/photos/facilities/hospital-ward.png' },
  { name: 'AC General Ward', desc: 'Separate Male & Female general wards', img: '/photos/facilities/hospital-ward.png' },
  { name: '10 Well Equipped OPDs', desc: 'Advanced computerized OPD consultation rooms', img: '/photos/facilities/consultation-room.png' },
  { name: 'Conference Hall', desc: 'Spacious hall for medical seminars & training', img: '/photos/facilities/hospital-ward.png' },
  { name: 'Ben Franklin Optical Store', desc: 'International branded optical & spectacle store', img: '/photos/facilities/consultation-room.png' },
  { name: 'Medical Store & Laboratory', desc: 'In-house pharmacy and pathology lab', img: '/photos/facilities/hospital-ward.png' },
  { name: 'Spacious Waiting Lounge', desc: 'Comfortable, air-conditioned patient lounge', img: '/photos/facilities/hospital-ward.png' },
];

// ─── Main Component ─────────────────────────────────────────────────────────
const DoctorProfile = () => {
  const [activeTab, setActiveTab] = useState('doctor');
  const doctor = doctorsData.find(d => d.id === 2); // Dr. Borude

  // Listen for navbar tab-switch events
  React.useEffect(() => {
    const handler = (e) => {
      setActiveTab(e.detail);
      setTimeout(() => {
        const el = document.getElementById('profile-tabs');
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 50);
    };
    window.addEventListener('switch-profile-tab', handler);
    return () => window.removeEventListener('switch-profile-tab', handler);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    const el = document.getElementById('profile-tabs');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="doctors" className="bg-white dark:bg-slate-950">

      {/* ── Apollo-style Secondary Nav Bar ── */}
      <div id="profile-tabs" className="sticky top-[95px] z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar gap-1 py-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-[3px] transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-teal-400 dark:border-teal-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-teal-400 hover:border-blue-300'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <AnimatePresence mode="wait">

          {/* ── DOCTORS TAB ── */}
          {activeTab === 'doctor' && (
            <motion.div key="doctor" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <SectionHeading title="Meet Our Specialists" subtitle="Experienced ophthalmologists dedicated to your vision care" />
              <div className="space-y-10">
                <DoctorCard
                  doctor={{
                    ...doctor,
                    photo: '/photos/doctor/Dr.BorudeSir.png',
                    realPhoto: true,
                  }}
                  reverse={false}
                />
              </div>
            </motion.div>
          )}

          {/* ── EQUIPMENT TAB ── */}
          {activeTab === 'equipment' && (
            <motion.div key="equipment" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <SectionHeading title="State-of-the-Art Equipment" subtitle="World-class diagnostic and surgical technology for precise eye care" />
              <div className="mb-8 rounded-3xl overflow-hidden shadow-xl h-72 md:h-96 relative">
                <img src="/photos/documents/equipment-facilities.jpg" alt="Hospital Equipment" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 to-transparent flex items-center p-10">
                  <div className="text-white">
                    <p className="text-teal-400 font-bold text-sm uppercase tracking-widest mb-2">Advanced Technology</p>
                    <h3 className="text-3xl font-black font-poppins mb-3">12+ Advanced Diagnostic<br />& Surgical Systems</h3>
                    <p className="text-slate-300 max-w-md">Including ZEISS Lumera, IOL Master 700, Schwind Amaris 750S and many more world-class devices.</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {equipmentList.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="h-40 overflow-hidden">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded-full">{item.category}</span>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 mt-2 text-sm">{item.name}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── SERVICES TAB ── */}
          {activeTab === 'services' && (
            <motion.div key="services" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <SectionHeading title="Our Eye Care Services" subtitle="Comprehensive ophthalmology services from diagnosis to advanced surgery" />
              <div className="mb-10 grid md:grid-cols-2 gap-6">
                <div className="rounded-3xl overflow-hidden shadow-lg h-64">
                  <img src="/photos/services/lasik-services.png" alt="LASIK Surgery" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg h-64">
                  <img src="/photos/facilities/operation-theatre.png" alt="Operation Theatre" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {servicesList.map((svc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-teal-500 transition-all duration-300 group"
                  >
                    <div className="text-3xl mb-3">{svc.icon}</div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">{svc.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{svc.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── FACILITIES TAB ── */}
          {activeTab === 'facilities' && (
            <motion.div key="facilities" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <SectionHeading title="World-Class Facilities" subtitle="Premium infrastructure built for comfort, safety, and advanced care" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {facilitiesList.map((fac, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex gap-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-36 flex-shrink-0 overflow-hidden">
                      <img src={fac.img} alt={fac.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-5 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <FaCheckCircle className="text-teal-500 flex-shrink-0" />
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">{fac.name}</h4>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{fac.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── INSURANCE TAB ── */}
          {activeTab === 'insurance' && (
            <motion.div key="insurance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <SectionHeading title="Cashless Insurance Partners" subtitle="सर्व नामांकित कंपन्यांच्या कॅशलेस सुविधा उपलब्ध" />
              <div className="mb-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl">
                <div className="text-6xl">🛡️</div>
                <div>
                  <h3 className="text-2xl font-black mb-2">100% Cashless Facility Available</h3>
                  <p className="text-blue-100">Varad Netralaya is empaneled with all major insurance companies and TPAs. No upfront payment required for eligible procedures.</p>
                </div>
              </div>
              <div className="mb-6">
                <img src="/photos/documents/insurance-list.jpg" alt="Insurance Partners" className="w-full max-h-80 object-contain rounded-2xl border border-slate-200 dark:border-slate-700 shadow" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {insurancePartnersData.map((partner, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center gap-3 p-4 rounded-xl shadow-sm hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md transition-all"
                  >
                    <div className="w-2.5 h-2.5 bg-teal-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{partner.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── GUIDELINES TAB ── */}
          {activeTab === 'guidelines' && (
            <motion.div key="guidelines" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <SectionHeading title="Patient Guidelines" subtitle="ऑपरेशन नंतर घ्यावयाची काळजी व महत्त्वाच्या सूचना" />
              <div className="mb-8">
                <img src="/photos/documents/patient-guidelines.jpg" alt="Patient Care Guidelines" className="mx-auto max-h-96 object-contain rounded-2xl border border-slate-200 dark:border-slate-700 shadow" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GuidelinesBox title="ऑपरेशन नंतर घ्यावयाची काळजी" color="blue" items={patientGuidelinesData.postOpCare} />
                <div className="space-y-6">
                  <GuidelinesBox title="औषधांविषयी (Medicines)" color="emerald" items={patientGuidelinesData.medicines} />
                  <GuidelinesBox title="जेवणाविषयी (Diet)" color="orange" items={patientGuidelinesData.diet} />
                </div>
              </div>
              <div className="mt-8 bg-blue-50 dark:bg-slate-900 border border-blue-200 dark:border-slate-700 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-400 mb-4">फेको सर्जरीचे फायदे (Phaco Surgery Benefits)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {patientGuidelinesData.phacoBenefits.map((item, i) => (
                    <div key={i} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <FaCheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};

// ─── Apollo-style Doctor Card ───────────────────────────────────────────────
const DoctorCard = ({ doctor, reverse }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}
  >
    {/* Photo Side */}
    <div className="md:w-80 lg:w-96 flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-800 dark:to-slate-900">
      <img
        src={doctor.photo}
        alt={doctor.name}
        className="w-full h-full object-cover object-top min-h-[320px] md:min-h-[420px]"
      />
      {/* Rating Badge */}
      <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
        <FaStar className="text-amber-400 text-xs" />
        <span className="text-xs font-bold text-slate-800 dark:text-white">{doctor.rating}★</span>
      </div>
    </div>

    {/* Info Side */}
    <div className="flex-1 p-8 flex flex-col justify-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4 w-fit">
        <FaUserMd />
        Ophthalmologist
      </div>
      <h2 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white font-poppins">{doctor.name}</h2>
      <p className="text-base text-slate-500 dark:text-slate-400 mt-1 font-medium">{doctor.marathiName}</p>
      <p className="text-blue-600 dark:text-teal-400 font-bold mt-1 text-lg">{doctor.title}</p>
      <p className="text-slate-700 dark:text-slate-300 font-semibold text-sm mt-1">{doctor.university}</p>
      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{doctor.qualification}</p>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">{doctor.specialization}</p>

      {/* Stats Row */}
      <div className="flex flex-wrap gap-4 mt-5">
        <StatPill icon={<FaAward />} label={doctor.experience} color="blue" />
        <StatPill icon={<FaStethoscope />} label={doctor.surgeries} color="teal" />
        <StatPill icon={<FaStar />} label={`${doctor.rating}★ Rating`} color="amber" />
      </div>

      {/* Personal Contact */}
      <div className="mt-5 flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border-l-4 border-blue-500">
        <FaPhoneAlt className="text-blue-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Personal Mobile</p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">+91 9822315840</p>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">{doctor.bio}</p>

      {/* Schedule Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaClock className="text-emerald-500" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide text-xs">OPD Days</h4>
          </div>
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Tuesday, Thursday, Saturday</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-0.5">मंगळवार, गुरुवार, शनिवार</p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaUserMd className="text-indigo-500" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide text-xs">Operation Days</h4>
          </div>
          <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Monday, Wednesday, Friday</p>
          <p className="text-xs text-indigo-600 dark:text-indigo-500 mt-0.5">सोमवार, बुधवार, शुक्रवार</p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 flex gap-3 flex-wrap">
        <a href={`tel:+919822315840`} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-full transition shadow-lg">
          <FaPhoneAlt /> Call Doctor
        </a>
        <button
          onClick={() => { const el = document.getElementById('contact'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }}
          className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 dark:text-teal-400 dark:border-teal-400 font-bold text-sm px-6 py-3 rounded-full hover:bg-blue-50 dark:hover:bg-slate-800 transition"
        >
          <FaCalendarCheck /> Book Appointment
        </button>
      </div>
    </div>
  </motion.div>
);

// ─── Helper: Section Heading ─────────────────────────────────────────────────
const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-10">
    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">{title}</h2>
    <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 rounded-full mt-3 mb-3" />
    <p className="text-slate-500 dark:text-slate-400 text-base">{subtitle}</p>
  </div>
);

// ─── Helper: Stat Pill ───────────────────────────────────────────────────────
const StatPill = ({ icon, label, color }) => {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    teal: 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
    amber: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  };
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${colors[color]}`}>
      {icon} {label}
    </div>
  );
};

// ─── Helper: Guidelines Box ──────────────────────────────────────────────────
const GuidelinesBox = ({ title, color, items }) => {
  const colors = {
    blue: 'text-blue-800 dark:text-blue-400 bg-blue-50 dark:bg-slate-900 border-blue-200 dark:border-slate-700',
    emerald: 'text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-900 border-emerald-200 dark:border-slate-700',
    orange: 'text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-slate-900 border-orange-200 dark:border-slate-700',
  };
  return (
    <div className={`rounded-2xl border p-6 ${colors[color]}`}>
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span className="mt-1 flex-shrink-0">•</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorProfile;
