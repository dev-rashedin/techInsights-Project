"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitLangVote = exports.getUserVote = exports.getLangStats = void 0;
const express_error_toolkit_1 = require("express-error-toolkit");
const votedLanguage_service_1 = require("../services/votedLanguage.service");
exports.getLangStats = (0, express_error_toolkit_1.asyncHandler)(async (_req, res) => {
    const stats = await (0, votedLanguage_service_1.getLangQuizStatsService)();
    res.status(express_error_toolkit_1.StatusCodes.OK).send(stats);
});
exports.getUserVote = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const email = req.params.email;
    if (!email)
        throw new express_error_toolkit_1.BadRequestError('Email is required');
    const result = await (0, votedLanguage_service_1.getUserVoteService)(email);
    res.status(express_error_toolkit_1.StatusCodes.OK).send(result);
});
exports.submitLangVote = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const vote = req.body;
    if (!vote?.voterEmail || !vote?.votedLang) {
        throw new express_error_toolkit_1.BadRequestError('voterEmail and votedLang are required');
    }
    const result = await (0, votedLanguage_service_1.postLangVoteService)(vote);
    if (!result) {
        res.status(express_error_toolkit_1.StatusCodes.OK).send({ message: 'You have already voted' });
    }
    else {
        res.status(express_error_toolkit_1.StatusCodes.CREATED).send(result);
    }
});
