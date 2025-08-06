import { Request, Response } from 'express';
import {
  asyncHandler,
  BadRequestError,
  StatusCodes,
} from 'express-error-toolkit';
import {
  getLangQuizStatsService,
  getUserVoteService,
  postLangVoteService,
} from '../services/votedLanguage.service';

export const getLangStats = asyncHandler(
  async (_req: Request, res: Response) => {
    const stats = await getLangQuizStatsService();

    res.status(StatusCodes.OK).send(stats);
  },
);

export const getUserVote = asyncHandler(async (req: Request, res: Response) => {
  const email = req.params.email;

  if (!email) throw new BadRequestError('Email is required');

  const result = await getUserVoteService(email);
  res.status(StatusCodes.OK).send(result);
});

export const submitLangVote = asyncHandler(
  async (req: Request, res: Response) => {
    const vote = req.body;
    if (!vote?.voterEmail || !vote?.votedLang) {
      throw new BadRequestError('voterEmail and votedLang are required');
    }

    const result = await postLangVoteService(vote);
    if (!result) {
      res.status(StatusCodes.OK).send({ message: 'You have already voted' });
    } else {
      res.status(StatusCodes.CREATED).send(result);
    }
  },
);
