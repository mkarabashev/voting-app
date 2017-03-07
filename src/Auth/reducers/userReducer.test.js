import userReducer from './userReducer';
import { authenticated } from '../actions';

describe('(reducers) userReducer', () => {
  it('should return default state', () => {
    const initialState = { authenticated: false, user: null, polls: [] };
    expect(userReducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should handle AUTHENTICATED', () => {
    const expectedState = { authenticated: true, user: 'Test User', polls: ['poll'] }
    expect(userReducer(undefined, authenticated('Test User', ['poll'])))
      .to.deep.equal(expectedState);
  });
});
