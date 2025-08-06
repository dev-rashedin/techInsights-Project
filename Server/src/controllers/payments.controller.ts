import { Request, Response } from 'express';
import { asyncHandler, BadRequestError } from 'express-error-toolkit';
import {
  createPaymentIntentService,
  savePaymentService,
} from '../services/payments.service';

// POST /create-payment-intent
export const createPaymentIntent = asyncHandler(
  async (req: Request, res: Response) => {
    const { price } = req.body;
    if (!price || isNaN(price)) {
      throw new BadRequestError('Price must be a valid number');
    }

    const clientSecret = await createPaymentIntentService(price);
    res.status(200).send({ clientSecret });
  },
);

// POST /payments
export const savePayment = asyncHandler(async (req: Request, res: Response) => {
  const paymentData = req.body;
  if (
    !paymentData?.email ||
    !paymentData?.price ||
    !paymentData?.transactionId ||
    !paymentData?.date ||
    !paymentData?.subscriptionType
  ) {
    throw new BadRequestError('All payment fields are required');
  }

  const result = await savePaymentService(paymentData);
  res.status(200).send(result);
});
