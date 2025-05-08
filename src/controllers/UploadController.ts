import { Request, Response, Router } from 'express';
import { promises as fs } from 'fs';
import express from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import config from '../config';

const router = express.Router();

// تكوين multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(config.ORIGINAL_IMAGES_FOLDER));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
});
// تعريف واجهة مخصصة للطرفيات
declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);  // السماح فقط بملفات الصور
  } else {
    cb(new Error('Invalid file type'));  // رفض الأنواع غير المدعومة
  }
};

export const UploadController: Router = Router();

UploadController.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ path: req.file.path });  // إرجاع المسار الخاص بالصورة المرفوعة
  },
);
