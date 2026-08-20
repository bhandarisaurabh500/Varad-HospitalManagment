import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import ScrollToTop from '../components/ScrollToTop';
import Toast from '../components/Toast';
import { AppointmentModal } from '../components/AppointmentSection';

const PublicLayout = ({ children }) => {
  return (
    <>
      <Toast />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <AppointmentModal />
    </>
  );
};

export default PublicLayout;
