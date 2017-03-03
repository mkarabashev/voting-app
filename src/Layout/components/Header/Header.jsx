import React, { PropTypes } from 'react';
import styles from './styles';
import { AuthLink, NavLink } from '../../../components';

const Header = ({ auth }) => (
  <header>
    <h2 className={styles.colorful}>React Universal App</h2>
    <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
    <li><NavLink to="/list">List</NavLink></li>
    <li><AuthLink condition={auth}>{auth ? "Logout" : "Login"}</AuthLink></li>
    <li><NavLink to="/about">About</NavLink></li>
  </header>
);

Header.propTypes = {
  auth: PropTypes.bool.isRequired
};

export default Header;
