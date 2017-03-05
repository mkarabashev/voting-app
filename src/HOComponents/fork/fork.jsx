import React, { PropTypes } from 'react';

const fork = (Component1, Component2 = Component1) =>
  (onFulfilled = {}, onUnfulfilled = onFulfilled) =>
    ({ condition, ...otherProps }) => (
      condition
        ? <Component1 {...otherProps} {...onFulfilled}/>
        : <Component2 {...otherProps} {...onUnfulfilled}/>
    );

fork.propTypes = {
  Component1: PropTypes.node.isRequired,
  Component2: PropTypes.node.isRequired,
  onFulfilled: PropTypes.object.isRequired,
  onUnfulfilled: PropTypes.object.isRequired,
  condition: PropTypes.bool.isRequired,
  otherProps: PropTypes.object
};

export default fork;
