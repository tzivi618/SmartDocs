// server/services/authService.ts
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '../types/role.enum';
import DocumentModel from '../models/Document';
import { OAuth2Client } from 'google-auth-library';
import fs from 'fs/promises';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const client = new OAuth2Client(CLIENT_ID);

export const googleLogin = async (idToken: string) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload || !payload.email) {
    throw new Error('Invalid Google token');
  }

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    user = new User({
      name: payload.name || 'No Name',
      email: payload.email,
      password: '',
      role: Role.USER,
      avatar: payload.picture,
    });

    await user.save();
  } else {
    let needUpdate = false;
    if (!user.avatar && payload.picture) {
      user.avatar = payload.picture;
      needUpdate = true;
    }
    if (needUpdate) {
      await user.save();
    }
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return { token, user };
};

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
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return { user };
};

export const updateUser = async (userId: string, updateFields: Partial<{ name: string; email: string }>) => {
  if (updateFields.email) {
    const existingUser = await User.findOne({ email: updateFields.email, _id: { $ne: userId } });
    if (existingUser) {
      throw new Error('Email already in use');
    }
  }

  const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateFields }, { new: true }).select('-password');
  if (!updatedUser) {
    throw new Error('User not found');
  }
  return { user: updatedUser };
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

  return { message: 'User and all documents deleted successfully' };
};
