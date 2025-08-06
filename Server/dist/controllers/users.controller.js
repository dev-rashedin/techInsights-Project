"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.addOrEditUser = exports.getUserByEmail = exports.getAllUsers = void 0;
const userService = __importStar(require("../services/users.service"));
const express_error_toolkit_1 = require("express-error-toolkit");
// fetch all users
exports.getAllUsers = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const users = await userService.fetchAllUsers();
    res.status(express_error_toolkit_1.StatusCodes.OK).json({
        success: true,
        message: 'users fetched successfully',
        count: users.length,
        data: users,
    });
});
// fetch user by email
exports.getUserByEmail = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const email = req.params.email;
    if (!email)
        throw new express_error_toolkit_1.BadRequestError('email is required');
    const user = await userService.fetchUserByEmail(email);
    res.status(express_error_toolkit_1.StatusCodes.OK).json({
        success: true,
        message: `user with email ${email} fetched successfully`,
        data: user,
    });
});
// create or update user
exports.addOrEditUser = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const user = req.body;
    if (!user || !user.email) {
        throw new express_error_toolkit_1.BadRequestError('user data and email are required');
    }
    const result = await userService.createOrUpdateUser(req.body);
    res.status(express_error_toolkit_1.StatusCodes.CREATED).json({
        success: true,
        message: 'user created or updated successfully',
        data: result,
    });
});
// update user profile
exports.updateUserProfile = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const email = req.params.email;
    const updatedUserInfo = req.body;
    if (!email || !updatedUserInfo)
        throw new express_error_toolkit_1.BadRequestError('Email and updated user info are required');
    console.log(email, updatedUserInfo);
    const result = await userService.updateUserProfileService(email, updatedUserInfo);
    res.status(express_error_toolkit_1.StatusCodes.OK).json({
        success: true,
        message: `User profile with email ${email} updated successfully`,
        data: result,
    });
});
