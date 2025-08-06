// src/modules/adminStats/adminStats.route.ts

import { Router } from 'express';
import { getAdminStats } from '../controllers/adminStats.controller';
import verifyToken from '../middlewares/verifyToken';
import verifyAdmin from '../middlewares/verifyAdmin';

const adminStatsRouter = Router();

adminStatsRouter.get('/', verifyToken, verifyAdmin, getAdminStats);

export default adminStatsRouter;
