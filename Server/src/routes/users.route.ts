import express from 'express';
import {
  addOrEditUser,
  getAllUsers,
  updateUserProfile,
} from '../controllers/users.controller';
import { getUserByEmail } from '../controllers/users.controller';
import verifyToken from '../middlewares/verifyToken';
import verifyAdmin from '../middlewares/verifyAdmin';

const usersRouter = express.Router();

usersRouter.get('/', verifyToken, verifyAdmin, getAllUsers);

usersRouter.get('/:email', getUserByEmail);

usersRouter.put('/', addOrEditUser);

usersRouter.patch('/:email', verifyToken, updateUserProfile);

export default usersRouter;
