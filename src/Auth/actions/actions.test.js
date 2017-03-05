import * as actions from './index.js';
import * as types from '../constants';

describe('(actions) Auth actions', () => {
  it('should have an authenticated action', () => {
    const expected = { type: types.AUTHENTICATED, user: 'Test User', polls: ['poll'] };
    expect(actions.authenticated('Test User', ['poll']))
      .to.deep.equal(expected);
  });
});
