"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileName = generateFileName;
function generateFileName(imageName, width, height) {
    let name = imageName;
    if (width !== null && width !== undefined)
        name += `-w${width}`;
    if (height !== null && height !== undefined)
        name += `-h${height}`;
    return `${name}.jpg`;
}
