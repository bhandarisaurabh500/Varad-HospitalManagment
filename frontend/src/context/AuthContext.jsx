import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('varad_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data.success) {
        localStorage.setItem('varad_token', data.token);
        localStorage.setItem('varad_user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, user: data.user };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed. Check credentials.' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (full_name, email, phone, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { full_name, email, phone, password });
      if (data.success) {
        localStorage.setItem('varad_token', data.token);
        localStorage.setItem('varad_user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Registration failed.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('varad_token');
    localStorage.removeItem('varad_user');
    setUser(null);
    window.location.href = '/';
  };

  const isAdmin   = () => user?.role === 'ADMIN';
  const isDoctor  = () => user?.role === 'DOCTOR';
  const isPatient = () => user?.role === 'PATIENT';
  const isAuth    = () => !!user;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin, isDoctor, isPatient, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
