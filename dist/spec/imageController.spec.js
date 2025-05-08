"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
const config_1 = __importDefault(require("../src/config"));
const fileExist_1 = require("../src/utils/fileExist");
const image_size_1 = __importDefault(require("image-size"));
const fs_1 = require("fs");
const util_1 = require("util");
const path_1 = require("path");
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
describe('اختبارات توليد الصور', () => {
    const testImage = 'test.jpg';
    const width = 300;
    const height = 200;
    beforeAll(() => {
        // إنشاء صورة اختبارية إذا لم تكن موجودة
        const testImagePath = path_2.default.join(config_1.default.ORIGINAL_IMAGES_FOLDER, testImage);
        if (!fs_2.default.existsSync(testImagePath)) {
            fs_2.default.writeFileSync(testImagePath, '');
        }
    });
    it('التحقق من وجود الملف بعد التوليد', async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get(`/images/${testImage}?w=${width}&h=${height}`);
        const expectedPath = path_2.default.join(config_1.default.THUMBNAIL_IMAGES_FOLDER, `test-w${width}-h${height}.jpg`);
        expect(fs_2.default.existsSync(expectedPath)).toBeTruthy();
    });
});
// تحويل دالة الحجم إلى Promise
const sizeOfAsync = (0, util_1.promisify)(image_size_1.default);
// اختبارات نقطة /images
describe('GET /images', () => {
    it('يجب أن يعيد رمز حالة 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/images');
        expect(response.status).toBe(200);
    });
});
// اختبارات صورة غير موجودة
describe('GET /images/doesnotexist', () => {
    it('يجب أن يعيد رمز حالة 404 ورسالة خطأ', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get('/images/doesnotexist');
        expect(response.status).toBe(404);
        expect(response.text).toContain('Base image not found'); // تعديل لاختبار يحتوي على الرسالة وليس مطابقة كاملة
    });
});
// اختبارات توليد الصور
describe('اختبارات توليد الصور', () => {
    const randomWidth = Math.floor(Math.random() * 300) + 50;
    const outputPath = (0, path_1.join)(config_1.default.THUMBNAIL_IMAGES_FOLDER, `test-w${randomWidth}.jpg`);
    // تنظيف الملفات قبل وبعد
    beforeAll(() => {
        if ((0, fileExist_1.fileExist)(outputPath))
            (0, fs_1.unlinkSync)(outputPath);
    });
    afterAll(() => {
        if ((0, fileExist_1.fileExist)(outputPath))
            (0, fs_1.unlinkSync)(outputPath);
    });
    // اختبار توليد الصورة عبر API
    it('GET /images/test.jpg?w=[RANDOM] - يجب أن يعيد 200', async () => {
        const response = await (0, supertest_1.default)(app_1.app).get(`/images/test.jpg?w=${randomWidth}`);
        expect(response.status).toBe(200);
    });
    // اختبار وجود الملف بعد التوليد
    it('التحقق من وجود الملف بعد التوليد', async () => {
        // تأخير لتأكد من التوليد
        await new Promise((resolve) => setTimeout(resolve, 1000)); // تأخير لمدة ثانية واحدة
        const exists = (0, fileExist_1.fileExist)(outputPath);
        expect(exists).toBe(true);
    });
    // اختبار مقارنة حجم الصورة
    it('مقارنة حجم الصورة المُنشأة مع الطلب', async () => {
        const buffer = (0, fs_1.readFileSync)(outputPath);
        const dimensions = await sizeOfAsync(buffer);
        if (!dimensions?.width) {
            throw new Error('فشل في قراءة أبعاد الصورة');
        }
        // تأكد من أن العرض يتطابق مع العرض المطلوب في الطلب
        expect(dimensions.width).toBe(randomWidth);
    });
});
