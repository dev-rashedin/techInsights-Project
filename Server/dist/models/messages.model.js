"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
// src/modules/messages/message.model.ts
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    articleId: { type: String, required: true },
    message: { type: String, required: true },
});
exports.Message = (0, mongoose_1.model)('Message', messageSchema);
