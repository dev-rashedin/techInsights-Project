// src/modules/messages/message.model.ts
import { Schema, model } from 'mongoose';

export interface IMessage {
  articleId: string;
  message: string;
}

const messageSchema = new Schema<IMessage>({
  articleId: { type: String, required: true },
  message: { type: String, required: true },
});

export const Message = model<IMessage>('Message', messageSchema);
