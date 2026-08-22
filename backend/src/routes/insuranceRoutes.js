const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insuranceController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const isAdmin = roleMiddleware('ADMIN');

// Get all providers
router.get('/providers', authMiddleware, insuranceController.getProviders);

// Add new provider
router.post('/providers', authMiddleware, isAdmin, insuranceController.addProvider);

// Get policies for a patient
router.get('/policies/:patientId', authMiddleware, insuranceController.getPatientPolicies);

// Add/update a patient policy
router.post('/policies', authMiddleware, isAdmin, insuranceController.addPatientPolicy);

// Get all claims
router.get('/claims', authMiddleware, isAdmin, insuranceController.getAllClaims);

// Add a new claim
router.post('/claims', authMiddleware, isAdmin, insuranceController.submitClaim);

// Update claim status
router.put('/claims/:id', authMiddleware, isAdmin, insuranceController.updateClaimStatus);

module.exports = router;
