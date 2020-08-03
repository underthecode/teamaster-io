const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

// routes
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/surveys', express.static(path.join(__dirname, '../client/dist')));

app.use('/surveys/new', express.static(path.join(__dirname, '../client/dist')));

// middleware order of execution
app.use(bodyParser.json());

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
require('./routes/surveyRoutes')(app);

// porting
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

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
