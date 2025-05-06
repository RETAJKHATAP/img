import express, { Request, Response, NextFunction } from 'express';
import { existsSync, mkdirSync } from 'fs';
import sharp from 'sharp';

// تهيئة التطبيق
export const app = express();

// إنشاء مجلد الصور المصغرة إذا لم يكن موجودًا
const thumbnailsDir = 'src/images/thumbnails';
if (!existsSync(thumbnailsDir)) {
  mkdirSync(thumbnailsDir, { recursive: true });
}

// Middleware للتحقق من المدخلات
app.use('/api/images', (req: Request, res: Response, next: NextFunction) => {
  const { filename, width, height } = req.query;

  // التحقق من وجود جميع المعلمات
  if (!filename || !width || !height) {
    return res.status(400).json({
      error:
        'المعلمات المطلوبة: اسم الملف (filename)، العرض (width)، الارتفاع (height)',
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
  if (!existsSync(inputPath)) {
    return res.status(404).json({ error: 'الصورة الأصلية غير موجودة' });
  }

  next();
});

// Route لمعالجة الصورة
app.get('/api/images', async (req: Request, res: Response) => {
  const { filename, width, height } = req.query;
  const parsedWidth = Number(width);
  const parsedHeight = Number(height);
  const outputPath = `src/images/thumbnails/${filename}-w${parsedWidth}-h${parsedHeight}.jpg`;

  try {
    // إذا كانت الصورة موجودة مسبقًا، إرجاعها
    if (existsSync(outputPath)) {
      return res.sendFile(outputPath, { root: process.cwd() });
    }

    // معالجة الصورة باستخدام Sharp
    await sharp(`src/images/full/${filename}.jpg`)
      .resize(parsedWidth, parsedHeight)
      .toFile(outputPath);

    res.sendFile(outputPath, { root: process.cwd() });
  } catch (error) {
    console.error('فشل في معالجة الصورة:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء معالجة الصورة' });
  }
});

// معالجة الأخطاء العامة
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('خطأ غير متوقع:', err.stack);
  res.status(500).json({ error: 'حدث خطأ داخلي في الخادم' });
});

// تشغيل الخادم
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
