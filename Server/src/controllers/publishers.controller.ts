// src/modules/publishers/publishers.controller.ts

import { Request, Response } from 'express';
import {
  asyncHandler,
  BadRequestError,
  StatusCodes,
} from 'express-error-toolkit';
import {
  getAllPublishersService,
  createPublisherService,
} from '../services/publishers.service';

// GET all publishers
export const getAllPublishers = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await getAllPublishersService();
    res.status(StatusCodes.OK).send(result);
  },
);

// POST create new publisher
export const createPublisher = asyncHandler(
  async (req: Request, res: Response) => {
    const publisherData = req.body;

    if (!publisherData) {
      throw new BadRequestError('Publisher data is required');
    }

    const result = await createPublisherService(publisherData);
    res.status(StatusCodes.CREATED).send(result);
  },
);
