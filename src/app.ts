import express, { Router } from 'express';
import Manga from './module/controller';

const app = express();
const routes = Router();

app.use(express.json());

routes.get('/', () => console.log('Server is Up'));
routes.get('/api/preferences', Manga.readAllPreferences);
routes.post('/api/preferences', Manga.createPreference);
routes.patch('/api/preferences', Manga.readManga);

app.use(routes);

export { app };
