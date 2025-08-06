"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payments_controller_1 = require("../controllers/payments.controller");
const paymentsRouter = (0, express_1.Router)();
paymentsRouter.post('/create-payment-intent', payments_controller_1.createPaymentIntent);
paymentsRouter.post('/payments', payments_controller_1.savePayment);
exports.default = paymentsRouter;
