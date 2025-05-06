"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = exports.upload = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config_1.default.THUMBNAIL_IMAGES_FOLDER);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type'));
    }
};
exports.upload = (0, multer_1.default)({ storage, fileFilter });
exports.UploadController = (0, express_1.Router)();
exports.UploadController.post('/', exports.upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ path: req.file.path });
});
