import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { IUser, User } from '../models/user';
import { NativeError } from 'mongoose';
import { IVerifyOptions } from 'passport-local';
import { getUserFromDB } from '../services/user.service';
import { compare } from 'bcrypt';

/**
 * Middleware to check if a user is authenticated using the Local Strategy.
 * @param email Email of the user
 * @param password Password of the user
 * @param done Callback function to return
 */
const verifyLocalUser = (
  email: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions | undefined) => void,
): void => {
  // Match user with email
  getUserFromDB(email)
    .then((user: any) => {
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      // Match user with password
      compare(password, user.password, (err: any, isMatch: boolean) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    })
    .catch((error: any) => {
      return done(error);
    });
};

const verifyGoogleUser: any = () => null;

/**
 * Initializes all the configurations for passport regarding strategies.
 * @param passport The passport instance to use.
 */
const initializePassport = (passport: passport.PassportStatic) => {
  // Set up middleware to use for each type of auth strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // Treat email field in request as username
      },
      verifyLocalUser,
    ),
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID || 'no ID found',
        clientSecret: process.env.CLIENT_SECRET || 'no secret found',
        callbackURL: '/api/auth/google/callback',
      },
      function (
        request: any,
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any,
      ) {
        console.log(profile);
        // User.findOne({ googleId: profile.id }, function (err: any, user: any) {
        //   return done(err, user);
        // });
      },
    ),
  );

  // Set up serialization and deserialization of user objects
  passport.serializeUser((user: any, done: any) => {
    done(null, user._id);
  });
  passport.deserializeUser((id: any, done: any) => {
    User.findById(id, (err: NativeError, user: IUser) => {
      done(err, user);
    });
  });
};

export default initializePassport;
