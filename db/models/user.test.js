const db = require('../index');
const User = require('./user');
const { expect } = require('chai');

describe('User', () => {
  before('wait for the db', () => db.didSync);

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    it('resolves true if the password matches', () =>
      User.create({ email: 'test@test.com', password: 'ok' })
        .then(user => user.authenticate('ok'))
        .then(result => expect(result).to.be.true));

    it("resolves false if the password doesn't match", () =>
      User.findOne({ where: { email: 'test@test.com' } })
      .then(user => user.authenticate('not ok'))
      .then(result => expect(result).to.be.false));
  });
});
