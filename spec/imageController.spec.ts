import request from 'supertest';
import { app } from '../src/app';
import config from '../src/config';
import { fileExist } from '../src/utils/fileExist';
import sizeOf from 'image-size';
import { unlinkSync, readFileSync } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

interface ImageDimensions {
  width?: number;
  height?: number;
  type?: string;
}
import fs from 'fs';
import path from 'path';

describe('اختبارات توليد الصور', () => {
  const testImage = 'test.jpg';
  const width = 300;
  const height = 200;

  beforeAll(() => {
    // إنشاء صورة اختبارية إذا لم تكن موجودة
    const testImagePath = path.join(config.ORIGINAL_IMAGES_FOLDER, testImage);
    if (!fs.existsSync(testImagePath)) {
      fs.writeFileSync(testImagePath, '');
    }
  });

  it('التحقق من وجود الملف بعد التوليد', async () => {
    const res = await request(app)
      .get(`/images/${testImage}?w=${width}&h=${height}`);
    
    const expectedPath = path.join(
      config.THUMBNAIL_IMAGES_FOLDER,
      `test-w${width}-h${height}.jpg`
    );
    
    expect(fs.existsSync(expectedPath)).toBeTruthy();
  });
});
// تحويل دالة الحجم إلى Promise
const sizeOfAsync: (buffer: Buffer) => Promise<ImageDimensions> = promisify(sizeOf);

// اختبارات نقطة /images
describe('GET /images', () => {
  it('يجب أن يعيد رمز حالة 200', async () => {
    const response = await request(app).get('/images');
    expect(response.status).toBe(200);
  });
});

// اختبارات صورة غير موجودة
describe('GET /images/doesnotexist', () => {
  it('يجب أن يعيد رمز حالة 404 ورسالة خطأ', async () => {
    const response = await request(app).get('/images/doesnotexist');
    expect(response.status).toBe(404);
    expect(response.text).toContain('Base image not found'); // تعديل لاختبار يحتوي على الرسالة وليس مطابقة كاملة
  });
});

// اختبارات توليد الصور
describe('اختبارات توليد الصور', () => {
  const randomWidth = Math.floor(Math.random() * 300) + 50;
  const outputPath = join(config.THUMBNAIL_IMAGES_FOLDER, `test-w${randomWidth}.jpg`);

  // تنظيف الملفات قبل وبعد
  beforeAll(() => {
    if (fileExist(outputPath)) unlinkSync(outputPath);
  });

  afterAll(() => {
    if (fileExist(outputPath)) unlinkSync(outputPath);
  });

  // اختبار توليد الصورة عبر API
  it('GET /images/test.jpg?w=[RANDOM] - يجب أن يعيد 200', async () => {
    const response = await request(app).get(`/images/test.jpg?w=${randomWidth}`);
    expect(response.status).toBe(200);
  });

  // اختبار وجود الملف بعد التوليد
  it('التحقق من وجود الملف بعد التوليد', async () => {
    // تأخير لتأكد من التوليد
    await new Promise((resolve) => setTimeout(resolve, 1000)); // تأخير لمدة ثانية واحدة

    const exists = fileExist(outputPath);
    expect(exists).toBe(true);
  });

  // اختبار مقارنة حجم الصورة
  it('مقارنة حجم الصورة المُنشأة مع الطلب', async () => {
    const buffer = readFileSync(outputPath);
    const dimensions = await sizeOfAsync(buffer);

    if (!dimensions?.width) {
      throw new Error('فشل في قراءة أبعاد الصورة');
    }

    // تأكد من أن العرض يتطابق مع العرض المطلوب في الطلب
    expect(dimensions.width).toBe(randomWidth);
  });
});
