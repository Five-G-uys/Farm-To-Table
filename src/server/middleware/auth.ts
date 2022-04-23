/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config();
const { application } = require('express'); // find name in project
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('../database/models/users.js')


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5555/auth/google/callback",
  passReqToCallback: true
},
  async (req: any, accessToken: any, refreshToken: any, profile: { name: { givenName: any; familyName: any; }; emails: { value: any; }[]; photos: { value: any; }[]; id: any; }, done: (arg0: Error | null, arg1: null) => void) => {
  console.log(18, "req\n", req, "accessToken\n", accessToken, "refreshToken\n", refreshToken, "profile\n", profile, "done\n", done)
  const defaultUser = {
    name: `${profile.name.givenName} ${profile.name.familyName}`,
    email: profile.emails[0].value,
    picture: profile.photos[0].value,
    googleId: profile.id,
  }

  const user = await Users.findOrCreate({ where: { googleId: profile.id }, defaults: defaultUser})
    .catch((err: Error) => {
      console.log("Error signing up", err)
      done(err, null)
  });

  if(user && user[0]){
    return done(null, user && user[0])
  }
}
));

passport.serializeUser((user: any, done: (a: null, b: string) => void) => {
  // console.log("Serializing User:", user)
  done(null, user._id);
});

passport.deserializeUser(async(id: any, done: (a: null, b: string) => void) => {
  
  const user = await Users.findOne({ where: { id } }).catch((err: Error) => {
    console.log("error deserializing", err);

    if(user){
      done(null, user);
    }
  })
  done(null, user);
});