"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = {
    ORIGINAL_IMAGES_FOLDER: path_1.default.join(__dirname, '../../images/full'),
    THUMBNAIL_IMAGES_FOLDER: path_1.default.join(__dirname, '../../images/thumbnails'),
    PORT: process.env.PORT || 8000,
};
