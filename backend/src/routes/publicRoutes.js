const router = require('express').Router();
const {
  getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem,
  getReviews, getAllReviews, createReview, approveReview, deleteReview,
  submitContact,
} = require('../controllers/galleryReviewContactController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { uploadDocument } = require('../middleware/uploadMiddleware');

// Gallery
router.get('/gallery', getGallery);
router.post('/gallery', authMiddleware, roleMiddleware('ADMIN'), uploadDocument.single('image'), createGalleryItem);
router.put('/gallery/:id', authMiddleware, roleMiddleware('ADMIN'), updateGalleryItem);
router.delete('/gallery/:id', authMiddleware, roleMiddleware('ADMIN'), deleteGalleryItem);

// Reviews
router.get('/reviews', getReviews);
router.get('/reviews/all', authMiddleware, roleMiddleware('ADMIN'), getAllReviews);
router.post('/reviews', createReview);
router.put('/reviews/:id', authMiddleware, roleMiddleware('ADMIN'), approveReview);
router.delete('/reviews/:id', authMiddleware, roleMiddleware('ADMIN'), deleteReview);

// Contact
router.post('/contact', submitContact);

module.exports = router;
