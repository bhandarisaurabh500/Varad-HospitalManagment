import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickFeatures from './components/QuickFeatures';
import About from './components/About';
import Services from './components/Services';
import EyeTreatments from './components/EyeTreatments';
import Doctors from './components/Doctors';
import WhyChooseUs from './components/WhyChooseUs';
import StatsCounter from './components/StatsCounter';
import GovtSchemes from './components/GovtSchemes';
import InsurancePartners from './components/InsurancePartners';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import FAQSection from './components/FAQSection';
import AppointmentSection, { AppointmentModal } from './components/AppointmentSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import Toast from './components/Toast';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 overflow-x-hidden selection:bg-blue-600 selection:text-white">
        {/* Entry Preloader */}
        <Preloader />

        {/* Global Toast */}
        <Toast />

        {/* Sticky Header Navbar */}
        <Navbar />

        {/* Hero Banner */}
        <main>
          <Hero />
          <QuickFeatures />
          <About />
          <Services />
          <EyeTreatments />
          <Doctors />
          <WhyChooseUs />
          <StatsCounter />
          <GovtSchemes />
          <InsurancePartners />
          <Testimonials />
          <Gallery />
          <FAQSection />
          <AppointmentSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Utilities */}
        <FloatingWhatsApp />
        <ScrollToTop />
        <AppointmentModal />
      </div>
    </ThemeProvider>
  );
}

export default App;
