import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import { DecodedUser } from '../interface';
import { StatusCodes } from 'http-status-toolkit';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'unauthorized access inside verifyToken',
    });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, config.accessTokenSecret as string, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'unauthorized access',
      });
    }

    // Attach decoded user to the request
    (req as Request & { decoded: DecodedUser }).decoded =
      decoded as DecodedUser;
    next();
  });
};

export default verifyToken;
