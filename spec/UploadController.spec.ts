import request from 'supertest';
import { app } from '../src/app';
import fs from 'fs';
import path from 'path';
import config from '../src/config';

describe('GET /upload', () => {
  it('يجب أن يعيد رمز حالة 200', async () => {
    const result = await request(app).get('/upload');
    expect(result.status).toBe(200);
  });
});

describe('POST /upload', () => {
  it('يجب أن يعيد رمز حالة 200 عند رفع صورة صحيحة', async () => {
    const filePath = path.join(__dirname, '../../images/full/test.jpg');  // تأكد من أن الملف موجود هنا
    const response = await request(app)
      .post('/upload')
      .attach('image', filePath);

    expect(response.status).toBe(200);
    expect(response.body.path).toBeDefined();  // تأكد من أن المسار موجود في الاستجابة
  });

  it('يجب أن يعيد رمز حالة 400 إذا لم يتم رفع ملف', async () => {
    const response = await request(app).post('/upload');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('No file uploaded');
  });
});
