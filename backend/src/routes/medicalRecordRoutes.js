const router = require('express').Router();
const { createRecord, getRecordById, updateRecord, getDoctorRecords } = require('../controllers/medicalRecordController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);

router.post('/', roleMiddleware('ADMIN', 'DOCTOR'), createRecord);
router.get('/doctor', roleMiddleware('DOCTOR'), getDoctorRecords);
router.get('/:id', roleMiddleware('ADMIN', 'DOCTOR'), getRecordById);
router.put('/:id', roleMiddleware('ADMIN', 'DOCTOR'), updateRecord);

module.exports = router;
