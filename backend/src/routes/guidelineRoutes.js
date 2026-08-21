const express = require('express');
const router = express.Router();
const {
  getGuidelines,
  createGuideline,
  updateGuideline,
  deleteGuideline
} = require('../controllers/guidelineController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public route to get guidelines
router.get('/', getGuidelines);

// Protected routes (Admin only)
router.post('/', authMiddleware, roleMiddleware('ADMIN'), createGuideline);
router.put('/:id', authMiddleware, roleMiddleware('ADMIN'), updateGuideline);
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), deleteGuideline);

module.exports = router;
