const router = require('express').Router();
const { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/',    getDoctors);
router.get('/:id', getDoctorById);
router.post('/',   authMiddleware, roleMiddleware('ADMIN'), createDoctor);
router.put('/:id', authMiddleware, roleMiddleware('ADMIN'), updateDoctor);
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), deleteDoctor);

module.exports = router;
