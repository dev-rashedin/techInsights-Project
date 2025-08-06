"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotedSector = void 0;
const mongoose_1 = require("mongoose");
const votedSectorSchema = new mongoose_1.Schema({
    voterEmail: { type: String, required: true },
    votedOption: { type: String, required: true },
}, {
    collection: 'voted-sectors',
});
exports.VotedSector = mongoose_1.models.VotedSector || (0, mongoose_1.model)('VotedSector', votedSectorSchema);
