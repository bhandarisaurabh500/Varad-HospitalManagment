const router = require('express').Router();
const { getDashboard, getUsers, getAdminAppointments, getContactMessages, markMessageRead, getDoctorDashboard } = require('../controllers/adminController');
const { getAllPatients, searchPatients, getPatientById, deletePatient } = require('../controllers/patientController');
const { createVisit } = require('../controllers/visitController');
const { createPrescription, getMedicines } = require('../controllers/prescriptionController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Admin-only routes
router.get('/dashboard',         authMiddleware, roleMiddleware('ADMIN'), getDashboard);
router.get('/users',             authMiddleware, roleMiddleware('ADMIN'), getUsers);
router.get('/appointments',      authMiddleware, roleMiddleware('ADMIN'), getAdminAppointments);
router.get('/patients',          authMiddleware, roleMiddleware('ADMIN', 'DOCTOR'), getAllPatients);
router.get('/patients/search',   authMiddleware, roleMiddleware('ADMIN', 'DOCTOR'), searchPatients);
router.get('/patients/:id',      authMiddleware, roleMiddleware('ADMIN', 'DOCTOR'), getPatientById);
router.delete('/patients/:id',   authMiddleware, roleMiddleware('ADMIN', 'DOCTOR'), deletePatient);

router.post('/visits',           authMiddleware, roleMiddleware('ADMIN', 'DOCTOR'), createVisit);
router.post('/prescriptions',    authMiddleware, roleMiddleware('ADMIN', 'DOCTOR'), createPrescription);
router.get('/medicines',         authMiddleware, roleMiddleware('ADMIN', 'DOCTOR'), getMedicines);

router.get('/contact-messages',  authMiddleware, roleMiddleware('ADMIN'), getContactMessages);
router.put('/contact-messages/:id/read', authMiddleware, roleMiddleware('ADMIN'), markMessageRead);

// Doctor dashboard
router.get('/doctor/dashboard', authMiddleware, roleMiddleware('DOCTOR'), getDoctorDashboard);

module.exports = router;
