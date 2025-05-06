"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../src/config")); // المسار الصحيح
const fileExist_1 = require("../src/utils/fileExist"); // المسار الصحيح
describe('fileExists utility gives back true for existing file', () => {
    it('Should return true', () => {
        const file = config_1.default.ORIGINAL_IMAGES_FOLDER + '/test.jpg';
        const result = (0, fileExist_1.fileExist)(file);
        expect(result).toBe(true);
    });
});
describe('fileExists utility gives back false for non-existing file', () => {
    it('Should return false', () => {
        const file = config_1.default.ORIGINAL_IMAGES_FOLDER + '/doesnotexist.jpg';
        const result = (0, fileExist_1.fileExist)(file);
        expect(result).toBe(false);
    });
});
