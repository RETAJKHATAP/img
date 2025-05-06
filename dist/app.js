"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
// تهيئة التطبيق
exports.app = (0, express_1.default)();
// إنشاء مجلد الصور المصغرة إذا لم يكن موجودًا
const thumbnailsDir = 'src/images/thumbnails';
if (!(0, fs_1.existsSync)(thumbnailsDir)) {
    (0, fs_1.mkdirSync)(thumbnailsDir, { recursive: true });
}
// Middleware للتحقق من المدخلات
exports.app.use('/api/images', (req, res, next) => {
    const { filename, width, height } = req.query;
    // التحقق من وجود جميع المعلمات
    if (!filename || !width || !height) {
        return res.status(400).json({
            error: 'المعلمات المطلوبة: اسم الملف (filename)، العرض (width)، الارتفاع (height)',
        });
    }
    // التحقق من أن العرض والارتفاع أرقام صحيحة
    const parsedWidth = Number(width);
    const parsedHeight = Number(height);
    // الخطأ في السطر 29
    if (isNaN(parsedWidth)) {
        // ✅ أضف القوس المفقود
        return res.status(400).json({ error: 'العرض (width) يجب أن يكون رقمًا' });
    }
    if (isNaN(parsedHeight)) {
        return res
            .status(400)
            .json({ error: 'الارتفاع (height) يجب أن يكون رقمًا' });
    }
    if (parsedWidth <= 0 || parsedHeight <= 0) {
        return res
            .status(400)
            .json({ error: 'العرض والارتفاع يجب أن يكونا قيمتين موجبتين' });
    }
    // التحقق من وجود الملف الأصلي
    const inputPath = `src/images/full/${filename}.jpg`;
    if (!(0, fs_1.existsSync)(inputPath)) {
        return res.status(404).json({ error: 'الصورة الأصلية غير موجودة' });
    }
    next();
});
// Route لمعالجة الصورة
exports.app.get('/api/images', async (req, res) => {
    const { filename, width, height } = req.query;
    const parsedWidth = Number(width);
    const parsedHeight = Number(height);
    const outputPath = `src/images/thumbnails/${filename}-w${parsedWidth}-h${parsedHeight}.jpg`;
    try {
        // إذا كانت الصورة موجودة مسبقًا، إرجاعها
        if ((0, fs_1.existsSync)(outputPath)) {
            return res.sendFile(outputPath, { root: process.cwd() });
        }
        // معالجة الصورة باستخدام Sharp
        await (0, sharp_1.default)(`src/images/full/${filename}.jpg`)
            .resize(parsedWidth, parsedHeight)
            .toFile(outputPath);
        res.sendFile(outputPath, { root: process.cwd() });
    }
    catch (error) {
        console.error('فشل في معالجة الصورة:', error);
        res.status(500).json({ error: 'حدث خطأ أثناء معالجة الصورة' });
    }
});
// معالجة الأخطاء العامة
exports.app.use((err, req, res, next) => {
    console.error('خطأ غير متوقع:', err.stack);
    res.status(500).json({ error: 'حدث خطأ داخلي في الخادم' });
});
// تشغيل الخادم
const PORT = process.env.PORT || 3000;
exports.app.listen(PORT, () => {
    console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
