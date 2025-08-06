import mongoose, { Schema } from 'mongoose';
import {
  IArticle,
  PublisherType,
  TagType,
} from '../interface/articles.interface';

const allowedTags: TagType[] = [
  'AI',
  'Cybersecurity',
  'Software',
  'Web Development',
  'Programming',
  'DevOps',
];

const allowedPublishers: PublisherType[] = [
  'Data Dive',
  'DevOps Digest',
  'Tech Tomorrow',
  'Cyber Shield',
  'AI Revolution',
];

const ArticleSchema: Schema = new Schema<IArticle>({
  title: { type: String, required: true },
  image_url: { type: String, required: true },
  description: { type: String, required: true },
  tags: {
    type: [String],
    enum: allowedTags,
    required: true,
  },
  publisher: { type: String, enum: allowedPublishers, required: true },
  view_count: { type: Number, default: 0 },
  isPremium: { type: String, enum: ['yes', 'no'], required: true },
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'pending',
  },
  posted_by: { type: String, required: true },
  posted_time: { type: String, required: true },
  writers_email: { type: String, required: true },
});

export const Article = mongoose.model<IArticle>('Article', ArticleSchema);
