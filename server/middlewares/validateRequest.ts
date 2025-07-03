//middlewares/logRequests.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { logger } from '../config/logger'; // הוספה: ייבוא logger

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation errors: ${JSON.stringify(errors.array())}`); // הוספה: log אזהרה
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

