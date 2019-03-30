const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// transform User Model ID to cookie/token
passport.serializeUser((user, done) => {
  // user.id (User Model ID) refers to unique assigned to record in db, NOT Google profile.id (OAuth ID)
  // only need OAuth ID for initila sign in, after that only use User Model ID to identify apps users
  done(null, user.id);
});

// transform token/cookie back to User Model ID
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// configures passport
passport.use(
  // this has internal code to identify 'google' as a string
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(exisitngUser => {
        if (exisitngUser) {
          // already have a record with given profile ID
          done(null, exisitngUser);
        } else {
          // don't have this record, so make a new one
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
