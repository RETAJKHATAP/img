'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const fs_1 = require('fs');
const config_1 = __importDefault(require('../src/config'));
const fileExist_1 = require('../src/utils/fileExist');
const resizeImage_1 = require('../src/utils/resizeImage');
describe('resizeImage utility creates the file', () => {
  it('Should create the file', async () => {
    const fileToCheck =
      config_1.default.THUMBNAIL_IMAGES_FOLDER + '/test-w200-h200.jpg';
    if ((0, fileExist_1.fileExist)(fileToCheck)) {
      (0, fs_1.unlinkSync)(fileToCheck);
    }
    await (0, resizeImage_1.resizeImage)('test', 200, 200);
    expect((0, fileExist_1.fileExist)(fileToCheck)).toBe(true);
  });
});
