"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const users_controller_2 = require("../controllers/users.controller");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const verifyAdmin_1 = __importDefault(require("../middlewares/verifyAdmin"));
const usersRouter = express_1.default.Router();
usersRouter.get('/', verifyToken_1.default, verifyAdmin_1.default, users_controller_1.getAllUsers);
usersRouter.get('/:email', users_controller_2.getUserByEmail);
usersRouter.put('/', users_controller_1.addOrEditUser);
usersRouter.patch('/:email', verifyToken_1.default, users_controller_1.updateUserProfile);
exports.default = usersRouter;
