const router = require('express').Router();
const {
  createAppointment, getAppointments, getAppointmentById,
  updateStatus, rescheduleAppointment, cancelAppointment, getAvailableSlots
} = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public: check available slots
router.get('/slots', getAvailableSlots);

// Authenticated
router.use(authMiddleware);

router.post('/', roleMiddleware('PATIENT'), createAppointment);
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id/status', roleMiddleware('ADMIN', 'DOCTOR'), updateStatus);
router.put('/:id/reschedule', roleMiddleware('ADMIN', 'DOCTOR', 'PATIENT'), rescheduleAppointment);
router.delete('/:id', cancelAppointment);

module.exports = router;
