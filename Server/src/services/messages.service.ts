// src/modules/messages/message.service.ts
import { Message, IMessage } from '../models/messages.model';
import { CustomAPIError } from 'express-error-toolkit';

export const getMessageByArticleIdService = async (articleId: string) => {
  return await Message.findOne({ articleId });
};

export const saveDeclineMessageService = async (data: IMessage) => {
  const exists = await Message.findOne({ articleId: data.articleId });

  if (exists) {
    throw new CustomAPIError('Message already exists for this article');
  }

  const result = await Message.create(data);
  return result;
};
