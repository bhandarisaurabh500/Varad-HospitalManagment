import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUserMd } from 'react-icons/fa';

const Login = () => {
  const { login, resetPasswordForEmail, loading } = useAuth();
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isForgotPwd, setIsForgotPwd] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [resetEmail, setResetEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await login(loginForm.email, loginForm.password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await resetPasswordForEmail(resetEmail);
    if (res.success) {
      setSuccess('Password reset link sent to your email.');
      setIsForgotPwd(false);
    } else {
      setError(res.message || 'Failed to send reset email.');
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Left Side - Medical Visual / Branding (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 bg-blue-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 opacity-90 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-20" 
          style={{ backgroundImage: 'url(/photos/Clinic/1.jpg)' }} 
        />
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-white max-w-lg"
        >
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl mb-8 border border-white/20">
            <FaUserMd />
          </div>
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">Dr. Raosaheb K. Borude</h1>
          <h2 className="text-2xl font-medium text-teal-300 mb-6">CATARACT, GLAUCOMA & REFRACTIVE SURGEON</h2>
          <div className="w-16 h-1 bg-teal-400 mb-6 rounded-full" />
          <p className="text-xl text-blue-100 font-light tracking-wide">Professional Eye Care Management</p>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-8 sm:p-10"
        >
          <div className="text-center mb-10">
            <div className="lg:hidden w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6 shadow-lg">
              <FaUserMd />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Doctor Login</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Welcome back, Dr. Borude</p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-sm font-medium text-center"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 text-teal-600 dark:text-teal-400 text-sm font-medium text-center"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {!isForgotPwd ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email" 
                    required
                    placeholder="doctor@varadnetralaya.com"
                    value={loginForm.email}
                    onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPwd ? 'text' : 'password'} 
                    required
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPwd(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPwd ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-blue-500 transition-colors">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="peer-checked:bg-blue-600 absolute inset-0 rounded flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                      <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">Remember Me</span>
                </label>

                <button 
                  type="button"
                  onClick={() => { setIsForgotPwd(true); setError(''); setSuccess(''); }}
                  className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit" 
                disabled={loading}
                className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? 'Authenticating...' : 'Login to Dashboard'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 text-center">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email" 
                    required
                    placeholder="doctor@varadnetralaya.com"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
              
              <button
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors disabled:opacity-70"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <button 
                type="button"
                onClick={() => { setIsForgotPwd(false); setError(''); setSuccess(''); }}
                className="w-full py-4 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                Back to Login
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
