"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Load environment variables
const config = {
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    transporterEmail: process.env.TRANSPORTER_EMAIL,
    transporterPass: process.env.TRANSPORTER_PASS,
    nodeEnv: process.env.NODE_ENV || 'development',
};
exports.default = config;
