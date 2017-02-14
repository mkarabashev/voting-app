import serialize from 'serialize-javascript';
import { createStore } from 'redux';

import htmlRenderer from './htmlRenderer';
import reactRenderer from './reactRenderer';
import rootReducer from '../../src/rootReducer';

const pageRenderer = props => {
  const store = createStore(rootReducer);
  const preloadedState = serialize(store.getState());
  const reactString = reactRenderer(store, props);

  return htmlRenderer(reactString, preloadedState);
};

export default pageRenderer;
