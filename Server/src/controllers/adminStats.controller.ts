// src/modules/adminStats/adminStats.controller.ts

import { Request, Response } from 'express';
import { asyncHandler, StatusCodes } from 'express-error-toolkit';
import { getAdminStatsService } from '../services/adminStats.service';

// GET /admin-stats
export const getAdminStats = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await getAdminStatsService();
    res.status(StatusCodes.OK).send(result);
  },
);
