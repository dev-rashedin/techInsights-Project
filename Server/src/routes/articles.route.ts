import express from 'express';
import {
  deleteArticle,
  getArticleCount,
  getArticles,
  getArticlesByEmail,
  getPremiumArticles,
  getRecentArticles,
  getRecentArticlesBanner,
  getSingleArticle,
  incrementViewCount,
  postArticle,
  updateArticle,
  updateArticleStatus,
} from '../controllers/articles.controller';
import verifyToken from '../middlewares/verifyToken';

const articlesRouter = express.Router();

articlesRouter.get('/articles', getArticles);
articlesRouter.get('/premium-articles', getPremiumArticles);
articlesRouter.get('/recent-articles', getRecentArticles);
articlesRouter.get('/article-count', getArticleCount);
articlesRouter.get('/recent-articles-banner', getRecentArticlesBanner);
articlesRouter.get('/articles/:id', getSingleArticle);
articlesRouter.get('/my-articles/:email', verifyToken, getArticlesByEmail);
articlesRouter.post('/articles',  postArticle);

articlesRouter.put('/articles/:id', verifyToken, updateArticleStatus);
articlesRouter.patch('/articles/:id/increment-view', incrementViewCount);
articlesRouter.patch('/update/:id', verifyToken, updateArticle);
articlesRouter.delete('/articles/:id', verifyToken, deleteArticle);

export default articlesRouter;
