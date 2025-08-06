"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDeclineMessageService = exports.getMessageByArticleIdService = void 0;
// src/modules/messages/message.service.ts
const messages_model_1 = require("../models/messages.model");
const express_error_toolkit_1 = require("express-error-toolkit");
const getMessageByArticleIdService = async (articleId) => {
    return await messages_model_1.Message.findOne({ articleId });
};
exports.getMessageByArticleIdService = getMessageByArticleIdService;
const saveDeclineMessageService = async (data) => {
    const exists = await messages_model_1.Message.findOne({ articleId: data.articleId });
    if (exists) {
        throw new express_error_toolkit_1.CustomAPIError('Message already exists for this article');
    }
    const result = await messages_model_1.Message.create(data);
    return result;
};
exports.saveDeclineMessageService = saveDeclineMessageService;
