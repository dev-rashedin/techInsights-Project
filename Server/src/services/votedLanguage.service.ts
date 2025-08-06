import { ConflictError, NotFoundError } from 'express-error-toolkit';
import { VotedLanguage, IVotedLanguage } from '../models/votedLanguages.model';

export const getLangQuizStatsService = async () => {
  const totalVotes = await VotedLanguage.countDocuments();

  const languageVotes = await VotedLanguage.aggregate([
    { $group: { _id: '$votedLang', votes: { $sum: 1 } } },
    { $sort: { votes: -1 } },
    { $project: { _id: 0, language: '$_id', votes: 1 } },
  ]);

  if (!totalVotes || totalVotes === 0)
    throw new NotFoundError('No votes found');

  return { totalVotes, languageVotes };
};

export const getUserVoteService = async (email: string) => {
  const result = await VotedLanguage.findOne({ voterEmail: email });

  if (!result) throw new NotFoundError('No vote found for this user');

  return result;
};

export const postLangVoteService = async (voteData: IVotedLanguage) => {
  const existing = await VotedLanguage.findOne({
    voterEmail: voteData.voterEmail,
  });
  if (existing) throw new ConflictError('User has already voted');
  return await VotedLanguage.create(voteData);
};
