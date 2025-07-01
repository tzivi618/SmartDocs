// middlewares/validateFields.ts
import { Request, Response, NextFunction } from 'express';

export const validateFields = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missing = requiredFields.filter(field => !(field in req.body));
    if (missing.length > 0) {
      res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
      return;
    }
    next();
  };
};
