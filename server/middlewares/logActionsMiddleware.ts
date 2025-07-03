// middlewares/logActionsMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export const logRegisterAttempt = (req: Request, res: Response, next: NextFunction): void => {
  logger.debug(`POST /auth/register - Attempting to register new user`);
  next();
};

export const logLoginAttempt = (req: Request, res: Response, next: NextFunction): void => {
  logger.debug(`POST /auth/login - Attempting to login`);
  next();
};
