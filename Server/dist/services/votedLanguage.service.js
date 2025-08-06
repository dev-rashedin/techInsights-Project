"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLangVoteService = exports.getUserVoteService = exports.getLangQuizStatsService = void 0;
const express_error_toolkit_1 = require("express-error-toolkit");
const votedLanguages_model_1 = require("../models/votedLanguages.model");
const getLangQuizStatsService = async () => {
    const totalVotes = await votedLanguages_model_1.VotedLanguage.countDocuments();
    const languageVotes = await votedLanguages_model_1.VotedLanguage.aggregate([
        { $group: { _id: '$votedLang', votes: { $sum: 1 } } },
        { $sort: { votes: -1 } },
        { $project: { _id: 0, language: '$_id', votes: 1 } },
    ]);
    if (!totalVotes || totalVotes === 0)
        throw new express_error_toolkit_1.NotFoundError('No votes found');
    return { totalVotes, languageVotes };
};
exports.getLangQuizStatsService = getLangQuizStatsService;
const getUserVoteService = async (email) => {
    const result = await votedLanguages_model_1.VotedLanguage.findOne({ voterEmail: email });
    if (!result)
        throw new express_error_toolkit_1.NotFoundError('No vote found for this user');
    return result;
};
exports.getUserVoteService = getUserVoteService;
const postLangVoteService = async (voteData) => {
    const existing = await votedLanguages_model_1.VotedLanguage.findOne({
        voterEmail: voteData.voterEmail,
    });
    if (existing)
        throw new express_error_toolkit_1.ConflictError('User has already voted');
    return await votedLanguages_model_1.VotedLanguage.create(voteData);
};
exports.postLangVoteService = postLangVoteService;
