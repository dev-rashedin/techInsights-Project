// src/modules/messages/message.controller.ts
import { Request, Response } from 'express';
import { asyncHandler, BadRequestError } from 'express-error-toolkit';
import {
  getMessageByArticleIdService,
  saveDeclineMessageService,
} from '../services/messages.service';

// GET message by articleId
export const getMessageByArticleId = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getMessageByArticleIdService(id);
    res.status(200).send(result);
  },
);

// POST decline message
export const saveDeclineMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const messageData = req.body;

    if (!messageData || !messageData.message) {
      throw new BadRequestError('Message content is required');
    }

    const result = await saveDeclineMessageService({
      articleId: id,
      ...messageData,
    });
    res.status(201).send(result);
  },
);
