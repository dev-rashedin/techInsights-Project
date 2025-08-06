"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downgradeExpiredSubscriptions = exports.updateUserProfileService = exports.createOrUpdateUser = exports.fetchUserByEmail = exports.fetchAllUsers = void 0;
const express_error_toolkit_1 = require("express-error-toolkit");
const users_model_1 = require("../models/users.model");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
// fetch all users from database
const fetchAllUsers = async () => {
    const result = await users_model_1.User.find();
    if (!result || result.length === 0) {
        throw new express_error_toolkit_1.NotFoundError('No users found');
    }
    return result;
};
exports.fetchAllUsers = fetchAllUsers;
const fetchUserByEmail = async (email) => {
    const result = await users_model_1.User.findOne({ email });
    if (!result)
        throw new express_error_toolkit_1.NotFoundError('user not found');
    return result;
};
exports.fetchUserByEmail = fetchUserByEmail;
const createOrUpdateUser = async (user) => {
    const query = { email: user.email };
    const options = { upsert: true };
    const existingUser = await users_model_1.User.findOne(query);
    console.log('existingUser', existingUser);
    if (existingUser) {
        // 1. User status: "requested"
        if (user.status === 'requested') {
            return await users_model_1.User.updateOne(query, { $set: { status: 'requested' } });
        }
        // 2. Promote to admin
        if (user.role === 'admin') {
            (0, sendEmail_1.default)(user.email, {
                subject: 'Congratulation for Adminship',
                message: 'You are now an admin of our TechInsights website. Please follow the community rules.',
            });
            return await users_model_1.User.updateOne(query, {
                $set: {
                    role: 'admin',
                    status: 'verified',
                    subscription: 'premium',
                },
            });
        }
        // 3. Remove admin
        if (user.status === 'remove-admin') {
            (0, sendEmail_1.default)(user.email, {
                subject: 'Adminship cancelled',
                message: 'You are now no longer an admin of our TechInsights website. Please reach out to us to know more.',
            });
            return await users_model_1.User.updateOne(query, {
                $set: {
                    status: 'verified',
                    role: 'user',
                    subscription: 'usual',
                },
            });
        }
        // 4. Subscribe to premium
        if (user.subscription === 'premium') {
            return await users_model_1.User.updateOne(query, {
                $set: {
                    subscription: 'premium',
                    premiumToken: Math.floor(new Date().getTime() / 1000) + user.validationTime,
                },
            });
        }
        // 5. Already exists
        return {
            message: 'User already exists',
            insertedId: null,
        };
    }
    // 6. Create new user
    const updateDoc = { $set: { ...user } };
    const result = await users_model_1.User.updateOne(query, updateDoc, options);
    (0, sendEmail_1.default)(user.email, {
        subject: 'Welcome to TechInsights',
        message: `Dear friend, your registration in TechInsights website is successful. Stay connected with us, hope you'll enjoy the journey.`,
    });
    if (!result || result.modifiedCount === 0) {
        throw new express_error_toolkit_1.CustomAPIError('User creation failed');
    }
    return result;
};
exports.createOrUpdateUser = createOrUpdateUser;
const updateUserProfileService = async (email, updatedUserInfo) => {
    const filter = { email };
    const updateDoc = { $set: { ...updatedUserInfo } };
    const result = await users_model_1.User.updateOne(filter, updateDoc);
    if (result.modifiedCount === 0) {
        throw new express_error_toolkit_1.NotFoundError('User not found or no changes made');
    }
    return result;
};
exports.updateUserProfileService = updateUserProfileService;
const downgradeExpiredSubscriptions = async () => {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const filter = {
        subscription: 'premium',
        premiumToken: { $lt: currentTimeInSeconds },
    };
    const expiredUsers = await users_model_1.User.find(filter);
    if (expiredUsers.length > 0) {
        const updateDoc = {
            $set: { subscription: 'usual', premiumToken: null },
        };
        await users_model_1.User.updateMany(filter, updateDoc);
        console.log(`✅ ${expiredUsers.length} users downgraded to usual`);
    }
};
exports.downgradeExpiredSubscriptions = downgradeExpiredSubscriptions;
