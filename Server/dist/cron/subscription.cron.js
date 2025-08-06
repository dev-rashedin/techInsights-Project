"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSubscriptionDowngradeJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const users_service_1 = require("../services/users.service");
// Schedule to run every minute
const startSubscriptionDowngradeJob = () => {
    node_cron_1.default.schedule('* * * * *', async () => {
        try {
            await (0, users_service_1.downgradeExpiredSubscriptions)();
        }
        catch (error) {
            console.error('❌ Error downgrading subscriptions:', error);
        }
    });
};
exports.startSubscriptionDowngradeJob = startSubscriptionDowngradeJob;
