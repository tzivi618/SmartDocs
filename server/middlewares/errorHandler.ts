// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { logger } from '../config/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  logger.error(`Unhandled error: ${err.stack}`);

  if (err instanceof multer.MulterError) {
    logger.warn(`Multer error: ${err.message}`);
    res.status(400).json({ message: `Upload error: ${err.message}` });
    return;
  }

  res.status(500).json({ message: err.message || 'Server error' });
};


