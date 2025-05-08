import config from '../src/config';
import { fileExist } from '../src/utils/fileExist';
import path from 'path';

describe('fileExists utility gives back true for existing file', () => {
  it('Should return true', () => {
    const filePath = path.join(config.ORIGINAL_IMAGES_FOLDER, 'test.jpg');
    const result = fileExist(filePath);
    expect(result).toBe(true);
  });
});

describe('fileExists utility gives back false for non-existing file', () => {
  it('Should return false', () => {
    const filePath = path.join(config.ORIGINAL_IMAGES_FOLDER, 'doesnotexist.jpg');
    const result = fileExist(filePath);
    expect(result).toBe(false);
  });
});
