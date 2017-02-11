'use strict';

var User = require('./userSchema');
var modelValidate = require('../utils').modelValidate;

describe('(models) User', function () {
  var userValidate = void 0;

  before(function () {
    return userValidate = modelValidate(new User());
  });

  it('should be invalid if username is empty', function (done) {
    userValidate('username', done);
  });

  it('should be invalid if oauth is empty', function (done) {
    userValidate('oauth', done);
  });
});