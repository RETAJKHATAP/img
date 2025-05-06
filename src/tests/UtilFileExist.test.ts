import config from '../config';
import { fileExist } from '../utils/fileExist';
import { app } from '../app';

describe('fileExists utility gives back true for existing file', () => {
  it('Should return true', () => {
    const file = config.ORIGINAL_IMAGES_FOLDER + '/test.jpg';
    const result = fileExist(file);

    expect(result).toBe(true);
  });
});

describe('fileExists utility gives back false for non-existing file', () => {
  it('Should return false', () => {
    const file = config.ORIGINAL_IMAGES_FOLDER + '/doesnotexist.jpg';
    const result = fileExist(file);

    expect(result).toBe(false);
  });
});
