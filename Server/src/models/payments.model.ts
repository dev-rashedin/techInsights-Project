import { Schema, model, models } from 'mongoose';

export interface IPayment {
  email: string;
  price: number;
  transactionId: string;
  date: Date;
  subscriptionType: 'weekly' | 'monthly' | 'quarterly';
}

const paymentSchema = new Schema<IPayment>(
  {
    email: { type: String, required: true },
    price: { type: Number, required: true },
    transactionId: { type: String, required: true },
    date: { type: Date, required: true },
    subscriptionType: {
      type: String,
      enum: ['weekly', 'monthly', 'quarterly'],
      required: true,
    },
  },
  {
    collection: 'payments',
  },
);

export const Payment =
  models.Payment || model<IPayment>('Payment', paymentSchema);
