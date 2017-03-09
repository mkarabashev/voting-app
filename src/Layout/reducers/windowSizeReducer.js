import WINDOW_SIZE_CHANGED from '../constants';

export default function windowSizeReducer(state = 1080, action) {
  switch (action.type) {
    case WINDOW_SIZE_CHANGED:
      return action.width;
    default:
      return state;
  }
}
