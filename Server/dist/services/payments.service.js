"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePaymentService = exports.createPaymentIntentService = void 0;
const config_1 = __importDefault(require("../config/config"));
const payments_model_1 = require("../models/payments.model");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(config_1.default.stripeSecretKey, {
    apiVersion: '2024-06-20',
});
const createPaymentIntentService = async (price) => {
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
exports.createPaymentIntentService = createPaymentIntentService;
const savePaymentService = async (paymentData) => {
    return await payments_model_1.Payment.create(paymentData);
};
exports.savePaymentService = savePaymentService;
