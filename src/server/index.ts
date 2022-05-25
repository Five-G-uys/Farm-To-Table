// Import Dependencies
import express, { Express, Request, Response } from 'express';
import path from 'path';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';

// Import database and models
require('./db/database.ts');
require('./middleware/auth');

// Import Routers
import authRouter from './routes/AuthRouter';
import deliveryZonesRouter from './routes/DeliveryZoneRouter';
import dietaryRestrictionRouter from './routes/DietaryRestrictionRouter';
import eventRouter from './routes/EventRouter';
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

/*  _  __                 _      _  __                 _
 | |/ /_ __   ___   ___| | __ | |/ /_ __   ___   ___| | __
 | ' /| '_ \ / _ \ / __| |/ / | ' /| '_ \ / _ \ / __| |/ /
 | . \| | | | (_) | (__|   <  | . \| | | | (_) | (__|   <
 |_|\_\_| |_|\___/ \___|_|\_\ |_|\_\_| |_|\___/ \___|_|\_\
   |_   _|__  _ __ ___   __ _| |_ ___   ___  ___
     | |/ _ \| '_ ` _ \ / _` | __/ _ \ / _ \/ __|
     | | (_) | | | | | | (_| | || (_) |  __/\__ \
     |_|\___/|_| |_| |_|\__,_|\__\___/ \___||___/

         ,            __ \/ __
     /\^/`\          /o \{}/ o\
    | \/   |         \   ()   /
    | |    |          `> /\ <`   ,,,
    \ \    /  @@@@    (o/\/\o)  {{{}}                 _ _
     '\\//'  @@()@@  _ )    (    ~Y~       @@@@     _{ ' }_
       ||     @@@@ _(_)_   wWWWw .oOOo.   @@()@@   { `.!.` }
       ||     ,/  (_)@(_)  (___) OO()OO    @@@@  _ ',_/Y\_,'
       ||  ,\ | /)  (_)\     Y   'OOOO',,,(\|/ _(_)_ {_,_}
   |\  ||  |\\|// vVVVv`|/@@@@    _ \/{{}}}\| (_)@(_)  |  ,,,
   | | ||  | |;,,,(___) |@@()@@ _(_)_| ~Y~ wWWWw(_)\ (\| {{{}}
   | | || / / {{}}} Y  \| @@@@ (_)#(_) \|  (___)   |  \| /~Y~
    \ \||/ /\\|~Y~ \|/  | \ \/  /(_) |/ |/   Y    \|/  |//\|/
jgs\ `\\//`,.\|/|//.|/\\|/\\|,\|/ //\|/\|.\\\| // \|\\ |/,\|/
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/

// Set Up Server
const app: Express = express();
const port = process.env.LOCAL_PORT;
const dist = path.resolve(__dirname, '..', '..', 'dist');

// Auth Middleware
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

// General Middleware
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

// Error Handle Middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  // console.log('LINE 92 || SEVER INDEX', err, res.statusCode);
  res.status(res.statusCode === 200 ? 500 : res.statusCode);
  res.json({ message: err.message });
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${process.env.SERVER_URL}`);
});
