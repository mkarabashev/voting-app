import React, { PropTypes } from 'react';
import NavLink from '../NavLink';
import fork from 'HOComponents';

const conditionMetProps = { to: '/logout'};
const conditionNotMetProps = { to: '/login' };
const AuthLink = fork(NavLink)(
  conditionMetProps,
  conditionNotMetProps
);

export default AuthLink;
