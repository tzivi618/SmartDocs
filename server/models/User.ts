// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import { Role } from '../types/role.enum';

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER }
  },
  { timestamps: true }
);

export default mongoose.model<IUser & Document>('User', UserSchema);
