"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSectorVoteService = exports.getUserSectorVoteService = exports.getDemandingSectorStatsService = void 0;
const votedSectors_model_1 = require("../models/votedSectors.model");
const getDemandingSectorStatsService = async () => {
    const totalVotes = await votedSectors_model_1.VotedSector.countDocuments();
    const demandingSectors = await votedSectors_model_1.VotedSector.aggregate([
        { $group: { _id: '$votedOption', votes: { $sum: 1 } } },
        { $sort: { votes: -1 } },
        { $project: { _id: 0, sector: '$_id', votes: 1 } },
    ]);
    return { totalVotes, demandingSectors };
};
exports.getDemandingSectorStatsService = getDemandingSectorStatsService;
const getUserSectorVoteService = async (email) => {
    return await votedSectors_model_1.VotedSector.findOne({ voterEmail: email });
};
exports.getUserSectorVoteService = getUserSectorVoteService;
const postSectorVoteService = async (voteData) => {
    const exists = await votedSectors_model_1.VotedSector.findOne({ voterEmail: voteData.voterEmail });
    if (exists)
        return null;
    return await votedSectors_model_1.VotedSector.create(voteData);
};
exports.postSectorVoteService = postSectorVoteService;
