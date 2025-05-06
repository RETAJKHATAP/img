'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const supertest_1 = __importDefault(require('supertest'));
const app_1 = require('../src/app');
const config_1 = __importDefault(require('../src/config'));
const fileExist_1 = require('../src/utils/fileExist');
const image_size_1 = __importDefault(require('image-size'));
const fs_1 = require('fs');
const util_1 = require('util');
const path_1 = require('path');
// تحويل الدالة إلى Promise مع تحديد النوع
const sizeOfAsync = (0, util_1.promisify)(image_size_1.default);
// اختبارات نقاط النهاية (Endpoints)
describe('GET /images', () => {
  it('يجب أن يعيد رمز حالة 200', async () => {
    const response = await (0, supertest_1.default)(app_1.app).get('/images');
    expect(response.status).toBe(200);
  });
});
describe('GET /images/doesnotexist', () => {
  it('يجب أن يعيد رمز حالة 404 ورسالة خطأ', async () => {
    const response = await (0, supertest_1.default)(app_1.app).get(
      '/images/doesnotexist',
    );
    expect(response.status).toBe(404);
    expect(response.text).toBe(
      'Image failed to process: base file does not exist',
    );
  });
});
// اختبارات معالجة الصور
describe('اختبارات توليد الصور', () => {
  const randomWidth = Math.floor(Math.random() * 300) + 50;
  const outputPath = (0, path_1.join)(
    config_1.default.THUMBNAIL_IMAGES_FOLDER,
    `test-w${randomWidth}.jpg`,
  );
  // تنظيف الملفات قبل وبعد الاختبارات
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
    const response = await (0, supertest_1.default)(app_1.app).get(
      `/images/test.jpg?w=${randomWidth}`,
    );
    expect(response.status).toBe(200);
  });
  // اختبار وجود الملف بعد التوليد
  it('التحقق من وجود الملف بعد التوليد', () => {
    const exists = (0, fileExist_1.fileExist)(outputPath);
    expect(exists).toBe(true);
  });
  // اختبار معالجة الصورة مباشرةً (وحدة التحكم)
  it('مقارنة حجم الصورة المُنشأة مع الطلب', async () => {
    const buffer = (0, fs_1.readFileSync)(outputPath);
    const dimensions = await sizeOfAsync(buffer);
    if (!dimensions?.width) {
      throw new Error('فشل في قراءة أبعاد الصورة');
    }
    expect(dimensions.width).toBe(randomWidth);
  });
});
