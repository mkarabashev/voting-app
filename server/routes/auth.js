import { Router } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-facebook';
import mongoose from 'mongoose';

const User = mongoose.model('User')

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/login/facebook/return'
  },
  (accessToken, refreshToken, profile, done) => {
    //console.log(profile);
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

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)))

const router = Router();

router.use(passport.initialize());
router.use(passport.session());

router.get('/login/facebook', passport.authenticate('facebook'));

router.get(
  '/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/')
);

export default router;
