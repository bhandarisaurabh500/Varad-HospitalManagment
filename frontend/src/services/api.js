import axios from 'axios';

// Use relative path for all environments.
// - Local dev: Vite proxy routes /api to http://localhost:5000
// - Production: vercel.json routes /api to the backend function
const BASE_URL = '/api';

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
