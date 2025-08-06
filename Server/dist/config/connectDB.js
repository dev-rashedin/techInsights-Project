"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const mongoURI = `mongodb+srv://${config_1.default.dbUser}:${config_1.default.dbPassword}@cluster0.4qgkjzt.mongodb.net/techInsightsDB`;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(mongoURI);
        console.log('✅ Connected to MongoDB');
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('❌ MongoDB connection failed:', err.message);
        }
        else {
            console.error('❌ MongoDB connection failed:', err);
        }
        process.exit(1);
    }
};
exports.default = connectDB;
