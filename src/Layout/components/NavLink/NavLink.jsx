import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles';

const NavLink = (props) => (
  <Link {...props} activeClassName={styles.active}/>
);

NavLink.propTypes = {
  props: PropTypes.object
};

export default NavLink;
