"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminStatsService = void 0;
const users_model_1 = require("../models/users.model");
const articles_model_1 = require("../models/articles.model");
const publishers_model_1 = require("../models/publishers.model");
const getAdminStatsService = async () => {
    const totalUsers = await users_model_1.User.countDocuments();
    const totalArticles = await articles_model_1.Article.countDocuments();
    const totalPublishers = await publishers_model_1.Publisher.countDocuments();
    const publishedArticle = await articles_model_1.Article.countDocuments({ status: 'approved' });
    const result = await articles_model_1.Article.aggregate([
        {
            $group: {
                _id: null,
                totalViews: { $sum: '$view_count' },
            },
        },
    ]);
    const articleByPublisher = await articles_model_1.Article.aggregate([
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
    const subscriptionCount = await users_model_1.User.aggregate([
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
exports.getAdminStatsService = getAdminStatsService;
