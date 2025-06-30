import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register(name, email, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const user = await authService.getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
