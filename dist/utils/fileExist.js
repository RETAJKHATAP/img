"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExist = void 0;
const fs_1 = require("fs");
const fileExist = (path) => (0, fs_1.existsSync)(path);
exports.fileExist = fileExist;
