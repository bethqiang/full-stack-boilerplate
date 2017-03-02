const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const db = require('../index');

const User = db.define('users', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      notEmpty: true
    },
    allowNull: false
  },
  // OAuth -> users may or may not have passwords.
  password_digest: Sequelize.STRING,
  password: Sequelize.VIRTUAL
}, {
  indexes: [{ fields: ['email'], unique: true }],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword
  },
  instanceMethods: {
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) => (
            err ? reject(err) : resolve(result))
          )
        );
    }
  }
});

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase(); // eslint-disable-line no-param-reassign
  if (!user.password) return Promise.resolve(user);

  return new Promise((resolve, reject) =>
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) reject(err);
      user.set('password_digest', hash);
      resolve(user);
    })
  );
}

module.exports = User;
