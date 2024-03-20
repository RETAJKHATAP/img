import express, { Application } from 'express';
import { routes } from './routes';
import path from 'path';

export const app: Application = express();

app.use(express.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

routes(app);