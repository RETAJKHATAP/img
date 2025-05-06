import request from 'supertest';
import { app } from '../app';
import config from '../config';
import { fileExist } from '../utils/fileExist';
import sizeOf from 'image-size';
import { unlinkSync, readFileSync } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

// تعريف واجهة لأبعاد الصورة
interface ImageDimensions {
  width?: number;
  height?: number;
  type?: string;
}

// تحويل الدالة إلى Promise مع تحديد النوع
const sizeOfAsync: (buffer: Buffer) => Promise<ImageDimensions> = promisify(sizeOf);

// اختبارات نقاط النهاية (Endpoints)
describe('GET /images', () => {
  it('يجب أن يعيد رمز حالة 200', async () => {
    const response = await request(app).get('/images');
    expect(response.status).toBe(200);
  });
});

describe('GET /images/doesnotexist', () => {
  it('يجب أن يعيد رمز حالة 404 ورسالة خطأ', async () => {
    const response = await request(app).get('/images/doesnotexist');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Image failed to process: base file does not exist');
  });
});

// اختبارات معالجة الصور
describe('اختبارات توليد الصور', () => {
  const randomWidth = Math.floor(Math.random() * 300) + 50;
  const outputPath = join(config.THUMBNAIL_IMAGES_FOLDER, `test-w${randomWidth}.jpg`);

  // تنظيف الملفات قبل وبعد الاختبارات
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
  it('التحقق من وجود الملف بعد التوليد', () => {
    const exists = fileExist(outputPath);
    expect(exists).toBe(true);
  });

  // اختبار معالجة الصورة مباشرةً (وحدة التحكم)
  it('مقارنة حجم الصورة المُنشأة مع الطلب', async () => {
    const buffer = readFileSync(outputPath);
    const dimensions = await sizeOfAsync(buffer);
    
    if (!dimensions?.width) {
      throw new Error('فشل في قراءة أبعاد الصورة');
    }
    expect(dimensions.width).toBe(randomWidth);
  });
});