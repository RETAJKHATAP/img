"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const router = express_2.default.Router();
// تكوين multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.resolve(config_1.default.ORIGINAL_IMAGES_FOLDER));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('الملف ليس صورة!'));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});
// GET /upload
router.get('/upload', (req, res) => {
    res.status(200).send('صفحة الرفع');
});
// POST /upload
router.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'لم يتم اختيار ملف' });
        }
        res.status(200).json({
            message: 'تم الرفع بنجاح',
            filename: req.file.filename,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: errorMessage });
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // السماح فقط بملفات الصور
    }
    else {
        cb(new Error('Invalid file type')); // رفض الأنواع غير المدعومة
    }
};
exports.UploadController = (0, express_1.Router)();
exports.UploadController.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ path: req.file.path }); // إرجاع المسار الخاص بالصورة المرفوعة
});
