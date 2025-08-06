import config from '../config/config';
import { Payment, IPayment } from '../models/payments.model';
import Stripe from 'stripe';

const stripe = new Stripe(config.stripeSecretKey as string, {
  apiVersion: '2024-06-20',
});

export const createPaymentIntentService = async (price: number) => {
  const amount = Math.round(price * 100);

  if (amount < 50) {
    throw new Error('The amount must be at least 50 cents (0.50 USD).');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return paymentIntent.client_secret;
};

export const savePaymentService = async (paymentData: IPayment) => {
  return await Payment.create(paymentData);
};
