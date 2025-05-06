"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config = {
    PORT: 8000,
    ORIGINAL_IMAGES_FOLDER: path_1.default.resolve(__dirname, 'images', 'full'),
    THUMBNAIL_IMAGES_FOLDER: path_1.default.resolve(__dirname, 'images', 'thumbnails'),
    SERVER: 'http://localhost:8000',
};
exports.default = config;
