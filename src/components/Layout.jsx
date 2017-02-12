import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import styles from './styles';

class Layout extends Component {
  render() {
    return (
      <div>
        <h2 className={styles.colorful}>React Universal App</h2>
        <IndexLink to="/"> Home </IndexLink>
        <Link to="/list"> List </Link>
        <Link to="/about"> About </Link>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
