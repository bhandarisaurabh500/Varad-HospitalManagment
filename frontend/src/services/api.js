import axios from 'axios';

const BASE_URL = import.meta.env.DEV 
  ? (import.meta.env.VITE_API_URL || 'http://localhost:5000/api')
  : '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

import { supabase } from '../lib/supabase';

// Attach JWT token to every request
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token || localStorage.getItem('varad_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

// Handle 401 globally (token expired)
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('varad_token');
      localStorage.removeItem('varad_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
