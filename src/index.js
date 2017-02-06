import React from 'react';
import ReactDOM from 'react-dom';

const App =() => (
  <header>
    <h1>React</h1>
  </header>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept()
}
