export type TagType =
  | 'AI'
  | 'Cybersecurity'
  | 'Software'
  | 'Web Development'
  | 'Programming'
  | 'DevOps';

export type PublisherType =
  | 'Data Dive'
  | 'DevOps Digest'
  | 'Tech Tomorrow'
  | 'Cyber Shield'
  | 'AI Revolution';

export interface IArticle {
  _id: string;
  title: string;
  image_url: string;
  description: string;
  tags: TagType[];
  publisher: PublisherType;
  view_count: number;
  isPremium: 'yes' | 'no';
  status: 'approved' | 'pending' | 'rejected';
  posted_by: string;
  posted_time: string;
  writers_email: string;
}
