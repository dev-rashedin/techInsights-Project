"use strict";
// src/modules/adminStats/adminStats.controller.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminStats = void 0;
const express_error_toolkit_1 = require("express-error-toolkit");
const adminStats_service_1 = require("../services/adminStats.service");
// GET /admin-stats
exports.getAdminStats = (0, express_error_toolkit_1.asyncHandler)(async (_req, res) => {
    const result = await (0, adminStats_service_1.getAdminStatsService)();
    res.status(express_error_toolkit_1.StatusCodes.OK).send(result);
});
