const router = require('express').Router();
const { scanDocumentHandler, verifyScan, getScanById } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { uploadDocument } = require('../middleware/uploadMiddleware');

router.use(authMiddleware, roleMiddleware('ADMIN', 'DOCTOR'));

router.post('/scan-document', uploadDocument.single('file'), scanDocumentHandler);
router.post('/verify-scan', verifyScan);
router.get('/scans/:id', getScanById);

module.exports = router;
