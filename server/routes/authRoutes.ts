// routes/authRoutes.ts

import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getCurrentUser);

export default router;
