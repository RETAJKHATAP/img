"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileName = generateFileName;
function generateFileName(imageName, width, height) {
    let name = imageName;
    if (width)
        name += `-w${width}`;
    if (height)
        name += `-h${height}`;
    return `${name}.jpg`;
}
