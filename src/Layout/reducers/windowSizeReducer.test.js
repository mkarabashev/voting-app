import windowSizeReducer from './windowSizeReducer';
import windowSizeChanged from '../actions';

describe('(reducers) windowSizeReducer', () => {
  it('should return default store', () => {
    expect(windowSizeReducer(undefined, {})).to.equal(1080);
  });

  it('should handle WINDOW_SIZE_CHANGED', () => {
    const action1 = windowSizeChanged(21);
    const action2 = windowSizeChanged(42);
    expect(windowSizeReducer(undefined, action1)).to.equal(21);
    expect(windowSizeReducer(21, action2)).to.equal(42);   
  });
});
