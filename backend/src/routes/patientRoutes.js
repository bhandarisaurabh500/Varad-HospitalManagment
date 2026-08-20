const router = require('express').Router();
const { getProfile, updateProfile, getPatientAppointments } = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware, roleMiddleware('PATIENT'));
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/appointments', getPatientAppointments);

module.exports = router;
