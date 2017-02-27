require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { resolve } = require('path');
const chalk = require('chalk');
const passport = require('passport');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (dev only)
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Set up session middleware
app.use(require('cookie-session')({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'an insecure secret key']
}));

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Authentication middleware
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(resolve(__dirname, '../browser/index.html')));
app.use(express.static(resolve(__dirname, '../public')));

// Routes
app.use('/api', require('./api'));

// Send index.html for anything else
app.get('/*', (req, res) => {
  res.sendFile(resolve(__dirname, '../browser/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(chalk.blue(`--- Listening on port ${port} ---`));
});

app.use('/', (err, req, res, next) => {
  console.log(chalk.red('Houston, we have a problem'));
  console.log(chalk.red(`ERROR: ${err.message}`));
  res.sendStatus(err.status || 500);
});
