import React from 'react';
import Hero from '../components/Hero';
import DoctorProfile from '../components/DoctorProfile';
import Gallery from '../components/Gallery';
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
    <QuickFeatures />
    <StatsCounter />
    <Services />
    <WhyChooseUs />
    <DoctorProfile />
    <Testimonials />
    <GovtSchemes />
    <InsurancePartners />
    <AppointmentSection />
    <Gallery />
    <FAQSection />
    <ContactSection />
  </>
);

export default Home;
