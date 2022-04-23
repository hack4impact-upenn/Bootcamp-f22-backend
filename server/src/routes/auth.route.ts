import express from 'express';
import {
  login,
  logout,
  register,
  approve,
} from '../controllers/auth.controller';
import ensureAuthenticated from '../controllers/auth.middleware';
import passport from 'passport';
import 'dotenv/config';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/authstatus', ensureAuthenticated, approve);

router.post(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

router.get('/google/callback', passport.authenticate('google'));

export default router;
