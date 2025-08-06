import { Schema, model, models } from 'mongoose';

export interface IVotedSector {
  voterEmail: string;
  votedOption: string;
}

const votedSectorSchema = new Schema<IVotedSector>(
  {
    voterEmail: { type: String, required: true },
    votedOption: { type: String, required: true },
  },
  {
    collection: 'voted-sectors',
  },
);

export const VotedSector =
  models.VotedSector || model<IVotedSector>('VotedSector', votedSectorSchema);
