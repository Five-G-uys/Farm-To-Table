/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

import { Router } from 'express';
import passport from 'passport';
require('dotenv').config();
const authRouter: Router = Router();
import { Users } from '../db/models';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { isLoggedIn } from '../middleware/auth';

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:5555/auth/google/callback',
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      const defaultUser = {
        name: profile._json.name,
        email: profile._json.email,
        picture: profile._json.picture,
        googleId: profile.id,
      };

      const user = await Users.findOrCreate({
        where: { googleId: profile.id },
        defaults: defaultUser,
      }).catch((err: any) => {
        // console.log("Error signing up", err);
        done(err);
      });

      if (user && user[0]) {
        return done(null, user[0] || null);
      }
    }
  )
);

const port = process.env.LOCAL_PORT;

const successLoginUrl = process.env.CALLBACK_URI;
const errorLoginUrl = 'http://localhost:5555/login/error';

// all backend routes should start at a common place that dont exist on the front end

passport.serializeUser((user: any, done: any) => {
  // console.log('Serializing User:', user);

  done(null, user.id);
});

passport.deserializeUser((id: any, done: any) => {
  // console.log('Deserializing User:', id);

  Users.findOne({ where: { id } })
    .then((data: any) => {
      // console.log('data', data);
      done(null, data);
    })
    .catch((err: any) => {
      done(err);
    });
});

// Auth Routes

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get('/google/error', (req, res) => res.send('Unknown Error'));

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

// Logout route
authRouter.get('/api/logout', (req, res) => {
  req.logout();
  // res.send({message: 'ok'})
  res.redirect('/');
});

// Get current user route
authRouter.get('/api/userProfile', (req, res) => {
  res.send(req.user);

  // console.log("Gettingg user profile", req.user)
  // console.log(`Body: `, req);
  // console.log(`Params: `, req.);
});

module.exports = authRouter;
