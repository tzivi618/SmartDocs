// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../config/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token;

  if (!token) {
    logger.warn('Authorization failed: No token provided'); 
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    (req as any).user = decoded;
    logger.info(`User authenticated: ${decoded.id}`);
  } catch (error) {
    logger.warn(`Invalid token: ${error}`);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
