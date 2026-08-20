import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaUserMd, FaLock, FaEnvelope, FaUser, FaPhoneAlt, FaCheckCircle } from 'react-icons/fa';

const Login = () => {
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({ full_name: '', email: '', phone: '', password: '', confirmPassword: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(loginForm.email, loginForm.password);
    if (res.success) {
      const role = res.user.role;
      if (role === 'ADMIN')   navigate('/admin/dashboard');
      else if (role === 'DOCTOR')  navigate('/doctor/dashboard');
      else navigate('/patient/dashboard');
    } else {
      setError(res.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (regForm.password !== regForm.confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (regForm.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    const res = await register(regForm.full_name, regForm.email, regForm.phone, regForm.password);
    if (res.success) {
      navigate('/patient/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 text-white text-2xl mb-4 shadow-lg">
            <FaUserMd />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Varad Netralaya</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Patient & Staff Portal</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => { setTab('login'); setError(''); }}
              className={`flex-1 py-4 text-sm font-bold transition-all ${
                tab === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('register'); setError(''); }}
              className={`flex-1 py-4 text-sm font-bold transition-all ${
                tab === 'register'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm">
                {error}
              </div>
            )}

            {/* LOGIN FORM */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                      type="email" required
                      placeholder="your@email.com"
                      value={loginForm.email}
                      onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                      type={showPwd ? 'text' : 'password'} required
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" onClick={() => setShowPwd(p => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                      {showPwd ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-60"
                >
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>

                {/* Demo credentials */}
                <div className="mt-4 p-3 rounded-xl bg-blue-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <p className="font-bold text-blue-700 dark:text-teal-400">Demo Credentials:</p>
                  <p>🔑 Admin: admin@varadnetralaya.com / Admin@123</p>
                  <p>👨‍⚕️ Doctor: dr.borude@varadnetralaya.com / Doctor@123</p>
                  <p>🧑 Patient: ramesh.sharma@example.com / Patient@123</p>
                </div>
              </form>
            )}

            {/* REGISTER FORM */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                {[
                  { field: 'full_name', label: 'Full Name', icon: FaUser, type: 'text', placeholder: 'Your full name' },
                  { field: 'email', label: 'Email Address', icon: FaEnvelope, type: 'email', placeholder: 'your@email.com' },
                  { field: 'phone', label: 'Phone Number', icon: FaPhoneAlt, type: 'tel', placeholder: '10-digit mobile number' },
                ].map(({ field, label, icon: Icon, type, placeholder }) => (
                  <div key={field}>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{label}</label>
                    <div className="relative">
                      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                      <input
                        type={type} required={field !== 'phone'}
                        placeholder={placeholder}
                        value={regForm[field]}
                        onChange={e => setRegForm(p => ({ ...p, [field]: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}

                {[
                  { field: 'password', label: 'Password' },
                  { field: 'confirmPassword', label: 'Confirm Password' },
                ].map(({ field, label }) => (
                  <div key={field}>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">{label}</label>
                    <div className="relative">
                      <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                      <input
                        type="password" required minLength={6}
                        placeholder="Min 6 characters"
                        value={regForm[field]}
                        onChange={e => setRegForm(p => ({ ...p, [field]: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-60"
                >
                  {loading ? 'Creating Account…' : 'Create Patient Account'}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          <Link to="/" className="hover:text-blue-600">← Back to Varad Netralaya Website</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
