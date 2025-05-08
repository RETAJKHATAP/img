import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import config from '../config';
import { generateFileName } from './generateFileName';

export async function resizeImage(
  imageName: string,
  width: number | null,
  height: number | null,
): Promise<string> {
  // تحويل المسارات إلى مسارات مطلقة
  const originalFolder = path.resolve(config.ORIGINAL_IMAGES_FOLDER);
  const thumbnailFolder = path.resolve(config.THUMBNAIL_IMAGES_FOLDER);
  
  // إنشاء مجلد الصور المصغرة إذا لم يكن موجودًا
  if (!fs.existsSync(thumbnailFolder)) {
    fs.mkdirSync(thumbnailFolder, { recursive: true });
  }

  // التحقق من صحة الأبعاد
  if (width === null || height === null || width <= 0 || height <= 0) {
    throw new Error(`أبعاد غير صالحة: العرض=${width}, الارتفاع=${height}`);
  }

  // إنشاء اسم الملف الجديد
  const fullImageName = path.extname(imageName) ? imageName : `${imageName}.jpg`;
  const resizedImageName = generateFileName(imageName, width, height);
  const originalImagePath = path.join(originalFolder, imageName);
  const thumbnailImagePath = path.join(thumbnailFolder, resizedImageName);
  console.log("تم حفظ الصورة في:", thumbnailImagePath);

  try {
    // التحقق من وجود الصورة الأصلية
    if (!fs.existsSync(originalImagePath)) {
      throw new Error(`الصورة الأصلية ${originalImagePath} غير موجودة`);
    }

    // معالجة الصورة وحفظها
    await sharp(originalImagePath)
      .resize(width, height)
      .jpeg({ quality: 90 })
      .toFile(thumbnailImagePath);

    return resizedImageName;
  } catch (error) {
    // حذف الملف الجزئي إذا فشلت العملية
    if (fs.existsSync(thumbnailImagePath)) {
      fs.unlinkSync(thumbnailImagePath);
    }
    const errorMessage = error instanceof Error ? error.message : 'خطأ غير معروف';
    throw new Error(`فشل في تغيير حجم الصورة: ${errorMessage}`);
  }

}
 export default resizeImage;
