import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('varad_theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('varad_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('varad_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const openAppointmentModal = (doctor = null, treatment = null) => {
    setSelectedDoctor(doctor);
    setSelectedTreatment(treatment);
    setAppointmentModalOpen(true);
  };

  const closeAppointmentModal = () => {
    setAppointmentModalOpen(false);
    setSelectedDoctor(null);
    setSelectedTreatment(null);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <ThemeContext.Provider value={{
      darkMode,
      toggleDarkMode,
      appointmentModalOpen,
      openAppointmentModal,
      closeAppointmentModal,
      selectedDoctor,
      selectedTreatment,
      showToast,
      toastMessage
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
