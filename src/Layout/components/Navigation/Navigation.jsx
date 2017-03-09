import React from 'react';
import fork from 'HOComponents';
import Navbar from '../Navbar';
import Menu from '../../containers/Menu';

const Navigation = fork(Navbar, Menu)();

export default Navigation;
