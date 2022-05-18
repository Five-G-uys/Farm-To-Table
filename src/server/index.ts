/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Env
require('dotenv').config();

// Import Dependencies
import express, { Express, Request, Response } from 'express';
import path from 'path';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import axios from 'axios';

// Import database and models
require('./db/database.ts');
require('./middleware/auth');

// Import Routers
import authRouter from './routes/AuthRouter';
import deliveryZonesRouter from './routes/DeliveryZoneRouter';
import dietaryRestrictionRouter from './routes/DietaryRestrictionRouter';
import eventRouter from './routes/EventRouter';
// import orderContentRouter from './routes/OrderContentRouter';
import orderRouter from './routes/OrderRouter';
import productRouter from './routes/ProductRouter';
import roleRouter from './routes/RoleRouter';
import rsvpRouter from './routes/RsvpRouter';
import stripeRouter from './routes/StripeRouter';
import subscriptionEntriesRouter from './routes/SubscriptionEntriesRouter';
import subscriptionRouter from './routes/SubscriptionsRouter';
import userRouter from './routes/UserRouter';
import vendorRouter from './routes/VendorRouter';
import weatherRouter from './routes/WeatherRouter';
import orderContentRouter from './routes/OrderContentRouter';
// Import Interfaces
import UserInterface from '../types/UserInterface';
import Profile from 'src/client/components/ProfilePage';

const app: Express = express();
const port = process.env.LOCAL_PORT;

const dist = path.resolve(__dirname, '..', '..', 'dist');
// console.log('LINE 37 || INDEX.TSX', __dirname);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //one day
    keys: [process.env.PASSPORT_CLIENT_SECRET || ''],
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === 'production',
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static(dist));
app.use(express.urlencoded({ extended: true }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Mount Routers
app.use('/auth', authRouter);
app.use('', deliveryZonesRouter);
app.use('', dietaryRestrictionRouter);
app.use('', eventRouter);
('/api/events');
// app.use('/order-contents', orderContentRouter);
app.use('', orderRouter);
app.use('', productRouter);
app.use('', roleRouter);
app.use('', rsvpRouter);
app.use('', stripeRouter);
app.use('', subscriptionEntriesRouter);
app.use('', subscriptionRouter);
app.use('', userRouter);
app.use('', vendorRouter);
app.use('', weatherRouter);
app.use('', orderContentRouter);

// KEEP AT BOTTOM OF GET REQUESTS
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(dist, 'index.html'));
});

// error handle middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.log('LINE 92 || SEVER INDEX', err, res.statusCode);

  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  // res.statusCode();
  res.json({ message: err.message });
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${process.env.SERVER_URL}`);
});
