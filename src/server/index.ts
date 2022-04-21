import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
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

app.get('/', (req: Request, res: Response) => {
  res.send('⚡️Olá⚡️, ⚡️Cinco Gajos⚡️... In TypeScr⚡️pt');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});