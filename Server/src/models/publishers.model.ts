import { model, Schema } from 'mongoose';

export interface IPublisher {
  title: string;
  logo: string;
}

const publisherSchema: Schema = new Schema<IPublisher>({
  title: { type: String, required: true },
  logo: { type: String, required: true },
});

export const Publisher = model<IPublisher>('Publisher', publisherSchema);
