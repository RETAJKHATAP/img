import { Request, Response, Router } from 'express';
import { fileExist } from '../utils/fileExist';
import { generateFileName } from '../utils/generateFileName';
import fs from 'fs';
import path from 'path';
import {app} from '../app';
import express from 'express';
import { resizeImage } from '../utils/resizeImage';
import config from '../config';

export const ImagesController: Router = Router();
import { existsSync, mkdirSync } from 'fs';

const folders = [
  config.ORIGINAL_IMAGES_FOLDER,
  config.THUMBNAIL_IMAGES_FOLDER,
];

folders.forEach((folder) => {
  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }
});
ImagesController.get('/', (req: Request, res: Response): void => {
  try {
    const imageFiles = fs.readdirSync(config.ORIGINAL_IMAGES_FOLDER);
    res.status(200).json(imageFiles);
  } catch (error) {
    res.status(500).send('Failed to read images directory');
  }
});

ImagesController.get(
  '/:imageName',
  async (req: Request, res: Response): Promise<void> => {
    const { imageName } = req.params;
    const imagePath = path.join(config.ORIGINAL_IMAGES_FOLDER, imageName);

    if (!fileExist(imagePath)) {
      res.status(404).send('Base image not found');
      return;
    }

    const width = req.query.w ? Number(req.query.w) : null;
    const height = req.query.h ? Number(req.query.h) : null;
    
    if (!width || !height || width <= 0 || height <= 0) {
      res.status(400).send('Width and height must be positive numbers');
      return;
    }
  

    const imageNameWithoutExt = imageName.split('.')[0];
    const resizedImageName = generateFileName(imageNameWithoutExt, width, height);
    const resizedImagePath = path.join(config.THUMBNAIL_IMAGES_FOLDER, resizedImageName);

    try {
      if (!fileExist(resizedImagePath)) {
        await resizeImage(imageNameWithoutExt, width, height);
      }
      res.status(200).sendFile(path.resolve(resizedImagePath));
    } catch (error) {
      res.status(500).send('Image processing failed');
    }
  },
);

const router = express.Router();

router.get('/images/:imageName', async (req, res) => {
  try {
    const { imageName } = req.params;
    const width = Number(req.query.w);
    const height = Number(req.query.h);

    // التحقق من صحة الأبعاد
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      return res.status(400).json({ error: 'أبعاد غير صالحة' });
    }

    // معالجة الصورة
    const processedImage = await resizeImage(imageName, width, height);
    const imagePath = path.join(config.THUMBNAIL_IMAGES_FOLDER, processedImage);

    res.status(200).sendFile(imagePath);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});