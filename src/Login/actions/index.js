import * as types from '../constants';

export const authenticated = (user, polls) => ({ type: types.AUTHENTICATED, user, polls });
export const authenticated1 = () => ({ type: types.AUTHENTICATED });
