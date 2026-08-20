import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaPhoneAlt, FaCalendarCheck, FaRegEye, FaMapMarkerAlt, FaFileMedical, FaBuilding, FaMicroscope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  doctorsData,
  infrastructureData,
  servicesData,
  insurancePartnersData,
  patientGuidelinesData,
} from '../data/hospitalData';

// Reusable Section Heading
const SectionHeading = ({ title, subtitle, icon: Icon }) => (
  <div className="text-center mb-16">
    {Icon && (
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-6 shadow-inner">
        <Icon className="text-3xl" />
      </div>
    )}
    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
      {title}
    </h2>
    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto rounded-full mb-6"></div>
    {subtitle && (
      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium">
        {subtitle}
      </p>
    )}
  </div>
);

const HospitalInformation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const doctor = doctorsData.find((d) => d.id === 2); // Dr. Borude

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-600/90 dark:from-slate-950/80 dark:to-blue-950/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 text-blue-100 text-sm font-semibold tracking-wider mb-6 border border-blue-400/30 backdrop-blur-sm">
              COMPREHENSIVE OPHTHALMOLOGY
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
              Varad Netralaya <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-200">
                Hospital Information
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 font-light drop-shadow-sm">
              Explore our world-class facilities, advanced equipment, and comprehensive eye care services in Ahilyanagar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. DOCTOR PROFILE SECTION */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/20 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/50 dark:border-slate-800">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              
              {/* Image with CSS Cropping */}
              <div className="w-full lg:w-1/3 flex justify-center">
                <div className="relative w-72 h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="/photos/doctor/dr-ravsaheb-borude-poster.jpg" 
                    alt={doctor.name}
                    className="w-full h-full object-cover object-[center_15%]" 
                    /* object-position is adjusted to frame the face from the poster */
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-bold text-xl">{doctor.name}</p>
                    <p className="text-sm text-blue-200">{doctor.title}</p>
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="w-full lg:w-2/3">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
                  {doctor.name}
                </h3>
                <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-6">
                  {doctor.title} | {doctor.specialization}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                      <FaCheckCircle className="text-teal-500" /> Qualifications
                    </h4>
                    <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                      <li>• {doctor.title}</li>
                      <li>• Ophthalmology - Pune University</li>
                      <li>• {doctor.qualification}</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                      <FaCalendarCheck className="text-teal-500" /> Professional Experience
                    </h4>
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                      <li><strong className="text-slate-800 dark:text-slate-300 block">2002–2004</strong> Tulsi Eye Hospital, Nashik</li>
                      <li><strong className="text-slate-800 dark:text-slate-300 block">2004–2006</strong> Anandkrupa Hospital</li>
                      <li><strong className="text-slate-800 dark:text-slate-300 block">2006–2024</strong> Bhairavnath Eye Hospital</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-600 text-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="font-medium opacity-80 text-sm mb-1">Clinic Timings</p>
                    <p className="font-bold">{doctor.available}</p>
                  </div>
                  <Link to="/appointments" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                    Book Appointment
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. ADVANCED EQUIPMENT SECTION */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <SectionHeading title="Advanced Technology & Equipment" subtitle="World-class diagnostic and surgical technology for precise eye care" icon={FaMicroscope} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {infrastructureData.filter(i => i.type === "Equipment" || i.type.includes("Surgery")).map((item, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow group">
                <div className="h-48 overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
                  {/* Using object-cover to frame equipment from the brochure */}
                  <img 
                    src="/photos/documents/equipment-facilities.jpg" 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{
                      // Pseudo-random object position for visual variety until user replaces images
                      objectPosition: `${(index * 25) % 100}% ${(index * 15) % 100}%`
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.type}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">{item.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Advanced {item.type.toLowerCase()} technology used for precise diagnostics and safe surgical outcomes.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FACILITIES SECTION */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <SectionHeading title="Hospital Facilities" subtitle="Comfortable, sterile, and fully equipped infrastructure" icon={FaBuilding} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg">
              <div className="w-2/5 shrink-0">
                <img src="/photos/facilities/operation-theatre.png" alt="Modular OTs" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">3 Modular Operation Theaters</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">With Laminar Airflow for zero infection protocol during sensitive eye surgeries.</p>
              </div>
            </div>

            <div className="flex bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg">
              <div className="w-2/5 shrink-0">
                <img src="/photos/facilities/consultation-room.png" alt="OPDs" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">10 Well Equipped OPDs</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Advanced computerized OPD consultation rooms for accurate patient diagnosis.</p>
              </div>
            </div>

            <div className="flex bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg">
              <div className="w-2/5 shrink-0">
                <img src="/photos/facilities/hospital-ward.png" alt="Wards" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Premium Patient Rooms</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Super Deluxe, Deluxe Rooms, and Air Conditioned Male & Female General Wards.</p>
              </div>
            </div>

            <div className="flex bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg">
              <div className="w-2/5 shrink-0">
                <img src="/photos/facilities/hospital-ward.png" alt="Lounge" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Spacious Waiting Lounge</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Comfortable waiting areas and a dedicated Conference Hall for medical seminars.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES & TREATMENTS */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <SectionHeading title="Eye-Care Services" subtitle="Comprehensive treatments available under one roof" icon={FaRegEye} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">{service.title}</h3>
                <ul className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                      <FaCheckCircle className="text-teal-500 mt-1 mr-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EYE BANK & OPTICAL STORE (Split Section) */}
      <section className="py-12 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Eye Bank */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl overflow-hidden shadow-2xl relative text-center p-12 flex flex-col justify-center items-center">
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80')] bg-cover"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-black text-white mb-4">वरद आय बँक</h2>
                <h3 className="text-2xl font-bold text-blue-200 mb-6">Donate Eyes.. Save Lives..</h3>
                <p className="text-blue-100 mb-8 max-w-sm mx-auto">
                  नेत्रहिनाला नेत्रदान - जीवनाचे अमूल्य वरदान. Join our initiative to restore vision through corneal transplants (PKP, TPK, DMEK, DSEK).
                </p>
                <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-50 transition-colors">
                  Pledge Your Eyes
                </button>
              </div>
            </div>

            {/* Optical Store */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col">
              <div className="h-64 bg-slate-200 dark:bg-slate-700 relative">
                <img 
                  src="/photos/documents/equipment-facilities.jpg" 
                  alt="Ben Franklin Optical Store" 
                  className="w-full h-full object-cover object-bottom" 
                />
              </div>
              <div className="p-10 flex flex-col justify-center grow text-center">
                <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Ben Franklin</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mb-2">Branded Optical Store</p>
                <p className="text-slate-500 dark:text-slate-500">Premium frames, precise fitting, and a wide variety of lenses conveniently located inside the hospital.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CASHLESS INSURANCE & TPA */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <SectionHeading title="Cashless Insurance & TPA Facilities" subtitle="Empaneled with major health insurance providers for seamless cashless treatments" icon={FaFileMedical} />
          
          <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
              {insurancePartnersData.map((partner) => (
                <div key={partner.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <FaCheckCircle className="text-blue-500 mt-1 shrink-0" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">{partner.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center border-t border-slate-100 dark:border-slate-700 pt-8">
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                * Insurance / TPA facilities are subject to applicable terms, eligibility, and current policies. Please bring your Health Card and Aadhaar Card.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. POST-OPERATIVE CARE & INSTRUCTIONS (Marathi) */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <SectionHeading title="ऑपरेशननंतर घ्यावयाची काळजी" subtitle="Post-Operative Care & Patient Guidelines" />
          
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Care */}
            <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-3xl p-8 border border-blue-100 dark:border-blue-800/50">
              <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-6 border-b border-blue-200 dark:border-blue-800 pb-4">काळजी</h3>
              <ul className="space-y-4">
                {patientGuidelinesData.postOpCare.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold shrink-0 text-sm">{i+1}</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Medicines */}
              <div className="bg-teal-50/50 dark:bg-teal-900/10 rounded-3xl p-8 border border-teal-100 dark:border-teal-800/50">
                <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-400 mb-6 border-b border-teal-200 dark:border-teal-800 pb-4">औषधांविषयी</h3>
                <ul className="space-y-3">
                  {patientGuidelinesData.medicines.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Diet */}
              <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-3xl p-8 border border-amber-100 dark:border-amber-800/50 h-fit">
                <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-400 mb-6 border-b border-amber-200 dark:border-amber-800 pb-4">जेवणाविषयी</h3>
                <ul className="space-y-3">
                  {patientGuidelinesData.diet.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Notices */}
            <div className="bg-rose-50/50 dark:bg-rose-900/10 rounded-3xl p-8 border border-rose-100 dark:border-rose-800/50">
              <h3 className="text-2xl font-bold text-rose-800 dark:text-rose-400 mb-6 border-b border-rose-200 dark:border-rose-800 pb-4">महत्त्वाच्या सूचना</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {patientGuidelinesData.notices.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 9. PHACO SURGERY BENEFITS */}
      <section className="py-24 bg-slate-900 dark:bg-slate-950 text-white border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">फेको सर्जरी (Stitchless Cataract Surgery)</h2>
            <p className="text-xl text-slate-400">अतिसूक्ष्म कापाच्या बिन टाक्याच्या मोतीबिंदू शस्त्रक्रियेचे फायदे</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {patientGuidelinesData.phacoBenefits.map((benefit, idx) => (
              <div key={idx} className="bg-slate-800/50 hover:bg-slate-800 p-6 rounded-2xl flex items-center gap-6 transition-colors border border-slate-700/50">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-xl font-black shrink-0">
                  {idx + 1}
                </div>
                <p className="text-lg font-medium text-slate-200 leading-relaxed">
                  {/* Remove the prefix numbers from the OCR string as we use a styled circle */}
                  {benefit.replace(/^[१२३४५६७]\)\s*/, '')}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/contact" className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1">
              Contact Us for Surgery Info
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HospitalInformation;
