"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotedLanguage = void 0;
const mongoose_1 = require("mongoose");
const votedLanguageSchema = new mongoose_1.Schema({
    voterEmail: { type: String, required: true },
    votedLang: { type: String, required: true },
}, {
    collection: 'voted-languages',
});
exports.VotedLanguage = mongoose_1.models.VotedLanguage ||
    (0, mongoose_1.model)('VotedLanguage', votedLanguageSchema);
