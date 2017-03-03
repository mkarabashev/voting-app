import { Router } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-facebook';
import mongoose from 'mongoose';

const User = mongoose.model('User');

export const serialize = (user, done) => done(null, user._id);

export const deserialize = (id, done) => User.findById(id)
    .then(user => done(null, user))
    .catch(done);

export default function authRoutes(app) {
  const route = Router();

  passport.use(new Strategy({
      clientID: process.env.CLIENT_ID || '0123456789',
      clientSecret: process.env.CLIENT_SECRET || 'test_secret',
      callbackURL: 'http://localhost:3001/login/facebook/return'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOneAndUpdate(
        { _id: profile.id },
        {
          $set:{
            username: profile.displayName
          }
        },
        { new: true, upsert: true, runValidator: true },
        (err, user) => done(err, user)
      )
    }
  ));

  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);

  route.use(passport.initialize());
  route.use(passport.session());

  route.get('/login/facebook', passport.authenticate('facebook'));

  route.get(
    '/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => res.redirect('/')
  );

  route.get('/logout/return', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.use('/', route);
}
