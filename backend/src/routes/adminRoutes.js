const router = require('express').Router();
const { getDashboard, getUsers, getAdminAppointments, getContactMessages, markMessageRead, getDoctorDashboard } = require('../controllers/adminController');
const { getAllPatients } = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Admin-only routes
router.get('/dashboard',         authMiddleware, roleMiddleware('ADMIN'), getDashboard);
router.get('/users',             authMiddleware, roleMiddleware('ADMIN'), getUsers);
router.get('/appointments',      authMiddleware, roleMiddleware('ADMIN'), getAdminAppointments);
router.get('/patients',          authMiddleware, roleMiddleware('ADMIN'), getAllPatients);
router.get('/contact-messages',  authMiddleware, roleMiddleware('ADMIN'), getContactMessages);
router.put('/contact-messages/:id/read', authMiddleware, roleMiddleware('ADMIN'), markMessageRead);

// Doctor dashboard
router.get('/doctor/dashboard', authMiddleware, roleMiddleware('DOCTOR'), getDoctorDashboard);

module.exports = router;
