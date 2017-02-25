import Poll from './pollSchema';
import modelValidate from '../utils';

describe('(models) Poll', () => {
  let pollValidate;

  before(() => pollValidate = modelValidate(new Poll()));

  it('should be invalid if _id is missing', done => {
    pollValidate('_id', done);
  });
});
