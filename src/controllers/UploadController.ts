import { Request, Response, Router } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import config from '../config';

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    cb(null, config.THUMBNAIL_IMAGES_FOLDER);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

export const upload = multer({ storage, fileFilter });

export const UploadController: Router = Router();

UploadController.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ path: req.file.path });
  },
);
