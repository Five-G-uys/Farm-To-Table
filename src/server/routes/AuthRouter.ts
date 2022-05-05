/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

// Import Dependencies
import { Router } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
require('dotenv').config();

// Import Models
import { Users } from '../db/models';

// Initialize Router
const authRouter: Router = Router();

// Initialize Passport w/ Google Strategy
passport.use('google', new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log(profile);
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
        done(err);
      });
      if (user && user[0]) {
        return done(null, user[0] || null);
      }
    }
  )
);

// Define Success and Error Login
const successLoginUrl = process.env.SERVER_URL;
const errorLoginUrl = `${process.env.SERVER_URL}/login/error`;

// Serialize User
passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

// Deserialize User
passport.deserializeUser((id: any, done: any) => {
  Users.findOne({ where: { id } })
    .then((data: any) => {
      done(null, data);
    })
    .catch((err: any) => {
      done(err);
    });
});

///////////////////////////////////////////////////////////////////////////////////////////// GOOGLE AUTHENTICATION ROUTE
authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

///////////////////////////////////////////////////////////////////////////////////////////// GOOGLE ERROR ROUTE
authRouter.get('/google/error', (req, res) => res.send('Unknown Error'));

///////////////////////////////////////////////////////////////////////////////////////////// GOOGLE CALLBACK ROUTE
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

///////////////////////////////////////////////////////////////////////////////////////////// GOOGLE LOGOUT ROUTE
authRouter.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

///////////////////////////////////////////////////////////////////////////////////////////// CURRENT LOGGED IN USER ROUTE
authRouter.get('/api/userProfile', (req, res) => {
  res.send(req.user);
});

// Export Router
module.exports = authRouter;
