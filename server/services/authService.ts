import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '../types/role.enum';

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
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return { token, user };
};

export const getUserById = async (userId: string) => {
  return await User.findById(userId).select('-password');
};
