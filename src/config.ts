import path from 'path';

const config = {
  PORT: 8000,
  ORIGINAL_IMAGES_FOLDER: path.resolve(__dirname, 'public', 'images', 'original'),
  THUMBNAIL_IMAGES_FOLDER: path.resolve(__dirname, 'public', 'images', 'thumbnails'),
  SERVER: 'http://localhost:8000',
};

export default config;