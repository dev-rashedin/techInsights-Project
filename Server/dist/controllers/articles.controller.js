"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.incrementViewCount = exports.updateArticleStatus = exports.postArticle = exports.getArticlesByEmail = exports.getSingleArticle = exports.getRecentArticlesBanner = exports.getRecentArticles = exports.getArticleCount = exports.getPremiumArticles = exports.getArticles = void 0;
const articles_service_1 = require("../services/articles.service");
const express_error_toolkit_1 = require("express-error-toolkit");
exports.getArticles = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const query = req.query;
    if (!query)
        throw new express_error_toolkit_1.BadRequestError('Query parameters are required');
    const { result } = await (0, articles_service_1.getArticlesService)(query);
    res.status(express_error_toolkit_1.StatusCodes.OK).send(result);
});
exports.getPremiumArticles = (0, express_error_toolkit_1.asyncHandler)(async (_req, res) => {
    const result = await (0, articles_service_1.getPremiumArticlesService)();
    res.status(express_error_toolkit_1.StatusCodes.OK).send(result);
});
exports.getArticleCount = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const counts = await (0, articles_service_1.getArticleCountService)(req.query);
    res.status(express_error_toolkit_1.StatusCodes.OK).send(counts);
});
exports.getRecentArticles = (0, express_error_toolkit_1.asyncHandler)(async (_req, res) => {
    const result = await (0, articles_service_1.getRecentArticlesService)();
    res.status(express_error_toolkit_1.StatusCodes.OK).json({
        success: true,
        message: 'Recent articles fetched successfully',
        data: result,
    });
});
exports.getRecentArticlesBanner = (0, express_error_toolkit_1.asyncHandler)(async (_req, res) => {
    const result = await (0, articles_service_1.getRecentArticlesServiceBanner)();
    res.status(express_error_toolkit_1.StatusCodes.OK).json({
        success: true,
        message: 'Recent articles for banner fetched successfully',
        data: result,
    });
});
// Get single article by ID
exports.getSingleArticle = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!id)
        throw new express_error_toolkit_1.BadRequestError('Article ID is required');
    const result = await (0, articles_service_1.getSingleArticleService)(id);
    res.status(express_error_toolkit_1.StatusCodes.OK).send(result);
});
// Get articles by email
exports.getArticlesByEmail = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const email = req.params.email;
    if (!email)
        throw new express_error_toolkit_1.BadRequestError('Email is required');
    const result = await (0, articles_service_1.getArticlesByEmailService)(email);
    res.status(express_error_toolkit_1.StatusCodes.OK).send(result);
});
// Post a new article
exports.postArticle = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const articleData = req.body;
    if (!articleData)
        throw new express_error_toolkit_1.BadRequestError('Article data is required');
    const result = await (0, articles_service_1.postArticleService)(articleData);
    res.status(express_error_toolkit_1.StatusCodes.CREATED).send(result);
});
// PUT - Admin approve/decline/premium
exports.updateArticleStatus = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (!id || !update)
        throw new express_error_toolkit_1.BadRequestError('Article ID and update data are required');
    const result = await (0, articles_service_1.updateArticleStatusService)(id, update);
    res.status(express_error_toolkit_1.StatusCodes.OK).send(result);
});
// PATCH - increment view count
exports.incrementViewCount = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!id)
        throw new express_error_toolkit_1.BadRequestError('Article ID is required');
    const result = await (0, articles_service_1.incrementViewCountService)(id);
    res.status(express_error_toolkit_1.StatusCodes.OK).send(result);
});
// PATCH - update article
exports.updateArticle = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData)
        throw new express_error_toolkit_1.BadRequestError('Article ID and update data are required');
    const result = await (0, articles_service_1.updateArticleService)(id, updateData);
    res.status(express_error_toolkit_1.StatusCodes.OK).send(result);
});
// DELETE - delete article
exports.deleteArticle = (0, express_error_toolkit_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    if (!id)
        throw new express_error_toolkit_1.BadRequestError('Article ID is required');
    const result = await (0, articles_service_1.deleteArticleService)(id);
    res.status(express_error_toolkit_1.StatusCodes.OK).send(result);
});
