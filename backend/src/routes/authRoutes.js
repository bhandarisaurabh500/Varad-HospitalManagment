const router = require('express').Router();
const { body } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register',
  [
    body('full_name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
  ],
  register
);

router.post('/login',
  [
    body('email').notEmpty().withMessage('Username or email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

router.post('/forgot-password',
  [
    body('email').notEmpty().withMessage('Username or email is required')
  ],
  require('../controllers/authController').forgotPassword
);

router.post('/verify-otp',
  [
    body('email').notEmpty().withMessage('Username or email is required'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('Valid 6-digit OTP is required')
  ],
  require('../controllers/authController').verifyOtp
);

router.post('/reset-password',
  [
    body('email').notEmpty().withMessage('Username or email is required'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('Valid 6-digit OTP is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 chars')
  ],
  require('../controllers/authController').resetPassword
);

router.get('/me', authMiddleware, getMe);

module.exports = router;
