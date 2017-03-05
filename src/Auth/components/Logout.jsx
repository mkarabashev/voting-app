import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

const Logout = () => (
  <section>
    <Helmet title="Logout"/>
    <h2>Logout</h2>
    <a href="/logout/return">log out</a>
  </section>
);

export default Logout;
