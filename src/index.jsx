/*eslint no-underscore-dangle: 0*/

import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import rootReducer from './rootReducer';
import routes from './Root';

const preloadedState = window.__PRELOADED_STATE__;

const mountApp = document.getElementById('app');

let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose
}

const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers()
);

const history = syncHistoryWithStore(browserHistory, store);

const render = _routes => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history} routes={_routes} key={Math.random()} />
      </Provider>
    </AppContainer>,
    mountApp
  );
};

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer').default;
      store.replaceReducer(nextReducer);
    });

    module.hot.accept('./Root', () => {
      const next = require('./Root').default;
      render(next);
    });
  }
}

render(routes);
