import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, refreshToken, logout } from '../controllers/authController';

const router = Router();

// Validation middleware
const validateRegistration = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
  body('role')
    .optional()
    .isIn(['patient', 'doctor', 'admin', 'staff'])
    .withMessage('Invalid role')
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router; 