export interface IUser {
  _id: string;
  email: string;
  displayName: string;
  photoURL: string;
  premiumToken: string | null;
  role: 'user' | 'admin' | 'Requested';
  status: 'verified' | 'requested' | 'remove-admin' | 'banned';
  subscription: 'usual' | 'premium';
}

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

export interface IPublisher {
  title: string;
  logo: string;
}

export type VoteOption = 'javascript' | 'python' | 'rust' | 'go';

export interface LanguageVote {
  language: VoteOption;
  votes: number;
}

export interface QuizData {
  totalVotes: number;
  languageVotes: LanguageVote[];
}

export interface PollOptionProps {
  option: string;
  percentage: string;
  userVote: string | null;
  onVote: () => void;
}

export interface SectorVote {
  sector: string;
  votes: number;
}

export interface VoteData {
  totalVotes: number;
  demandingSectors: SectorVote[];
}

export interface DemandingPollOptionProps {
  option: string;
  info: string;
  userVote: string | null;
  percentage: string;
  onVote: () => void;
}

export interface NavItem {
  to: string;
  label: string;
}

export interface ButtonProps {
  label: string;
  type: string;
  onClick?: () => void;
}
