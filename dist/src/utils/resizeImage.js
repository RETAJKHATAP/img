"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = resizeImage;
const sharp_1 = __importDefault(require("sharp"));
const config_1 = __importDefault(require("../config"));
const generateFileName_1 = require("./generateFileName");
async function resizeImage(imageName, width, height) {
    const originalFolder = config_1.default.ORIGINAL_IMAGES_FOLDER + '/';
    const thumbnailFolder = config_1.default.THUMBNAIL_IMAGES_FOLDER + '/';
    const resizedImageName = (0, generateFileName_1.generateFileName)(imageName, width, height);
    try {
        await (0, sharp_1.default)(originalFolder + imageName + '.jpg')
            .resize(width, height)
            .jpeg({ quality: 50 })
            .toFile(thumbnailFolder + resizedImageName);
    }
    catch (e) {
        console.log(e);
    }
    return resizedImageName;
}
