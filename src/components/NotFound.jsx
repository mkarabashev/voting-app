import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

const NotFound =() => (
  <section>
    <Helmet title="404 Not Found"/>
    <h2>404 Page not found</h2>
    <Link to="/">Click here to go to the home page</Link>
  </section>
)

export default NotFound;
