'use strict';

import User from './userSchema';
import modelValidate from '../utils';

describe('(models) User', () => {
  let userValidate;

  before(() => userValidate = modelValidate(new User()));

  it('should be invalid if username is empty', done => {
    userValidate('username', done);
  });

  it('should be invalid if oauth is empty', done => {
    userValidate('_id', done);
  });
});
