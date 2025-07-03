import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '../types/role.enum';
import DocumentModel from '../models/Document';
import fs from 'fs/promises';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: Role.USER,
  });

  await user.save();

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return { token, user };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return { token, user };
};

export const getUserById = async (userId: string) => {
  return await User.findById(userId).select('-password');
};

export const updateUser = async (userId: string, updateFields: Partial<{ name: string; email: string }>) => {
  if (updateFields.email) {
    const existingUser = await User.findOne({ email: updateFields.email, _id: { $ne: userId } });
    if (existingUser) {
      throw new Error('Email already in use');
    }
  }

  return await User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true }).select('-password');
};

export const deleteUserAndDocuments = async (userId: string) => {
  const documents = await DocumentModel.find({ owner: userId });

  for (const doc of documents) {
    try {
      await fs.unlink(doc.filePath);
    } catch (err) {
      console.error('Failed to delete file:', err);
    }
  }

  await DocumentModel.deleteMany({ owner: userId });
  await User.findByIdAndDelete(userId);
};