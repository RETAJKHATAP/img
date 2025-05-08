import path from 'path';
export default {
  ORIGINAL_IMAGES_FOLDER: path.join(__dirname, '../../images/full'),
  THUMBNAIL_IMAGES_FOLDER: path.join(__dirname, '../../images/thumbnails'),
  PORT: process.env.PORT || 8000,
};