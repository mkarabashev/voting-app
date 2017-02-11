const Poll = require('./pollSchema');
const modelValidate = require('../utils').modelValidate;

describe('(models) Poll', () => {
  let pollValidate;

  before(() => pollValidate = modelValidate(new Poll()));

  it('should be invalid if _id is missing', done => {
    pollValidate('_id', done);
  });
});
