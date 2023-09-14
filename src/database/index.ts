import { DataSource } from 'typeorm';
import { Manga } from './entity/Mangas';
import { Preferences } from './entity/Preferences';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [Preferences, Manga],
  synchronize: true,
  logging: true
});
