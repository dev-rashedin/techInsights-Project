import { RequestHandler } from 'express';
import { User } from '../models/users.model'; // adjust path as needed
import { RequestWithUser } from '../interface';

const verifyAdmin: RequestHandler = async (req, res, next) => {
  const decodedUser = (req as RequestWithUser).decoded;

  if (!decodedUser?.email) {
    return res.status(401).send({ message: 'unauthorized access!!' });
  }

  const user = await User.findOne({ email: decodedUser.email });

  if (!user || user.role !== 'admin') {
    return res.status(403).send({ message: 'forbidden: not an admin' });
  }

  next();
};

export default verifyAdmin;
