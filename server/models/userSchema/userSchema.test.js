
const User = require('./userSchema');
const modelValidate = require('../utils').modelValidate;

describe('(models) User', () => {
  let userValidate;

  before(() => userValidate = modelValidate(new User()));

  it('should be invalid if username is empty', done => {
    userValidate('username', done);
  });

  it('should be invalid if oauth is empty', done => {
    userValidate('oauth', done);
  });
});
