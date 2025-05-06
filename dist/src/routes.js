"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const ImagesController_1 = require("./controllers/ImagesController");
const IndexController_1 = require("./controllers/IndexController");
const UploadController_1 = require("./controllers/UploadController");
const _routes = [
    ['/', IndexController_1.IndexController],
    ['/api/images', ImagesController_1.ImagesController],
    ['/api/upload', UploadController_1.UploadController],
];
const routes = (app) => {
    _routes.forEach(([url, controller]) => {
        app.use(url, controller);
    });
    app.use('*', (req, res) => {
        res.status(404).send('Endpoint not found');
    });
};
exports.routes = routes;
