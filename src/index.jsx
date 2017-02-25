/*eslint no-underscore-dangle: 0*/

import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import initReactFastclick from 'react-fastclick';

import rootReducer from './rootReducer';
import routes from './routes';
import getSagas from './sagas';

initReactFastclick();

// get the current store state from server
const preloadedState = window.__PRELOADED_STATE__;

const sagaMiddleware = createSagaMiddleware();

// add devtools in development
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
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);
 /**
  * the saga middleware takes a generator
  * NOTE: it is important that it be a fn for hmr
  **/
let sagaTask = sagaMiddleware.run(function* runSagas() {
  yield getSagas();
});

const history = syncHistoryWithStore(browserHistory, store);

const mountApp = document.getElementById('app');

 /**
  * Renders and rerenders (in development) the app
  * NOTE: Router needs to have a key in order to avoid warnings during hmr
  * NOTE: It's easier if history gets consumed here because
  * RouterContext needs extra work to propagate props to children components
  **/
const render = _routes => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history} routes={_routes(store)} key={Math.random()} />
      </Provider>
    </AppContainer>,
    mountApp
  );
};

 /**
  * hmr happens here
  * NOTE: building the store elsewhere will break hmr
  **/

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer').default;
      store.replaceReducer(nextReducer);
    });

    module.hot.accept('./routes', () => {
      const nextRoutes = require('./routes').default;
      render(nextRoutes);
    });

    module.hot.accept('./sagas', () => {
      const getNextSagas = require('./sagas').default;
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(function* replacedSaga() {
          yield getNextSagas();
        });
      });
    });
  }
}

render(routes);
