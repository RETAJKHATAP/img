"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesController = void 0;
const express_1 = require("express");
const fileExist_1 = require("../utils/fileExist");
const generateFileName_1 = require("../utils/generateFileName");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_2 = __importDefault(require("express"));
const resizeImage_1 = require("../utils/resizeImage");
const config_1 = __importDefault(require("../config"));
exports.ImagesController = (0, express_1.Router)();
const fs_2 = require("fs");
const folders = [
    config_1.default.ORIGINAL_IMAGES_FOLDER,
    config_1.default.THUMBNAIL_IMAGES_FOLDER,
];
folders.forEach((folder) => {
    if (!(0, fs_2.existsSync)(folder)) {
        (0, fs_2.mkdirSync)(folder, { recursive: true });
    }
});
exports.ImagesController.get('/', (req, res) => {
    try {
        const imageFiles = fs_1.default.readdirSync(config_1.default.ORIGINAL_IMAGES_FOLDER);
        res.status(200).json(imageFiles);
    }
    catch (error) {
        res.status(500).send('Failed to read images directory');
    }
});
exports.ImagesController.get('/:imageName', async (req, res) => {
    const { imageName } = req.params;
    const imagePath = path_1.default.join(config_1.default.ORIGINAL_IMAGES_FOLDER, imageName);
    if (!(0, fileExist_1.fileExist)(imagePath)) {
        res.status(404).send('Base image not found');
        return;
    }
    const width = req.query.w ? Number(req.query.w) : null;
    const height = req.query.h ? Number(req.query.h) : null;
    if (!width || !height || width <= 0 || height <= 0) {
        res.status(400).send('Width and height must be positive numbers');
        return;
    }
    const imageNameWithoutExt = imageName.split('.')[0];
    const resizedImageName = (0, generateFileName_1.generateFileName)(imageNameWithoutExt, width, height);
    const resizedImagePath = path_1.default.join(config_1.default.THUMBNAIL_IMAGES_FOLDER, resizedImageName);
    try {
        if (!(0, fileExist_1.fileExist)(resizedImagePath)) {
            await (0, resizeImage_1.resizeImage)(imageNameWithoutExt, width, height);
        }
        res.status(200).sendFile(path_1.default.resolve(resizedImagePath));
    }
    catch (error) {
        res.status(500).send('Image processing failed');
    }
});
const router = express_2.default.Router();
router.get('/images/:imageName', async (req, res) => {
    try {
        const { imageName } = req.params;
        const width = Number(req.query.w);
        const height = Number(req.query.h);
        // التحقق من صحة الأبعاد
        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            return res.status(400).json({ error: 'أبعاد غير صالحة' });
        }
        // معالجة الصورة
        const processedImage = await (0, resizeImage_1.resizeImage)(imageName, width, height);
        const imagePath = path_1.default.join(config_1.default.THUMBNAIL_IMAGES_FOLDER, processedImage);
        res.status(200).sendFile(imagePath);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
