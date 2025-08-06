"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitSectorVote = exports.getUserSectorVote = exports.getDemandingSectors = void 0;
const express_error_toolkit_1 = require("express-error-toolkit");
const votedSectors_service_1 = require("../services/votedSectors.service");
// GET sector stats
exports.getDemandingSectors = (0, express_error_toolkit_1.asyncHandler)(async (_req, res) => {
    const result = await (0, votedSectors_service_1.getDemandingSectorStatsService)();
    res.status(200).send(result);
});
// GET vote by email
exports.getUserSectorVote = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const email = req.params.email;
    const result = await (0, votedSectors_service_1.getUserSectorVoteService)(email);
    res.status(200).send(result);
});
// POST new vote
exports.submitSectorVote = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const vote = req.body;
    if (!vote?.voterEmail || !vote?.votedOption) {
        throw new express_error_toolkit_1.BadRequestError('voterEmail and votedOption are required');
    }
    const result = await (0, votedSectors_service_1.postSectorVoteService)(vote);
    if (!result) {
        res.status(200).send({ message: 'You have already voted' });
    }
    else {
        res.status(201).send(result);
    }
});
