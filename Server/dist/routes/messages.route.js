"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/modules/messages/message.route.ts
const express_1 = require("express");
const messages_controller_1 = require("../controllers/messages.controller");
const messagesRouter = (0, express_1.Router)();
messagesRouter.get('/:id', messages_controller_1.getMessageByArticleId);
messagesRouter.post('/:id', messages_controller_1.saveDeclineMessage);
exports.default = messagesRouter;
