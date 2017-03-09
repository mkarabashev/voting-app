import React, { PropTypes } from 'react';
import AuthLink from '../AuthLink';
import NavLink from '../NavLink';
import Navigation from '../Navigation';
import styles from './styles';

const Header = ({ auth, screenWidth }) => (
  <header className={`${styles.header} ${styles.flex}`}>
    <h1 className={styles.title}><i className={styles.spaceSm}>e</i>Pollit</h1>
    <Navigation className={styles.navigation} condition={screenWidth > 460}>
      <ul>
        <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
        <li><NavLink to="/list">List</NavLink></li>
        <li><AuthLink condition={auth}>{auth ? "Logout" : "Login"}</AuthLink></li>
        <li><NavLink to="/about">About</NavLink></li>
      </ul>
    </Navigation>
  </header>
);

Header.propTypes = {
  auth: PropTypes.bool.isRequired
};

export default Header;
