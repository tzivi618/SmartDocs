// middlewares/logRequests.ts
import { Request, Response, NextFunction } from 'express';
import { accessLogger } from '../config/logger';

export const logRequests = (req: Request, res: Response, next: NextFunction): void => {
  res.on('finish', () => {
    accessLogger.info(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
};

