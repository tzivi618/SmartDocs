//middlewares/validateObjectId.ts
import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { logger } from '../config/logger'; 

export const validateObjectId = (paramName: string): RequestHandler => {
  return (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
      logger.warn(`Invalid ObjectId: ${req.params[paramName]}`); 
      res.status(400).json({ message: 'Invalid ID format' });
      return;
    }
    next();
  };
};
