import { Router } from 'express';
import {
  getLangStats,
  getUserVote,
  submitLangVote,
} from '../controllers/votedLanguages.controller';

const votedLanguagesRouter = Router();

votedLanguagesRouter.get('/', getLangStats);
votedLanguagesRouter.get('/:email', getUserVote);
votedLanguagesRouter.post('/', submitLangVote);

export default votedLanguagesRouter;
