import windowSizeChanged from './index';
import WINDOW_SIZE_CHANGED from '../constants';

describe('(actions) Layout', () => {
  it('should have a windowSizeChanged action', () => {
    const expected = { type: WINDOW_SIZE_CHANGED, width: 42 };
    expect(windowSizeChanged(42)).to.deep.equal(expected);
  });
});
