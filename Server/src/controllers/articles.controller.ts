import { Request, Response } from 'express';
import {
  deleteArticleService,
  getArticleCountService,
  getArticlesByEmailService,
  getArticlesService,
  getPremiumArticlesService,
  getRecentArticlesService,
  getRecentArticlesServiceBanner,
  getSingleArticleService,
  incrementViewCountService,
  postArticleService,
  updateArticleService,
  updateArticleStatusService,
} from '../services/articles.service';
import {
  asyncHandler,
  BadRequestError,
  StatusCodes,
} from 'express-error-toolkit';

export const getArticles = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
  if (!query) throw new BadRequestError('Query parameters are required');

  const { result } = await getArticlesService(query);
  res.status(StatusCodes.OK).send(result);
});

export const getPremiumArticles = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await getPremiumArticlesService();
    res.status(StatusCodes.OK).send(result);
  },
);

export const getArticleCount = asyncHandler(
  async (req: Request, res: Response) => {
    const counts = await getArticleCountService(req.query);
    res.status(StatusCodes.OK).send(counts);
  },
);

export const getRecentArticles = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await getRecentArticlesService();
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Recent articles fetched successfully',
      data: result,
    });
  },
);

export const getRecentArticlesBanner = asyncHandler(
  async (_req: Request, res: Response) => {
    const result = await getRecentArticlesServiceBanner();
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Recent articles for banner fetched successfully',
      data: result,
    });
  },
);

// Get single article by ID
export const getSingleArticle = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) throw new BadRequestError('Article ID is required');

    const result = await getSingleArticleService(id);
    res.status(StatusCodes.OK).send(result);
  },
);

// Get articles by email
export const getArticlesByEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const email = req.params.email;

    if (!email) throw new BadRequestError('Email is required');

    const result = await getArticlesByEmailService(email);
    res.status(StatusCodes.OK).send(result);
  },
);

// Post a new article
export const postArticle = asyncHandler(async (req: Request, res: Response) => {
  const articleData = req.body;

  if (!articleData) throw new BadRequestError('Article data is required');

  const result = await postArticleService(articleData);
  res.status(StatusCodes.CREATED).send(result);
});

// PUT - Admin approve/decline/premium
export const updateArticleStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const update = req.body;

    if (!id || !update)
      throw new BadRequestError('Article ID and update data are required');

    const result = await updateArticleStatusService(id, update);
    res.status(StatusCodes.OK).send(result);
  },
);

// PATCH - increment view count
export const incrementViewCount = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) throw new BadRequestError('Article ID is required');

    const result = await incrementViewCountService(id);
    res.status(StatusCodes.OK).send(result);
  },
);

// PATCH - update article
export const updateArticle = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateData = req.body;

    if (!id || !updateData)
      throw new BadRequestError('Article ID and update data are required');

    const result = await updateArticleService(id, updateData);
    res.status(StatusCodes.OK).send(result);
  },
);

// DELETE - delete article
export const deleteArticle = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) throw new BadRequestError('Article ID is required');

    const result = await deleteArticleService(id);
    res.status(StatusCodes.OK).send(result);
  },
);
