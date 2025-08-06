"use strict";
// src/modules/adminStats/adminStats.route.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminStats_controller_1 = require("../controllers/adminStats.controller");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const verifyAdmin_1 = __importDefault(require("../middlewares/verifyAdmin"));
const adminStatsRouter = (0, express_1.Router)();
adminStatsRouter.get('/', verifyToken_1.default, verifyAdmin_1.default, adminStats_controller_1.getAdminStats);
exports.default = adminStatsRouter;
