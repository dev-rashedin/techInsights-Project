import { Schema, model } from 'mongoose';
import { IUser } from '../interface/users.interface';

// 1. TypeScript interface for User

// 2. Mongoose schema definition
const userSchema: Schema<IUser> = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  photoURL: { type: String, required: true },
  premiumToken: { type: String, default: null },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['verified', 'requested', 'remove-admin', 'banned'],
    default: 'verified',
  },
  subscription: {
    type: String,
    enum: ['usual', 'premium'],
    default: 'usual',
  },
});

// 3. Model export
export const User = model<IUser>('User', userSchema);
