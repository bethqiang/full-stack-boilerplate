const auth = require('express').Router();
const passport = require('passport');
const _ = require('lodash');
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

// Local signup
auth.post('/local/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, (err) => { // eslint-disable-line arrow-parens
        if (err) next(err);
        else res.sendStatus(201);
      });
    })
    .catch(next);
});

// Local login
passport.use(new LocalStrategy(
  (email, password, done) => {
    User.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Login incorrect' });
        }
        return user.authenticate(password)
          .then(ok => {
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

// Send user id to front-end after signup/login
auth.get('/whoami', (req, res) => {
  const userId = _.pick(req.user, ['id']);
  if (userId) res.send(userId);
  else res.send(null);
});

// Logout
auth.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/api/auth/whoami');
});

module.exports = auth;
