import React from 'react';
import styles from './styles';

const Navbar = ({ className, ...otherProps}) => (
  <div {...otherProps} className={`${className} ${styles.navbar}`}/>
);

export default Navbar;
