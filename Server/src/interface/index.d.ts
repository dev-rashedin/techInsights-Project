import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface DecodedUser extends JwtPayload {
  email: string;
}

export interface RequestWithUser extends Request {
  decoded: DecodedUser;
}

export interface ArticleQueryParams {
  page?: string;
  size?: string;
  status?: string;
  filter?: string;
  search?: string;
  sort?: 'asc' | 'desc';
}
