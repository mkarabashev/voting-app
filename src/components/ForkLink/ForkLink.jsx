import React, { PropTypes } from 'react';
import NavLink from '../NavLink';

const ForkLink = (fulfilled, unfulfilled) => ({ condition, ...otherProps }) => (
  condition
    ? <NavLink {...otherProps} to={fulfilled}/>
    : <NavLink {...otherProps} to={unfulfilled}/>
);

ForkLink.propTypes = {
  auth: PropTypes.bool.isRequired,
  otherProps: PropTypes.object
};

export default ForkLink;
