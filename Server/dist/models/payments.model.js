"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    price: { type: Number, required: true },
    transactionId: { type: String, required: true },
    date: { type: Date, required: true },
    subscriptionType: {
        type: String,
        enum: ['weekly', 'monthly', 'quarterly'],
        required: true,
    },
}, {
    collection: 'payments',
});
exports.Payment = mongoose_1.models.Payment || (0, mongoose_1.model)('Payment', paymentSchema);
