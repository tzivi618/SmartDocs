// controllers/authController.ts
import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { logger } from '../config/logger';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register(name, email, password);
    logger.info(`User registered successfully: ${result.user._id}`);
    res.status(201).json(result);
  } catch (error: any) {
    logger.error(`Registration failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    logger.info(`Login successful for user: ${result.user._id}`);
    res.json(result);
  } catch (error: any) {
    logger.error(`Login failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const user = await authService.getUserById(userId);
    if (!user) {
      logger.info(`User not found: ${userId}`);
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error: any) {
    logger.error(`Fetching current user failed: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { name, email } = req.body;
    const updatedUser = await authService.updateUser(userId, { name, email });
    logger.info(`User profile updated: ${userId}`);
    res.json(updatedUser);
  } catch (error: any) {
    logger.error(`Update profile failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    await authService.deleteUserAndDocuments(userId);
    logger.info(`User and documents deleted: ${userId}`);
    res.json({ message: 'User and all documents deleted successfully' });
  } catch (error: any) {
    logger.error(`Delete user failed: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

