import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  displayName: string;
  photoURL: string;
  premiumToken: string | null;
  role: 'user' | 'admin';
  status: 'verified' | 'requested' | 'remove-admin' | 'banned';
  subscription: 'usual' | 'premium';
}

export interface IUserWithValidation extends IUser {
  validationTime: number;
}
