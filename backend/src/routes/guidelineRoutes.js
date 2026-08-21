const express = require('express');
const router = express.Router();
const {
  getGuidelines,
  createGuideline,
  updateGuideline,
  deleteGuideline
} = require('../controllers/guidelineController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public route to get guidelines
router.get('/', getGuidelines);

// Protected routes (Admin only)
router.post('/', protect, adminOnly, createGuideline);
router.put('/:id', protect, adminOnly, updateGuideline);
router.delete('/:id', protect, adminOnly, deleteGuideline);

module.exports = router;
