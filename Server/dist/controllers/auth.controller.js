"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = void 0;
const express_error_toolkit_1 = require("express-error-toolkit");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const generateJwtToken = (req, res) => {
    const user = req.body;
    if (!user || !user.email) {
        throw new express_error_toolkit_1.BadRequestError('User data and email are required');
    }
    const token = jsonwebtoken_1.default.sign(user, config_1.default.accessTokenSecret, {
        expiresIn: '7d',
    });
    res.status(express_error_toolkit_1.StatusCodes.OK).send({ token });
};
exports.generateJwtToken = generateJwtToken;
