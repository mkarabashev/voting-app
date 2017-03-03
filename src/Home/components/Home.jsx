import React from 'react';
import Helmet from 'react-helmet';

const Home = ({ getTime, time }) => (
  <section>
    <Helmet title="Home"/>
    <h3>Home</h3>
    <button onClick={getTime}>timer</button>
    <p>{time}</p>
  </section>
);

export default Home;
