const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const authRoutes          = require('./routes/authRoutes');
const doctorRoutes        = require('./routes/doctorRoutes');
const serviceRoutes       = require('./routes/serviceRoutes');
const appointmentRoutes   = require('./routes/appointmentRoutes');
const patientRoutes       = require('./routes/patientRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
const aiRoutes            = require('./routes/aiRoutes');
const adminRoutes         = require('./routes/adminRoutes');
const publicRoutes        = require('./routes/publicRoutes');
const guidelineRoutes     = require('./routes/guidelineRoutes');
const errorMiddleware     = require('./middleware/errorMiddleware');

const app = express();

// ── Security & Logging ──────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── CORS ────────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.CLIENT_URL, 
    'http://localhost:5173', 
    'https://frontend-gules-one-59.vercel.app',
    'https://frontend-git-main-bhandarisaurabh500s-projects.vercel.app',
    'https://frontend-mo28yw2bp-bhandarisaurabh500s-projects.vercel.app',
    'https://varad-netralaya.vercel.app'
  ],
  credentials: true,
}));

// ── Body parsing ────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Static files (uploads — NOT publicly served for medical files)
// Serve uploads only to authenticated users via API in production.
// For development, serve directly:
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Varad Netralaya API is running.', timestamp: new Date() });
});

// ── API Routes ───────────────────────────────────────────────
app.use('/api/auth',            authRoutes);
app.use('/api/doctors',         doctorRoutes);
app.use('/api/services',        serviceRoutes);
app.use('/api/appointments',    appointmentRoutes);
app.use('/api/patients',        patientRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/ai',              aiRoutes);
app.use('/api/admin',           adminRoutes);
app.use('/api',                 publicRoutes);
app.use('/api/guidelines',      guidelineRoutes);

// ── 404 handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ── Centralized error handler ────────────────────────────────
app.use(errorMiddleware);

module.exports = app;
