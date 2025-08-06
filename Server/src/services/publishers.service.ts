// src/modules/publishers/publishers.service.ts

import { CustomAPIError, NotFoundError } from 'express-error-toolkit';
import { IPublisher, Publisher } from '../models/publishers.model';

export const getAllPublishersService = async () => {
  const result = await Publisher.find();
  if (!result) {
    throw new NotFoundError('No publishers found');
  }
  return result;
};

export const createPublisherService = async (publisherData: IPublisher) => {
  const result = await Publisher.create(publisherData);
  if (!result) {
    throw new CustomAPIError('Failed to create publisher');
  }
  return result;
};
