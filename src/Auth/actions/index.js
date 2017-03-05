import * as types from '../constants';

export const authenticated = (user, polls) => ({ type: types.AUTHENTICATED, user, polls });
export const deauthenticated = () => ({ type: types.DEAUTHENTICATED });
