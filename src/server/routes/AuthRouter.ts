/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import { Router } from 'express';
import passport from 'passport';
require('dotenv').config();

require('../middleware/auth');
const session = require('express-session');
const authRouter: Router = Router();

import { Users } from '../db/models';


const port = process.env.LOCAL_PORT;

authRouter.use(
  session({
    secret: process.env.PASSPORT_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// Sets us req.user
authRouter.use(passport.initialize());
authRouter.use(passport.session());

// Middleware
const isAdmin = (req: { user: { role_id: number } }, res: any, next: any) => {
  if (!req.user || req.user.role_id !== 4) {
    return next(new Error('User is Unauthorized!'));
  } else {
    next();
  }
};

const successLoginUrl = process.env.CALLBACK_URI;
const errorLoginUrl = 'http://localhost:5555/login/error';

// all backend routes should start at a common place that dont exist on the front end

passport.serializeUser((user: any, done: any) => {
  // console.log('Serializing User:', user);
  done(null, user);
});
passport.deserializeUser((user: any, done: any) => {
  // console.log('Deserializing User:', user);
  done(null, user);
});

// Auth Routes

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get('/google/error', (req, res) =>
  res.send('Unknown Error')
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureMessage: 'cannot login to Google',
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    res.redirect('/profile-page');
  }
);

// Check if a user is logged in
authRouter.get('/api/isLoggedIn', (req, res) => {
  req.cookies.crushers ? res.send(true) : res.send(false);
});

// Logout route
authRouter.delete('/api/logout', (req, res) => {
  res.clearCookie('google');
  res.json(false);
});

// Get current user route
authRouter.get('/api/userProfile', (req, res) => {
  // console.log(`Body: `, req);
  // console.log(`Params: `, req.);
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

module.exports = authRouter;