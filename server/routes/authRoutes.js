const passport = require('passport');

module.exports = app => {
  // handles routing to Google server for auth
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // handles 'code' exchange after user grants auth permission
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  // handles user logout
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // tests OAuth success
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
