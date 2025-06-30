// interfaces/IUser.ts

import { Role } from '../types/role.enum';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
