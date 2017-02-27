const chalk = require('chalk');
const Sequelize = require('sequelize');
const childProcess = require('child_process');

// Change 'boilerplate' to the name of your database
// If testing, '_test' will be added on to the name you specify
const name = (process.env.DATABASE_NAME ||
  `boilerplate${process.env.NODE_ENV === 'testing' ? '_test' : ''}`);

const url = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`;
console.log(chalk.blue(`Opening database connection to ${url}`));

// Create the database instance
const db = new Sequelize(url, {
  logging: false,            // turn off SQL logging
  define: {
    underscored: true,       // use snake_case rather than camelCase column names
    freezeTableName: true,   // don't change table names from the one specified
    timestamps: true         // automatically include timestamp columns
  }
});

module.exports = db;

// Pull in our models
require('./models');

// Sync the db, creating it if necessary if not in prod
function sync(force = process.env.NODE_ENV === 'testing', retries = 0, maxRetries = 5) {
  return db.sync({ force })
    .then(() => console.log(chalk.blue(`Synced models to db ${url}`)))
    .catch((fail) => {
      // Don't do this auto-create nonsense in prod, or if we've retried too many times
      if (process.env.NODE_ENV === 'production' || retries > maxRetries) {
        console.error(chalk.red('********** Database Error ***********'));
        console.error(chalk.red(`Couldn't connect to ${url}`));
        console.error();
        console.error(chalk.red(fail));
        console.error(chalk.red('*************************************'));
        return;
      }
      // Otherwise, do this autocreate nonsense
      console.log(chalk.blue(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`));
      // eslint-disable-next-line consistent-return
      return new Promise((resolve, reject) =>
        childProcess.exec(`createdb "${name}"`, resolve))
        .then(() => sync(true, retries + 1));
    });
}

db.didSync = sync();
