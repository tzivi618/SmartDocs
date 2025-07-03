// routes/authRoutes.ts
import { Router } from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, getCurrentUser, updateUserProfile, deleteUser } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
import { loginLimiter } from '../middlewares/rateLimiter';
import { logLoginAttempt, logRegisterAttempt } from '../middlewares/logActionsMiddleware';

const router = Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  validateRequest,
  logRegisterAttempt,
  registerUser
);

router.post(
  '/login',
  loginLimiter,
  [
    body('email').notEmpty().isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  logLoginAttempt,
  loginUser
);

router.get('/me', authMiddleware, getCurrentUser);
router.patch(
  '/me',
  authMiddleware,
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required')
  ],
  validateRequest,
  updateUserProfile
);
router.delete('/me', authMiddleware, deleteUser);

export default router;
