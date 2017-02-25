import { AUTHENTICATED } from '../constants';

export default function userReducer(
  state = { authenticated: false, user: null, polls: [] },
  action
) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        authenticated: true,
        user: action.user,
        polls: action.polls
      };
    default:
      return state;
  }
}
