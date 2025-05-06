"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
const express_1 = require("express");
exports.IndexController = (0, express_1.Router)();
exports.IndexController.get('/', async (req, res, next) => {
    try {
        res.status(200).send({ data: 'Image Processing API' });
    }
    catch (e) {
        next(e);
    }
});
