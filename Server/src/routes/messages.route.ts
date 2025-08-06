// src/modules/messages/message.route.ts
import { Router } from 'express';
import {
  getMessageByArticleId,
  saveDeclineMessage,
} from '../controllers/messages.controller';

const messagesRouter = Router();

messagesRouter.get('/:id', getMessageByArticleId);
messagesRouter.post('/:id', saveDeclineMessage);

export default messagesRouter;
