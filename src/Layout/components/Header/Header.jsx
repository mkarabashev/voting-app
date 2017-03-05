import React, { PropTypes } from 'react';
import { AuthLink, NavLink } from 'components';
import styles from './styles';

const Header = ({ auth }) => (
  <header>
    <h2 className={styles.colorful}>React Universal App</h2>
    <ul className={styles.navbar}>
      <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
      <li><NavLink to="/list">List</NavLink></li>
      <li><AuthLink condition={auth}>{auth ? "Logout" : "Login"}</AuthLink></li>
      <li><NavLink to="/about">About</NavLink></li>
    </ul>
  </header>
);

Header.propTypes = {
  auth: PropTypes.bool.isRequired
};

export default Header;
