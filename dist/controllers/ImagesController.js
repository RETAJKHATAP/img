"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesController = void 0;
const express_1 = require("express");
const config_1 = __importDefault(require("../config"));
const resizeImage_1 = require("../utils/resizeImage");
const fileExist_1 = require("../utils/fileExist");
const generateFileName_1 = require("../utils/generateFileName");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.ImagesController = (0, express_1.Router)();
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
    const width = Number(req.query.w) || 0;
    const height = Number(req.query.h) || 0;
    if (width <= 0 && height <= 0) {
        res.status(400).send('Invalid dimensions');
        return;
    }
    const imageNameWithoutExt = imageName.split('.')[0];
    const resizedImageName = (0, generateFileName_1.generateFileName)(imageNameWithoutExt, width, height);
    const resizedImagePath = path_1.default.join(config_1.default.THUMBNAIL_IMAGES_FOLDER, resizedImageName);
    try {
        if (!(0, fileExist_1.fileExist)(resizedImagePath)) {
            await (0, resizeImage_1.resizeImage)(imageNameWithoutExt, width, height);
        }
        res.status(200).sendFile(resizedImagePath);
    }
    catch (error) {
        res.status(500).send('Image processing failed');
    }
});
