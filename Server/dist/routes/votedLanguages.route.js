"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const votedLanguages_controller_1 = require("../controllers/votedLanguages.controller");
const votedLanguagesRouter = (0, express_1.Router)();
votedLanguagesRouter.get('/', votedLanguages_controller_1.getLangStats);
votedLanguagesRouter.get('/:email', votedLanguages_controller_1.getUserVote);
votedLanguagesRouter.post('/', votedLanguages_controller_1.submitLangVote);
exports.default = votedLanguagesRouter;
