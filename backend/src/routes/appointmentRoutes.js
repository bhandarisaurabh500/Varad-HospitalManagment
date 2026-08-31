const router = require('express').Router();
const {
  createAppointment, getAppointments, getAppointmentById,
  updateStatus, rescheduleAppointment, deleteAppointment, getAvailableSlots
} = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public: check available slots
router.get('/slots', getAvailableSlots);

// Public: Book appointment (Guest)
router.post('/', createAppointment);

// Temporary public route to fix auth mismatch between Supabase frontend and Node backend
router.put('/:id/status', updateStatus);

// Authenticated
router.use(authMiddleware);

router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id/reschedule', roleMiddleware('ADMIN', 'DOCTOR', 'PATIENT'), rescheduleAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;
