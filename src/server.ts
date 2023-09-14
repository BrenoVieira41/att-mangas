import 'reflect-metadata';
import { config } from 'dotenv';
import { app } from './app';
import { appDataSource } from './database';

config();

const port = process.env.APP_PORT || 3333;

appDataSource.initialize();
app.listen(port, () => console.log(`Server is running in port: ${port}`));
