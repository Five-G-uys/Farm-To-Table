/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const axios = require('axios');

// Import database and models
require('./db/database.ts');
require('./middleware/auth');
import {Farms, Roles, Orders, DeliveryZones, Products, RSVP, Subscriptions, Users, Vendors} from './db/models';
import Events from "./db/models/Events";
//import { postEvent } from "./routes/EventRoutes";

// // Needs to stay until used elsewhere (initializing models)
// console.log(Farms, Roles, Events, Orders, DeliveryZones,Products, RSVP, Subscriptions, Users, Vendors);

dotenv.config();

const app: Express = express();
const port = process.env.LOCAL_PORT;

const dist = path.resolve(__dirname, "..", "..", "dist");
console.log("LINE 37 || INDEX.TSX", __dirname);

app.use(express.json());
app.use(express.static(dist));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Bumpkin Box",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// Sets us req.user
app.use(passport.initialize());
app.use(passport.session());

const successLoginUrl = 'http://localhost:5555/#/';
const errorLoginUrl = 'http://localhost:5555/login/error';


// all backend routes should start at a common place that dont exist on the front end

// Auth Routes
app.get(
  '/api/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'cannot login to Google',
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    console.log('User: ', req.user);
    res.send('thank you for signing in!');
  }
);

// app.get("/profile",(req, res) => {
//   Users.findOne()
//     .then((data: any) => {
//       console.log('data', data);
//       res.send(data).status(200);
//     })
//     .catch((err: Error) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

//Events resquests
app.post("/event", (req: Request, res: Response, next) => {
  console.log(req.user)

  const { eventName, description, thumbnail, category } = req.body.event;
  console.log("Request Object postEvent", req);
  console.log(
    "55 Request object postEvent",
    eventName,
    description,
    thumbnail,
    category
  );
  Events.create({
    eventName,
    description,
    thumbnail,
    category,
  })
    .then((data: object) => {
      console.log("Return Events Route || Post Request", data);
      res.status(201);
    })
    .catch(
      (err: string) => {
        console.error("Post Request Failed", err);
        res.sendStatus(500);
      });
});

// Middleware
const isAdmin = (req: { user: { role_id: number; }; }, res: any, next: any) => {
  if (!req.user || req.user.role_id !== 3) {
    return next(new Error('User is Unauthorized!'));
  } else {
    next();
  }
}



// KEEP AT BOTTOM OF GET REQUESTS
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(dist, "index.html"));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
