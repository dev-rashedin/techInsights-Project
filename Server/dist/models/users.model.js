"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// 1. TypeScript interface for User
// 2. Mongoose schema definition
const userSchema = new mongoose_1.Schema({
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
exports.User = (0, mongoose_1.model)('User', userSchema);
