/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const path = require('path');
require('./db/database.ts');
import {
  Farms,
  Roles,
  Events,
  Orders,
  DeliveryZones,
  Products,
  RSVP,
  Subscriptions,
  Users,
  Vendors,
} from './db/models';
console.log(
  Farms,
  Roles,
  Events,
  Orders,
  DeliveryZones,
  Products,
  RSVP,
  Subscriptions,
  Users,
  Vendors
);

dotenv.config();

const app: Express = express();
const port = process.env.LOCAL_PORT;

const dist = path.resolve(__dirname, '..', 'client', 'dist');
console.log('LINE 37 || INDEX.TSX', __dirname);

app.use(express.json());
app.use(express.static(dist));
app.use(express.urlencoded({ extended: true }));

// NEED TO FIGURE OUT HOW TO GET INDEX.HTML TO POPULATE IN THE DIST FOLDER SO WE CAN SERVE IT FROM HERE
// THE INDEX.HTML HARDCODED IN DIST FOLDER BY CAITY'S GROUP. MIGHT BE WORTH TRYING IF HTMLWEBPACKPLUGIN DOESN'T WORK

app.get('/', (req: Request, res: Response) => {
  res.send('⚡️Olá⚡️, ⚡️Cinco Gajos⚡️... In TypeScr⚡️pt');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});