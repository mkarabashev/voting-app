import React from 'react';
import Helmet from 'react-helmet';

const List = ({ list, addString }, input) => (
  <section>
    <Helmet title="List" />
    <h3>List</h3>
    <form onSubmit={e => e.preventDefault()}>
      <input ref={node => input = node} />
      <button onClick={e => addString(e, input)}>Submit</button>
    </form>
    {list && list.map((str, i) =>
      <p key={i}>{str}</p>
    )}
  </section>
);

export default List;
