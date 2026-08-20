const router = require('express').Router();
const { getServices, getServiceById, createService, updateService, deleteService } = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/',    getServices);
router.get('/:id', getServiceById);
router.post('/',   authMiddleware, roleMiddleware('ADMIN'), createService);
router.put('/:id', authMiddleware, roleMiddleware('ADMIN'), updateService);
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), deleteService);

module.exports = router;
