import { Router } from 'express';
import { body } from 'express-validator';
import { getHealthAdvice, trackSymptom, getSymptomTrends } from '../controllers/aiController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Validation middleware
const validateHealthAdvice = [
  body('symptoms')
    .notEmpty()
    .withMessage('Symptoms are required')
    .isLength({ min: 3, max: 1000 })
    .withMessage('Symptoms must be between 3 and 1000 characters'),
  body('language')
    .optional()
    .isIn(['en', 'hi', 'mr'])
    .withMessage('Invalid language code')
];

const validateSymptomTracking = [
  body('symptom')
    .notEmpty()
    .withMessage('Symptom is required')
    .isLength({ min: 2, max: 200 })
    .withMessage('Symptom must be between 2 and 200 characters'),
  body('language')
    .optional()
    .isIn(['en', 'hi', 'mr'])
    .withMessage('Invalid language code')
];

// Routes
router.post('/health-advice', validateHealthAdvice, getHealthAdvice);
router.post('/track-symptom', validateSymptomTracking, trackSymptom);
router.get('/symptom-trends', authenticateToken, getSymptomTrends);

export default router; 