"use strict";
// src/modules/publishers/publishers.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublisher = exports.getAllPublishers = void 0;
const express_error_toolkit_1 = require("express-error-toolkit");
const publishers_service_1 = require("../services/publishers.service");
// GET all publishers
exports.getAllPublishers = (0, express_error_toolkit_1.asyncHandler)(async (_req, res) => {
    const result = await (0, publishers_service_1.getAllPublishersService)();
    res.status(express_error_toolkit_1.StatusCodes.OK).send(result);
});
// POST create new publisher
exports.createPublisher = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const publisherData = req.body;
    if (!publisherData) {
        throw new express_error_toolkit_1.BadRequestError('Publisher data is required');
    }
    const result = await (0, publishers_service_1.createPublisherService)(publisherData);
    res.status(express_error_toolkit_1.StatusCodes.CREATED).send(result);
});
