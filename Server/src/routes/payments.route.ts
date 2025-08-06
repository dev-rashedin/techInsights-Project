import { Router } from 'express';
import {
  createPaymentIntent,
  savePayment,
} from '../controllers/payments.controller';

const paymentsRouter = Router();

paymentsRouter.post('/create-payment-intent', createPaymentIntent);
paymentsRouter.post('/payments', savePayment);

export default paymentsRouter;
