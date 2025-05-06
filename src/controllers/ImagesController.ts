import { Request, Response, Router } from 'express';
import config from '../config';
import { resizeImage } from '../utils/resizeImage';
import { fileExist } from '../utils/fileExist';
import { generateFileName } from '../utils/generateFileName';
import fs from 'fs';
import path from 'path';

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
});g
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

    const width = Number(req.query.w) || 0;
    const height = Number(req.query.h) || 0;

    if (width <= 0 && height <= 0) {
      res.status(400).send('Invalid dimensions');
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