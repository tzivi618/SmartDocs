// middlewares/validateFields.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger'; 
export const validateFields = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missing = requiredFields.filter(field => !(field in req.body));
    if (missing.length > 0) {
      logger.warn(`Validation failed: Missing fields - ${missing.join(', ')}`); 
      res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
      return;
    }
    logger.info('All required fields present'); 
    next();
  };
};

