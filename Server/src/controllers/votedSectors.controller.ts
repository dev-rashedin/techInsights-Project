import { Request, Response } from 'express';
import { asyncHandler, BadRequestError } from 'express-error-toolkit';
import {
  getDemandingSectorStatsService,
  getUserSectorVoteService,
  postSectorVoteService,
} from '../services/votedSectors.service';

// GET sector stats
export const getDemandingSectors = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await getDemandingSectorStatsService();
    res.status(200).send(result);
  },
);

// GET vote by email
export const getUserSectorVote = asyncHandler(
  async (req: Request, res: Response) => {
    const email = req.params.email;
    const result = await getUserSectorVoteService(email);
    res.status(200).send(result);
  },
);

// POST new vote
export const submitSectorVote = asyncHandler(
  async (req: Request, res: Response) => {
    const vote = req.body;
    if (!vote?.voterEmail || !vote?.votedOption) {
      throw new BadRequestError('voterEmail and votedOption are required');
    }

    const result = await postSectorVoteService(vote);
    if (!result) {
      res.status(200).send({ message: 'You have already voted' });
    } else {
      res.status(201).send(result);
    }
  },
);
