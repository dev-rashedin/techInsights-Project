import { VotedSector } from '../models/votedSectors.model';
import { IVotedSector } from '../models/votedSectors.model';

export const getDemandingSectorStatsService = async () => {
  const totalVotes = await VotedSector.countDocuments();

  const demandingSectors = await VotedSector.aggregate([
    { $group: { _id: '$votedOption', votes: { $sum: 1 } } },
    { $sort: { votes: -1 } },
    { $project: { _id: 0, sector: '$_id', votes: 1 } },
  ]);

  return { totalVotes, demandingSectors };
};

export const getUserSectorVoteService = async (email: string) => {
  return await VotedSector.findOne({ voterEmail: email });
};

export const postSectorVoteService = async (voteData: IVotedSector) => {
  const exists = await VotedSector.findOne({ voterEmail: voteData.voterEmail });
  if (exists) return null;
  return await VotedSector.create(voteData);
};
