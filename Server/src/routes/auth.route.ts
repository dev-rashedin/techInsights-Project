import express from 'express';
import { generateJwtToken } from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/', generateJwtToken);

export default authRouter;
