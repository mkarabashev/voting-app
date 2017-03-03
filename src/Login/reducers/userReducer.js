import { AUTHENTICATED, DEAUTHENTICATED } from '../constants';

const defaultState = { authenticated: false, user: null, polls: [] };

export default function userReducer(
  state = defaultState,
  action
) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        authenticated: true,
        user: action.user,
        polls: action.polls
      };
    case DEAUTHENTICATED:
      return defaultState;
    default:
      return state;
  }
}
