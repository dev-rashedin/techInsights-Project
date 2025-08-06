import { Router } from 'express';
import {
  getDemandingSectors,
  getUserSectorVote,
  submitSectorVote,
} from '../controllers/votedSectors.controller';

const votedSectorsRouter = Router();

votedSectorsRouter.get('/', getDemandingSectors);
votedSectorsRouter.get('/:email', getUserSectorVote);
votedSectorsRouter.post('/', submitSectorVote);

export default votedSectorsRouter;
