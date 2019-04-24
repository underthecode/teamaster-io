const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const path = require('path');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

// serve up dist files upon init
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/surveys', express.static(path.join(__dirname, '../client/dist')));

// routes
app.get('/surveys', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
app.get('/surveys/new', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// middleware order of execution
app.use(
  cookieSession({
    // cookie will last for 30 days before expiring
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // used to encrypt cookie
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// porting
const PORT = process.env.PORT || 5000;
app.listen(PORT);

/* OAuth overview (in dev env)

// CLIENT
// user clicks 'Login'
  // direct to express server -> localhost:5000/auth/google

// EXPRESS SERVER
// forward user's req to Google server from express server
  // direct to Google server -> google.com/auth?appId=123

// GOOGLE SERVER
// ask user if they grant permission
// ** assumingly ** user grants permission
  // redirect back to express route -> localhost:5000/auth/google/callback?code=456

// BACK @ EXPRESS SERVER
// put user on hold, take 'code=456' from URL
// send req to Google with 'code' included

// BACK @ GOOGLE SERVER
// Google sees 'code' in URL, replues with details about this user

// BACK AGAIN @ EXPRESS SERVER
// get user details, create new record in database

*/
