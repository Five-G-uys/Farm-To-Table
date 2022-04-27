/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

require("dotenv").config();
const { application } = require("express"); // find name in project
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Users from "../db/models/Users";
import UserInterface from "../../types/UserInterface";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "http://localhost:5555/auth/google/callback",
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
