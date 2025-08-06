import { Request, Response } from 'express';
import { BadRequestError, StatusCodes } from 'express-error-toolkit';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateJwtToken = (req: Request, res: Response) => {
  const user = req.body;

  if (!user || !user.email) {
    throw new BadRequestError('User data and email are required');
  }

  const token = jwt.sign(user, config.accessTokenSecret as string, {
    expiresIn: '7d',
  });

  res.status(StatusCodes.OK).send({ token });
};
