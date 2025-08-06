"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDeclineMessage = exports.getMessageByArticleId = void 0;
const express_error_toolkit_1 = require("express-error-toolkit");
const messages_service_1 = require("../services/messages.service");
// GET message by articleId
exports.getMessageByArticleId = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    const result = await (0, messages_service_1.getMessageByArticleIdService)(id);
    res.status(200).send(result);
});
// POST decline message
exports.saveDeclineMessage = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    const messageData = req.body;
    if (!messageData || !messageData.message) {
        throw new express_error_toolkit_1.BadRequestError('Message content is required');
    }
    const result = await (0, messages_service_1.saveDeclineMessageService)({
        articleId: id,
        ...messageData,
    });
    res.status(201).send(result);
});
