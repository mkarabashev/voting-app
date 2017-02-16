import React from 'react';

const Home = ({ getTime, time }) => (
  <section>
    <h3>Home</h3>
    <button onClick={getTime}>timer</button>
    <p>{time}</p>
  </section>
);

export default Home;
