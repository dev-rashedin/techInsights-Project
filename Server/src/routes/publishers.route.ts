// src/modules/publishers/publishers.route.ts

import { Router } from 'express';
import {
  getAllPublishers,
  createPublisher,
} from '../controllers/publishers.controller';
import verifyToken from '../middlewares/verifyToken';
import verifyAdmin from '../middlewares/verifyAdmin';

const publishersRouter = Router();

publishersRouter.get('/', getAllPublishers);
publishersRouter.post('/', verifyToken, verifyAdmin, createPublisher);

export default publishersRouter;
