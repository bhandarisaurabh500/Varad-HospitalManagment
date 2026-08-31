import React from 'react';
import Hero from '../components/Hero';
import DoctorBio from '../components/DoctorBio';
import PremiumEyeVideo from '../components/PremiumEyeVideo';
import AdvancedEquipmentHighlight from '../components/AdvancedEquipmentHighlight';
import PatientHealthcareHighlight from '../components/PatientHealthcareHighlight';
import ContactSection from '../components/ContactSection';
import AppointmentSection from '../components/AppointmentSection';
import StatsCounter from '../components/StatsCounter';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import WhyChooseUs from '../components/WhyChooseUs';
import QuickFeatures from '../components/QuickFeatures';
import GovtSchemes from '../components/GovtSchemes';
import FAQSection from '../components/FAQSection';
import InsurancePartners from '../components/InsurancePartners';

const Home = () => (
  <>
    <Hero />
    <PremiumEyeVideo />
    <Services />
    <AdvancedEquipmentHighlight />
    <PatientHealthcareHighlight />
    <WhyChooseUs />
    <QuickFeatures />
    <StatsCounter />
    <Testimonials />
    <GovtSchemes />
    <InsurancePartners />
    <AppointmentSection />
    <FAQSection />
    <ContactSection />
  </>
);

export default Home;
