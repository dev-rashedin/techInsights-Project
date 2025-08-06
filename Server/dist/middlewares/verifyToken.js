"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_error_toolkit_1 = require("express-error-toolkit");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(express_error_toolkit_1.StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'unauthorized access',
        });
    }
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, config_1.default.accessTokenSecret, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(express_error_toolkit_1.StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'unauthorized access',
            });
        }
        // Attach decoded user to the request
        req.decoded =
            decoded;
        next();
    });
};
exports.default = verifyToken;
