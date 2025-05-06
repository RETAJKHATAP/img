import { Application, Router } from 'express';
import { ImagesController } from './controllers/ImagesController';
import { IndexController } from './controllers/IndexController';
import { UploadController } from './controllers/UploadController';
import path from 'path';

const _routes: [string, Router][] = [
  ['/', IndexController],
  ['/api/images', ImagesController],
  ['/api/upload', UploadController],
];

export const routes = (app: Application): void => {
  _routes.forEach(([url, controller]) => {
    app.use(url, controller);
  });

  app.use('*', (req, res) => {
    res.status(404).send('Endpoint not found');
  });
};
