import { ADD_STRING } from '../constants';

export default function listReducer (state = [], action) {
  switch (action.type) {
    case ADD_STRING:
      return [ ...state, action.string ];
    default:
      return state;
  }
}
