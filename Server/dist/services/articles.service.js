"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticleService = exports.updateArticleService = exports.incrementViewCountService = exports.updateArticleStatusService = exports.postArticleService = exports.getArticlesByEmailService = exports.getSingleArticleService = exports.getRecentArticlesServiceBanner = exports.getRecentArticlesService = exports.getArticleCountService = exports.getPremiumArticlesService = exports.getArticlesService = void 0;
const articles_model_1 = require("../models/articles.model");
const mongoose_1 = require("mongoose");
const express_error_toolkit_1 = require("express-error-toolkit");
// fetch all articles from the database
const getArticlesService = async (query) => {
    const page = parseInt(query.page || '0');
    const size = parseInt(query.size || '6');
    const { status, filter, search, sort } = query;
    const matchQuery = {};
    if (search) {
        matchQuery.title = { $regex: search, $options: 'i' };
    }
    if (status) {
        matchQuery.status = status;
    }
    if (filter) {
        matchQuery.publisher = filter;
    }
    const result = await articles_model_1.Article.aggregate([
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
exports.getArticlesService = getArticlesService;
// fetch premium articles from the database
const getPremiumArticlesService = async () => {
    const result = await articles_model_1.Article.find({ isPremium: 'yes' });
    if (!result || result.length === 0) {
        throw new express_error_toolkit_1.NotFoundError('No premium articles found');
    }
    return result;
};
exports.getPremiumArticlesService = getPremiumArticlesService;
const getArticleCountService = async (query) => {
    const { filter, search } = query;
    const matchQuery = {
        title: { $regex: search || '', $options: 'i' },
    };
    if (filter) {
        matchQuery.publisher = filter;
    }
    const allArticles = await articles_model_1.Article.countDocuments(matchQuery);
    const approvedArticles = await articles_model_1.Article.countDocuments({
        status: 'approved',
        ...matchQuery,
    });
    return {
        allArticles,
        approvedArticles,
    };
};
exports.getArticleCountService = getArticleCountService;
// fetch recent articles from the database
const getRecentArticlesService = async () => {
    const articles = await articles_model_1.Article.aggregate([
        { $match: { status: 'approved' } },
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
        throw new express_error_toolkit_1.NotFoundError('No recent articles found');
    }
    return articles;
};
exports.getRecentArticlesService = getRecentArticlesService;
// fetch recent articles for banner from the database
const getRecentArticlesServiceBanner = async () => {
    const articles = await articles_model_1.Article.aggregate([
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
        throw new express_error_toolkit_1.NotFoundError('No recent articles found');
    }
    return articles;
};
exports.getRecentArticlesServiceBanner = getRecentArticlesServiceBanner;
// fetch single article by ID from the database
const getSingleArticleService = async (id) => {
    const result = await articles_model_1.Article.findById(new mongoose_1.Types.ObjectId(id));
    if (!result) {
        throw new express_error_toolkit_1.NotFoundError('Article not found');
    }
    return result;
};
exports.getSingleArticleService = getSingleArticleService;
// fetch articles by email from the database
const getArticlesByEmailService = async (email) => {
    const result = await articles_model_1.Article.find({ writers_email: email });
    if (!result || result.length === 0) {
        throw new express_error_toolkit_1.NotFoundError(`No articles found for email: ${email}`);
    }
    return result;
};
exports.getArticlesByEmailService = getArticlesByEmailService;
// post a new article to the database
const postArticleService = async (articleData) => {
    const result = await articles_model_1.Article.create(articleData);
    console.log('Article created successfully:', result);
    return result;
};
exports.postArticleService = postArticleService;
// Admin approval/decline/premium
const updateArticleStatusService = async (id, update) => {
    const result = await articles_model_1.Article.updateOne({ _id: new mongoose_1.Types.ObjectId(id) }, { $set: update }, { new: true });
    if (result.modifiedCount === 0) {
        throw new express_error_toolkit_1.NotFoundError('Article not found or no changes made');
    }
    return result;
};
exports.updateArticleStatusService = updateArticleStatusService;
// Increment view count
const incrementViewCountService = async (id) => {
    const result = await articles_model_1.Article.updateOne({ _id: new mongoose_1.Types.ObjectId(id) }, { $inc: { view_count: 1 } });
    if (result.modifiedCount === 0) {
        throw new express_error_toolkit_1.NotFoundError('Article not found or no changes made');
    }
    return result;
};
exports.incrementViewCountService = incrementViewCountService;
// Update article (general)
const updateArticleService = async (id, updateData) => {
    const result = await articles_model_1.Article.updateOne({ _id: new mongoose_1.Types.ObjectId(id) }, { $set: updateData });
    if (result.modifiedCount === 0) {
        throw new express_error_toolkit_1.NotFoundError('Article not found or no changes made');
    }
    return result;
};
exports.updateArticleService = updateArticleService;
// Delete article
const deleteArticleService = async (id) => {
    const result = await articles_model_1.Article.deleteOne({ _id: new mongoose_1.Types.ObjectId(id) });
    if (result.deletedCount === 0) {
        throw new express_error_toolkit_1.NotFoundError('Article not found');
    }
    return result;
};
exports.deleteArticleService = deleteArticleService;
