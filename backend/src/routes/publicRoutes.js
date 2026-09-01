const router = require('express').Router();
const {
  getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem,
  getReviews, getAllReviews, createReview, approveReview, deleteReview,
  submitContact,
} = require('../controllers/galleryReviewContactController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { uploadDocument } = require('../middleware/uploadMiddleware');
const { getEquipment, getAllEquipment, createEquipment, updateEquipment, deleteEquipment } = require('../controllers/equipmentController');
const { getNotices, getAllNotices, createNotice, updateNotice, deleteNotice } = require('../controllers/noticeController');
const { getServices, getServiceById, createService, updateService, deleteService } = require('../controllers/serviceController');
const { saveLead, getLeads, updateLeadStatus, deleteLead } = require('../controllers/leadController');

// Gallery
router.get('/gallery', getGallery);
router.post('/gallery', authMiddleware, roleMiddleware('ADMIN'), uploadDocument.single('image'), createGalleryItem);
router.put('/gallery/:id', authMiddleware, roleMiddleware('ADMIN'), uploadDocument.single('image'), updateGalleryItem);
router.delete('/gallery/:id', authMiddleware, roleMiddleware('ADMIN'), deleteGalleryItem);

// Reviews
router.get('/reviews', getReviews);
router.get('/reviews/all', authMiddleware, roleMiddleware('ADMIN'), getAllReviews);
router.post('/reviews', createReview);
router.put('/reviews/:id', authMiddleware, roleMiddleware('ADMIN'), approveReview);
router.delete('/reviews/:id', authMiddleware, roleMiddleware('ADMIN'), deleteReview);

// Contact
router.post('/contact', submitContact);

// Equipment
router.get('/equipment', getEquipment);
router.get('/equipment/all', authMiddleware, roleMiddleware('ADMIN'), getAllEquipment);
router.post('/equipment', authMiddleware, roleMiddleware('ADMIN'), uploadDocument.single('image'), createEquipment);
router.put('/equipment/:id', authMiddleware, roleMiddleware('ADMIN'), uploadDocument.single('image'), updateEquipment);
router.delete('/equipment/:id', authMiddleware, roleMiddleware('ADMIN'), deleteEquipment);

// Notices
router.get('/notices', getNotices);
router.get('/notices/all', authMiddleware, roleMiddleware('ADMIN'), getAllNotices);
router.post('/notices', authMiddleware, roleMiddleware('ADMIN'), createNotice);
router.put('/notices/:id', authMiddleware, roleMiddleware('ADMIN'), updateNotice);
router.delete('/notices/:id', authMiddleware, roleMiddleware('ADMIN'), deleteNotice);

// Services
router.get('/services', getServices);
router.get('/services/:id', getServiceById);
router.post('/services', authMiddleware, roleMiddleware('ADMIN'), createService);
router.put('/services/:id', authMiddleware, roleMiddleware('ADMIN'), updateService);
router.delete('/services/:id', authMiddleware, roleMiddleware('ADMIN'), deleteService);

// Leads
router.post('/leads', saveLead);
router.get('/leads', authMiddleware, roleMiddleware('ADMIN'), getLeads);
router.put('/leads/:id', authMiddleware, roleMiddleware('ADMIN'), updateLeadStatus);
router.delete('/leads/:id', authMiddleware, roleMiddleware('ADMIN'), deleteLead);

module.exports = router;
