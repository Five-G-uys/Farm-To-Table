/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import express, { Express, Request, Response } from 'express';
//import dotenv from "dotenv";
require('dotenv').config();
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const axios = require('axios');

// Import database and models
require('./db/database.ts');
require('./middleware/auth');
import {
  Farms,
  Roles,
  Orders,
  DeliveryZones,
  Products,
  RSVP,
  Subscriptions,
  Users,
  Vendors,
  SubscriptionEntries,
} from './db/models';
import Events from './db/models/Events';
import UserInterface from '../types/UserInterface';
//import { postEvent } from "./routes/EventRoutes";

// // Needs to stay until used elsewhere (initializing models)
// console.log(Farms, Roles, Events, Orders, DeliveryZones,Products, RSVP, Subscriptions, Users, Vendors);

//dotenv.config();

const app: Express = express();
const port = process.env.LOCAL_PORT;

const dist = path.resolve(__dirname, '..', '..', 'dist');
// console.log('LINE 37 || INDEX.TSX', __dirname);

app.use(express.json());
app.use(express.static(dist));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.PASSPORT_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// Sets us req.user
app.use(passport.initialize());
app.use(passport.session());

// Middleware
const isAdmin = (req: { user: { role_id: number } }, res: any, next: any) => {
  if (!req.user || req.user.role_id !== 3) {
    return next(new Error('User is Unauthorized!'));
  } else {
    next();
  }
};

const successLoginUrl = 'http://localhost:5555/home-page';
const errorLoginUrl = 'http://localhost:5555/login/error';

// all backend routes should start at a common place that dont exist on the front end

passport.serializeUser((user: any, done: any) => {
  console.log('Serializing User:', user);
  done(null, user);
});
passport.deserializeUser((user: any, done: any) => {
  console.log('Deserializing User:', user);
  done(null, user);
});

// Auth Routes

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/error', (req: Request, res: Response) =>
  res.send('Unknown Error')
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'cannot login to Google',
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    // console.log('User: ', req.user);
    res.send('thank you for signing in!');
  }
);

// Check if a user is logged in
app.get('/api/isLoggedIn', (req: Request, res: Response) => {
  req.cookies.crushers ? res.send(true) : res.send(false);
});

// Logout route
app.delete('/api/logout', (req: Request, res: Response) => {
  res.clearCookie('crushers');
  res.json(false);
});

// Get current user route
app.get('/api/userProfile', (req, res) => {
  Users.findOne()
    .then((data: any) => {
      // console.log('data', data);
      res.send(data).status(200);
    })
    .catch((err: any) => {
      console.error(err);
      res.sendStatus(500);
    });
});

//Events requests
<<<<<<< HEAD
app.post("/api/event", (req: Request, res: Response) => {
  const { eventName, description, thumbnail, category, eventDate, eventType } =
=======
app.post('/api/event', (req: Request, res: Response) => {
  const { eventName, description, thumbnail, category, eventDate } =
>>>>>>> 5d00472140905dba67df2a2c50c67c5fe27a61f8
    req.body.event;

  // console.log('162 Request object postEvent', req.body);
  Events.create({
    eventName,
    description,
    thumbnail,
    category,
    eventDate,
    eventType,
  })
    .then((data: any) => {
      // console.log('Return Events Route || Post Request', data);
      res.status(201);
    })
    .catch((err: string) => {
      console.error('Post Request Failed', err);
      res.sendStatus(500);
    });
});

//Events get request
app.get('/events', (req: Request, res: Response) => {
  Events.findAll()
    .then((response: any) => {
      // console.log(response, 'This is line 186 events gotten');
      res.status(200).send(response);
    })
    .catch((err: object) => {
      console.log('Something went wrong', err);
      res.sendStatus(404);
    });
});

////////SUBSCRIPTION REQUEST////////////
app.put(`/api/subscribed/:id`, (req: Request, res: Response) => {
  Users.update(req.body, { where: { id: req.params.id }, returning: true })
    .then((response: any) => {
      // console.log('Subscription Route', response[1]);
      res.redirect(
        200,
        'https://localhost:5555/subscriptions-page/confirmation-page'
      );
    })
    .catch((err: unknown) => {
      console.error('SUBSCRIPTION ROUTES:', err);
    });
});

app.post(`/api/add_subscription_entry/:id`, (req: Request, res: Response) => {
  // console.log('LINE 200 || SERVER INDEX.TS', req.body);

  SubscriptionEntries.create(req.body)
    .then((data: any) => {
      // console.log(data.dataValues);

      const today: Date = new Date();
      // iterate over number of orders
      for (let i = 1; i < 15; i++) {
        const nextWeek = () => {
          const today = new Date();
          const nextwk = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 7 * i
          );
          return nextwk;
        };
        // console.log('LINE 218 || NEXTWEEK', nextWeek());
        Orders.create({
          farm_id: 1,
          subscription_id: data.dataValues.subscription_id,
          delivery_date: nextWeek(),
        })
          .then((data: any) => {
            // console.log('LINE 224 || SERVER INDEX ||', data);
          })
          .catch((err: any) => {
            console.log('LINE 228 || SERVER INDEX || ERROR', err);
          });
      }
    })
    .catch((err: any) => {
      console.error(err);
    });
});

app.get(`/api/upcoming_orders/:id`, (req: Request, res: Response) => {
  console.log('LINE 238 || SERVER INDEX', req.params); // user id
  Orders.findAll({ where: { subscription_id: req.params.id } })
    .then((data: any) => {
      console.log('LINE 241 || SERVER INDEX', Array.isArray(data)); // ==> ARRAY OF ORDER OBJECTS
      res.json(data);
    })
    .catch((err: any) => {
      console.log('LINE 244 || SERVER INDEX', err);
      res.send(err);
    })
  })
app.get(`/api/subscriptions/`, (req: Request, res: Response) => {
  Subscriptions.findAll()
    .then((data: any) => {
      res.status(200).send(data);
    })
    .catch((err: any) => {
      console.error('Subscription Route ERROR', err);
    });
});

// Home page routes
app.get("/api/farms", (req: Request, res: Response) => {
  Farms.findAll()
    .then((data: any) => {
<<<<<<< HEAD
      console.log("this is the data from the farm api call", data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error("OH NOOOOO", err);
=======
      console.log('this is the data from the farm api call', data);
      res.status(200).send(data);
    })
    .catch((err: unknown) => {
      console.error('OH NOOOOO', err);
>>>>>>> 5d00472140905dba67df2a2c50c67c5fe27a61f8
    });
});

// KEEP AT BOTTOM OF GET REQUESTS
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(dist, 'index.html'));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

function findUser(crushers: any) {
  throw new Error('Function not implemented.');
}
