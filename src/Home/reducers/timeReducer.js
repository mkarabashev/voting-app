import { TIME_AWAIT, TIME_SUCCESS, TIME_FAILED } from '../constants';

export default function timeReducer (state = {
  isFetching: false,
  didInvalidate: false,
  time: null
}, action) {
  switch (action.type) {
    case TIME_AWAIT:
      return { ...state, isFetching: true, didInvalidate: false }
    case TIME_SUCCESS:
      return { ...state, isFetching: false, time: action.time };
    case TIME_FAILED:
      return { ...state, isFetching: false, didInvalidate: true }
    default:
      return state;
  }
}
