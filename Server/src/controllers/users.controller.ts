import { Request, Response } from 'express';
import * as userService from '../services/users.service';
import {
  asyncHandler,
  BadRequestError,
  StatusCodes,
} from 'express-error-toolkit';

// fetch all users
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.fetchAllUsers();

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'users fetched successfully',
    count: users.length,
    data: users,
  });
});

// fetch user by email
export const getUserByEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const email = req.params.email;

    if (!email) throw new BadRequestError('email is required');

    const user = await userService.fetchUserByEmail(email);
    res.status(StatusCodes.OK).json({
      success: true,
      message: `user with email ${email} fetched successfully`,
      data: user,
    });
  },
);

// create or update user
export const addOrEditUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.body;

    if (!user || !user.email) {
      throw new BadRequestError('user data and email are required');
    }

    const result = await userService.createOrUpdateUser(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'user created or updated successfully',
      data: result,
    });
  },
);

// update user profile
export const updateUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const email = req.params.email;
    const updatedUserInfo = req.body;
    if (!email || !updatedUserInfo)
      throw new BadRequestError('Email and updated user info are required');

    console.log(email, updatedUserInfo);

    const result = await userService.updateUserProfileService(
      email,
      updatedUserInfo,
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: `User profile with email ${email} updated successfully`,
      data: result,
    });
  },
);
