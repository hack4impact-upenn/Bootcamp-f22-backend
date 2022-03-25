import passport from 'passport';
import passportJWT from 'passport-jwt';
import express from 'express';
import passportGoogleOAuth20 from 'passport-google-oauth20';

import { authJWTName } from '../models/user';
import retrieveGoogleUser from '../services/retrieveGoogleUser.service';

const JWTStrategy = passportJWT.Strategy;
const GoogleStrategy = passportGoogleOAuth20.Strategy;

// Here we tell passport to use Google OAuth as a strategy to log in
passport.use(
  // TODO: create new Google OAuth credentials here for your new project
  new GoogleStrategy(
    {
      clientID:
        '38852361546-bdnfn6p686a8mcp1v9ie4kjnnp95vr3p.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      retrieveGoogleUser(profile.id, done);
    },
  ),
);

const secret = process.env.JWT_SECRET;

// this helps us parse the user's cookie to extract the jwt used for login
const cookieExtractor = (req: express.Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies[authJWTName];
  }

  return jwt;
};

// tell passport to use our cookieExtractor function, and the JWT_SECRET to sign
passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: secret,
    },
    (jwtPayload, done) => {
      const { expiration } = jwtPayload;

      if (Date.now() > expiration) {
        done('Unauthorized', false);
      }

      done(null, jwtPayload);
    },
  ),
);