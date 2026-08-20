import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserMd, FaGraduationCap, FaAward, FaClock, FaPhoneAlt,
  FaCalendarCheck, FaMapMarkerAlt, FaStethoscope, FaEye,
  FaShieldAlt, FaNotesMedical, FaHospital, FaTimes, FaSearchPlus
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const DoctorPortfolio = () => {
  const { openAppointmentModal } = useTheme();
  const [activePanel, setActivePanel] = useState(null);

  const specializations = [
    { label: "Cataract (Phaco)", color: "from-blue-500 to-indigo-600" },
    { label: "Glaucoma (OCT)", color: "from-teal-500 to-cyan-600" },
    { label: "LASIK Surgery", color: "from-purple-500 to-violet-600" },
    { label: "Retina Services", color: "from-rose-500 to-pink-600" },
    { label: "Cornea Transplant", color: "from-amber-500 to-orange-600" },
    { label: "Squint & Pediatric", color: "from-emerald-500 to-green-600" },
  ];

  const timeline = [
    { year: "2002-2004", place: "Tulsi Eye Hospital, Nashik", role: "Ophthalmic Surgeon" },
    { year: "2005-2006", place: "Anandrishiji Hospital", role: "Eye Specialist" },
    { year: "2006-2024", place: "Bhairavnath Eye Hospital", role: "Senior Ophthalmologist" },
    { year: "2024-Now", place: "Varad Netralaya, Ahilyanagar", role: "Founder & Chief Surgeon", current: true },
  ];

  const infoPanels = [
    {
      id: "equipment",
      title: "Hospital Equipment",
      subtitle: "?????? ??????",
      badge: "Equipment",
      badgeColor: "bg-blue-500",
      imageUrl: "/photos/hospital-equipment.jpeg",
      desc: "IOL Master 700, ZEISS Lumera Microscope, OCT + Angiography, Vitrectomy Machine, Modular OTs with Laminar Airflow, Schwind Amaris 750S LASIK and more.",
    },
    {
      id: "services",
      title: "Available Services",
      subtitle: "?????? ??????",
      badge: "Services",
      badgeColor: "bg-emerald-500",
      imageUrl: "/photos/available-services.jpeg",
      desc: "Phaco surgery, Glaucoma (OCT, Perimetry), Medical & Surgical Retina, Pediatric Ophthalmology, Varad Eye Bank, Dry Eye Clinic, LASIK and more.",
    },
    {
      id: "insurance",
      title: "Insurance Partners",
      subtitle: "?????? ??????",
      badge: "Cashless",
      badgeColor: "bg-violet-500",
      imageUrl: "/photos/insurance-partners.jpeg",
      desc: "Cashless facility with all major TPA companies including New India Assurance, Star Health, HDFC ERGO, PMJAY, MJPJAY and 20+ more partners.",
    },
    {
      id: "patientcare",
      title: "Patient Care Guidelines",
      subtitle: "?????? ???? ?????",
      badge: "Patient Info",
      badgeColor: "bg-rose-500",
      imageUrl: "/photos/patient-care-guidelines.jpeg",
      desc: "Post-operative care instructions in Marathi, medicine schedules, dietary advice, and Phaco surgery benefits guide for patients.",
    },
  ];

  return (
    <section id="doctor-portfolio" className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* PORTFOLIO HERO */}
        <div className="flex flex-col lg:flex-row gap-14 items-center lg:items-start mb-24">

          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-[360px] flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-500 via-teal-400 to-blue-700 opacity-60 blur-md" />
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <img
                  src="/photos/dr-borude-profile.jpeg"
                  alt="Dr. Raosaheb Kundlik Borude"
                  className="w-full object-cover"
                  style={{ maxHeight: "480px", objectPosition: "top" }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-6">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Varad Netralaya, Ahilyanagar</span>
                  <p className="text-white font-bold text-lg mt-1">22+ Years Experience</p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-900 rounded-2xl px-5 py-4 shadow-2xl border border-slate-200/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white text-lg">?</div>
                  <div>
                    <p className="text-xs text-slate-500">Google Rating</p>
                    <p className="text-lg font-extrabold text-slate-900 dark:text-white">4.9 / 5.0</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 pt-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <FaUserMd />
              <span>Senior Ophthalmologist - Cataract, Glaucoma & Refractive Surgeon</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white font-poppins leading-tight">
              Dr. Raosaheb<br />
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Kundlik Borude</span>
            </h2>
            <p className="text-slate-400 text-lg mt-1">??. ???????? ??????? ??????</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {["M.B.B.S.", "D.O.M.S.", "F.I.G.O.", "Fellowship Phacosurgery"].map(q => (
                <span key={q} className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">{q}</span>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              {specializations.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r ${spec.color} text-white text-xs font-semibold shadow-lg`}
                >
                  {spec.label}
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FaGraduationCap /> Career Timeline
              </h4>
              <div className="space-y-3">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-start gap-4 p-3 rounded-xl border ${item.current ? "bg-blue-500/10 border-blue-500/30" : "bg-slate-900/50 border-slate-800"}`}
                  >
                    <div className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.current ? "bg-teal-400" : "bg-slate-600"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 font-mono">{item.year}</p>
                      <p className="text-sm font-bold text-white truncate">{item.place}</p>
                      <p className="text-xs text-slate-400">{item.role}</p>
                    </div>
                    {item.current && (
                      <span className="text-[10px] font-bold bg-teal-400/20 text-teal-400 px-2 py-0.5 rounded-full flex-shrink-0">CURRENT</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <a href="tel:+919822315840" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-semibold transition">
                <FaPhoneAlt className="text-teal-400" /> +91 98223 15840
              </a>
              <button
                onClick={() => openAppointmentModal("Dr. Raosaheb Kundlik Borude")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition"
              >
                <FaCalendarCheck /> Book Appointment
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
              <FaClock className="text-teal-400" />
              <span>OPD: <strong className="text-white">Tue, Thu, Sat</strong> &nbsp;|&nbsp; Surgery: <strong className="text-white">Mon, Wed, Fri</strong></span>
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400">
              <FaMapMarkerAlt className="text-rose-400" />
              <span>Near Anita Medical, Behind Hotel Parichay, Savedi, Ahilyanagar</span>
            </div>
          </motion.div>
        </div>

        {/* INFO PANELS (4 photos) */}
        <div className="mt-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <FaHospital />
              <span>Hospital Information</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-poppins">Our Facilities at a Glance</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {infoPanels.map((panel, i) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setActivePanel(panel)}
                className="group relative rounded-3xl overflow-hidden border border-white/5 shadow-xl cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                style={{ minHeight: "300px" }}
              >
                <img
                  src={panel.imageUrl}
                  alt={panel.title}
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className={`absolute top-4 left-4 ${panel.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider`}>
                  {panel.badge}
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaSearchPlus className="text-xs" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-slate-400 text-[10px] font-medium mb-0.5">{panel.subtitle}</p>
                  <h4 className="text-white font-bold text-base font-poppins">{panel.title}</h4>
                  <p className="text-slate-300 text-xs mt-1.5 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {panel.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activePanel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md" onClick={() => setActivePanel(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <button onClick={() => setActivePanel(null)} className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-800/80 text-white hover:bg-rose-600 transition">
                <FaTimes />
              </button>
              <div className="flex items-center justify-center bg-black max-h-[65vh] overflow-hidden">
                <img src={activePanel.imageUrl} alt={activePanel.title} className="max-h-[65vh] w-auto object-contain" />
              </div>
              <div className="p-6">
                <span className={`inline-block text-[10px] font-bold text-white px-3 py-1 rounded-full ${activePanel.badgeColor} uppercase tracking-wider mb-2`}>
                  {activePanel.badge}
                </span>
                <h3 className="text-xl font-bold text-white font-poppins">{activePanel.title}</h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">{activePanel.desc}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DoctorPortfolio;
