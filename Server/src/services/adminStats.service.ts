import { User } from '../models/users.model';
import { Article } from '../models/articles.model';
import { Publisher } from '../models/publishers.model';

export const getAdminStatsService = async () => {
  const totalUsers = await User.countDocuments();
  const totalArticles = await Article.countDocuments();
  const totalPublishers = await Publisher.countDocuments();
  const publishedArticle = await Article.countDocuments({ status: 'approved' });

  const result = await Article.aggregate([
    {
      $group: {
        _id: null,
        totalViews: { $sum: '$view_count' },
      },
    },
  ]);

  const articleByPublisher = await Article.aggregate([
    {
      $group: {
        _id: '$publisher',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        publisher: '$_id',
        count: 1,
        _id: 0,
      },
    },
  ]);

  const subscriptionCount = await User.aggregate([
    {
      $group: {
        _id: '$subscription',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        subscriptionType: '$_id',
        count: 1,
        _id: 0,
      },
    },
  ]);

  const totalViews = result[0]?.totalViews || 0;

  return {
    totalUsers,
    totalArticles,
    totalPublishers,
    totalViews,
    publishedArticle,
    articleByPublisher,
    subscriptionCount,
  };
};
