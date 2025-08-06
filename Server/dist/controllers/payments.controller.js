"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePayment = exports.createPaymentIntent = void 0;
const express_error_toolkit_1 = require("express-error-toolkit");
const payments_service_1 = require("../services/payments.service");
// POST /create-payment-intent
exports.createPaymentIntent = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const { price } = req.body;
    if (!price || isNaN(price)) {
        throw new express_error_toolkit_1.BadRequestError('Price must be a valid number');
    }
    const clientSecret = await (0, payments_service_1.createPaymentIntentService)(price);
    res.status(200).send({ clientSecret });
});
// POST /payments
exports.savePayment = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const paymentData = req.body;
    if (!paymentData?.email ||
        !paymentData?.price ||
        !paymentData?.transactionId ||
        !paymentData?.date ||
        !paymentData?.subscriptionType) {
        throw new express_error_toolkit_1.BadRequestError('All payment fields are required');
    }
    const result = await (0, payments_service_1.savePaymentService)(paymentData);
    res.status(200).send(result);
});
