"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
const mongoose_1 = require("mongoose");
const publisherSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    logo: { type: String, required: true },
});
exports.Publisher = (0, mongoose_1.model)('Publisher', publisherSchema);
