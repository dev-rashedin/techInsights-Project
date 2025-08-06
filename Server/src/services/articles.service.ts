import { FilterQuery } from 'mongoose';
import { ArticleQueryParams } from '../interface';
import { ArticleQuery, IArticle } from '../interface/articles.interface';
import { Article } from '../models/articles.model';
import { Types } from 'mongoose';
import { NotFoundError } from 'express-error-toolkit';

// fetch all articles from the database
export const getArticlesService = async (query: ArticleQueryParams) => {
  const page = parseInt(query.page || '0');
  const size = parseInt(query.size || '6');
  const { status, filter, search, sort } = query;

  const matchQuery: FilterQuery<IArticle> = {};

  if (search) {
    matchQuery.title = { $regex: search, $options: 'i' };
  }

  if (status) {
    matchQuery.status = status;
  }

  if (filter) {
    matchQuery.publisher = filter;
  }

  const result = await Article.aggregate([
    { $match: matchQuery },
    {
      $addFields: {
        posted_time_as_date: {
          $dateFromString: {
            dateString: '$posted_time',
            format: '%m/%d/%Y',
            onError: 'Invalid Date',
            onNull: 'No Date',
          },
        },
      },
    },
    { $sort: { posted_time_as_date: sort === 'asc' ? 1 : -1 } },
    { $skip: page * size },
    { $limit: size },
  ]);

  return { result };
};

// fetch premium articles from the database
export const getPremiumArticlesService = async () => {
  const result = await Article.find({ isPremium: 'yes' });

  if (!result || result.length === 0) {
    throw new NotFoundError('No premium articles found');
  }

  return result;
};

export const getArticleCountService = async (query: ArticleQuery) => {
  const { filter, search } = query;

  const matchQuery: Record<string, unknown> = {
    title: { $regex: search || '', $options: 'i' },
  };

  if (filter) {
    matchQuery.publisher = filter;
  }

  const allArticles = await Article.countDocuments(matchQuery);
  const approvedArticles = await Article.countDocuments({
    status: 'approved',
    ...matchQuery,
  });

  return {
    allArticles,
    approvedArticles,
  };
};

// fetch recent articles from the database
export const getRecentArticlesService = async () => {
  const articles = await Article.aggregate([
  {$match : { status: 'approved' }},
    {
      $addFields: {
        posted_time_as_date: {
          $dateFromString: {
            dateString: '$posted_time',
            format: '%m/%d/%Y',
            onError: null,
            onNull: null,
          },
        },
      },
    },
    { $sort: { posted_time_as_date: -1 } },
    { $limit: 6 },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
      },
    },
  ]);

  if (!articles || articles.length === 0) {
    throw new NotFoundError('No recent articles found');
  }

  return articles;
};

// fetch recent articles for banner from the database
export const getRecentArticlesServiceBanner = async () => {
  const articles = await Article.aggregate([
   
    { $sort: { view_count: -1 } },
    { $limit: 6 },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        image_url: 1,
        tags: 1,
        posted_time: 1,
        publisher: 1,
        view_count: 1
      },
    },
  ]);

  if (!articles || articles.length === 0) {
    throw new NotFoundError('No recent articles found');
  }

  return articles;
};

// fetch single article by ID from the database
export const getSingleArticleService = async (id: string) => {
  const result = await Article.findById(new Types.ObjectId(id));

  if (!result) {
    throw new NotFoundError('Article not found');
  }
  return result;
};

// fetch articles by email from the database
export const getArticlesByEmailService = async (email: string) => {
  const result = await Article.find({ writers_email: email });

  if (!result || result.length === 0) {
    throw new NotFoundError(`No articles found for email: ${email}`);
  }

  return result;
};

// post a new article to the database
export const postArticleService = async (articleData: IArticle) => {
  const result = await Article.create(articleData);
  console.log('Article created successfully:', result);

  return result;
};

// Admin approval/decline/premium
export const updateArticleStatusService = async (
  id: string,
  update: Partial<{ status: string; isPremium: string }>,
) => {
  const result = await Article.updateOne(
    { _id: new Types.ObjectId(id) },
    { $set: update },
    { new: true },
  );

  if (result.modifiedCount === 0) {
    throw new NotFoundError('Article not found or no changes made');
  }

  return result;
};

// Increment view count
export const incrementViewCountService = async (id: string) => {
  const result = await Article.updateOne(
    { _id: new Types.ObjectId(id) },
    { $inc: { view_count: 1 } },
  );

  if (result.modifiedCount === 0) {
    throw new NotFoundError('Article not found or no changes made');
  }

  return result;
};

// Update article (general)
export const updateArticleService = async (
  id: string,
  updateData: Partial<IArticle>,
) => {
  const result = await Article.updateOne(
    { _id: new Types.ObjectId(id) },
    { $set: updateData },
  );

  if (result.modifiedCount === 0) {
    throw new NotFoundError('Article not found or no changes made');
  }

  return result;
};

// Delete article
export const deleteArticleService = async (id: string) => {
  const result = await Article.deleteOne({ _id: new Types.ObjectId(id) });
  if (result.deletedCount === 0) {
    throw new NotFoundError('Article not found');
  }
  return result;
};
