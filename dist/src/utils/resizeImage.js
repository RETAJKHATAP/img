"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = resizeImage;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const generateFileName_1 = require("./generateFileName");
async function resizeImage(imageName, width, height) {
    // تحويل المسارات إلى مسارات مطلقة
    const originalFolder = path_1.default.resolve(config_1.default.ORIGINAL_IMAGES_FOLDER);
    const thumbnailFolder = path_1.default.resolve(config_1.default.THUMBNAIL_IMAGES_FOLDER);
    // إنشاء مجلد الصور المصغرة إذا لم يكن موجودًا
    if (!fs_1.default.existsSync(thumbnailFolder)) {
        fs_1.default.mkdirSync(thumbnailFolder, { recursive: true });
    }
    // التحقق من صحة الأبعاد
    if (width === null || height === null || width <= 0 || height <= 0) {
        throw new Error(`أبعاد غير صالحة: العرض=${width}, الارتفاع=${height}`);
    }
    // إنشاء اسم الملف الجديد
    const fullImageName = path_1.default.extname(imageName) ? imageName : `${imageName}.jpg`;
    const resizedImageName = (0, generateFileName_1.generateFileName)(imageName, width, height);
    const originalImagePath = path_1.default.join(originalFolder, imageName);
    const thumbnailImagePath = path_1.default.join(thumbnailFolder, resizedImageName);
    console.log("تم حفظ الصورة في:", thumbnailImagePath);
    try {
        // التحقق من وجود الصورة الأصلية
        if (!fs_1.default.existsSync(originalImagePath)) {
            throw new Error(`الصورة الأصلية ${originalImagePath} غير موجودة`);
        }
        // معالجة الصورة وحفظها
        await (0, sharp_1.default)(originalImagePath)
            .resize(width, height)
            .jpeg({ quality: 90 })
            .toFile(thumbnailImagePath);
        return resizedImageName;
    }
    catch (error) {
        // حذف الملف الجزئي إذا فشلت العملية
        if (fs_1.default.existsSync(thumbnailImagePath)) {
            fs_1.default.unlinkSync(thumbnailImagePath);
        }
        const errorMessage = error instanceof Error ? error.message : 'خطأ غير معروف';
        throw new Error(`فشل في تغيير حجم الصورة: ${errorMessage}`);
    }
}
exports.default = resizeImage;
