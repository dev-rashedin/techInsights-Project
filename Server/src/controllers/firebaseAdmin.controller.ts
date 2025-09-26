import { Request, Response } from 'express';
import { adminAuth } from '../services/firebaseAdmin.service';
import { BadRequestError, StatusCodes } from 'express-error-toolkit';

export const createDemoAdmin = async (req : Request, res : Response) => {
  try {
    const { uid } = req.body;
    
    console.log('uid in the server',uid);

    if(!uid) {
      throw new BadRequestError('UID is required');
    }

    await adminAuth.setCustomUserClaims(uid, { admin: true });

    res.status(StatusCodes.OK).json({ success: true, message: `Admin claim set for UID: ${uid}` });
  } catch (error) {
    console.error('Error setting admin claim:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to set admin claim' });
  }
};
