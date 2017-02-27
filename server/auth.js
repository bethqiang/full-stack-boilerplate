const auth = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../db').model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(
  (id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  }
);

// Local login
passport.use(new LocalStrategy(
  (email, password, done) => {
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Login incorrect' });
        }
        return user.authenticate(password)
          .then((ok) => {
            if (!ok) {
              return done(null, false, { message: 'Login incorrect' });
            }
            return done(null, user);
          });
      })
      .catch(done);
  }
));

// Local login cont.
auth.post('/local/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/api/auth/whoami'
  })(req, res, next);
});

// Send user info to frontend
auth.get('/whoami', (req, res) => res.send(req.user));

module.exports = auth;
