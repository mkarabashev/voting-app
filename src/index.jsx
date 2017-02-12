import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';

const mountApp = document.getElementById('app');

ReactDOM.render(
  <AppRouter />,
  mountApp
);

if (module.hot) {
  module.hot.accept('./router', () => {
    const NextApp = require('./router').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      mountApp
    );
  });
}
