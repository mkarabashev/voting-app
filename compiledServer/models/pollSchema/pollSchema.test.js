'use strict';

var Poll = require('./pollSchema');
var modelValidate = require('../utils').modelValidate;

describe('(models) Poll', function () {
  var pollValidate = void 0;

  before(function () {
    return pollValidate = modelValidate(new Poll());
  });

  it('should be invalid if _id is missing', function (done) {
    pollValidate('_id', done);
  });
});