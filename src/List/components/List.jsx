import React from 'react';

const List = ({ list, addString }, input) => (
  <section>
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
