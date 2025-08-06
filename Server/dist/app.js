"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_error_toolkit_1 = require("express-error-toolkit");
const cors_1 = __importDefault(require("cors"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const articles_route_1 = __importDefault(require("./routes/articles.route"));
const publishers_route_1 = __importDefault(require("./routes/publishers.route"));
const adminStats_route_1 = __importDefault(require("./routes/adminStats.route"));
const messages_route_1 = __importDefault(require("./routes/messages.route"));
const votedSectors_route_1 = __importDefault(require("./routes/votedSectors.route"));
const votedLanguages_route_1 = __importDefault(require("./routes/votedLanguages.route"));
const payments_route_1 = __importDefault(require("./routes/payments.route"));
const subscription_cron_1 = require("./cron/subscription.cron");
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://tech-insights-d2159.web.app',
        'https://tech-insights-d2159.firebaseapp.com',
    ],
    // credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionSuccessStatus: 200,
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
(0, subscription_cron_1.startSubscriptionDowngradeJob)();
// routes
app.use('/jwt', auth_route_1.default);
app.use('/users', users_route_1.default);
app.use('/', articles_route_1.default);
app.use('/publishers', publishers_route_1.default);
app.use('/admin-stats', adminStats_route_1.default);
app.use('/message', messages_route_1.default);
app.use('/lang-quiz', votedLanguages_route_1.default);
app.use('/demanding-sector', votedSectors_route_1.default);
app.use('/', payments_route_1.default);
// home route
app.get('/', (_req, res) => {
    res.status(express_error_toolkit_1.StatusCodes.OK).json({
        success: true,
        message: 'Welcome to The-Tech-Insight server',
    });
});
// not found hanlder
app.use(express_error_toolkit_1.notFoundHandler);
// global error handler
app.use(express_error_toolkit_1.globalErrorHandler);
exports.default = app;
