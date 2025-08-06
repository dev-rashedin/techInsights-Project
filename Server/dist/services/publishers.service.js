"use strict";
// src/modules/publishers/publishers.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublisherService = exports.getAllPublishersService = void 0;
const express_error_toolkit_1 = require("express-error-toolkit");
const publishers_model_1 = require("../models/publishers.model");
const getAllPublishersService = async () => {
    const result = await publishers_model_1.Publisher.find();
    if (!result) {
        throw new express_error_toolkit_1.NotFoundError('No publishers found');
    }
    return result;
};
exports.getAllPublishersService = getAllPublishersService;
const createPublisherService = async (publisherData) => {
    const result = await publishers_model_1.Publisher.create(publisherData);
    if (!result) {
        throw new express_error_toolkit_1.CustomAPIError('Failed to create publisher');
    }
    return result;
};
exports.createPublisherService = createPublisherService;
