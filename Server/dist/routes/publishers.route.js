"use strict";
// src/modules/publishers/publishers.route.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publishers_controller_1 = require("../controllers/publishers.controller");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const verifyAdmin_1 = __importDefault(require("../middlewares/verifyAdmin"));
const publishersRouter = (0, express_1.Router)();
publishersRouter.get('/', publishers_controller_1.getAllPublishers);
publishersRouter.post('/', verifyToken_1.default, verifyAdmin_1.default, publishers_controller_1.createPublisher);
exports.default = publishersRouter;
