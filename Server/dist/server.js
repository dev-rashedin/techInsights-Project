"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
(0, connectDB_1.default)();
app_1.default.listen(config_1.default.port, () => {
    console.log(`The-Tech-Insight server is running on port: ${config_1.default.port}`);
});
