import { Request, Response, Router } from 'express';
import multer from 'multer';
import config from '../config';
import { resizeImage } from '../utils/resizeImage';
import path from 'path';

export const UploadController: Router = Router();

UploadController.get('/', (req: Request, res: Response): Response => res.status(200).send('Image Processing API'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.ORIGINAL_IMAGES_FOLDER);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


UploadController.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response): Promise<Response> => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const { filename } = req.file;
    const imageName = filename.split('.')[0];
    const width = Number(req.query.w) || null;
    const height = Number(req.query.h) || null;

    await resizeImage(imageName, 200,200);
    if (width || height) await resizeImage(imageName, width, height);

    return res.send('SUCCESS!');
  },
);
