"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const allowedTags = [
    'AI',
    'Cybersecurity',
    'Software',
    'Web Development',
    'Programming',
    'DevOps',
];
const allowedPublishers = [
    'Data Dive',
    'DevOps Digest',
    'Tech Tomorrow',
    'Cyber Shield',
    'AI Revolution',
];
const ArticleSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    image_url: { type: String, required: true },
    description: { type: String, required: true },
    tags: {
        type: [String],
        enum: allowedTags,
        required: true,
    },
    publisher: { type: String, enum: allowedPublishers, required: true },
    view_count: { type: Number, default: 0 },
    isPremium: { type: String, enum: ['yes', 'no'], required: true },
    status: {
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        default: 'pending',
    },
    posted_by: { type: String, required: true },
    posted_time: { type: String, required: true },
    writers_email: { type: String, required: true },
});
exports.Article = mongoose_1.default.model('Article', ArticleSchema);
