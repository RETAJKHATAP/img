import { unlinkSync } from 'fs';
import config from '../src/config';
import { fileExist } from '../src/utils/fileExist';
import { resizeImage } from '../src/utils/resizeImage';
import { app } from '../src/app';

describe('resizeImage utility creates the file', () => {
  it('Should create the file', async () => {
    const fileToCheck = config.THUMBNAIL_IMAGES_FOLDER + '/test-w200-h200.jpg';

    if (fileExist(fileToCheck)) {
      unlinkSync(fileToCheck);
    }

    await resizeImage('test', 200, 200);

    expect(fileExist(fileToCheck)).toBe(true);
  });
});
